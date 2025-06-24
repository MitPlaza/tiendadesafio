// src/components/RequireAdmin.jsx
import { Navigate } from 'react-router-dom'

export default function RequireAdmin({ children }) {
  const rol = localStorage.getItem('rol')
  if (rol !== 'admin') {
    return <Navigate to="/" replace />
  }
  return children
}
