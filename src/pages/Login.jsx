import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('rol', data.usuario.rol)          // 👈 Guardar rol
        localStorage.setItem('usuario', JSON.stringify(data.usuario))
        alert('Login exitoso ✅')

        if (data.usuario.rol === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      } else {
        alert('Login fallido ❌')
        console.log(data)
      }
    } catch (error) {
      console.error('Error en login:', error)
      alert('Ocurrió un error en el login')
    }
  }

  return (
    <div style={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

const styles = {
  container: { padding: '2rem', maxWidth: '400px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' }
}


