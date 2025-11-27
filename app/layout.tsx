import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'CS2 Pro Tático Performance',
  description: 'Dashboard para jogadores de CS2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-gray-900 text-white`}>
        {children}
      </body>
    </html>
  )
}