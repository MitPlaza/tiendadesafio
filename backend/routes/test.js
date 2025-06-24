// index.js (temporalmente)
const authMiddleware = require('./middleware/authMiddleware')

app.get('/api/protegido', authMiddleware, (req, res) => {
  res.json({
    mensaje: 'Acceso permitido',
    usuario: req.user, // id y email del token
  })
})
