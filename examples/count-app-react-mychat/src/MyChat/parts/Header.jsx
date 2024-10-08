import { useCopilot } from '@copilotjs/react'
import { XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { useStore } from '../store'

export default function Header() {
  const { setIsOpen, isResetting, setIsResetting } = useStore()
  const { createAndSelectThread } = useCopilot()

  return (
    <div className="flex-none flex flex-row justify-between border-b">
      {/* Close button */}
      <button
        onClick={() => setIsOpen(false)}
        className="flex-none hover:bg-gray-100 disabled:opacity-10 "
      >
        <XMarkIcon className="w-5 h-5 mx-3 my-3.5" />
      </button>

      {/* Title */}
      <div className="flex-none text-center flex flex-col justify-center text-base font-medium">
        Copilot
      </div>

      {/* Reset button */}
      <button
        onClick={async () => {
          setIsResetting(true)
          await createAndSelectThread()
          setIsResetting(false)
        }}
        disabled={isResetting}
        className="flex-none hover:bg-gray-100 disabled:opacity-10"
      >
        <DocumentIcon className="w-5 h-5 mx-3 my-3.5" />
      </button>
    </div>
  )
}
