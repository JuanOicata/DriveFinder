const API_URL = '/api/vehicles'

export const vehicleService = {
    async getAll(filters?: Record<string, string>) {
        const params = filters ? '?' + new URLSearchParams(filters).toString() : ''
        const res = await fetch(`${API_URL}${params}`)
        return res.json()
    },

    async getOne(id: string) {
        const res = await fetch(`${API_URL}/${id}`)
        return res.json()
    },

    async create(data: object, token: string) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
        return res.json()
    },

    async update(id: string, data: object, token: string) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
        return res.json()
    },

    async delete(id: string, token: string) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        })
        return res.json()
    },
}