import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // The visibility state of the copilot.
  isOpen: true,
  setIsOpen: (isOpen) => set({ isOpen }),

  // Is the conversation being reset.
  isResetting: false,
  setIsResetting: (isResetting) => set({ isResetting }),

  // Draft of the user prompt.
  draft: '',
  setDraft: (draft) => set({ draft }),
}))
