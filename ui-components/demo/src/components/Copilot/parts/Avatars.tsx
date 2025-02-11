import clsx from 'clsx'

export function SmallAvatar({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={clsx('inline-flex size-6 items-center justify-center rounded-full border border-black/5', className)}
    >
      <span className="text-xs/none font-medium text-white">{text}</span>
    </span>
  )
}

export function LargeAvatar({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={clsx('inline-flex size-12 items-center justify-center rounded-full border border-black/5', className)}
    >
      <span className="text-xl/none font-medium text-white">{text}</span>
    </span>
  )
}
