'use client'

import { useEffect, useState } from 'react'
import { vehicleService } from '@/services/vehicleService'
import VehicleCard from '@/components/vehicles/VehicleCard'

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({ brand: '', minPrice: '', maxPrice: '', year: '' })

    const loadVehicles = async () => {
        setLoading(true)
        const active = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''))
        const data = await vehicleService.getAll(active)
        setVehicles(Array.isArray(data) ? data : [])
        setLoading(false)
    }

    useEffect(() => { loadVehicles() }, [])

    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Vehículos disponibles</h1>

            <div className="bg-white p-4 rounded-xl shadow-sm mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Marca"
                    value={filters.brand}
                    onChange={e => setFilters({ ...filters, brand: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    placeholder="Precio mínimo"
                    value={filters.minPrice}
                    onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    placeholder="Precio máximo"
                    value={filters.maxPrice}
                    onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    placeholder="Año"
                    value={filters.year}
                    onChange={e => setFilters({ ...filters, year: e.target.value })}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={loadVehicles}
                    className="md:col-span-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                    Buscar
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400">Cargando vehículos...</div>
            ) : vehicles.length === 0 ? (
                <div className="text-center py-20 text-gray-400">No se encontraron vehículos</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map(v => <VehicleCard key={v.id} vehicle={v} />)}
                </div>
            )}
        </main>
    )
}