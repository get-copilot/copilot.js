import { useCopilot } from '@copilotjs/react'
import { BoltIcon } from '@heroicons/react/24/outline'

export function Status() {
  const { isReady } = useCopilot()

  return (
    <div>
      {!isReady && (
        <div className="flex flex-row items-center justify-center px-2.5 py-2 text-zinc-600 dark:text-zinc-400">
          <BoltIcon className="mx-1 h-5 w-5" />
          <span className="text-sm/5">Copilot is connecting...</span>
        </div>
      )}
    </div>
  )
}
