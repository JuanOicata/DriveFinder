import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword, generateToken } from '@/lib/auth'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { email, password } = loginSchema.parse(body)

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
        }

        const valid = await verifyPassword(password, user.password)
        if (!valid) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
        }

        const token = generateToken({ id: user.id, email: user.email, role: user.role })

        return NextResponse.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        })

    } catch (error) {
        return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 })
    }
}