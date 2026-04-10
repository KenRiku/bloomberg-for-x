'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

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

interface PaperDetailModalProps {
  paper: Paper
  item: BriefingItem
  isOpen: boolean
  onClose: () => void
}

function getSourceBadge(source: string) {
  if (source === 'pubmed') return { label: 'PUBMED', color: '#3b82f6' }
  if (source === 'arxiv') return { label: 'ARXIV', color: '#f59e0b' }
  return { label: source.toUpperCase(), color: '#888888' }
}

export function PaperDetailModal({ paper, item, isOpen, onClose }: PaperDetailModalProps) {
  const sourceBadge = getSourceBadge(paper.source)
  const publishedDate = new Date(paper.publishedDate)
  const metadata = paper.metadata as any
  const tags: string[] = metadata?.tags || []
  const category: string = metadata?.category || ''

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-[#111111] border border-[#252525] text-[#e8e8e8] p-0 overflow-hidden">
        {/* Header */}
        <div className="border-b border-[#252525] p-4">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="font-mono text-xs px-1.5 py-0.5 border"
              style={{ color: sourceBadge.color, borderColor: sourceBadge.color + '44' }}
            >
              {sourceBadge.label}
            </span>
            {item.isCrossFieldSpark && (
              <span className="font-mono text-xs px-1.5 py-0.5 border border-[#f59e0b44] text-[#f59e0b]">
                CROSS-FIELD SPARK
              </span>
            )}
            <span className="font-mono text-xs text-[#00ff41] ml-auto">
              REL: {(item.relevanceScore * 100).toFixed(0)}%
            </span>
          </div>
          <DialogHeader>
            <DialogTitle className="text-[#e8e8e8] text-base font-medium leading-snug text-left pr-8">
              {paper.title}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-4 overflow-y-auto max-h-[70vh]">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
            <div>
              <span className="text-[#444444]">AUTHORS</span>
              <p className="text-[#888888] mt-1">{paper.authors?.join(', ')}</p>
            </div>
            <div>
              <span className="text-[#444444]">JOURNAL</span>
              <p className="text-[#f59e0b] mt-1">{paper.journal || paper.source}</p>
            </div>
            <div>
              <span className="text-[#444444]">PUBLISHED</span>
              <p className="text-[#888888] mt-1">
                {publishedDate.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <span className="text-[#444444]">CATEGORY</span>
              <p className="text-[#888888] mt-1 uppercase">{category}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 border border-[#252525] text-[#888888]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* AI Summary */}
          {paper.aiSummary && (
            <div className="mb-4 p-3 border border-[#00ff4120] bg-[#00ff410a]">
              <div className="font-mono text-xs text-[#00ff41] mb-2">AI ANALYST SUMMARY</div>
              <p className="text-[#e8e8e8] text-sm leading-relaxed">{paper.aiSummary}</p>
            </div>
          )}

          {/* Abstract */}
          <div className="mb-4">
            <div className="font-mono text-xs text-[#444444] mb-2">ABSTRACT</div>
            <p className="text-[#888888] text-sm leading-relaxed">{paper.abstract}</p>
          </div>

          {/* Relevance */}
          {item.relevanceExplanation && (
            <div className="mb-4 p-3 border border-[#252525] bg-[#0a0a0a]">
              <div className="font-mono text-xs text-[#444444] mb-1">WHY THIS PAPER</div>
              <p className="text-[#888888] text-xs">{item.relevanceExplanation}</p>
            </div>
          )}

          {/* External link */}
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
          >
            VIEW SOURCE →
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
