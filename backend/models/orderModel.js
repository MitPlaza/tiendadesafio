// models/orderModel.js
const pool = require('../db')

async function crearOrden({ nombre, email, direccion, productos }) {
  const total = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  // 1. Insertar en tabla ordenes
  const result = await pool.query(
    `INSERT INTO ordenes (nombre_comprador, email_comprador, direccion_envio, total)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombre, email, direccion, total]
  )

  const orden = result.rows[0]

  // 2. Insertar ítems relacionados
  const inserts = productos.map(item => {
    return pool.query(
      `INSERT INTO orden_items
       (orden_id, producto_id, nombre_producto, precio_unitario, cantidad)
       VALUES ($1, $2, $3, $4, $5)`,
      [orden.id, item.producto_id, item.nombre, item.precio, item.cantidad]
    )
  })

  await Promise.all(inserts)

  // 3. Actualizar stock de productos
  const updates = productos.map(item => {
    return pool.query(
      `UPDATE productos SET stock = stock - $1 WHERE id = $2 AND stock >= $1`,
      [item.cantidad, item.producto_id]
    )
  })

  await Promise.all(updates)

  return orden
}

async function obtenerOrdenesConItems() {
  const ordenesRes = await pool.query('SELECT * FROM ordenes ORDER BY fecha DESC')
  const ordenes = ordenesRes.rows

  const ordenesConItems = await Promise.all(
    ordenes.map(async (orden) => {
      const itemsRes = await pool.query(
        'SELECT producto_id, nombre_producto, precio_unitario, cantidad FROM orden_items WHERE orden_id = $1',
        [orden.id]
      )
      return {
        ...orden,
        items: itemsRes.rows
      }
    })
  )

  return ordenesConItems
}

module.exports = {
  crearOrden,
  obtenerOrdenesConItems
}

