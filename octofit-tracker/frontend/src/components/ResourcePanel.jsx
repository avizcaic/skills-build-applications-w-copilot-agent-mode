function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (value == null) {
    return '—'
  }

  return String(value)
}

function ResourcePanel({ title, eyebrow, description, columns, items, pagination, loading, error }) {
  return (
    <section className="resource-panel" aria-labelledby={`${title}-heading`}>
      <div className="resource-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={`${title}-heading`}>{title}</h1>
        </div>
        <p>{description}</p>
      </div>

      {loading && <div className="status-message">Loading {title.toLowerCase()}...</div>}
      {error && <div className="status-message error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="table-wrap">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id ?? item.id ?? JSON.stringify(item)}>
                    {columns.map((column) => (
                      <td key={column.key}>{formatValue(item[column.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {items.length === 0 && <div className="status-message">No records returned.</div>}
          {pagination && (
            <div className="pagination-summary">
              {pagination.count != null && <span>{pagination.count} total records</span>}
              {pagination.next && <span>Next page available</span>}
              {pagination.previous && <span>Previous page available</span>}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default ResourcePanel