import '@/styles/tailwind.css'
import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'Demo of Copilot component',
  description: '',
}

const inter = localFont({
  src: '../fonts/inter.woff2',
  style: 'normal',
  weight: '100 900',
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>

      <body
        className={clsx(
          'flex min-h-screen flex-row items-center justify-center bg-zinc-100 font-sans antialiased dark:bg-zinc-900',
          inter.variable,
        )}
      >
        <div id="root" className="flex flex-col items-center p-8">
          {children}
        </div>
      </body>
    </html>
  )
}
