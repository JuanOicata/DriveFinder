import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DriveFinder',
  description: 'Encuentra tu vehículo ideal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="es">
      <body className={geist.className}>
      <AuthProvider>
        {children}
      </AuthProvider>
      </body>
      </html>
  )
}