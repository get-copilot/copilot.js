import clsx from 'clsx'
import { useCopilot } from '@copilotjs/react'
import { useStore } from '../store'
import { assistant } from './roles'

const welcomePrompts = ['Increment the count.', 'Add 3 to the count.']

export default function WelcomePanel() {
  const { setDraft } = useStore()
  const { state, prompt } = useCopilot()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col">
          {/* Assistant avatar */}
          <div className="flex flex-row justify-center px-5 py-2">
            <LargeAvatar
              text={assistant.initials}
              backgroundColor={assistant.color}
              className="flex-none"
            />
          </div>

          {/* Title */}
          <div className="text-center mt-0 px-5 py-2 text-2xl font-medium">How can I help?</div>
        </div>
      </div>

      {/* Example prompts */}
      <div className="flex flex-col gap-3 px-4 py-6 text-sm text-gray-700">
        {welcomePrompts.map((text, index) => (
          <button
            key={index}
            onClick={() => {
              prompt(text)
              setDraft('')
            }}
            disabled={!(state === 'idle')}
            className="text-left px-3 py-3 border rounded-lg disabled:opacity-10 hover:bg-gray-100"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}

function LargeAvatar(props) {
  return (
    <span
      className={clsx(
        'inline-flex w-14 h-14 items-center justify-center rounded-full border border-black border-opacity-5',
        props.className
      )}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <span className="text-2xl font-medium leading-none text-white">{props.text}</span>
    </span>
  )
}
