export function Button({ children, ...props }) {
  return (
    <button className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900" {...props}>
      {children}
    </button>
  )
}
