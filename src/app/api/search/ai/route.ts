import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { anthropic } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json()
        if (!query) return NextResponse.json({ error: 'Query requerida' }, { status: 400 })

        // Obtener todos los vehículos disponibles
        const vehicles = await prisma.vehicle.findMany({
            where: { status: 'AVAILABLE' },
            include: { seller: { select: { id: true, name: true, email: true } } },
        })

        if (vehicles.length === 0) {
            return NextResponse.json({ vehicles: [], message: 'No hay vehículos disponibles' })
        }

        // Preparar contexto para Claude
        const vehicleList = vehicles.map(v =>
            `ID:${v.id} | ${v.brand} ${v.model} ${v.year} | Precio:$${v.price} | Km:${v.mileage} | ${v.description}`
        ).join('\n')

        const message = await anthropic.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: `Eres un asistente experto en vehículos. El usuario busca: "${query}"

Aquí están los vehículos disponibles:
${vehicleList}

Responde SOLO con un JSON válido con este formato exacto, sin texto adicional:
{
  "ids": ["id1", "id2"],
  "message": "Explicación de por qué estos vehículos coinciden con la búsqueda",
  "recommendation": "Consejo personalizado para el comprador basado en su búsqueda"
}

Si ninguno coincide, devuelve ids vacío con un mensaje y recomendación de qué buscar.`
                }
            ]
        })

        const content = message.content[0]
        if (content.type !== 'text') {
            return NextResponse.json({ error: 'Error procesando respuesta' }, { status: 500 })
        }

        // Parsear respuesta de Claude
        const clean = content.text.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(clean)

        // Filtrar vehículos por IDs devueltos
        const results = vehicles.filter(v => parsed.ids.includes(v.id))

        return NextResponse.json({
            vehicles: results,
            message: parsed.message,
            recommendation: parsed.recommendation
        })

    } catch (error) {
        console.error('ERROR AI SEARCH:', error)
        return NextResponse.json({ error: 'Error en búsqueda IA' }, { status: 500 })
    }
}