import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'
import { useCartStore } from '../store/cartStore.js'
import { useNotificationStore } from '../store/notificationStore.js'
import { useThemeStore } from '../store/themeStore.js'
import { ShoppingCart, Bell, LogOut, User, BarChart3, Package, Store, Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { isAuth, user, logout } = useAuthStore()
  const { count } = useCartStore()
  const { unread } = useNotificationStore()
  const { theme, toggle } = useThemeStore()
  const navigate = useNavigate()
  const loc = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLink = (to, label, icon) => (
    <Link
      key={to}
      to={to}
      className={`btn btn-sm btn-ghost ${loc.pathname === to ? 'btn-active' : ''}`}
      onClick={() => setMenuOpen(false)}
    >
      {icon}
      <span className="hidden lg:inline ml-1">{label}</span>
    </Link>
  )

  return (
    <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">SaaS</Link>
      </div>

      <div className="navbar-center hidden md:flex gap-1">
        {navLink('/shop', 'Shop', <Store size={16} />)}
        {navLink('/cart', `Cart (${count()})`, <ShoppingCart size={16} />)}
        {isAuth && (
          <>
            {navLink('/orders', 'Orders', <Package size={16} />)}
            {navLink('/dashboard', 'Dashboard', <BarChart3 size={16} />)}
            {navLink('/notifications', `Alerts (${unread})`, <Bell size={16} />)}
          </>
        )}
      </div>

      <div className="navbar-end gap-2">
        <button onClick={toggle} className="btn btn-ghost btn-sm btn-circle">
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {isAuth ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              <User size={16} />
              <span className="hidden sm:inline">{user?.email}</span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
              <li><button onClick={() => { logout(); navigate('/login') }}><LogOut size={14} /> Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
        )}

        <button className="btn btn-ghost btn-sm md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-base-100 shadow-lg p-4 flex flex-col gap-2 z-40">
          {navLink('/shop', 'Shop', <Store size={16} />)}
          {navLink('/cart', `Cart (${count()})`, <ShoppingCart size={16} />)}
          {isAuth && (
            <>
              {navLink('/orders', 'Orders', <Package size={16} />)}
              {navLink('/dashboard', 'Dashboard', <BarChart3 size={16} />)}
              {navLink('/notifications', `Alerts (${unread})`, <Bell size={16} />)}
            </>
          )}
        </div>
      )}
    </nav>
  )
}