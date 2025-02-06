import clsx from 'clsx'

export function SmallAvatar(props) {
  return (
    <span
      className={clsx(
        'inline-flex size-6 items-center justify-center rounded-full border border-black border-opacity-5',
        props.className,
      )}
    >
      <span className="text-xs/none font-medium text-white">{props.text}</span>
    </span>
  )
}

export function LargeAvatar(props) {
  return (
    <span
      className={clsx(
        'inline-flex size-12 items-center justify-center rounded-full border border-black border-opacity-5',
        props.className,
      )}
    >
      <span className="text-xl/none font-medium text-white">{props.text}</span>
    </span>
  )
}
