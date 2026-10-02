const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const codespacesHost = globalThis.location?.hostname.match(/^(.+)-\d+\.app\.github\.dev$/)?.[1]

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : codespacesHost
    ? `https://${codespacesHost}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(path) {
  return `${apiBaseUrl}${path}`
}

export function normalizeResourceResponse(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, pagination: null }
  }

  const items = payload.data ?? payload.results ?? payload.items ?? []
  const pagination = payload.pagination ?? payload.meta ?? {
    count: payload.count,
    next: payload.next,
    previous: payload.previous,
  }

  return {
    items: Array.isArray(items) ? items : [],
    pagination: Object.values(pagination).some(Boolean) ? pagination : null,
  }
}