import { useEffect, useState } from 'react'
import { apiUrl, normalizeResourceResponse } from '../api.js'
import ResourcePanel from './ResourcePanel.jsx'

const columns = [
  { key: 'title', label: 'Workout' },
  { key: 'focusArea', label: 'Focus' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Minutes' },
  { key: 'recommendedFor', label: 'Recommended For' },
]

function Workouts() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      try {
        const response = await fetch(apiUrl('/api/workouts/'), { signal: controller.signal })
        if (!response.ok) throw new Error('Unable to load workouts')
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

    loadWorkouts()
    return () => controller.abort()
  }, [])

  return <ResourcePanel title="Workouts" eyebrow="Suggestions" description="Personalized workout ideas matched to member goals." columns={columns} items={items} pagination={pagination} loading={loading} error={error} />
}

export default Workouts