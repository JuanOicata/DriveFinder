'use client'

import { useState } from 'react'

interface VehicleFormProps {
    initial?: {
        brand: string
        model: string
        year: number
        price: number
        mileage: number
        description: string
    }
    onSubmit: (data: object) => Promise<void>
    loading: boolean
}

export default function VehicleForm({ initial, onSubmit, loading }: VehicleFormProps) {
    const [form, setForm] = useState({
        brand: initial?.brand || '',
        model: initial?.model || '',
        year: initial?.year || 2020,
        price: initial?.price || 0,
        mileage: initial?.mileage || 0,
        description: initial?.description || '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onSubmit({ ...form, year: Number(form.year), price: Number(form.price), mileage: Number(form.mileage) })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                    <input
                        type="text"
                        value={form.brand}
                        onChange={e => setForm({ ...form, brand: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Toyota, Mazda, Ford..."
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                    <input
                        type="text"
                        value={form.model}
                        onChange={e => setForm({ ...form, model: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Corolla, CX-5..."
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
                    <input
                        type="number"
                        value={form.year}
                        onChange={e => setForm({ ...form, year: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={1900}
                        max={2025}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio (COP)</label>
                    <input
                        type="number"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={0}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje</label>
                    <input
                        type="number"
                        value={form.mileage}
                        onChange={e => setForm({ ...form, mileage: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={0}
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Describe el estado del vehículo, extras, historial..."
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
                {loading ? 'Guardando...' : 'Publicar vehículo'}
            </button>
        </form>
    )
}