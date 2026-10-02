import { useEffect, useState } from 'react'
import { apiUrl, normalizeResourceResponse } from '../api.js'
import ResourcePanel from './ResourcePanel.jsx'

const columns = [
  { key: 'displayName', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'team', label: 'Team' },
  { key: 'role', label: 'Role' },
  { key: 'fitnessGoal', label: 'Goal' },
]

function Users() {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch(apiUrl('/api/users/'), { signal: controller.signal })
        if (!response.ok) throw new Error('Unable to load users')
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

    loadUsers()
    return () => controller.abort()
  }, [])

  return <ResourcePanel title="Users" eyebrow="Profiles" description="Athletes, teams, roles, and personalized fitness goals." columns={columns} items={items} pagination={pagination} loading={loading} error={error} />
}

export default Users