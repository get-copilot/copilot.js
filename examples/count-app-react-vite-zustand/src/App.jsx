import { create } from 'zustand'
import { CopilotProvider, CopilotChat } from '@copilotjs/react'

import '@copilotjs/styles/default.css'
import './App.css'

const useStore = create((set, get) => ({
  // Counter state
  count: 0,
  // Counter API
  increment: () => set({ count: get().count + 1 }),
  decrement: () => set({ count: get().count - 1 }),
}))

export default function App() {
  const store = useStore()
  return (
    <>
      <div id="counter">
        <button onClick={store.decrement}>－</button>
        <span>{store.count}</span>
        <button onClick={store.increment}>＋</button>
      </div>

      <CopilotProvider
        appId="paste-your-app-id-here"
        userId="u"
        companyId="c"
        context={{
          actions: {
            increment: store.increment,
            decrement: store.decrement,
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
