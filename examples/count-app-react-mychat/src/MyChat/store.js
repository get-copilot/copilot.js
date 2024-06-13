import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // The visibility state of the copilot.
  isOpen: true,

  setIsOpen: (isOpen) => {
    set({ isOpen: isOpen })
  },

  // Draft of the user prompt.
  draft: '',

  setDraft: (draft) => {
    set({ draft: draft })
  },
}))
