import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get('authorization')?.replace('Bearer ', '')
        if (!token) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

        const decoded = verifyToken(token)
        if (!decoded) return NextResponse.json({ error: 'Token inválido' }, { status: 401 })

        const formData = await req.formData()
        const files = formData.getAll('images') as File[]

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No se enviaron imágenes' }, { status: 400 })
        }

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME
        const uploadPreset = 'drivefinder'

        const uploadPromises = files.map(async (file) => {
            const data = new FormData()
            data.append('file', file)
            data.append('upload_preset', uploadPreset)
            data.append('folder', 'drivefinder/vehicles')

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: 'POST', body: data }
            )
            const result = await res.json()
            if (!result.secure_url) throw new Error('Upload failed')
            return result.secure_url
        })

        const urls = await Promise.all(uploadPromises)
        return NextResponse.json({ urls })

    } catch (error) {
        console.error('ERROR UPLOAD:', error)
        return NextResponse.json({ error: 'Error al subir imágenes' }, { status: 500 })
    }
}