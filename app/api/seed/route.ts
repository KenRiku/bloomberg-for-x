import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SEED_PAPERS } from '@/lib/seed-data'

export async function POST(req: NextRequest) {
  try {
    // Clear existing papers
    await prisma.briefingItem.deleteMany()
    await prisma.paper.deleteMany()

    // Insert seed papers
    const papers = await Promise.all(
      SEED_PAPERS.map((paper) =>
        prisma.paper.create({
          data: {
            externalId: paper.externalId,
            source: paper.source,
            title: paper.title,
            authors: paper.authors,
            abstract: paper.abstract,
            journal: paper.journal,
            publishedDate: paper.publishedDate,
            url: paper.url,
            aiSummary: paper.aiSummary,
            embedding: [],
            metadata: {
              category: paper.category,
              tags: paper.tags,
            },
          },
        })
      )
    )

    return NextResponse.json({ success: true, count: papers.length })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  return POST(req)
}
