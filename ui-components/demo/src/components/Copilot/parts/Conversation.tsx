import { useCopilot } from '@copilotjs/react'
import { useEffect, useMemo, useRef } from 'react'
import { Message } from './Message'

export function Conversation() {
  const { messages, status } = useCopilot()
  const scrollableRef = useRef(null)

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

  // When messages change, scroll to the bottom of conversation.
  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight
    }
  }, [paddedMessages])

  return (
    <div ref={scrollableRef} className="flex-1 overflow-y-scroll">
      <div className="flex flex-col gap-4 px-3 py-4">
        {paddedMessages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            showToolbar={
              index === paddedMessages.length - 1 &&
              message.object === 'thread.message' &&
              message.role === 'assistant' &&
              message.status === 'completed'
            }
          />
        ))}
      </div>
    </div>
  )
}
