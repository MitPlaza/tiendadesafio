// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductDetail from '../pages/ProductDetail'
import Navbar from '../components/Navbar'
import CartPage from '../pages/CartPage'
import Checkout from '../pages/Checkout'
import DashboardLayout from '../admin/DashboardLayout'
import Productos from '../admin/Productos'
import Banners from '../admin/Banners'
import Pedidos from '../admin/Pedidos'
import RequireAdmin from '../components/RequireAdmin'  // 👈 importar

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <DashboardLayout />
            </RequireAdmin>
          }
        >
          <Route path="productos" element={<Productos />} />
          <Route path="banners" element={<Banners />} />
          <Route path="pedidos" element={<Pedidos />} />
        </Route>
      </Routes>
    </Router>
  )
}
