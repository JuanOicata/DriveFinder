'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { vehicleService } from '@/services/vehicleService'
import VehicleForm from '@/components/vehicles/VehicleForm'

export default function NewVehiclePage() {
    const { user, token, isLoading } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Espera a que cargue el contexto
    if (isLoading) {
        return <div className="text-center py-20 text-gray-400">Cargando...</div>
    }

    // Si no hay usuario redirige al login
    if (!user) {
        window.location.href = '/login'
        return null
    }

    // Si no es vendedor muestra mensaje
    if (user.role !== 'SELLER') {
        return (
            <div className="text-center py-20 text-gray-500">
                Solo los vendedores pueden publicar vehículos.{' '}
                <a href="/register" className="text-blue-600 underline">
                    Crea una cuenta de vendedor
                </a>
            </div>
        )
    }

    const handleSubmit = async (data: object) => {
        setLoading(true)
        setError('')
        const res = await vehicleService.create(data, token!)
        if (res.error) {
            setError(res.error)
        } else {
            window.location.href = '/seller/vehicles'
        }
        setLoading(false)
    }

    return (
        <main className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Publicar vehículo</h1>
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>
            )}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <VehicleForm onSubmit={handleSubmit} loading={loading} />
            </div>
        </main>
    )
}