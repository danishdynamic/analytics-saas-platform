import { useOrders } from '../hooks/useOrders.js'
import OrderCard from '../components/OrderCard.jsx'
import { Package } from 'lucide-react'

export default function Orders() {
  const { orders, isLoading } = useOrders()

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-md text-primary"></span>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-base-content/20 mx-auto mb-3" />
        <h2 className="text-lg font-bold">No orders yet</h2>
        <p className="text-base-content/50 text-sm">Place an order to see it here</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <OrderCard key={o.id} order={o} />
        ))}
      </div>
    </div>
  )
}