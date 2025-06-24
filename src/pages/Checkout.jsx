import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  })

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert('Tu carrito está vacío.')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      alert('Debes iniciar sesión para continuar con la compra.')
      return
    }

    const payload = {
      nombre_comprador: formData.nombre,
      email_comprador: formData.email,
      direccion_envio: formData.direccion,
      total,
      productos: cart.map(p => ({
      producto_id: p.id,
      nombre: p.nombre,
      cantidad: p.cantidad,
      precio: p.precio
    }))
    }

    console.log('🟡 Enviando orden al backend:', payload)

    try {
      const response = await fetch('http://localhost:3001/api/ordenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok) {
        console.log('✅ Orden registrada con éxito:', data)
        alert('Compra realizada con éxito 🎉')
        clearCart()
        navigate('/')
      } else {
        console.error('❌ Error al registrar la orden:', data)
        alert('Error al registrar la orden ❌')
      }
    } catch (error) {
      console.error('❌ Error en la solicitud:', error)
      alert('Hubo un problema al procesar la compra')
    }
  }

  return (
    <div style={styles.container}>
      <h2>Finalizar Compra</h2>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <h3>Resumen de productos</h3>
          <ul style={styles.productList}>
            {cart.map((item) => (
              <li key={item.id}>
                {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
              </li>
            ))}
          </ul>

          <h3>Total: ${total.toLocaleString()}</h3>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
            <button type="submit">Pagar</button>
          </form>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  productList: {
    listStyle: 'none',
    paddingLeft: 0,
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.5rem',
  }
}
