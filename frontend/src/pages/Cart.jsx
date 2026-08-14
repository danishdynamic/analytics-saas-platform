import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'
import { useOrders } from '../hooks/useOrders.js'
import { useAuthStore } from '../store/authStore.js'
import CartItem from '../components/CartItem.jsx'
import { CreditCard, Loader2, ShoppingBag, CheckCircle } from 'lucide-react'

export default function Cart() {
  const { items, addItem, remove, total, count, clear } = useCart()
  const { isAuth } = useAuthStore()
  const { createOrder, isCreating } = useOrders()
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleCheckout = () => {
    if (!isAuth) {
      navigate('/login')
      return
    }

    createOrder(
      {
        items: items.map((i) => ({
          product_id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.qty,
        })),
        total_amount: total(),
      },
      {
        onSuccess: () => {
          setShowSuccess(true)
          setTimeout(() => {
            setShowSuccess(false)
            navigate('/orders')
          }, 2000)
        },
      }
    )
  }

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-14 h-14 text-base-content/20 mx-auto mb-3" />
        <h2 className="text-xl font-bold mb-1">Cart is empty</h2>
        <p className="text-base-content/50 text-sm mb-4">Add some products first</p>
        <button onClick={() => navigate('/shop')} className="btn btn-primary">Browse Shop</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Toast */}
      {showSuccess && (
        <div className="alert alert-success mb-4 shadow-lg">
          <CheckCircle size={20} />
          <div>
            <h3 className="font-bold">Order Processing!</h3>
            <p className="text-sm">Redirecting to your orders...</p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Cart ({count()} items)</h1>

      <div className="space-y-3 mb-6">
        {items.map((i) => (
          <CartItem key={i.id} item={i} onAdd={addItem} onRemove={remove} />
        ))}
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-base-content/60">Subtotal</span>
            <span>${total().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-base-content/60">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-3 mb-4">
            <span>Total</span>
            <span>${total().toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} disabled={isCreating || showSuccess} className="btn btn-primary w-full">
            {isCreating ? <Loader2 className="animate-spin" size={16} /> : <><CreditCard size={16} /> Checkout</>}
          </button>
          {!isAuth && <p className="text-xs text-base-content/50 text-center mt-2">You'll be redirected to login</p>}
        </div>
      </div>
    </div>
  )
}