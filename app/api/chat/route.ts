import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { anthropic as aiSdkAnthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

function findRelevantPapers(query: string, papers: any[], maxPapers = 5) {
  const queryWords = query.toLowerCase().split(/\s+/).filter((w) => w.length > 3)

  return papers
    .map((paper) => {
      const text = `${paper.title} ${paper.abstract} ${paper.aiSummary || ''}`.toLowerCase()
      const score = queryWords.reduce((acc, word) => {
        return acc + (text.includes(word) ? 1 : 0)
      }, 0)
      return { paper, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPapers)
    .map((item) => item.paper)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { message, conversationId } = await req.json()
    const userId = session.user.id

    // Get or create conversation
    let conversation
    if (conversationId) {
      conversation = await prisma.chatConversation.findFirst({
        where: { id: conversationId, userId },
        include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
      })
    }

    if (!conversation) {
      conversation = await prisma.chatConversation.create({
        data: { userId, title: message.slice(0, 60) + (message.length > 60 ? '...' : '') },
        include: { messages: true },
      })
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: message,
      },
    })

    // Find relevant papers
    const allPapers = await prisma.paper.findMany()
    const relevantPapers = findRelevantPapers(message, allPapers)

    // Build system prompt with paper context
    const paperContext =
      relevantPapers.length > 0
        ? relevantPapers
            .map(
              (p, i) =>
                `[${i + 1}] "${p.title}" (${p.journal || p.source}, ${new Date(p.publishedDate).getFullYear()})
Authors: ${p.authors?.slice(0, 3).join(', ')}
Summary: ${p.aiSummary || p.abstract.slice(0, 300)}...
URL: ${p.url}`
            )
            .join('\n\n')
        : 'No specific papers found for this query.'

    const systemPrompt = `You are SciFind, a scientific intelligence analyst. You have access to a curated database of recent high-impact research papers. Your role is to synthesize scientific findings and explain their implications clearly and analytically — like a Bloomberg analyst, but for science.

When answering, cite relevant papers using [1], [2], etc. notation. Be precise, data-driven, and highlight investment/research implications where relevant.

RELEVANT PAPERS FROM DATABASE:
${paperContext}

Guidelines:
- Use citation numbers [1], [2] etc. when referencing specific papers
- Be concise but thorough — this is a professional platform
- Highlight key metrics, statistics, and quantitative findings
- Note cross-disciplinary implications
- If no papers match, draw on your general knowledge and note the limitation`

    // Build message history
    const messageHistory = conversation.messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    // Stream with Vercel AI SDK + Anthropic
    const result = await streamText({
      model: aiSdkAnthropic('claude-opus-4-5'),
      system: systemPrompt,
      messages: [
        ...messageHistory,
        { role: 'user', content: message },
      ],
      onFinish: async ({ text }) => {
        // Save assistant message
        const citations = relevantPapers.map((p, i) => ({
          index: i + 1,
          id: p.id,
          title: p.title,
          url: p.url,
        }))

        await prisma.chatMessage.create({
          data: {
            conversationId: conversation!.id,
            role: 'assistant',
            content: text,
            citations,
          },
        })

        // Update conversation title if it's the first exchange
        if (conversation!.messages.length === 0) {
          await prisma.chatConversation.update({
            where: { id: conversation!.id },
            data: {
              title: message.slice(0, 60) + (message.length > 60 ? '...' : ''),
              updatedAt: new Date(),
            },
          })
        }
      },
    })

    return result.toDataStreamResponse({
      headers: {
        'X-Conversation-Id': conversation.id,
      },
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
