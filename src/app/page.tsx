'use client'

import Link from 'next/link'

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* Hero */}
            <section className="bg-gray-900 text-white py-24 px-6">
                <div className="max-w-5xl mx-auto text-center">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6 inline-block">
            🤖 Búsqueda con Inteligencia Artificial
          </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Encuentra tu vehículo<br />
                        <span className="text-blue-400">ideal en Colombia</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Busca entre decenas de vehículos usando lenguaje natural.
                        Nuestra IA entiende lo que necesitas y te muestra las mejores opciones.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/vehicles" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg">
                            Ver vehículos
                        </Link>
                        <Link href="/register" className="border border-gray-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-lg">
                            Publicar mi vehículo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Búsqueda rápida */}
            <section className="bg-white border-b py-10 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-gray-500 mb-4 text-sm">¿Ya sabes lo que buscas? Prueba nuestra IA</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder='Ej: "carro económico para ciudad" o "camioneta 4x4"'
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    const val = (e.target as HTMLInputElement).value
                                    window.location.href = '/vehicles?ai=' + encodeURIComponent(val)
                                }
                            }}
                        />
                        <Link href="/vehicles" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
                            Buscar
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                        ¿Por qué DriveFinder?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🤖</div>
                            <h3 className="text-lg font-bold mb-3 text-gray-800">Búsqueda con IA</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Escribe en lenguaje natural y nuestra IA interpreta lo que necesitas para mostrarte los mejores resultados.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🚗</div>
                            <h3 className="text-lg font-bold mb-3 text-gray-800">Amplio catálogo</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Vehículos de todas las marcas, modelos y precios. Desde carros económicos hasta SUVs de lujo.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">📞</div>
                            <h3 className="text-lg font-bold mb-3 text-gray-800">Contacto directo</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Habla directamente con el vendedor. Sin intermediarios, sin complicaciones.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA vendedor */}
            <section className="bg-blue-600 py-16 px-6 text-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">¿Quieres vender tu vehículo?</h2>
                    <p className="text-blue-100 mb-8 text-lg">
                        Publica tu vehículo gratis y llega a cientos de compradores potenciales.
                    </p>
                    <Link href="/register" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors text-lg inline-block">
                        Crear cuenta de vendedor
                    </Link>
                </div>
            </section>

        </main>
    )
}