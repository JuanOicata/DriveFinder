const API_URL = '/api/auth'

export const authService = {
    async register(data: { name: string; email: string; password: string; role: string }) {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return res.json()
    },

    async login(data: { email: string; password: string }) {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return res.json()
    },

    async logout() {
        await fetch(`${API_URL}/logout`, { method: 'POST' })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },

    getToken() {
        return localStorage.getItem('token')
    },

    getUser() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    },

    saveSession(token: string, user: object) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }
}