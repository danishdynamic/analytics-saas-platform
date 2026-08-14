// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'
import { useCartStore } from '../store/cartStore.js'
import { useNotificationStore } from '../store/notificationStore.js'
import { useThemeStore } from '../store/themeStore.js'
import { ShoppingCart, Sun, Moon, LogIn, LogOut, User, Bell, BarChart3, Package, Store } from 'lucide-react'

export default function Navbar() {
  const { isAuth, user, logout } = useAuthStore()
  const { count } = useCartStore()
  const { unread } = useNotificationStore()
  const { theme, toggle } = useThemeStore()
  const navigate = useNavigate()
  const loc = useLocation()

  const navLink = (to, label, icon, badge = null) => (
    <Link
      key={to}
      to={to}
      className={`btn btn-sm btn-ghost gap-2 ${loc.pathname === to ? 'btn-active' : ''}`}
    >
      {icon}
      <span>{label}</span>
      {badge && <span className="badge badge-xs badge-error">{badge}</span>}
    </Link>
  )

  return (
    <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">SaaS</Link>
      </div>

      {/* Center Navigation - Desktop */}
      <div className="navbar-center hidden md:flex gap-1">
        {navLink('/shop', 'Shop', <Store size={16} />)}
        {navLink('/cart', 'Cart', <ShoppingCart size={16} />, count() > 0 ? count() : null)}
        
        {isAuth && (
          <>
            {navLink('/dashboard', 'Dashboard', <BarChart3 size={16} />)}
            {navLink('/orders', 'Orders', <Package size={16} />)}
            {navLink('/notifications', 'Alerts', <Bell size={16} />, unread > 0 ? unread : null)}
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="navbar-end gap-2">
        {/* Theme Toggle */}
        <button onClick={toggle} className="btn btn-ghost btn-circle btn-sm">
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Cart - Mobile */}
        <Link to="/cart" className="btn btn-ghost btn-circle btn-sm md:hidden">
          <div className="indicator">
            <ShoppingCart size={18} />
            {count() > 0 && <span className="badge badge-xs badge-primary indicator-item">{count()}</span>}
          </div>
        </Link>

        {/* Auth */}
        {isAuth ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-8">
                  <span className="text-xs">{user?.email?.[0]?.toUpperCase()}</span>
                </div>
              </div>
              <span className="hidden sm:inline">{user?.email}</span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
              <li className="menu-title">{user?.email}</li>
              <li><button onClick={() => { logout(); navigate('/login') }}><LogOut size={14} /> Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm gap-2">
            <LogIn size={14} /> Login
          </Link>
        )}
      </div>
    </nav>
  )
}