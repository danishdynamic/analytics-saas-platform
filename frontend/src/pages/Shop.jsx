import { useCart } from '../hooks/useCart.js'
import ProductCard from '../components/ProductCard.jsx'

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, emoji: '🎧' },
  { id: 2, name: 'Smart Watch', price: 199.99, emoji: '⌚' },
  { id: 3, name: 'Running Shoes', price: 89.99, emoji: '👟' },
  { id: 4, name: 'Coffee Maker', price: 49.99, emoji: '☕' },
  { id: 5, name: 'Backpack', price: 59.99, emoji: '🎒' },
  { id: 6, name: 'Desk Lamp', price: 34.99, emoji: '💡' },
]

export default function Shop() {
  const { addItem } = useCart()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shop</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addItem} />
        ))}
      </div>
    </div>
  )
}