import Link from 'next/link'

interface VehicleCardProps {
    vehicle: {
        id: string
        brand: string
        model: string
        year: number
        price: number
        mileage: number
        images: string[]
        seller: { name: string }
    }
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <Link href={`/vehicles/${vehicle.id}`}>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                    {vehicle.images.length > 0 ? (
                        <img src={vehicle.images[0]} alt={vehicle.model} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-5xl">🚗</span>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-lg">
                        {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-gray-500 text-sm">{vehicle.year} · {vehicle.mileage.toLocaleString()} km</p>
                    <p className="text-blue-600 font-bold text-xl mt-2">
                        ${vehicle.price.toLocaleString('es-CO')}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">Vendedor: {vehicle.seller.name}</p>
                </div>
            </div>
        </Link>
    )
}