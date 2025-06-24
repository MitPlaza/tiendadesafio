// src/components/LogoutButton.jsx
import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    navigate('/login')
  }

  return <button onClick={handleLogout}>Cerrar sesión</button>
}
