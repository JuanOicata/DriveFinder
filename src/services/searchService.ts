export const searchService = {
    async aiSearch(query: string) {
        const res = await fetch('/api/search/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        })
        return res.json()
    }
}