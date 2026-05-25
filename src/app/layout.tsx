
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/layout/Navbar'

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
            <Navbar />
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}