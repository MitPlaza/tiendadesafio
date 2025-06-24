const pool = require('../db')

exports.crearBanner = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Imagen requerida' })
  const url = `/uploads/banners/${req.file.filename}`
  const result = await pool.query(
    'INSERT INTO banners (imagen_url) VALUES ($1) RETURNING *',
    [url]
  )
  res.status(201).json(result.rows[0])
}

exports.listarBanners = async (req, res) => {
  const result = await pool.query('SELECT * FROM banners ORDER BY id DESC')
  res.json(result.rows)
}
