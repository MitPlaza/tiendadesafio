const express = require('express')
const multer = require('multer')
const router = express.Router()

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// GET /api/banners ➝ lista banners ya guardados (ej. puedes devolver rutas de imagen)
router.get('/', async (req, res) => {
  // lógica para listar banners desde DB...
})

// POST /api/banners ➝ subir un nuevo banner
router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Archivo no enviado' })
  // Guardar en DB la ruta: req.file.filename o req.file.path
  // Luego devolver el registro creado:
  res.status(201).json({ mensaje: 'Banner creado', banner: { url: '/uploads/' + req.file.filename } })
})

module.exports = router


