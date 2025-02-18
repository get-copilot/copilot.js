export type CopilotProps = Partial<{
  isOpen: boolean
  id: string
  className: string
  headerTitle: string
  welcomeTitle: string
  welcomePrompts: string[]
  userName: string
  userInitials: string
  userColor: string
  assistantName: string
  assistantInitials: string
  assistantColor: string
  enableUndo: boolean
  onClose: (event: CloseEvent) => void
  onUndo: (event: UndoEvent) => void
  onRedo: (event: RedoEvent) => void
}>

export type CloseEvent = { type: 'close'; data: any }
export type UndoEvent = { type: 'undo'; data: any }
export type RedoEvent = { type: 'redo'; data: any }

export const defaultCopilotProps: CopilotProps = {
  isOpen: true,
  id: undefined,
  className: undefined,
  headerTitle: 'Copilot',
  welcomeTitle: 'How can I help?',
  welcomePrompts: ['Where is zip code 80201?', 'Convert 1 pound to grams.'],
  userName: 'You',
  userInitials: 'Y',
  userColor: 'bg-zinc-700',
  assistantName: 'Copilot',
  assistantInitials: 'AI',
  assistantColor: 'bg-indigo-600',
  enableUndo: false,
  onClose: undefined,
  onUndo: undefined,
  onRedo: undefined,
}
