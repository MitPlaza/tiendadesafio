export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  if (totalPages <= 1) return null

  return (
    <nav>
      <ul style={{display:'flex', gap:'0.5rem'}}>
        {currentPage > 1 &&
          <li><button onClick={() => onPageChange(currentPage - 1)}>Anterior</button></li>
        }
        {pages.map(page =>
          <li key={page}>
            <button
              style={{ fontWeight: page === currentPage ? 'bold' : 'normal' }}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        )}
        {currentPage < totalPages &&
          <li><button onClick={() => onPageChange(currentPage + 1)}>Siguiente</button></li>
        }
      </ul>
    </nav>
  )
}
