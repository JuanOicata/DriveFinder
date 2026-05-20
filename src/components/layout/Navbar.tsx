'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    DriveFinder
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/vehicles" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                        Vehículos
                    </Link>

                    {user ? (
                        <>
                            {user.role === 'SELLER' && (
                                <Link href="/seller/vehicles" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                                    Mis vehículos
                                </Link>
                            )}
                            <span className="text-sm text-gray-500">Hola, {user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                                Iniciar sesión
                            </Link>
                            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}