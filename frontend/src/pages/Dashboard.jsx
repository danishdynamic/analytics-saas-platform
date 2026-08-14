import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { API } from '../api/axios.js'
import { useAuthStore } from '../store/authStore.js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Activity, Calendar, TrendingUp, Zap, ShoppingBag, Package, Bell } from 'lucide-react'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']

export default function Dashboard() {
  const navigate = useNavigate()
  const { isAuth } = useAuthStore()
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => API.get('/api/v1/analytics/dashboard').then((r) => r.data),
  })

  const { data: eventsData } = useQuery({
    queryKey: ['events'],
    queryFn: () => API.get('/api/v1/events/').then((r) => r.data),
  })

  const { data: ordersData } = useQuery({
    queryKey: ['orders-quick'],
    queryFn: () => API.get('/api/v1/orders/').then((r) => r.data),
    enabled: isAuth,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-md text-primary"></span>
      </div>
    )
  }

  const byType = stats?.events_by_type ? Object.entries(stats.events_by_type).map(([name, value]) => ({ name, value })) : []
  const recent = eventsData?.slice(0, 8) || []
  const totalOrders = ordersData?.length || 0
  const totalRevenue = ordersData?.reduce((s, o) => s + o.total_amount, 0) || 0

  // Format event properties for human readable display
  const formatProperties = (props) => {
    if (!props || Object.keys(props).length === 0) return '-'
    const parts = []
    if (props.product_name) parts.push(`Added: ${props.product_name}`)
    if (props.total) parts.push(`Total: $${props.total}`)
    if (props.order_id) parts.push(`Order #${props.order_id}`)
    if (props.product_id) parts.push(`Product #${props.product_id}`)
    if (parts.length === 0) return Object.values(props).join(', ')
    return parts.join(' • ')
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-base-content/50">Welcome back! Here's what's happening.</p>
        </div>
        <div className="badge badge-primary gap-1">
          <Zap size={12} /> Live
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Activity size={18} />} label="Total Events" value={stats?.total_events || 0} color="primary" />
        <StatCard icon={<Calendar size={18} />} label="Today" value={stats?.today_events || 0} color="success" />
        <StatCard icon={<ShoppingBag size={18} />} label="Orders" value={totalOrders} color="secondary" />
        <StatCard icon={<TrendingUp size={18} />} label="Revenue" value={`$${totalRevenue.toFixed(0)}`} color="accent" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-sm">Events by Type</h3>
            {byType.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={byType}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'var(--b1)', border: '1px solid var(--b3)', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <EmptyState text="No event data yet" />}
          </div>
        </div>
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-sm">Distribution</h3>
            {byType.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={byType} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                    {byType.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--b1)', border: '1px solid var(--b3)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : <EmptyState text="No distribution data" />}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent Events */}
        <div className="card bg-base-100 shadow-sm lg:col-span-2">
          <div className="card-body p-0">
            <div className="px-5 py-3 border-b border-base-200 flex items-center justify-between">
              <h3 className="font-semibold text-sm">Recent Events</h3>
              <span className="text-xs text-base-content/40">{recent.length} events</span>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="bg-base-200/50 text-xs uppercase text-base-content/50">
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Details</th>
                    <th className="px-4 py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((e) => (
                    <tr key={e.id} className="hover:bg-base-200/30">
                      <td className="px-4 py-2">
                        <span className="badge badge-primary badge-sm">{e.event_type}</span>
                      </td>
                      <td className="px-4 py-2 text-sm text-base-content/60">{e.user_id || 'Guest'}</td>
                      <td className="px-4 py-2 text-xs text-base-content/70 max-w-[200px] truncate" title={formatProperties(e.properties)}>
                        {formatProperties(e.properties)}
                      </td>
                      <td className="px-4 py-2 text-xs text-base-content/40">
                        {new Date(e.created_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                  {recent.length === 0 && (
                    <tr><td colSpan="4" className="px-4 py-6 text-center text-base-content/40 text-sm">No events yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions - FIXED: use navigate instead of window.location */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-sm">Quick Actions</h3>
            <div className="space-y-2 mt-2">
              <button onClick={() => navigate('/shop')} className="btn btn-primary btn-sm w-full gap-2">
                <ShoppingBag size={14} /> Browse Shop
              </button>
              <button onClick={() => navigate('/orders')} className="btn btn-outline btn-sm w-full gap-2">
                <Package size={14} /> View Orders
              </button>
              <button onClick={() => navigate('/notifications')} className="btn btn-outline btn-sm w-full gap-2">
                <Bell size={14} /> Check Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  }

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 rounded-lg ${colorMap[color]}`}>{icon}</div>
          <span className="text-xs text-base-content/50">{label}</span>
        </div>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

function EmptyState({ text }) {
  return (
    <div className="h-[240px] flex flex-col items-center justify-center text-base-content/30">
      <Activity size={32} className="mb-2" />
      <p className="text-sm">{text}</p>
    </div>
  )
}