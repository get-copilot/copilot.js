import { useCopilot } from '@copilotjs/react'
import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useStore } from '../store'

export function Header() {
  const { createAndSelectThread } = useCopilot()
  const { onClose, isResetting, setIsResetting, headerTitle } = useStore()

  return (
    <div className="flex flex-none flex-row justify-between border-b border-zinc-200 dark:border-zinc-800">
      {/* Close button */}
      <button
        onClick={() => onClose?.({ type: 'close', data: {} })}
        className="flex-none hover:bg-zinc-100 disabled:opacity-10 dark:hover:bg-zinc-900"
      >
        <XMarkIcon className="m-3 size-5" />
      </button>

      {/* Title */}
      <div className="flex flex-none flex-col justify-center text-center text-[15px] font-medium">{headerTitle}</div>

      {/* Reset button */}
      <button
        onClick={async () => {
          setIsResetting(true)
          await createAndSelectThread()
          setIsResetting(false)
        }}
        disabled={isResetting}
        className="flex-none hover:bg-zinc-100 disabled:opacity-10 dark:hover:bg-zinc-900"
      >
        <DocumentIcon className="m-3 size-5" />
      </button>
    </div>
  )
}
