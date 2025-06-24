import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
  const { cart, updateCantidad, removeFromCart } = useCart()
  const navigate = useNavigate()

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Producto</th>
                <th style={styles.th}>Precio</th>
                <th style={styles.th}>Cantidad</th>
                <th style={styles.th}>Subtotal</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>{item.nombre}</td>
                  <td style={styles.td}>${item.precio}</td>
                  <td style={styles.td}>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={e => updateCantidad(item.id, parseInt(e.target.value))}
                      style={styles.input}
                    />
                  </td>
                  <td style={styles.td}>${(item.precio * item.cantidad).toLocaleString()}</td>
                  <td style={styles.td}>
                    <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.total}>
            <h3>Total: ${total.toLocaleString()}</h3>
            <button onClick={() => navigate('/checkout')} style={styles.checkoutButton}>Finalizar compra</button>
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem',
  },
  th: {
    textAlign: 'left',
    padding: '0.75rem',
    borderBottom: '2px solid #ddd',
    background: '#f3f3f3',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '0.75rem',
    verticalAlign: 'middle',
  },
  input: {
    width: '60px',
    padding: '0.25rem',
  },
  removeButton: {
    backgroundColor: '#c0392b',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  total: {
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '1rem',
  }
}
