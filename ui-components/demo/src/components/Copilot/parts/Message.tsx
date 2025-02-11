import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useStore } from '../store'
import { SmallAvatar } from './Avatars'

export function Message({ message, showToolbar = false }: { message: any; showToolbar?: boolean }) {
  const { userName, userInitials, userColor, assistantName, assistantInitials, assistantColor } = useStore()

  if (message.object === 'thread.message')
    return (
      <div className="flex flex-row">
        <div className="mr-2.5 flex-none">
          <SmallAvatar
            text={message.role === 'user' ? userInitials : assistantInitials}
            className={clsx('align-top', message.role === 'user' ? userColor : assistantColor)}
          />
        </div>

        <div className="flex-1">
          {/* Message sender */}
          <div className="text-sm/6 font-semibold">{message.role === 'user' ? userName : assistantName}</div>

          {/* Message body.
            To change the text style, use the `prose` classes in 
            https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#basic-usage
          */}
          <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Open links in a new tab.
                a: ({ node, ...rest }) => (
                  <a {...rest} target="_blank">
                    {rest.children}
                  </a>
                ),
                pre: ({ node, ...rest }) => (
                  <pre className="whitespace-pre-wrap" {...rest}>
                    {rest.children}
                  </pre>
                ),
              }}
            >
              {getBodyFromMessage(message)}
            </Markdown>
          </div>

          {/* Message toolbar */}
          {showToolbar && <MessageToolbar message={message} />}
        </div>
      </div>
    )

  if (message.object === 'thread.tool_calls' && message.status === 'in_progress')
    return (
      <div className="flex flex-row">
        <div className="mr-2.5 flex-none">
          <SmallAvatar text={assistantInitials} className={clsx('align-top', assistantColor)} />
        </div>

        <div className="flex-1">
          {/* Message sender */}
          <div className="text-sm/6 font-semibold">{assistantName}</div>

          {/* Message body */}
          <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">Working...</div>
        </div>
      </div>
    )
}

function getBodyFromMessage(message: any) {
  const body = message.content.reduce((body, part) => {
    if (part.type === 'text') body += part.text.value ?? part.text
    return body
  }, '')
  return message.status === 'in_progress' ? body + '●' : body
}

function MessageToolbar({ message, className }: { message: any; className?: string }) {
  const { enableUndo } = useStore()
  return (
    <div className={clsx(className, 'mt-0.5 -ml-1 flex flex-row gap-1')}>
      {enableUndo && <UndoRedoButton message={message} />}
    </div>
  )
}

function UndoRedoButton({ message }: { message: any }) {
  const { onUndo, onRedo } = useStore()
  return (
    <>
      {message.isUndoable && (
        <button
          onClick={() => onUndo?.({ type: 'undo', data: {} })}
          className="flex-none text-zinc-400 hover:text-black dark:text-zinc-600 dark:hover:text-white"
        >
          <ArrowUturnLeftIcon className="m-1 size-4" />
        </button>
      )}

      {message.isRedoable && (
        <button
          onClick={() => onRedo?.({ type: 'redo', data: {} })}
          className="flex-none text-zinc-400 hover:text-black dark:text-zinc-600 dark:hover:text-white"
        >
          <ArrowUturnRightIcon className="m-1 size-4" />
        </button>
      )}
    </>
  )
}
