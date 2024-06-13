import clsx from 'clsx'
import { useCopilot } from '@copilotjs/react'
import { useStore } from './store'
import Header from './parts/Header'
import Footer from './parts/Footer'
import WelcomePanel from './parts/WelcomePanel'
import MessagesPanel from './parts/MessagesPanel'
import Status from './parts/Status'

export default function MyChat({ className }) {
  const { isOpen } = useStore()
  const { messages } = useCopilot()

  return (
    <>
      <div
        className={clsx(
          isOpen ? '' : 'hidden',
          'h-[520px] w-[320px] flex flex-col bg-white',
          className
        )}
      >
        <Header />
        {messages.length === 0 ? <WelcomePanel /> : <MessagesPanel />}
        <Status />
        <Footer />
      </div>
    </>
  )
}
