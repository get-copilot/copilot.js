import React, { createContext, useContext, useState } from 'react'
import { type CopilotProps } from './props'

type Store = {
  isResetting: boolean
  setIsResetting: (value: boolean) => void
  draft: string
  setDraft: (value: string) => void
} & CopilotProps

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children, ...props }: { children: React.ReactNode } & CopilotProps) {
  const [isResetting, setIsResetting] = useState(false)
  const [draft, setDraft] = useState('')

  const store: Store = {
    isResetting,
    setIsResetting,
    draft,
    setDraft,
    ...props,
  }
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used within a StoreProvider')
  return store
}
