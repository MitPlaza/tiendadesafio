// routes/products.js
const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const { isAdmin } = require('../middleware/roleMiddleware')

// Público
router.get('/', productController.listarProductos)
router.get('/:id', productController.obtenerProductoPorId)

// Protegido: solo usuarios logueados (puedes filtrar admin más adelante)
router.post('/', authMiddleware, isAdmin, productController.agregarProducto)

router.put('/:id', authMiddleware, isAdmin, productController.editarProducto)
router.delete('/:id', authMiddleware, isAdmin, productController.borrarProducto)

module.exports = router

