import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

export default function Home() {
  const [productos, setProductos] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [buscar, setBuscar] = useState('')
  const [categoria, setCategoria] = useState('')
  const limit = 12
  const [banner, setBanner] = useState(null);

  useEffect(() => {
  fetch('/api/banners/activo')
    .then(res => res.json())
    .then(data => setBanner(data));
}, []);
  

  useEffect(() => {
    async function fetchProductos() {
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit,
          ...(buscar ? { buscar } : {}),
          ...(categoria ? { categoria } : {})
        })
        const res = await fetch(`http://localhost:3001/api/productos?${params}`)
        const data = await res.json()
        setProductos(data.productos || [])
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        console.error('Error cargando productos:', err)
      }
    }
    fetchProductos()
  }, [currentPage, buscar, categoria])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Productos destacados</h1>
      <h3>Registrate para comprar</h3>

      {/* Buscador y filtro */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={buscar}
          onChange={e => { setBuscar(e.target.value); setCurrentPage(1) }}
        />
        <select
          value={categoria}
          onChange={e => { setCategoria(e.target.value); setCurrentPage(1) }}
        >
          <option value="">Todas las categorías</option>
          {/* Asegúrate de tener el mismo listado en data/categorias.js */}
          <option>Rock</option>
          <option>Funk</option>
          <option>Pop</option>
          <option>Reggae</option>
          <option>Soundtrack</option>
          <option>Electrónica</option>
          <option>Metal</option>
          <option>Rock Progresivo</option>
        </select>
        {(buscar || categoria) && (
          <button onClick={() => { setBuscar(''); setCategoria(''); setCurrentPage(1) }}>
            ✖ Limpiar
          </button>
        )}
      </div>

      {/* Listado de productos y paginador */}
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <>
        {banner && <img src={banner.url} style={{ width: '100%' }} alt='Banner' />}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {productos.map(p => (
              <ProductCard
                key={p.id}
                id={p.id}
                nombre={p.nombre}
                precio={p.precio}
                imagen={p.imagen}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}
