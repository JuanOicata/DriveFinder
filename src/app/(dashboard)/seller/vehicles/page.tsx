'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { vehicleService } from '@/services/vehicleService'
import Link from 'next/link'

export default function SellerVehiclesPage() {
    const { user, token } = useAuth()
    const [vehicles, setVehicles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) loadVehicles()
    }, [user])

    const loadVehicles = async () => {
        const data = await vehicleService.getAll()
        const mine = data.filter((v: any) => v.seller.id === user?.id)
        setVehicles(mine)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Eliminar este vehículo?')) return
        console.log('Token:', token)
        const res = await vehicleService.delete(id, token!)
        console.log('Delete res:', res)
        loadVehicles()
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Mis vehículos</h1>
                <Link
                    href="/seller/vehicles/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                    + Publicar nuevo
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400">Cargando...</div>
            ) : vehicles.length === 0 ? (
                <div className="text-center py-20 text-gray-400">No tienes vehículos publicados</div>
            ) : (
                <div className="space-y-4">
                    {vehicles.map((v: any) => (
                        <div key={v.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-800">{v.brand} {v.model} ({v.year})</h3>
                                <p className="text-blue-600 font-medium">${v.price.toLocaleString('es-CO')}</p>
                                <p className="text-gray-400 text-sm">{v.mileage.toLocaleString()} km · {v.status}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={`/seller/vehicles/${v.id}/edit`}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(v.id)}
                                    className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-sm hover:bg-red-100"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}