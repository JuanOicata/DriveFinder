import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const protectedRoutes = ['/dashboard', '/seller']

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const isProtected = protectedRoutes.some(r => pathname.startsWith(r))

    if (!isProtected) return NextResponse.next()

    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token || !verifyToken(token)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/seller/:path*'],
}