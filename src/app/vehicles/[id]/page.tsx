'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { vehicleService } from '@/services/vehicleService'
import Link from 'next/link'

export default function VehicleDetailPage() {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState(0)

    useEffect(() => {
        vehicleService.getOne(id as string).then(data => {
            setVehicle(data)
            setLoading(false)
        })
    }, [id])

    if (loading) return <div className="text-center py-20 text-gray-400">Cargando...</div>
    if (!vehicle) return <div className="text-center py-20 text-gray-400">Vehiculo no encontrado</div>

    const phoneLink = vehicle.seller.phone ? "tel:" + vehicle.seller.phone : null
    const emailLink = "mailto:" + vehicle.seller.email

    return (
        <main className="max-w-6xl mx-auto px-6 py-10">
            <Link href="/vehicles" className="text-blue-600 text-sm hover:underline mb-6 block">
                Volver al listado
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                <div>
                    <div className="bg-gray-100 rounded-xl overflow-hidden h-80">
                        {vehicle.images.length > 0 ? (
                            <img
                                src={vehicle.images[activeImage]}
                                alt={vehicle.brand + " " + vehicle.model}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-7xl">🚗</div>
                        )}
                    </div>
                    {vehicle.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2 mt-3">
                            {vehicle.images.map((img: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={"rounded-lg overflow-hidden h-16 border-2 transition-all " + (activeImage === i ? "border-blue-500" : "border-transparent")}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-1">
                        {vehicle.brand} {vehicle.model}
                    </h1>
                    <p className="text-gray-500 mb-4">{vehicle.year} · {vehicle.mileage.toLocaleString()} km</p>
                    <p className="text-blue-600 font-bold text-4xl mb-6">
                        ${vehicle.price.toLocaleString('es-CO')}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-400">Año</p>
                            <p className="font-semibold text-gray-700">{vehicle.year}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-400">Kilometraje</p>
                            <p className="font-semibold text-gray-700">{vehicle.mileage.toLocaleString()} km</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-400">Estado</p>
                            <p className="font-semibold text-gray-700">
                                {vehicle.status === 'AVAILABLE' ? '✅ Disponible' : '❌ No disponible'}
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-400">Marca</p>
                            <p className="font-semibold text-gray-700">{vehicle.brand}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="font-semibold text-gray-700 mb-2">Descripcion</h2>
                        <p className="text-gray-600 text-sm leading-relaxed">{vehicle.description}</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                        <h2 className="font-semibold text-gray-700 mb-3">Contactar al vendedor</h2>
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                {vehicle.seller.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{vehicle.seller.name}</p>
                                <p className="text-gray-500 text-sm">{vehicle.seller.email}</p>
                            </div>
                        </div>
                        {vehicle.seller.phone && (
                            <a
                                href={"tel:" + vehicle.seller.phone}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium text-center block"
                            >
                                Llamar: {vehicle.seller.phone}
                            </a>
                        )}
                    </div>S
                </div>
            </div>
        </main>
    )
}