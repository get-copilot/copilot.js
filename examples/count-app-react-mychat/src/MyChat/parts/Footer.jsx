import React, { useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useCopilot } from '@copilotjs/react'
import { ArrowUpCircleIcon, StopCircleIcon } from '@heroicons/react/24/solid'
import { useStore } from '../store'

export default function Footer() {
  const { isOpen, draft, setDraft } = useStore()
  const { state, prompt, cancel } = useCopilot()

  // When certain state transitions occur, focus the textarea
  // so the user can start typing immediately.
  const textareaRef = React.useRef(null)
  useEffect(() => {
    if (
      state === 'generating' ||
      state === 'resettingFromGenerating' ||
      state === 'resettingFromIdle' ||
      state === 'cancelling'
    ) {
      textareaRef.current?.focus()
    }
  }, [state])

  // When the Copilot opens, auto-focus the input area, so the user can
  // start typing immediately.
  useEffect(() => {
    textareaRef.current?.focus()
  }, [isOpen])

  function submitDraft() {
    const canSubmit = state === 'idle' && draft !== ''
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
      {(state === 'idle' || state === 'resettingFromIdle' || state === 'connecting') && (
        <button
          type="submit"
          disabled={
            (state === 'idle' && draft === '') ||
            state === 'resettingFromIdle' ||
            state === 'connecting'
          }
          className="flex-none disabled:opacity-10"
        >
          <ArrowUpCircleIcon className="w-8 h-8 mx-2.5 my-2" />
        </button>
      )}

      {/* Cancel button */}
      {(state === 'generating' ||
        state === 'running' ||
        state === 'cancelling' ||
        state === 'resettingFromGenerating') && (
        <button
          type="button"
          onClick={() => cancel()}
          disabled={
            state === 'running' || state === 'cancelling' || state === 'resettingFromGenerating'
          }
          className="flex-none disabled:opacity-10"
        >
          <StopCircleIcon className="w-8 h-8 mx-2.5 my-2" />
        </button>
      )}
    </form>
  )
}
