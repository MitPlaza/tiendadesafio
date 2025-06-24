// src/admin/Pedidos.jsx
import { useEffect, useState } from 'react'

export default function Pedidos() {
  const [ordenes, setOrdenes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token') // o donde guardes el JWT

    fetch('http://localhost:3001/api/ordenes', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setOrdenes(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error al cargar pedidos:', err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando pedidos...</p>

  return (
    <div>
      <h2>Órdenes registradas</h2>
      {ordenes.length === 0 ? (
        <p>No hay pedidos aún.</p>
      ) : (
        <ul style={styles.lista}>
          {ordenes.map((orden) => (
            <li key={orden.id} style={styles.orden}>
              <p><strong>Comprador:</strong> {orden.nombre_comprador}</p>
              <p><strong>Dirección:</strong> {orden.direccion_envio}</p>
              <p><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString()}</p>
              <p><strong>Total:</strong> ${orden.total.toLocaleString()}</p>
              <p><strong>Productos:</strong>
              <ul>
                {orden.items.map((item, index) => (
                  <li key={index}>
                    {item.nombre_producto} x {item.cantidad} → ${item.precio_unitario.toLocaleString()}
                  </li>
                ))}
              </ul></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const styles = {
  lista: {
    listStyle: 'none',
    padding: 0,
    marginTop: '1rem'
  },
  orden: {
    display:'flex',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9'
  }
}
