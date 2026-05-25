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
        images?: string[]
    }
    onSubmit: (data: object) => Promise<void>
    loading: boolean
    token: string
}

export default function VehicleForm({ initial, onSubmit, loading, token }: VehicleFormProps) {
    const [form, setForm] = useState({
        brand: initial?.brand || '',
        model: initial?.model || '',
        year: initial?.year || 2020,
        price: initial?.price || 0,
        mileage: initial?.mileage || 0,
        description: initial?.description || '',
    })
    const [images, setImages] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>(initial?.images || [])
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length + previews.length > 6) {
            setError('Máximo 6 imágenes')
            return
        }
        setImages(prev => [...prev, ...files])
        const newPreviews = files.map(f => URL.createObjectURL(f))
        setPreviews(prev => [...prev, ...newPreviews])
        setError('')
    }

    const removeImage = (index: number) => {
        setPreviews(prev => prev.filter((_, i) => i !== index))
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (images.length === 0 && previews.length === 0) {
            setError('Agrega al menos una imagen')
            return
        }

        setUploading(true)
        let imageUrls: string[] = previews.filter(p => p.startsWith('http'))

        if (images.length > 0) {
            const formData = new FormData()
            images.forEach(img => formData.append('images', img))

            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            })
            const data = await res.json()
            if (data.error) {
                setError(data.error)
                setUploading(false)
                return
            }
            imageUrls = [...imageUrls, ...data.urls]
        }

        setUploading(false)
        await onSubmit({
            ...form,
            year: Number(form.year),
            price: Number(form.price),
            mileage: Number(form.mileage),
            images: imageUrls,
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

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
                        min={1900} max={2026} required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio (COP)</label>
                    <input
                        type="number"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={0} required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje</label>
                    <input
                        type="number"
                        value={form.mileage}
                        onChange={e => setForm({ ...form, mileage: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={0} required
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

            {/* Subida de imágenes */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imágenes <span className="text-gray-400 text-xs">(mínimo 1, máximo 6)</span>
                </label>

                {/* Preview de imágenes */}
                {previews.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {previews.map((url, i) => (
                            <div key={i} className="relative group">
                                <img
                                    src={url}
                                    alt={`imagen ${i + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(i)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {previews.length < 6 && (
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                        <span className="text-2xl">📷</span>
                        <span className="text-sm text-gray-500 mt-1">Clic para agregar fotos</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImages}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            <button
                type="submit"
                disabled={loading || uploading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
                {uploading ? 'Subiendo imágenes...' : loading ? 'Guardando...' : 'Publicar vehículo'}
            </button>
        </form>
    )
}