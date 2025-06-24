// controllers/productController.js
const productModel = require('../models/productModel')
const pool = require('../db')

async function listarProductos(req, res) {
  const { page = 1, limit = 10, buscar, categoria } = req.query
  const { productos, totalItems } = await productModel.obtenerProductos({ page, limit, buscar, categoria })
 res.json({ productos, totalItems, currentPage: +page, totalPages: Math.ceil(totalItems / limit) })
}



async function agregarProducto(req, res) {
  try {
    const producto = await productModel.crearProducto(req.body)
    res.status(201).json(producto)
  } catch (error) {
    console.error('Error al agregar producto:', error)
    res.status(500).json({ error: 'No se pudo crear el producto' })
  }
}

async function editarProducto(req, res) {
  const { id } = req.params
  try {
    const actualizado = await productModel.actualizarProducto(id, req.body)
    if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(actualizado)
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    res.status(500).json({ error: 'No se pudo actualizar el producto' })
  }
}

async function borrarProducto(req, res) {
  const { id } = req.params
  try {
    const eliminado = await productModel.eliminarProducto(id)
    if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json({ mensaje: 'Producto eliminado', producto: eliminado })
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    res.status(500).json({ error: 'No se pudo eliminar el producto' })
  }
}

async function obtenerProductoPorId(req, res) {
  const { id } = req.params
  try {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error al obtener producto por ID:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = {
  listarProductos,
  agregarProducto,
  editarProducto,
  borrarProducto,
  obtenerProductoPorId
}
