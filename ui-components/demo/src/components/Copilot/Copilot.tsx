'use client'

import { useCopilot } from '@copilotjs/react'
import clsx from 'clsx'
import { Conversation } from './parts/Conversation'
import { Footer } from './parts/Footer'
import { Header } from './parts/Header'
import { Status } from './parts/Status'
import { Welcome } from './parts/Welcome'
import { type CopilotProps, defaultCopilotProps } from './props'
import { StoreProvider } from './store'

export function Copilot(props: CopilotProps) {
  const propsWithDefaults = { ...defaultCopilotProps, ...props }
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
