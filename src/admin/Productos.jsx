// src/admin/Productos.jsx
import { useState, useEffect } from 'react'
import categorias from '../data/categorias'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [nuevo, setNuevo] = useState({ nombre:'',precio:'',categoria:'',stock:'',imagen:'' })
  const [modoEdicion, setModoEdicion] = useState(false)
  const [productoEditar, setProductoEditar] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function cargar(){
      try {
        const res = await fetch('http://localhost:3001/api/productos', {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log('Carga productos status:', res.status)
        const data = await res.json()
        console.log('Productos recibidos:', data)
        setProductos(data.productos || [])  // Aquí: usa data.productos
      } catch (err) {
        console.error('Error al cargar productos:', err)
      }
    }
    if (token) cargar()
  }, [token])

  const handleChange = e => setNuevo({ ...nuevo, [e.target.name]: e.target.value })

  const agregarProducto = async e => {
    e.preventDefault()
    if (!nuevo.nombre || !nuevo.precio) return alert('Nombre y precio son obligatorios')

    const payload = {
      ...nuevo,
      precio: parseInt(nuevo.precio),
      stock: parseInt(nuevo.stock),
      activo: true
    }

    const url = modoEdicion
      ? `http://localhost:3001/api/productos/${productoEditar.id}`
      : 'http://localhost:3001/api/productos'
    const method = modoEdicion ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      console.log('Respuesta backend producto:', res.status, data)

      if (res.ok) {
        if (modoEdicion) {
          setProductos(productos.map(p => p.id === data.id ? data : p))
          setModoEdicion(false)
          setProductoEditar(null)
        } else {
          setProductos([...productos, data])
        }
        setNuevo({ nombre:'', precio:'', categoria:'', stock:'', imagen:'' })
      } else {
        console.error('Error backend:', data)
        alert('Error al guardar el producto')
      }
    } catch (err) {
      console.error('Fallo conexión:', err)
      alert('Error de red o servidor')
    }
  }

  const eliminarProducto = async id => {
    if (!confirm('¿Eliminar producto?')) return
    try {
      const res = await fetch(`http://localhost:3001/api/productos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Eliminar status:', res.status)
      if (res.ok) setProductos(productos.filter(p => p.id !== id))
      else alert('No se pudo eliminar el producto')
    } catch (err) {
      console.error('Error delete:', err)
      alert('Fallo de conexión')
    }
  }

  const editarProducto = producto => {
    setModoEdicion(true)
    setProductoEditar(producto)
    setNuevo({
      nombre: producto.nombre,
      precio: producto.precio.toString(),
      categoria: producto.categoria,
      stock: producto.stock.toString(),
      imagen: producto.imagen
    })
  }

  return (
    <div style={styles.container}>
      <h2>Gestión de Productos</h2>
      <form onSubmit={agregarProducto} style={styles.form}>
        <input name="nombre" placeholder="Nombre" value={nuevo.nombre} onChange={handleChange} required />
        <input name="precio" placeholder="Precio" type="number" value={nuevo.precio} onChange={handleChange} required />
        <select name="categoria" value={nuevo.categoria} onChange={handleChange} required>
          <option value="">Seleccionar categoría</option>
          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input name="stock" placeholder="Stock" type="number" value={nuevo.stock} onChange={handleChange} required />
        <input name="imagen" placeholder="URL Imagen" value={nuevo.imagen} onChange={handleChange} required />
        <button type="submit">{modoEdicion ? 'Guardar cambios' : 'Agregar'}</button>
      </form>

      <ul style={styles.lista}>
        {productos.map(p => (
          <li key={p.id} style={styles.item}>
            <img src={p.imagen} alt={p.nombre} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div><strong>{p.nombre}</strong><br />${p.precio} — {p.categoria} — Stock: {p.stock}</div>
            <button onClick={() => editarProducto(p)}>Editar</button>
            <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles = {
  container: { padding: '1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px', marginBottom: '2rem' },
  lista: { listStyle: 'none', padding: 0 },
  item: { display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }
}
