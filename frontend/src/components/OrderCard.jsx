import { CheckCircle, Clock } from 'lucide-react'

export default function OrderCard({ order }) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="card-title text-base">Order #{order.id}</h3>
            <p className="text-xs text-base-content/50">{new Date(order.created_at).toLocaleDateString()}</p>
          </div>
          <div className={`badge ${order.status === 'completed' ? 'badge-success' : 'badge-warning'} gap-1`}>
            {order.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
            {order.status}
          </div>
        </div>
        <div className="divide-y divide-base-200">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2 text-sm">
              <span className="text-base-content/70">{item.name} x {item.quantity}</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold pt-2">
            <span>Total</span>
            <span>${order.total_amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}