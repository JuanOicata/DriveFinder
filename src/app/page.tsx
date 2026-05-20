import Link from 'next/link'

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-blue-600 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Encuentra tu vehículo ideal</h1>
                    <p className="text-xl text-blue-100 mb-8">
                        Busca entre cientos de vehículos o usa nuestra IA para encontrar exactamente lo que necesitas
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/vehicles"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
                        >
                            Ver vehículos
                        </Link>
                        <Link
                            href="/dashboard/seller/vehicles/new"
                            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            Publicar vehículo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold mb-2">Búsqueda inteligente</h3>
                        <p className="text-gray-500 text-sm">Escribe en lenguaje natural y nuestra IA encuentra lo que buscas</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-4xl mb-4">🚗</div>
                        <h3 className="text-lg font-semibold mb-2">Amplio catálogo</h3>
                        <p className="text-gray-500 text-sm">Cientos de vehículos de vendedores verificados</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                        <div className="text-4xl mb-4">✅</div>
                        <h3 className="text-lg font-semibold mb-2">Proceso simple</h3>
                        <p className="text-gray-500 text-sm">Compra o vende en pocos pasos de forma segura</p>
                    </div>
                </div>
            </section>
        </main>
    )
}