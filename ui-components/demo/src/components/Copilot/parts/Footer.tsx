import { useCopilot } from '@copilotjs/react'
import { ArrowUpCircleIcon, StopCircleIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useStore } from '../store'

export function Footer() {
  const { isReady, status, prompt, cancel } = useCopilot()
  const { isResetting, draft, setDraft } = useStore()

  // When certain status transitions occur, focus the textarea
  // so the user can start typing immediately.
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (status === 'working' || status === 'cancelling') {
      textareaRef.current?.focus()
    }
  }, [status])

  useEffect(() => {
    if (isResetting) textareaRef.current?.focus()
  }, [isResetting])

  function submitDraft() {
    const canSubmit = status === 'idle' && draft !== ''
    if (canSubmit) {
      prompt(draft)
      setDraft('')
    }
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitDraft()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault()
      setDraft(draft + '\n')
    }
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault()
      submitDraft()
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-none flex-row items-end border-t border-zinc-200 dark:border-zinc-800"
    >
      {/* Prompt textarea */}
      <TextareaAutosize
        ref={textareaRef}
        minRows={1}
        maxRows={8}
        placeholder="Enter message..."
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="flex-1 resize-none border-0 bg-white py-3 pr-1 pl-3 text-sm/5 placeholder:text-zinc-400 focus:ring-0 dark:bg-zinc-950 dark:placeholder:text-zinc-600"
      />

      {/* Send button */}
      {status === 'idle' && (
        <button
          type="submit"
          disabled={!isReady || (status === 'idle' && draft === '')}
          className="flex-none disabled:opacity-10"
        >
          <ArrowUpCircleIcon className="m-2 size-7" />
        </button>
      )}

      {/* Cancel button */}
      {(status === 'working' || status === 'cancelling') && (
        <button
          type="button"
          onClick={() => cancel()}
          disabled={status === 'cancelling'}
          className="flex-none disabled:opacity-10"
        >
          <StopCircleIcon className="m-2 size-7" />
        </button>
      )}
    </form>
  )
}
