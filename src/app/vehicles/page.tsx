'use client'

import { useEffect, useState } from 'react'
import { vehicleService } from '@/services/vehicleService'
import { searchService } from '@/services/searchService'
import VehicleCard from '@/components/vehicles/VehicleCard'

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [aiLoading, setAiLoading] = useState(false)
    const [filters, setFilters] = useState({ brand: '', minPrice: '', maxPrice: '', year: '' })
    const [aiQuery, setAiQuery] = useState('')
    const [aiMessage, setAiMessage] = useState('')
    const [aiRecommendation, setAiRecommendation] = useState('')
    const [isAiSearch, setIsAiSearch] = useState(false)

    const loadVehicles = async () => {
        setLoading(true)
        setIsAiSearch(false)
        setAiMessage('')
        setAiRecommendation('')
        const active = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== ''))
        const data = await vehicleService.getAll(active)
        setVehicles(Array.isArray(data) ? data : [])
        setLoading(false)
    }

    const handleAiSearch = async () => {
        if (!aiQuery.trim()) return
        setAiLoading(true)
        setIsAiSearch(true)
        setAiMessage('')
        setAiRecommendation('')
        const res = await searchService.aiSearch(aiQuery)
        setVehicles(Array.isArray(res.vehicles) ? res.vehicles : [])
        setAiMessage(res.message || '')
        setAiRecommendation(res.recommendation || '')
        setAiLoading(false)
    }

    useEffect(() => { loadVehicles() }, [])

    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Vehículos disponibles</h1>

            {/* Búsqueda IA */}
            <div className="bg-gray-900 p-6 rounded-2xl mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🤖</span>
                    <h2 className="font-semibold text-white text-lg">Búsqueda inteligente</h2>
                </div>
                <p className="text-gray-400 text-sm mb-4">Describe lo que buscas en lenguaje natural</p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={aiQuery}
                        onChange={e => setAiQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAiSearch()}
                        placeholder='Ej: "carro económico para ciudad" o "SUV familiar bajo presupuesto"'
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                    />
                    <button
                        onClick={handleAiSearch}
                        disabled={aiLoading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        {aiLoading ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>
                {isAiSearch && (
                    <button
                        onClick={loadVehicles}
                        className="mt-3 text-gray-400 text-sm hover:text-white transition-colors"
                    >
                        ← Ver todos los vehículos
                    </button>
                )}
            </div>

            {/* Mensaje IA */}
            {aiMessage && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-xl mb-4 text-sm">
                    🤖 {aiMessage}
                </div>
            )}

            {/* Recomendación IA */}
            {aiRecommendation && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-sm">
                    💡 {aiRecommendation}
                </div>
            )}

            {/* Filtros normales */}
            {!isAiSearch && (
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
                        Filtrar
                    </button>
                </div>
            )}

            {/* Resultados */}
            {loading || aiLoading ? (
                <div className="text-center py-20 text-gray-400">
                    {aiLoading ? '🤖 Analizando tu búsqueda...' : 'Cargando vehículos...'}
                </div>
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