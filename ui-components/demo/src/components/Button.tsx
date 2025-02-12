import React from 'react'

export function Button({ children, ...props }: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900" {...props}>
      {children}
    </button>
  )
}
