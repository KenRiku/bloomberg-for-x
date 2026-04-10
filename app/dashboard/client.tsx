'use client'

import { useEffect, useState } from 'react'
import { PaperCard } from '@/components/paper-card'

interface Paper {
  id: string
  title: string
  authors: string[]
  abstract: string
  journal: string | null
  publishedDate: string | Date
  url: string
  aiSummary: string | null
  source: string
  metadata: any
}

interface BriefingItem {
  id: string
  relevanceScore: number
  relevanceExplanation: string | null
  isCrossFieldSpark: boolean
  paper: Paper
}

interface DashboardClientProps {
  userName: string
  focusAreaSlugs: string[]
  focusAreaLabels: string[]
}

export function DashboardClient({ userName, focusAreaSlugs, focusAreaLabels }: DashboardClientProps) {
  const [items, setItems] = useState<BriefingItem[]>([])
  const [crossFieldSparks, setCrossFieldSparks] = useState<BriefingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBriefing = async () => {
      try {
        const res = await fetch('/api/briefing')
        if (!res.ok) throw new Error('Failed to fetch briefing')
        const data = await res.json()
        setItems(data.items || [])
        setCrossFieldSparks(data.crossFieldSparks || [])
      } catch (e) {
        setError('Failed to load briefing. Ensure the database is seeded.')
      } finally {
        setLoading(false)
      }
    }

    fetchBriefing()
  }, [])

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Dashboard header */}
      <div className="border border-[#252525] bg-[#111111] p-4 mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl text-[#e8e8e8] mb-1" style={{ fontFamily: 'var(--font-dm-serif), Georgia, serif' }}>
              Morning Briefing
            </h1>
            <p className="font-mono text-xs text-[#888888]">{today}</p>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-[#444444] mb-1">ANALYST</div>
            <div className="font-mono text-sm text-[#e8e8e8]">{userName.toUpperCase()}</div>
          </div>
        </div>

        {/* Focus area pills */}
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#1a1a1a]">
          <span className="font-mono text-xs text-[#444444] mr-1">MONITORING:</span>
          {focusAreaLabels.map((label, i) => (
            <span
              key={focusAreaSlugs[i]}
              className="font-mono text-xs px-2 py-0.5 border border-[#252525] text-[#888888]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Ticker / cross-field sparks scrolling bar */}
      {crossFieldSparks.length > 0 && (
        <div className="border border-[#f59e0b33] bg-[#f59e0b08] mb-4 overflow-hidden">
          <div className="flex items-center">
            <div className="flex-shrink-0 px-3 py-2 bg-[#f59e0b] text-[#0a0a0a] font-mono text-xs font-bold">
              CROSS-FIELD SPARKS
            </div>
            <div className="overflow-hidden flex-1 py-1.5">
              <div className="ticker-animate flex gap-8 whitespace-nowrap px-4">
                {[...crossFieldSparks, ...crossFieldSparks].map((item, i) => (
                  <span key={i} className="font-mono text-xs text-[#f59e0b]">
                    [{(item.relevanceScore * 100).toFixed(0)}%] {item.paper.title.slice(0, 60)}...
                    <span className="text-[#444444] mx-2">|</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main briefing feed */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41] pulse-green" />
            <span className="font-mono text-xs text-[#888888]">RELEVANCE-RANKED BRIEFING</span>
            <span className="font-mono text-xs text-[#444444] ml-auto">
              {items.length} PAPERS
            </span>
          </div>

          {loading && (
            <div className="border border-[#252525] bg-[#111111] p-8 text-center">
              <div className="font-mono text-sm text-[#00ff41] blink-cursor">
                LOADING BRIEFING
              </div>
              <p className="font-mono text-xs text-[#444444] mt-2">
                Computing relevance scores...
              </p>
            </div>
          )}

          {error && (
            <div className="border border-[#ef444444] bg-[#ef44440a] p-4">
              <span className="font-mono text-xs text-[#ef4444]">ERROR: {error}</span>
              <p className="font-mono text-xs text-[#888888] mt-2">
                To seed the database, visit <code className="text-[#00ff41]">/api/seed</code>
              </p>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="border border-[#252525] bg-[#111111] p-8 text-center">
              <p className="font-mono text-sm text-[#888888]">NO PAPERS FOUND</p>
              <p className="font-mono text-xs text-[#444444] mt-2">
                Seed the database at <code className="text-[#00ff41]">/api/seed</code>
              </p>
            </div>
          )}

          <div className="space-y-2">
            {items.map((item, index) => (
              <PaperCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Cross-field sparks panel */}
          <div className="border border-[#f59e0b33] bg-[#111111]">
            <div className="border-b border-[#f59e0b22] px-3 py-2 flex items-center gap-2">
              <span className="text-[#f59e0b] text-xs font-mono font-bold">CROSS-FIELD SPARKS</span>
              <span className="font-mono text-xs text-[#444444] ml-auto">{crossFieldSparks.length}</span>
            </div>
            <div className="p-0">
              {crossFieldSparks.length === 0 && !loading && (
                <div className="p-4 font-mono text-xs text-[#444444]">
                  No cross-field sparks today
                </div>
              )}
              {crossFieldSparks.map((item) => (
                <div
                  key={item.id}
                  className="px-3 py-3 border-b border-[#1a1a1a] last:border-0 hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-[#f59e0b]">
                      {(item.relevanceScore * 100).toFixed(0)}%
                    </span>
                    <span className="font-mono text-xs text-[#444444]">
                      {(item.paper.metadata as any)?.category?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] leading-snug line-clamp-2">
                    {item.paper.title}
                  </p>
                  {item.paper.aiSummary && (
                    <p className="text-xs text-[#444444] mt-1 line-clamp-2">
                      {item.paper.aiSummary.slice(0, 100)}...
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats panel */}
          <div className="border border-[#252525] bg-[#111111]">
            <div className="border-b border-[#252525] px-3 py-2">
              <span className="font-mono text-xs text-[#888888]">SESSION STATS</span>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#444444]">PAPERS LOADED</span>
                <span className="font-mono text-xs text-[#00ff41]">{items.length + crossFieldSparks.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#444444]">FOCUS AREAS</span>
                <span className="font-mono text-xs text-[#e8e8e8]">{focusAreaSlugs.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#444444]">CROSS-FIELD</span>
                <span className="font-mono text-xs text-[#f59e0b]">{crossFieldSparks.length}</span>
              </div>
              {items[0] && (
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-[#444444]">TOP RELEVANCE</span>
                  <span className="font-mono text-xs text-[#00ff41]">
                    {(items[0].relevanceScore * 100).toFixed(0)}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="border border-[#252525] bg-[#111111]">
            <div className="border-b border-[#252525] px-3 py-2">
              <span className="font-mono text-xs text-[#888888]">QUICK ACTIONS</span>
            </div>
            <div className="p-3 space-y-2">
              <a
                href="/chat"
                className="block w-full text-center border border-[#00ff4133] text-[#00ff41] font-mono text-xs py-2 hover:bg-[#00ff4110] transition-colors"
              >
                OPEN RESEARCH CHAT →
              </a>
              <a
                href="/onboarding"
                className="block w-full text-center border border-[#252525] text-[#888888] font-mono text-xs py-2 hover:border-[#3a3a3a] transition-colors"
              >
                EDIT FOCUS AREAS
              </a>
              <a
                href="/api/seed"
                target="_blank"
                className="block w-full text-center border border-[#252525] text-[#444444] font-mono text-xs py-2 hover:border-[#3a3a3a] transition-colors"
              >
                SEED DATABASE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
