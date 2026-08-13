import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  items: [],

  add: (product) => {
    const items = get().items
    const existing = items.find((i) => i.id === product.id)
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        ),
      })
    } else {
      set({ items: [...items, { ...product, qty: 1 }] })
    }
  },

  remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

  clear: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

  count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
}))