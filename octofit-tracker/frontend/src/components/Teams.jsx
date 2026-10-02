import { useEffect, useState } from 'react'
import { apiUrl, normalizeResourceResponse } from '../api.js'
import ResourcePanel from './ResourcePanel.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'city', label: 'City' },
  { key: 'coach', label: 'Coach' },
  { key: 'memberCount', label: 'Members' },
  { key: 'weeklyGoalMinutes', label: 'Weekly Goal' },
]

function Teams() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadTeams() {
      try {
        const response = await fetch(apiUrl('/api/teams/'), { signal: controller.signal })
        if (!response.ok) throw new Error('Unable to load teams')
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

    loadTeams()
    return () => controller.abort()
  }, [])

  return <ResourcePanel title="Teams" eyebrow="Groups" description="Team rosters, coaches, and weekly movement targets." columns={columns} items={items} pagination={pagination} loading={loading} error={error} />
}

export default Teams