import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { focusAreas } = await req.json()

    if (!Array.isArray(focusAreas) || focusAreas.length === 0) {
      return NextResponse.json({ error: 'At least one focus area required' }, { status: 400 })
    }

    // Delete existing focus areas
    await prisma.userFocusArea.deleteMany({ where: { userId: session.user.id } })

    // Insert new focus areas
    await prisma.userFocusArea.createMany({
      data: focusAreas.map((area: { slug: string; label: string }) => ({
        userId: session.user.id,
        areaSlug: area.slug,
        areaLabel: area.label,
      })),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
