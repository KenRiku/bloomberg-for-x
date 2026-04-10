'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

const SUGGESTED_QUERIES = [
  'What are the latest breakthroughs in GLP-1 receptor agonists?',
  'Compare CRISPR-Cas9 and base editing approaches for gene therapy',
  'What does the AlphaFold3 paper mean for drug discovery timelines?',
  'Summarize the quantum computing milestones from the past year',
  'How does the gut microbiome affect cancer immunotherapy response?',
  'What is the state of solid-state battery commercialization?',
]

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

interface ChatInterfaceProps {
  userName: string
}

export function ChatInterface({ userName }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | undefined>()
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(
    async (messageText: string) => {
      if (!messageText.trim() || isLoading) return

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: messageText,
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setIsLoading(true)

      const assistantId = crypto.randomUUID()
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '', createdAt: new Date() },
      ])

      try {
        abortRef.current = new AbortController()
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: messageText, conversationId }),
          signal: abortRef.current.signal,
        })

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const convId = res.headers.get('X-Conversation-Id')
        if (convId && !conversationId) {
          setConversationId(convId)
        }

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) throw new Error('No response body')

        let fullContent = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('0:')) {
              try {
                const jsonStr = line.slice(2)
                const parsed = JSON.parse(jsonStr)
                if (typeof parsed === 'string') {
                  fullContent += parsed
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId ? { ...m, content: fullContent } : m
                    )
                  )
                }
              } catch {
                // parse error, skip
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: 'An error occurred while processing your request. Please try again.',
                  }
                : m
            )
          )
        }
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, conversationId]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestionClick = (query: string) => {
    setInput(query)
    inputRef.current?.focus()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4">
      {/* Header */}
      <div className="border border-[#252525] bg-[#111111] p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41] pulse-green" />
          <span className="font-mono text-xs text-[#888888]">SCIFIND RESEARCH ASSISTANT</span>
          {isLoading && (
            <span className="font-mono text-xs text-[#f59e0b]">PROCESSING...</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#444444]">
            MODEL: claude-opus-4-5
          </span>
          <span className="font-mono text-xs text-[#444444]">
            ANALYST: {userName.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 border border-[#252525] bg-[#0a0a0a] overflow-y-auto mb-4 min-h-[400px] max-h-[calc(100vh-320px)]">
        {messages.length === 0 ? (
          <div className="p-8">
            <div className="mb-8 text-center">
              <div className="font-mono text-xs text-[#444444] mb-4 tracking-widest">
                SCIFIND RESEARCH TERMINAL — READY
              </div>
              <p className="text-[#888888] text-sm">
                Ask me anything about recent scientific research. I will search the database and provide
                analyst-grade insights with citations.
              </p>
            </div>

            {/* Suggested queries */}
            <div>
              <div className="font-mono text-xs text-[#444444] mb-3">SUGGESTED QUERIES:</div>
              <div className="space-y-2">
                {SUGGESTED_QUERIES.map((query, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(query)}
                    className="w-full text-left border border-[#1a1a1a] bg-[#111111] px-3 py-2 hover:border-[#252525] hover:bg-[#1a1a1a] transition-all group"
                  >
                    <span className="font-mono text-xs text-[#444444] mr-2">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-[#888888] text-xs group-hover:text-[#e8e8e8] transition-colors">
                      {query}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-6 h-6 border border-[#00ff4144] bg-[#00ff4110] flex items-center justify-center mt-0.5">
                    <span className="font-mono text-xs text-[#00ff41]">AI</span>
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`p-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#1a1a1a] border border-[#252525] text-[#e8e8e8]'
                        : 'bg-[#111111] border border-[#252525] text-[#e8e8e8]'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="space-y-2">
                        {msg.content === '' && isLoading ? (
                          <span className="font-mono text-xs text-[#00ff41] blink-cursor">ANALYZING</span>
                        ) : (
                          msg.content.split('\n').map((line, i) => {
                            if (!line.trim()) return <div key={i} className="h-1" />
                            const parts = line.split(/(\[\d+\])/g)
                            return (
                              <p key={i} className="text-sm leading-relaxed">
                                {parts.map((part, j) =>
                                  /\[\d+\]/.test(part) ? (
                                    <span
                                      key={j}
                                      className="font-mono text-xs text-[#3b82f6] border border-[#3b82f644] px-0.5 mx-0.5"
                                    >
                                      {part}
                                    </span>
                                  ) : (
                                    part
                                  )
                                )}
                              </p>
                            )
                          })
                        )}
                      </div>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                  <div className="font-mono text-xs text-[#444444] mt-1 px-1">
                    {msg.role === 'user' ? 'YOU' : 'SCIFIND'} · {formatTime(msg.createdAt)}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="flex-shrink-0 w-6 h-6 border border-[#252525] bg-[#1a1a1a] flex items-center justify-center mt-0.5">
                    <span className="font-mono text-xs text-[#888888]">U</span>
                  </div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="border border-[#252525] bg-[#111111] flex items-center focus-within:border-[#00ff41] transition-colors">
          <span className="font-mono text-xs text-[#00ff41] px-3 flex-shrink-0">›</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent py-3 pr-3 text-sm text-[#e8e8e8] font-mono focus:outline-none placeholder:text-[#333333]"
            placeholder="Ask about recent research, trends, or specific papers..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 px-4 py-3 font-mono text-xs text-[#0a0a0a] bg-[#00ff41] hover:bg-[#00dd38] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isLoading ? 'WAIT' : 'SEND'}
          </button>
        </div>
        <div className="flex items-center justify-between mt-1 px-1">
          <span className="font-mono text-xs text-[#252525]">
            RAG-ENHANCED · REAL-TIME PAPER SEARCH
          </span>
          <span className="font-mono text-xs text-[#252525]">
            {input.length}/2000
          </span>
        </div>
      </form>
    </div>
  )
}
