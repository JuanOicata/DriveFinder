import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import { z } from 'zod'

const vehicleSchema = z.object({
    brand: z.string().min(1),
    model: z.string().min(1),
    year: z.number().int().min(1900).max(2025),
    price: z.number().positive(),
    mileage: z.number().min(0),
    description: z.string().min(3),
    images: z.array(z.string()).default([]),
})

// GET — todos los vehículos con filtros
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const brand = searchParams.get('brand')
        const model = searchParams.get('model')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const year = searchParams.get('year')

        const vehicles = await prisma.vehicle.findMany({
            where: {
                status: 'AVAILABLE',
                ...(brand && { brand: { contains: brand, mode: 'insensitive' } }),
                ...(model && { model: { contains: model, mode: 'insensitive' } }),
                ...(year && { year: parseInt(year) }),
                ...(minPrice || maxPrice ? {
                    price: {
                        ...(minPrice && { gte: parseFloat(minPrice) }),
                        ...(maxPrice && { lte: parseFloat(maxPrice) }),
                    }
                } : {}),
            },
            include: { seller: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(vehicles)
    } catch (error) {
        console.error('ERROR GET VEHICLES:', error)
        return NextResponse.json({ error: 'Error al obtener vehículos' }, { status: 500 })
    }
}

// POST — crear vehículo
export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '')
        if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

        const decoded = verifyToken(token)
        if (!decoded || decoded.role !== 'SELLER') {
            return NextResponse.json({ error: 'Solo vendedores pueden publicar' }, { status: 403 })
        }

        const body = await req.json()
        const data = vehicleSchema.parse(body)

        const vehicle = await prisma.vehicle.create({
            data: { ...data, sellerId: decoded.id },
        })

        return NextResponse.json(vehicle, { status: 201 })
    } catch (error) {
        console.error('ERROR POST VEHICLE:', error)
        return NextResponse.json({ error: 'Error al crear vehículo' }, { status: 500 })
    }
}