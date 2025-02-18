'use client'

import { Button } from '@/components/Button'
import { Copilot } from '@/components/Copilot'
import { CopilotProvider } from '@copilotjs/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function App() {
  // Counter state and API
  const [count, setCount] = useState(0)
  const increment = () => setCount((count) => count + 1)
  const decrement = () => setCount((count) => count - 1)

  // Copilot state
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Counter UI */}
      <div className="hidden1 flex flex-row border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
        <Button onClick={decrement}>
          <MinusIcon className="mx-3 my-3 h-5 w-5" />
        </Button>
        <span className="flex w-20 flex-row items-center justify-center border-r border-l border-zinc-200 text-xl/7 dark:border-zinc-800">
          {count}
        </span>
        <Button onClick={increment}>
          <PlusIcon className="mx-3 my-3 h-5 w-5" />
        </Button>
      </div>

      {/* Headless provider and custom copilot UI */}
      <CopilotProvider
        copilotId={process.env.NEXT_PUBLIC_COPILOT_ID}
        userId="u"
        companyId="c"
        context={{
          actions: {
            increment: increment,
            decrement: decrement,
          },
          actionTypes: `
            type increment = () => void
            type decrement = () => void
          `,
        }}
      >
        <Copilot isOpen={isOpen} onClose={() => setIsOpen(false)} className="mt-12 h-[620px] w-[380px]" />
      </CopilotProvider>
    </>
  )
}
