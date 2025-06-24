import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [producto, setProducto] = useState(null)
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    fetch(`http://localhost:3001/api/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error('Error al cargar producto:', err))
  }, [id])

  if (!producto) return <p>Cargando...</p>

  const handleAgregar = () => {
    addToCart(producto, cantidad)
    alert('Producto agregado al carrito')
  }

  return (
    <div style={styles.container}>
      <img src={producto.imagen} alt={producto.nombre} style={styles.img} />
      <div style={styles.info}>
        <h2>{producto.nombre}</h2>
        <p><strong>Precio:</strong> ${producto.precio.toLocaleString()}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Stock disponible:</strong> {producto.stock}</p>
        <p>{producto.descripcion}</p>

        {producto.stock > 0 ? (
          <>
            <label>
              Cantidad:
              <input
                type="number"
                min="1"
                max={producto.stock}
                value={cantidad}
                onChange={e => setCantidad(Math.min(producto.stock, parseInt(e.target.value) || 1))}
                style={styles.input}
              />
            </label>
            <button onClick={handleAgregar} style={styles.button}>Agregar al carrito</button>
          </>
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>Sin stock</p>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    gap: '2rem',
    padding: '2rem',
    alignItems: 'flex-start'
  },
  img: {
    width: '300px',
    borderRadius: '8px'
  },
  info: {
    flex: 1
  },
  input: {
    marginLeft: '1rem',
    width: '60px',
    padding: '0.3rem',
    fontSize: '1rem'
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1.5rem',
    backgroundColor: '#222',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
}
