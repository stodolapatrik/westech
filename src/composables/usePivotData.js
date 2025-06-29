import { ref, onMounted } from 'vue'

export const usePivotData = () => {
    const raw = ref([])
    const stores = ref([])
    const pivot = ref([])
    const CACHE_KEY = 'pivotData'
    const CACHE_TTL = 10 * 60 * 1000

    onMounted(async () => {
        const cachedStr = localStorage.getItem(CACHE_KEY)
        let useCache = false
        if (cachedStr) {
            try {
                const { timestamp, data } = JSON.parse(cachedStr)
                if (Date.now() - timestamp < CACHE_TTL) {
                    raw.value = data
                    useCache = true
                }
            } catch (e) {
                console.warn('Failed to parse cache, fetching fresh data.', e)
            }
        }

        if (!useCache) {
            const res = await fetch('https://hiring.wdev.sk/fe-data')
            const data = await res.json()
            raw.value = data
            const payload = { timestamp: Date.now(), data }
            localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
        }

        stores.value = [...new Set(raw.value.map(r => r.store))]

        const byCat = {}
        raw.value.forEach(({ category, product, store, pcs }) => {
            byCat[category] ??= { children: {}, totals: {} }
            const cat = byCat[category]
            cat.children[product] ??= { sales: {} }
            cat.children[product].sales[store] = (cat.children[product].sales[store] || 0) + pcs
            cat.totals[store] = (cat.totals[store] || 0) + pcs
        })

        pivot.value = Object.entries(byCat).map(([category, { children, totals }]) => ({
            category,
            totals,
            children: Object.entries(children).map(([product, { sales }]) => ({ product, sales }))
        }))
    })

    return { stores, pivot }
}