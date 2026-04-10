import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { SEED_PAPERS } from '../lib/seed-data'

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
  const prisma = new PrismaClient({ adapter } as any)

  console.log('Clearing existing papers...')
  await prisma.briefingItem.deleteMany()
  await prisma.paper.deleteMany()

  console.log('Seeding papers...')
  for (const paper of SEED_PAPERS) {
    await prisma.paper.create({
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
    console.log(`  ✓ ${paper.title.slice(0, 60)}...`)
  }

  console.log(`\nSeeded ${SEED_PAPERS.length} papers successfully.`)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
