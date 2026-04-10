'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FOCUS_AREAS } from '@/lib/seed-data'

const CATEGORY_COLORS: Record<string, string> = {
  pharmacology: '#3b82f6',
  genomics: '#8b5cf6',
  immunology: '#00ff41',
  materials: '#f59e0b',
  physics: '#ef4444',
  neurology: '#ec4899',
  oncology: '#f97316',
  'structural-biology': '#14b8a6',
  microbiology: '#84cc16',
  ai: '#00ff41',
  'earth-science': '#06b6d4',
  biology: '#a3e635',
}

export default function OnboardingPage() {
  const router = useRouter()
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleArea = (slug: string) => {
    setSelectedAreas((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  const handleSubmit = async () => {
    if (selectedAreas.length < 3) {
      setError('Please select at least 3 focus areas')
      return
    }

    setLoading(true)
    setError('')

    try {
      const areas = FOCUS_AREAS.filter((fa) => selectedAreas.includes(fa.slug)).map((fa) => ({
        slug: fa.slug,
        label: fa.label,
      }))

      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ focusAreas: areas }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to save preferences')
        return
      }

      router.push('/dashboard')
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const groupedAreas = FOCUS_AREAS.reduce(
    (acc, area) => {
      if (!acc[area.category]) acc[area.category] = []
      acc[area.category].push(area)
      return acc
    },
    {} as Record<string, typeof FOCUS_AREAS>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-[#252525] px-6 py-4">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] pulse-green" />
            <span className="font-mono text-sm font-bold text-[#00ff41] tracking-widest">
              SCIFIND
            </span>
            <span className="font-mono text-xs text-[#444444]">ONBOARDING</span>
          </div>
          <div className="font-mono text-xs text-[#444444]">
            STEP 1 OF 1: CONFIGURE RESEARCH FOCUS
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl text-[#e8e8e8] mb-2" style={{ fontFamily: 'var(--font-dm-serif), Georgia, serif' }}>
            Configure your research intelligence feed
          </h1>
          <p className="font-mono text-sm text-[#888888]">
            Select 3+ scientific domains. Your daily briefing will be ranked by relevance to these areas.
          </p>
        </div>

        {/* Selection counter */}
        <div className="flex items-center gap-4 mb-6 p-3 border border-[#252525] bg-[#111111]">
          <span className="font-mono text-xs text-[#888888]">SELECTED:</span>
          <span className="font-mono text-xl text-[#00ff41] font-bold">{selectedAreas.length}</span>
          <span className="font-mono text-xs text-[#444444]">/ {FOCUS_AREAS.length} AREAS</span>
          <div className="ml-auto flex items-center gap-2">
            {selectedAreas.length < 3 && (
              <span className="font-mono text-xs text-[#f59e0b]">
                SELECT {3 - selectedAreas.length} MORE TO CONTINUE
              </span>
            )}
            {selectedAreas.length >= 3 && (
              <span className="font-mono text-xs text-[#00ff41]">
                ✓ MINIMUM REACHED
              </span>
            )}
          </div>
        </div>

        {/* Focus areas by category */}
        <div className="space-y-6 mb-8">
          {Object.entries(groupedAreas).map(([category, areas]) => (
            <div key={category}>
              <div className="font-mono text-xs text-[#444444] mb-2 uppercase tracking-widest">
                {category.replace('-', ' ')}
              </div>
              <div className="flex flex-wrap gap-2">
                {areas.map((area) => {
                  const isSelected = selectedAreas.includes(area.slug)
                  const color = CATEGORY_COLORS[category] || '#888888'
                  return (
                    <button
                      key={area.slug}
                      onClick={() => toggleArea(area.slug)}
                      className="px-3 py-1.5 border font-mono text-xs transition-all"
                      style={{
                        borderColor: isSelected ? color : '#252525',
                        color: isSelected ? color : '#888888',
                        background: isSelected ? color + '15' : 'transparent',
                        boxShadow: isSelected ? `0 0 8px ${color}30` : 'none',
                      }}
                    >
                      {isSelected && '✓ '}{area.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected chips */}
        {selectedAreas.length > 0 && (
          <div className="mb-6 p-3 border border-[#252525] bg-[#111111]">
            <div className="font-mono text-xs text-[#444444] mb-2">YOUR FOCUS AREAS:</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedAreas.map((slug) => {
                const area = FOCUS_AREAS.find((fa) => fa.slug === slug)
                if (!area) return null
                const color = CATEGORY_COLORS[area.category] || '#888888'
                return (
                  <span
                    key={slug}
                    className="font-mono text-xs px-2 py-0.5 cursor-pointer hover:opacity-70"
                    style={{ color, borderColor: color + '44', border: '1px solid', background: color + '10' }}
                    onClick={() => toggleArea(slug)}
                  >
                    {area.label} ×
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 border border-[#ef444444] bg-[#ef44440a] p-3">
            <span className="font-mono text-xs text-[#ef4444]">ERROR: {error}</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || selectedAreas.length < 3}
          className="w-full bg-[#00ff41] text-[#0a0a0a] font-mono text-sm py-3 font-bold tracking-wider hover:bg-[#00dd38] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? 'SAVING PREFERENCES...' : 'LAUNCH INTELLIGENCE TERMINAL →'}
        </button>
      </div>
    </div>
  )
}
