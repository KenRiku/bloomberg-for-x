import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Nav } from '@/components/nav'
import { DashboardClient } from './client'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }

  const userId = session.user.id

  // Check if user has focus areas
  const focusAreas = await prisma.userFocusArea.findMany({ where: { userId } })
  if (focusAreas.length === 0) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Nav />
      <DashboardClient
        userName={session.user.name || session.user.email || 'ANALYST'}
        focusAreaSlugs={focusAreas.map((fa) => fa.areaSlug)}
        focusAreaLabels={focusAreas.map((fa) => fa.areaLabel)}
      />
    </div>
  )
}
