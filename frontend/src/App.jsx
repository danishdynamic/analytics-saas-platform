import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore.js'
import { useThemeStore } from './store/themeStore.js'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Shop from './pages/Shop.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'
import Notifications from './pages/Notifications.jsx'
import Dashboard from './pages/Dashboard.jsx'

function Guard({ children }) {
  const { isAuth } = useAuthStore()
  return isAuth ? children : <Navigate to="/login" />
}

export default function App() {
  useEffect(() => {
    useAuthStore.getState().init()
    useThemeStore.getState().init()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Shop />} />
        <Route path="login" element={<Login />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Guard><Orders /></Guard>} />
        <Route path="notifications" element={<Guard><Notifications /></Guard>} />
        <Route path="dashboard" element={<Guard><Dashboard /></Guard>} />
      </Route>
    </Routes>
  )
}