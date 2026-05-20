'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { vehicleService } from '@/services/vehicleService'
import VehicleForm from '@/components/vehicles/VehicleForm'

export default function EditVehiclePage() {
    const { id } = useParams()
    const { token, isLoading } = useAuth()
    const [vehicle, setVehicle] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        vehicleService.getOne(id as string).then(setVehicle)
    }, [id])

    if (isLoading || !vehicle) return <div className="text-center py-20 text-gray-400">Cargando...</div>

    const handleSubmit = async (data: object) => {
        setLoading(true)
        const res = await vehicleService.update(id as string, data, token!)
        if (res.error) {
            setError(res.error)
        } else {
            window.location.href = '/seller/vehicles'
        }
        setLoading(false)
    }

    return (
        <main className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar vehículo</h1>
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <VehicleForm initial={vehicle} onSubmit={handleSubmit} loading={loading} />
            </div>
        </main>
    )
}