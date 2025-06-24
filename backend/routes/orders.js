// routes/orders.js
const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, orderController.guardarOrden)
router.get('/', authMiddleware, orderController.listarOrdenes)

module.exports = router
