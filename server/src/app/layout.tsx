import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Receipt Scanner App',
  description: 'A full-stack receipt scanning application with OCR functionality',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
