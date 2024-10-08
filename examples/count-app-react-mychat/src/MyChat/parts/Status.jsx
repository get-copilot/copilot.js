import { BoltIcon } from '@heroicons/react/24/outline'

export default function Status() {
  const status = 'idle'

  return (
    <div>
      {status === 'connecting' && (
        <div className="bbg-red-100 flex flex-row justify-center items-center px-2.5 py-2 text-gray-600">
          <BoltIcon className="w-5 h-5 mx-1" />
          <span className="text-sm">Copilot is connecting...</span>
        </div>
      )}
    </div>
  )
}
