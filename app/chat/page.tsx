import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Nav } from '@/components/nav'
import { ChatInterface } from './chat-interface'

export default async function ChatPage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Nav />
      <ChatInterface userName={session.user.name || session.user.email || 'ANALYST'} />
    </div>
  )
}
