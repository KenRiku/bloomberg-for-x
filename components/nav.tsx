'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Nav() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navLinks = [
    { href: '/dashboard', label: 'BRIEFING' },
    { href: '/chat', label: 'RESEARCH' },
  ]

  return (
    <nav className="border-b border-[#252525] bg-[#0a0a0a] sticky top-0 z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-[#00ff41] font-mono text-sm font-bold tracking-widest green-glow">
              SCIFIND
            </span>
            <span className="text-[#444444] font-mono text-xs">TERMINAL</span>
          </Link>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41] pulse-green" />
            <span className="text-[#444444] font-mono text-xs">LIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-[#444444]" suppressHydrationWarning>
            {new Date().toISOString().slice(0, 10)}
          </span>
          {session?.user && (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#888888]">
                {session.user.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="font-mono text-xs text-[#444444] hover:text-[#ef4444] transition-colors"
              >
                [LOGOUT]
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nav links */}
      <div className="flex items-center px-4 h-9 gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-mono text-xs px-3 py-1 transition-colors ${
              pathname === link.href
                ? 'text-[#00ff41] border-b-2 border-[#00ff41]'
                : 'text-[#888888] hover:text-[#e8e8e8]'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="font-mono text-xs text-[#444444]">F1: HELP</span>
          <span className="text-[#252525]">|</span>
          <span className="font-mono text-xs text-[#444444]">F2: SEARCH</span>
          <span className="text-[#252525]">|</span>
          <span className="font-mono text-xs text-[#444444]">F3: EXPORT</span>
        </div>
      </div>
    </nav>
  )
}
