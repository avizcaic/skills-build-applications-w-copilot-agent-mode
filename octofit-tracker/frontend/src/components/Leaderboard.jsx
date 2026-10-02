import { useEffect, useState } from 'react'
import { apiUrl, normalizeResourceResponse } from '../api.js'
import ResourcePanel from './ResourcePanel.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'username', label: 'Member' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'activeMinutes', label: 'Active Minutes' },
]

function Leaderboard() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      try {
        const response = await fetch(apiUrl('/api/leaderboard/'), { signal: controller.signal })
        if (!response.ok) throw new Error('Unable to load leaderboard')
        const payload = await response.json()
        const normalized = normalizeResourceResponse(payload)
        setItems(normalized.items)
        setPagination(normalized.pagination)
      } catch (loadError) {
        if (loadError.name !== 'AbortError') setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
    return () => controller.abort()
  }, [])

  return <ResourcePanel title="Leaderboard" eyebrow="Competition" description="Current standings by points and active minutes." columns={columns} items={items} pagination={pagination} loading={loading} error={error} />
}

export default Leaderboard