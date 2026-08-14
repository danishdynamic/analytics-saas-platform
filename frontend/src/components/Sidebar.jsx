import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'
import { useNotificationStore } from '../store/notificationStore.js'
import { BarChart3, Package, Bell, Home, LogOut, Search } from 'lucide-react'
import SearchBar from './SearchBar.jsx'
import LiveFeed from './LiveFeed.jsx'

export default function Sidebar() {
  const { user, logout } = useAuthStore()
  const { unread } = useNotificationStore()
  const loc = useLocation()

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${loc.pathname === path ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`

  return (
    <aside className="w-72 bg-base-100 border-r border-base-200 min-h-screen hidden lg:flex flex-col sticky top-0">
      {/* Logo + Search */}
      <div className="p-4 border-b border-base-200 space-y-3">
        <Link to="/" className="text-xl font-bold text-primary block">SaaS</Link>
        <SearchBar />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-auto">
        <Link to="/shop" className={linkClass('/shop')}><Home size={18} /> Shop</Link>
        <Link to="/cart" className={linkClass('/cart')}><Package size={18} /> Cart</Link>
        
        <div className="divider text-xs text-base-content/40 my-2">Analytics</div>
        
        <Link to="/dashboard" className={linkClass('/dashboard')}><BarChart3 size={18} /> Dashboard</Link>
        <Link to="/orders" className={linkClass('/orders')}><Package size={18} /> Orders</Link>
        <Link to="/notifications" className={linkClass('/notifications')}>
          <Bell size={18} /> Notifications
          {unread > 0 && <span className="badge badge-sm badge-error ml-auto">{unread}</span>}
        </Link>

        {/* Live Feed */}
        <div className="mt-4">
          <LiveFeed />
        </div>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-base-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <span className="text-sm">{user?.email?.[0]?.toUpperCase() || 'U'}</span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-base-content/50">Pro Plan</p>
          </div>
        </div>
        <button onClick={logout} className="btn btn-ghost btn-sm w-full gap-2">
          <LogOut size={14} /> Logout
        </button>
      </div>
    </aside>
  )
}