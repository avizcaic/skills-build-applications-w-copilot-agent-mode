import { useEffect, useState } from 'react'
import { apiUrl, normalizeResourceResponse } from '../api.js'
import ResourcePanel from './ResourcePanel.jsx'

const columns = [
  { key: 'username', label: 'Member' },
  { key: 'team', label: 'Team' },
  { key: 'activityType', label: 'Activity' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'caloriesBurned', label: 'Calories' },
]

function Activities() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadActivities() {
      try {
        const response = await fetch(apiUrl('/api/activities/'), { signal: controller.signal })
        if (!response.ok) throw new Error('Unable to load activities')
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

    loadActivities()
    return () => controller.abort()
  }, [])

  return <ResourcePanel title="Activities" eyebrow="Training Log" description="Recent workouts across every OctoFit team." columns={columns} items={items} pagination={pagination} loading={loading} error={error} />
}

export default Activities