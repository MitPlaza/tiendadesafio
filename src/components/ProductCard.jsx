import { Link } from 'react-router-dom'

export default function ProductCard({ id, nombre, precio, imagen }) {
  return (
    <div style={styles.card}>
      <img src={imagen} alt={nombre} style={styles.img} />
      <h3>{nombre}</h3>
      <p>${precio.toLocaleString()}</p>
      <Link to={`/producto/${id}`}>
        <button style={styles.button}>Ver más</button>
      </Link>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    width: '200px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  img: {
    width: '100%',
    height: 'auto',
    marginBottom: '1rem'
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.4rem 1rem',
    backgroundColor: '#222',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
}
