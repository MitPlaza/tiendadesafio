// models/productModel.js
const pool = require('../db')

async function obtenerProductos({ categoria, buscar, page = 1, limit = 10 }) {
  const offset = (page - 1) * limit
  const filtros = []
  const valores = []

  if (categoria) {
    filtros.push(`categoria ILIKE $${valores.length + 1}`)
    valores.push(`%${categoria}%`)
  }
  if (buscar) {
    filtros.push(`nombre ILIKE $${valores.length + 1}`)
    valores.push(`%${buscar}%`)
  }
  const where = filtros.length ? `WHERE ${filtros.join(' AND ')}` : ''

  // Primero el total
  const countRes = await pool.query(`SELECT COUNT(*) FROM productos ${where}`, valores)
  const totalItems = parseInt(countRes.rows[0].count, 10)

  valores.push(limit, offset)
  const listRes = await pool.query(
    `SELECT * FROM productos ${where} ORDER BY id DESC LIMIT $${valores.length - 1} OFFSET $${valores.length}`,
    valores
  )
  return { productos: listRes.rows, totalItems }
}


async function crearProducto(data) {
  const { nombre, precio, categoria, imagen, stock, activo } = data
  const result = await pool.query(
    `INSERT INTO productos (nombre, precio, categoria, imagen, stock, activo)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [nombre, precio, categoria, imagen, stock, activo]
  )
  return result.rows[0]
}

async function actualizarProducto(id, data) {
  const { nombre, precio, categoria, imagen, stock, activo } = data
  const result = await pool.query(
    `UPDATE productos SET
      nombre = $1,
      precio = $2,
      categoria = $3,
      imagen = $4,
      stock = $5,
      activo = $6
     WHERE id = $7
     RETURNING *`,
    [nombre, precio, categoria, imagen, stock, activo, id]
  )
  return result.rows[0]
}

async function eliminarProducto(id) {
  const result = await pool.query(
    'DELETE FROM productos WHERE id = $1 RETURNING *',
    [id]
  )
  return result.rows[0]
}

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
}

