'use client'

import { useCopilot } from '@copilotjs/react'
import clsx from 'clsx'
import { Conversation } from './parts/Conversation'
import { Footer } from './parts/Footer'
import { Header } from './parts/Header'
import { Status } from './parts/Status'
import { Welcome } from './parts/Welcome'
import { StoreProvider } from './store'

type CopilotProps = {
  isOpen: boolean
  id: string
  className: string
  headerTitle: string
  welcomeTitle: string
  welcomePrompts: string[]
  userName: string
  userInitials: string
  userColor: string
  assistantName: string
  assistantInitials: string
  assistantColor: string
  enableUndo: boolean
  onClose: (event) => void
  onUndo: (event) => void
  onRedo: (event) => void
}

const defaultProps: CopilotProps = {
  isOpen: true,
  id: undefined,
  className: undefined,
  headerTitle: 'Copilot',
  welcomeTitle: 'How can I help?',
  welcomePrompts: ['Where is zip code 80201?', 'Convert 1 pound to grams.'],
  userName: 'You',
  userInitials: 'Y',
  userColor: 'bg-zinc-700',
  assistantName: 'Copilot',
  assistantInitials: 'AI',
  assistantColor: 'bg-indigo-600',
  enableUndo: false,
  onClose: undefined,
  onUndo: undefined,
  onRedo: undefined,
}

export function Copilot(props: CopilotProps) {
  const propsWithDefaults = { ...defaultProps, ...props }
  const { messages } = useCopilot()

  return (
    <StoreProvider {...propsWithDefaults}>
      <div
        id={propsWithDefaults.id}
        className={clsx(
          'flex flex-col border border-zinc-200 bg-white font-sans text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100',
          propsWithDefaults.isOpen ? '' : 'hidden',
          propsWithDefaults.className,
        )}
      >
        <Header />
        {messages.length === 0 ? <Welcome /> : <Conversation />}
        <Status />
        <Footer />
      </div>
    </StoreProvider>
  )
}
