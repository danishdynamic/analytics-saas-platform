import { Trash2, Minus, Plus } from 'lucide-react'

export default function CartItem({ item, onAdd, onRemove }) {
  return (
    <div className="card card-side bg-base-100 shadow-sm">
      <figure className="text-4xl w-24 bg-base-200 flex items-center justify-center">{item.emoji}</figure>
      <div className="card-body p-4 flex-row items-center justify-between">
        <div className="min-w-0">
          <h3 className="font-medium text-sm truncate">{item.name}</h3>
          <p className="text-xs text-base-content/60">${item.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onRemove(item.id)} className="btn btn-xs btn-ghost"><Minus size={12} /></button>
          <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
          <button onClick={() => onAdd(item)} className="btn btn-xs btn-ghost"><Plus size={12} /></button>
        </div>
        <span className="text-sm font-bold min-w-15 text-right">${(item.price * item.qty).toFixed(2)}</span>
        <button onClick={() => onRemove(item.id)} className="btn btn-xs btn-ghost text-error"><Trash2 size={14} /></button>
      </div>
    </div>
  )
}