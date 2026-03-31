'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '@/services/authService'

interface User {
    id: string
    name: string
    email: string
    role: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (email: string, password: string) => Promise<{ error?: string }>
    register: (data: { name: string; email: string; password: string; role: string }) => Promise<{ error?: string }>
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const savedUser = authService.getUser()
        const savedToken = authService.getToken()
        if (savedUser && savedToken) {
            setUser(savedUser)
            setToken(savedToken)
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        const res = await authService.login({ email, password })
        if (res.error) return { error: res.error }
        authService.saveSession(res.token, res.user)
        setUser(res.user)
        setToken(res.token)
        return {}
    }

    const register = async (data: { name: string; email: string; password: string; role: string }) => {
        const res = await authService.register(data)
        if (res.error) return { error: res.error }
        authService.saveSession(res.token, res.user)
        setUser(res.user)
        setToken(res.token)
        return {}
    }

    const logout = () => {
        authService.logout()
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
    return ctx
}