import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
            include: { seller: { select: { id: true, name: true, email: true, phone: true } } },
        })
        if (!vehicle) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
        return NextResponse.json(vehicle)
    } catch {
        return NextResponse.json({ error: 'Error al obtener vehículo' }, { status: 500 })
    }
}

// PUT
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const token = req.headers.get('authorization')?.replace('Bearer ', '')
        if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

        const decoded = verifyToken(token)
        if (!decoded) return NextResponse.json({ error: 'Token inválido' }, { status: 401 })

        const vehicle = await prisma.vehicle.findUnique({ where: { id } })
        if (!vehicle) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
        if (vehicle.sellerId !== decoded.id) {
            return NextResponse.json({ error: 'Sin permiso' }, { status: 403 })
        }

        const body = await req.json()
        const updated = await prisma.vehicle.update({ where: { id }, data: body })
        return NextResponse.json(updated)
    } catch {
        return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
    }
}

// DELETE
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const token = req.headers.get('authorization')?.replace('Bearer ', '')
        if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

        const decoded = verifyToken(token)
        if (!decoded) return NextResponse.json({ error: 'Token inválido' }, { status: 401 })

        const vehicle = await prisma.vehicle.findUnique({ where: { id } })
        if (!vehicle) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
        if (vehicle.sellerId !== decoded.id) {
            return NextResponse.json({ error: 'Sin permiso' }, { status: 403 })
        }

        await prisma.vehicle.delete({ where: { id } })
        return NextResponse.json({ message: 'Eliminado correctamente' })
    } catch {
        return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
    }
}