import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

function computeRelevance(paperTags: string[], userFocusAreas: string[]): number {
  const matches = paperTags.filter((t: string) => userFocusAreas.includes(t))
  return matches.length / Math.max(userFocusAreas.length, 1)
}

function isCrossFieldSpark(
  paperCategory: string,
  userCategories: string[],
  paperTags: string[],
  userFocusAreas: string[]
): boolean {
  const hasTagMatch = paperTags.some((t) => userFocusAreas.includes(t))
  const categoryMatch = userCategories.includes(paperCategory)
  return hasTagMatch && !categoryMatch
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const userId = session.user.id

    // Get user focus areas
    const focusAreas = await prisma.userFocusArea.findMany({ where: { userId } })
    if (focusAreas.length === 0) {
      return NextResponse.json({ items: [], crossFieldSparks: [] })
    }

    const userSlugs = focusAreas.map((fa) => fa.areaSlug)

    // Check today's briefing
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const existingItems = await prisma.briefingItem.findMany({
      where: {
        userId,
        briefingDate: { gte: today, lt: tomorrow },
      },
      include: { paper: true },
      orderBy: { relevanceScore: 'desc' },
    })

    if (existingItems.length > 0) {
      const mainItems = existingItems.filter((i) => !i.isCrossFieldSpark)
      const crossFieldSparks = existingItems.filter((i) => i.isCrossFieldSpark)
      return NextResponse.json({ items: mainItems, crossFieldSparks })
    }

    // Generate new briefing
    const papers = await prisma.paper.findMany()

    // Get user categories from FOCUS_AREAS
    const { FOCUS_AREAS } = await import('@/lib/seed-data')
    const userCategories = FOCUS_AREAS
      .filter((fa) => userSlugs.includes(fa.slug))
      .map((fa) => fa.category)

    const scoredPapers = papers
      .map((paper) => {
        const metadata = paper.metadata as any
        const paperTags: string[] = metadata?.tags || []
        const paperCategory: string = metadata?.category || ''
        const score = computeRelevance(paperTags, userSlugs)
        const isCrossField = score > 0 && isCrossFieldSpark(paperCategory, userCategories, paperTags, userSlugs)

        return { paper, score, isCrossField }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)

    if (scoredPapers.length === 0) {
      return NextResponse.json({ items: [], crossFieldSparks: [] })
    }

    // Deduplicate: each paper can only be in one category
    const mainPapers = scoredPapers.filter((p) => !p.isCrossField).slice(0, 10)
    const sparkPapers = scoredPapers.filter((p) => p.isCrossField).slice(0, 5)

    // Save briefing items
    const briefingDate = new Date()

    const createItems = async (items: typeof mainPapers, isCrossField: boolean) => {
      for (const item of items) {
        const metadata = item.paper.metadata as any
        const paperTags: string[] = metadata?.tags || []
        const matchedAreas = paperTags.filter((t: string) => userSlugs.includes(t))

        try {
          await prisma.briefingItem.upsert({
            where: {
              userId_paperId_briefingDate: {
                userId,
                paperId: item.paper.id,
                briefingDate,
              },
            },
            update: {},
            create: {
              userId,
              paperId: item.paper.id,
              relevanceScore: item.score,
              relevanceExplanation: `Matches your interest in: ${matchedAreas.join(', ')}`,
              isCrossFieldSpark: isCrossField,
              briefingDate,
            },
          })
        } catch {
          // ignore duplicate
        }
      }
    }

    await createItems(mainPapers, false)
    await createItems(sparkPapers, true)

    // Re-fetch with paper data
    const newItems = await prisma.briefingItem.findMany({
      where: {
        userId,
        briefingDate: { gte: today, lt: tomorrow },
      },
      include: { paper: true },
      orderBy: { relevanceScore: 'desc' },
    })

    const mainItems = newItems.filter((i) => !i.isCrossFieldSpark)
    const crossFieldSparks = newItems.filter((i) => i.isCrossFieldSpark)

    return NextResponse.json({ items: mainItems, crossFieldSparks })
  } catch (error) {
    console.error('Briefing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
