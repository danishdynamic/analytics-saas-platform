import { Plus, Check } from 'lucide-react'
import { useState } from 'react'

export default function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    onAdd(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition">
      <figure className="text-6xl py-8 bg-base-200">{product.emoji}</figure>
      <div className="card-body p-4">
        <h3 className="card-title text-base">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={handleClick}
            className={`btn btn-sm ${added ? 'btn-success' : 'btn-primary'}`}
          >
            {added ? <><Check size={14} /> Added</> : <><Plus size={14} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  )
}