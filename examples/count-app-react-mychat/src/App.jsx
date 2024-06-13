import { useState } from 'react'
import { CopilotProvider } from '@copilotjs/react'
import MyChat from './MyChat'
import Button from './Button'

export default function App() {
  // Counter state
  const [count, setCount] = useState(0)
  // Counter API
  const increment = () => setCount((count) => count + 1)
  const decrement = () => setCount((count) => count - 1)

  return (
    <>
      {/* Counter UI */}
      <div className="flex flex-row bg-white">
        <Button onClick={decrement}>－</Button>
        <span className="flex flex-row items-center justify-center w-20 text-2xl">{count}</span>
        <Button onClick={increment}>＋</Button>
      </div>

      {/* Headless provider and custom copilot UI */}
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
          state: {
            count: count,
          },
        }}
      >
        <MyChat className="mt-12" />
      </CopilotProvider>
    </>
  )
}
