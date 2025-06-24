// index.js

const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path') // Para servir carpeta uploads

// 1️⃣ Importar middleware y rutas en el orden correcto
const authMiddleware = require('./middleware/authMiddleware')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')
const bannersRoutes = require('./routes/banners')

const pool = require('./db')

const app = express()
app.use(cors())
app.use(express.json()) // Para parsear JSON del body

// 2️⃣ Rutas públicas
app.use('/api/auth', authRoutes)
app.use('/api/productos', productRoutes)

// 3️⃣ Rutas protegidas con JWT
app.use('/api/ordenes', authMiddleware, orderRoutes)
app.use('/api/banners', authMiddleware, bannersRoutes)

// 4️⃣ Carpeta pública para archivos subidos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// 5️⃣ Rutas de prueba
app.get('/api/protegido', authMiddleware, (req, res) => {
  res.json({ mensaje: 'Acceso permitido', usuario: req.user })
})

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ success: true, time: result.rows[0].now })
  } catch (error) {
    console.error('Error DB:', error)
    res.status(500).json({ success: false, error: 'Fallo en conexión DB' })
  }
})

// 6️⃣ Levantar servidor
const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
)


