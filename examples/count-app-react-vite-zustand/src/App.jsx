import Copilot from '@copilotjs/react'
import { create } from 'zustand'
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

      <Copilot
        id="copilot"
        appId="your-app-id-here"
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
        appearance={{
          welcomePrompts: ['Increment the count.', 'Add 5 to the count.'],
        }}
      />
    </>
  )
}
