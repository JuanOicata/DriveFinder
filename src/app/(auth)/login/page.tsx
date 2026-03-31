'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function LoginPage() {
    const { login } = useAuth()
    const router = useRouter()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const res = await login(form.email, form.password)
        if (res.error) {
            setError(res.error)
        } else {
            router.push('/')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Iniciar sesión</h1>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                    >
                        {loading ? 'Cargando...' : 'Entrar'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    ¿No tienes cuenta?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    )
}