import { useEffect, useState } from 'react'
import { Activity, Zap } from 'lucide-react'

export default function LiveFeed() {
  const [events, setEvents] = useState([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const wsUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}`.replace('http', 'ws')
    const ws = new WebSocket(`${wsUrl}/api/v1/ws/ws`)

    ws.onopen = () => setConnected(true)
    ws.onclose = () => setConnected(false)

    ws.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data)
        setEvents((prev) => [data, ...prev].slice(0, 10))
      } catch {
        // ignore non-JSON
      }
    }

    return () => ws.close()
  }, [])

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="card-title text-sm">Live Feed</h3>
          <div className={`badge badge-xs gap-1 ${connected ? 'badge-success' : 'badge-error'}`}>
            <Zap size={10} /> {connected ? 'Live' : 'Offline'}
          </div>
        </div>
        <div className="space-y-2 max-h-48 overflow-auto">
          {events.length === 0 && (
            <p className="text-xs text-base-content/40 text-center py-4">Waiting for events...</p>
          )}
          {events.map((e, i) => (
            <div key={i} className="flex items-center gap-2 text-xs p-2 rounded bg-base-200/50">
              <Activity size={12} className="text-primary" />
              <span className="font-medium">{e.type || 'event'}</span>
              <span className="text-base-content/50 truncate">{JSON.stringify(e.data).slice(0, 40)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}