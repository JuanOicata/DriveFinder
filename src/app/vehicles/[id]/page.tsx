'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { vehicleService } from '@/services/vehicleService'

export default function VehicleDetailPage() {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        vehicleService.getOne(id as string).then(data => {
            setVehicle(data)
            setLoading(false)
        })
    }, [id])

    if (loading) return <div className="text-center py-20 text-gray-400">Cargando...</div>
    if (!vehicle) return <div className="text-center py-20 text-gray-400">Vehículo no encontrado</div>

    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {vehicle.brand} {vehicle.model}
                </h1>
                <p className="text-gray-500 mb-4">{vehicle.year} · {vehicle.mileage.toLocaleString()} km</p>
                <p className="text-blue-600 font-bold text-3xl mb-6">
                    ${vehicle.price.toLocaleString('es-CO')}
                </p>
                <div className="border-t pt-4">
                    <h2 className="font-semibold text-gray-700 mb-2">Descripción</h2>
                    <p className="text-gray-600">{vehicle.description}</p>
                </div>
                <div className="border-t pt-4 mt-4">
                    <h2 className="font-semibold text-gray-700 mb-2">Vendedor</h2>
                    <p className="text-gray-600">{vehicle.seller.name}</p>
                    <p className="text-gray-400 text-sm">{vehicle.seller.email}</p>
                </div>
            </div>
        </main>
    )
}