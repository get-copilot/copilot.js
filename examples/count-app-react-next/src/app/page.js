'use client'
import { useState } from 'react'
import { CopilotProvider, CopilotChat } from '@copilotjs/react'

import '@copilotjs/styles/default.css'
import './page.css'

export default function App() {
  // Counter state
  const [count, setCount] = useState(0)
  // Counter API
  const increment = () => setCount((count) => count + 1)
  const decrement = () => setCount((count) => count - 1)

  return (
    <>
      <div id="counter">
        <button onClick={decrement}>－</button>
        <span>{count}</span>
        <button onClick={increment}>＋</button>
      </div>

      <CopilotProvider
        appId="paste-your-app-id-here"
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
        <CopilotChat
          id="copilot"
          appearance={{
            welcomePrompts: ['Increment the count.', 'Add 3 to the count.'],
          }}
        />
      </CopilotProvider>
    </>
  )
}
