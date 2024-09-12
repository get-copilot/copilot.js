import React, { useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useCopilot } from '@copilotjs/react'
import { ArrowUpCircleIcon, StopCircleIcon } from '@heroicons/react/24/solid'
import { useStore } from '../store'

export default function Footer() {
  const { isOpen, draft, setDraft } = useStore()
  const { status, prompt, cancel } = useCopilot()

  // When certain status transitions occur, focus the textarea
  // so the user can start typing immediately.
  const textareaRef = React.useRef(null)
  useEffect(() => {
    if (status === 'working' || status === 'resetting' || status === 'cancelling') {
      textareaRef.current?.focus()
    }
  }, [status])

  // When the Copilot opens, auto-focus the input area, so the user can
  // start typing immediately.
  useEffect(() => {
    textareaRef.current?.focus()
  }, [isOpen])

  function submitDraft() {
    const canSubmit = status === 'idle' && draft !== ''
    if (canSubmit) {
      prompt(draft)
      setDraft('')
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    submitDraft()
  }

  function handleKeyDown(event) {
    // Handle: Shift + Enter
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      setDraft(draft + '\n')
    }

    // Handle: Enter
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitDraft()
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex-none flex flex-row items-end border-t">
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
        className="flex-1 resize-none border-0 pl-3.5 pr-2 py-3 focus:ring-0 placeholder:text-gray-400"
      />

      {/* Send button */}
      {(status === 'idle' || status === 'resetting' || status === 'connecting') && (
        <button
          type="submit"
          disabled={
            (status === 'idle' && draft === '') || status === 'resetting' || status === 'connecting'
          }
          className="flex-none disabled:opacity-10"
        >
          <ArrowUpCircleIcon className="w-8 h-8 mx-2.5 my-2" />
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
          <StopCircleIcon className="w-8 h-8 mx-2.5 my-2" />
        </button>
      )}
    </form>
  )
}
