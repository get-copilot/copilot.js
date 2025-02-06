import { createContext, useContext, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children, ...props }) {
  const [isResetting, setIsResetting] = useState(false)
  const [draft, setDraft] = useState('')

  const store = {
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
  return store
}
