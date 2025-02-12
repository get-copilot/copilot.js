import { useCopilot } from '@copilotjs/react'
import { useStore } from '../store'
import { LargeAvatar } from './Avatars'

export function Welcome() {
  const { status, prompt } = useCopilot()
  const { setDraft, welcomeTitle, welcomePrompts, assistantInitials, assistantColor } = useStore()

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex flex-col">
          {/* Assistant avatar */}
          <div className="flex flex-row justify-center px-5 py-2">
            <LargeAvatar text={assistantInitials} className={assistantColor} />
          </div>

          {/* Title */}
          <div className="px-5 py-2 text-center text-2xl/8 font-medium">{welcomeTitle}</div>
        </div>
      </div>

      {/* Example prompts */}
      <div className="flex flex-col gap-3 px-5 py-6 text-sm/5 text-zinc-600 dark:text-zinc-400">
        {welcomePrompts.map((text: string, index: number) => (
          <button
            key={index}
            onClick={() => {
              prompt(text)
              setDraft('')
            }}
            disabled={!(status === 'idle')}
            className="rounded-lg border border-zinc-200 px-3 py-2.5 text-left hover:bg-zinc-100 disabled:opacity-10 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}
