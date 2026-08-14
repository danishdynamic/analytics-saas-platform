import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Package, BarChart3, Bell, ShoppingBag } from 'lucide-react'

const SEARCH_ITEMS = [
  { label: 'Shop', path: '/shop', icon: <ShoppingBag size={14} />, category: 'Page' },
  { label: 'Cart', path: '/cart', icon: <ShoppingBag size={14} />, category: 'Page' },
  { label: 'Orders', path: '/orders', icon: <Package size={14} />, category: 'Page' },
  { label: 'Dashboard', path: '/dashboard', icon: <BarChart3 size={14} />, category: 'Page' },
  { label: 'Notifications', path: '/notifications', icon: <Bell size={14} />, category: 'Page' },
  { label: 'Analytics', path: '/dashboard', icon: <BarChart3 size={14} />, category: 'Feature' },
  { label: 'Events', path: '/dashboard', icon: <BarChart3 size={14} />, category: 'Feature' },
]

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const filtered = query.length > 0
    ? SEARCH_ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : []

  const handleSelect = (path) => {
    navigate(path)
    setOpen(false)
    setQuery('')
  }

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="btn btn-ghost btn-sm gap-2 text-base-content/50"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="kbd kbd-sm hidden sm:inline">⌘K</kbd>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setOpen(false)} />
          <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-md bg-base-100 rounded-xl shadow-2xl z-50 border border-base-200">
            <div className="p-3 border-b border-base-200 flex items-center gap-2">
              <Search size={18} className="text-base-content/40" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, features..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                autoFocus
              />
              <button onClick={() => setOpen(false)} className="btn btn-ghost btn-xs btn-circle">
                <X size={14} />
              </button>
            </div>
            <div className="max-h-64 overflow-auto p-2">
              {filtered.length === 0 && query.length > 0 && (
                <p className="text-sm text-base-content/40 text-center py-4">No results found</p>
              )}
              {filtered.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.path)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 text-left transition"
                >
                  <span className="text-base-content/50">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-base-content/30 ml-auto">{item.category}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}