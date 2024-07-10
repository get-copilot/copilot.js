import clsx from 'clsx'
import { useEffect } from 'react'
import { useCopilot } from '@copilotjs/react'
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom'
import { user, assistant } from './roles'

export default function MessagesPanel() {
  return (
    <ScrollToBottom
      className="flex-1 overflow-y-scroll"
      followButtonClassName="hidden"
      initialScrollBehavior="auto"
    >
      <MessagesList />
    </ScrollToBottom>
  )
}

function MessagesList() {
  const [sticky] = useSticky()
  const scrollToBottom = useScrollToBottom()

  const { state, messages } = useCopilot()

  // When state transitions to 'generating', scroll the message list to the bottom.
  useEffect(() => {
    if (state === 'generating' && !sticky) scrollToBottom()
  }, [state])

  return (
    <div className="flex flex-col gap-5 px-2.5 py-4">
      {/* Conversation between User and Assistant */}
      {messages.map((message, index) => (
        <Message key={message.id} message={message} />
      ))}
      {/* Message from Assistant, when busy */}
      {(state === 'generating' ||
        state === 'running' ||
        state === 'cancelling' ||
        state === 'resettingFromGenerating' ||
        state === 'resettingFromIdle') && <Message message={getBusyMessage(state)} />}
    </div>
  )
}

function getBodyFromMessage(message) {
  let body = ''
  message.content.forEach((part) => {
    if (part.type === 'text') {
      body += part.text
    }
  })
  return body
}

function Message({ message }) {
  return (
    <div className="flex flex-row">
      <div className="flex-none ml-1.5 mr-3 -mt-px">
        <SmallAvatar
          text={message.role === 'user' ? user.initials : assistant.initials}
          backgroundColor={message.role === 'user' ? user.color : assistant.color}
        />
      </div>

      <div className="flex-1">
        {/* Message sender */}
        <div className="font-semibold mb-0.5">
          {message.role === 'user' ? user.name : assistant.name}
        </div>

        {/* Message body */}
        <div className="whitespace-pre-wrap text-gray-700">{getBodyFromMessage(message)}</div>
      </div>
    </div>
  )
}

function getBusyMessage(state) {
  const textForState = {
    generating: 'Working...',
    running: 'Running...',
    cancelling: 'Cancelling...',
    resettingFromGenerating: 'Resetting...',
    resettingFromIdle: 'Resetting...',
  }
  return {
    role: 'assistant',
    content: [{ type: 'text', text: textForState[state] }],
  }
}

function SmallAvatar(props) {
  return (
    <span
      className={clsx(
        'inline-flex w-6 h-6 items-center justify-center rounded-full border border-black border-opacity-5',
        props.className
      )}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <span className="text-xs font-medium leading-none text-white">{props.text}</span>
    </span>
  )
}
