import type { Metadata } from 'next'
import { JetBrains_Mono, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SciFind — Scientific Intelligence Terminal',
  description: 'Bloomberg-style scientific intelligence platform for researchers and investors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${dmSerifDisplay.variable}`}>
      <body className="bg-[#0a0a0a] text-[#e8e8e8] antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
