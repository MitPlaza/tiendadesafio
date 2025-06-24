import { Link, Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={styles.sidebar}>
        <h3>Admin</h3>
        <nav>
          <ul style={styles.navList}>
            <li><Link to="/admin/productos">Productos</Link></li>
            <li><Link to="/admin/banners">Banners</Link></li>
            <li><Link to="/admin/pedidos">Pedidos</Link></li>
          </ul>
        </nav>
      </aside>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  main: {
    flexGrow: 1,
    padding: '2rem',
    background: '#f5f5f5'
  }
}
