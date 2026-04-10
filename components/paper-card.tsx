'use client'

import { useState } from 'react'
import { PaperDetailModal } from './paper-detail-modal'

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

interface PaperCardProps {
  item: BriefingItem
  index: number
}

function getScoreColor(score: number) {
  if (score >= 0.5) return '#00ff41'
  if (score >= 0.3) return '#f59e0b'
  return '#888888'
}

function getSourceBadge(source: string) {
  if (source === 'pubmed') return { label: 'PUBMED', color: '#3b82f6' }
  if (source === 'arxiv') return { label: 'ARXIV', color: '#f59e0b' }
  return { label: source.toUpperCase(), color: '#888888' }
}

export function PaperCard({ item, index }: PaperCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { paper } = item
  const scoreColor = getScoreColor(item.relevanceScore)
  const sourceBadge = getSourceBadge(paper.source)
  const publishedDate = new Date(paper.publishedDate)
  const metadata = paper.metadata as any
  const tags: string[] = metadata?.tags || []

  return (
    <>
      <div
        className="paper-card bg-[#111111] p-4 cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono text-xs text-[#444444]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="font-mono text-xs px-1.5 py-0.5 border"
              style={{ color: sourceBadge.color, borderColor: sourceBadge.color + '44' }}
            >
              {sourceBadge.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#444444]">
              REL
            </span>
            <span
              className="font-mono text-sm font-bold"
              style={{ color: scoreColor }}
            >
              {(item.relevanceScore * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[#e8e8e8] text-sm font-medium leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2">
          {paper.title}
        </h3>

        {/* Authors & journal */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-mono text-xs text-[#888888]">
            {paper.authors?.slice(0, 3).join(', ')}
            {paper.authors?.length > 3 ? ' et al.' : ''}
          </span>
          {paper.journal && (
            <>
              <span className="text-[#252525]">·</span>
              <span className="font-mono text-xs text-[#f59e0b]">{paper.journal}</span>
            </>
          )}
          <span className="text-[#252525]">·</span>
          <span className="font-mono text-xs text-[#444444]">
            {publishedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* AI Summary */}
        {paper.aiSummary && (
          <p className="text-[#888888] text-xs leading-relaxed mb-3 line-clamp-2">
            {paper.aiSummary}
          </p>
        )}

        {/* Tags & relevance */}
        <div className="flex items-center gap-2 flex-wrap">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-1.5 py-0.5 border border-[#252525] text-[#444444]"
            >
              {tag}
            </span>
          ))}
          {item.relevanceExplanation && (
            <span className="font-mono text-xs text-[#444444] ml-auto">
              {item.relevanceExplanation}
            </span>
          )}
        </div>

        {/* Hover indicator */}
        <div className="mt-2 pt-2 border-t border-[#1a1a1a] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="font-mono text-xs text-[#00ff41]">CLICK TO EXPAND</span>
          <span className="font-mono text-xs text-[#444444]">{paper.url.slice(0, 40)}...</span>
        </div>
      </div>

      <PaperDetailModal
        paper={paper}
        item={item}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
