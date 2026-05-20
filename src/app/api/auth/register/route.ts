import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, generateToken } from '@/lib/auth'
import { z } from 'zod'

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['BUYER', 'SELLER']).default('BUYER'),
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, password, role } = registerSchema.parse(body)

        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) {
            return NextResponse.json({ error: 'Email ya registrado' }, { status: 400 })
        }

        const hashed = await hashPassword(password)
        const user = await prisma.user.create({
            data: { name, email, password: hashed, role },
        })

        const token = generateToken({ id: user.id, email: user.email, role: user.role })

        return NextResponse.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        }, { status: 201 })

    } catch (error) {
        console.error('ERROR REGISTRO:', error)
        return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 })
    }

}