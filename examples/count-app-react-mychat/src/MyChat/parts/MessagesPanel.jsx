import clsx from 'clsx'
import { useEffect, useMemo } from 'react'
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
  const { status, messages } = useCopilot()

  // When status transitions to 'working', scroll the message list to the bottom.
  useEffect(() => {
    if (status === 'working' && !sticky) scrollToBottom()
  }, [status])

  // Pad the messages with a busy assistant message, if needed.
  const paddedMessages = useMemo(() => {
    const emptyAssistantMessage = {
      status: 'in_progress',
      id: 'msg_busy',
      object: 'thread.message',
      role: 'assistant',
      content: [{ type: 'text', text: { value: '' } }],
    }
    const lastMessage = messages.at(-1)
    const paddingIsNeeded =
      status === 'working' &&
      lastMessage &&
      ((lastMessage.object === 'thread.message' && lastMessage.role === 'user') ||
        (lastMessage.object === 'thread.tool_calls' && lastMessage.status !== 'in_progress'))
    return paddingIsNeeded ? [...messages, emptyAssistantMessage] : messages
  }, [messages, status])

  return (
    <div className="flex flex-col gap-5 px-2.5 py-4">
      {paddedMessages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}

function getBodyFromMessage(message) {
  let body = ''
  message.content.forEach((part) => {
    if (part.type === 'text') {
      body += part.text.value ?? part.text
    }
  })
  return body
}

function Message({ message }) {
  if (message.object === 'thread.message')
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
          <div className="whitespace-pre-wrap text-gray-700">
            {getBodyFromMessage(message)}
            {message.status === 'in_progress' && '●'}
          </div>
        </div>
      </div>
    )

  if (message.object === 'thread.tool_calls' && message.status === 'in_progress')
    return (
      <div className="flex flex-row">
        <div className="flex-none ml-1.5 mr-3 -mt-px">
          <SmallAvatar text={assistant.initials} backgroundColor={assistant.color} />
        </div>

        <div className="flex-1">
          {/* Message sender */}
          <div className="font-semibold mb-0.5">{assistant.name}</div>

          {/* Message body */}
          <div className="whitespace-pre-wrap text-gray-700">Working...</div>
        </div>
      </div>
    )
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
