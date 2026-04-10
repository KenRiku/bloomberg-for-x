'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Signup failed')
        return
      }

      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/onboarding',
        redirect: true,
      })
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 scanlines relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] pulse-green" />
            <span className="font-mono text-2xl font-bold text-[#00ff41] green-glow tracking-widest">
              SCIFIND
            </span>
          </div>
          <p className="font-mono text-xs text-[#444444] tracking-wider">
            SCIENTIFIC INTELLIGENCE TERMINAL
          </p>
        </div>

        {/* Signup card */}
        <div className="border border-[#252525] bg-[#111111] p-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#1a1a1a]">
            <span className="font-mono text-xs text-[#888888]">NEW ACCOUNT</span>
            <span className="font-mono text-xs text-[#444444]">v2.4.1</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-[#888888] mb-1.5">
                DISPLAY NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full terminal-input px-3 py-2 text-sm"
                placeholder="Dr. Jane Smith"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-[#888888] mb-1.5">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full terminal-input px-3 py-2 text-sm"
                placeholder="analyst@institution.edu"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-[#888888] mb-1.5">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full terminal-input px-3 py-2 text-sm"
                placeholder="Min. 8 characters"
                required
                minLength={8}
                disabled={loading}
              />
            </div>

            {error && (
              <div className="border border-[#ef444444] bg-[#ef44440a] p-2">
                <span className="font-mono text-xs text-[#ef4444]">ERROR: {error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00ff41] text-[#0a0a0a] font-mono text-sm py-2.5 font-bold tracking-wider hover:bg-[#00dd38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#1a1a1a] text-center">
            <span className="font-mono text-xs text-[#444444]">EXISTING USER? </span>
            <Link
              href="/login"
              className="font-mono text-xs text-[#00ff41] hover:underline"
            >
              SIGN IN
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-1">
          <span className="font-mono text-xs text-[#252525]">REG/AUTH</span>
          <span className="font-mono text-xs text-[#252525]">TLS 1.3 ENCRYPTED</span>
          <span className="font-mono text-xs text-[#252525]">READY</span>
        </div>
      </div>
    </div>
  )
}
