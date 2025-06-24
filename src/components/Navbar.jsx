// src/components/Navbar.jsx
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import LogoutButton from './LogoutButton'

export default function Navbar() {
  const { cart } = useCart()
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0)
  const token = localStorage.getItem('token')

  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>Tienda de Vinilos</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.button}>Inicio</Link>
        {!token && (
          <>
            <Link to="/registro" style={styles.button}>Registrarse</Link>
            <Link to="/login" style={styles.button}>Iniciar sesión</Link>
          </>
        )}
        <Link to="/carrito" style={styles.button}>
          🛒 Carrito ({totalItems})
        </Link>
        {token && <LogoutButton />}
      </div>
    </nav>
  )
}




const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#222',
    color: 'white',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1.2rem',
    border: '1px solid white',
    borderRadius: '6px',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
  }
}