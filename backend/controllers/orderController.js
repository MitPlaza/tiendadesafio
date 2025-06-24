// controllers/orderController.js
const orderModel = require('../models/orderModel')

async function guardarOrden(req, res) {
  try {
    const {
      nombre_comprador,
      email_comprador,
      direccion_envio,
      productos
    } = req.body;

    if (!nombre_comprador || !direccion_envio || !productos || productos.length === 0) {
      return res.status(400).json({ error: 'Datos incompletos para la orden' });
    }

    // Reasignar para que coincidan con lo que espera el modelo
    const orden = await orderModel.crearOrden({
      nombre: nombre_comprador,
      email: email_comprador,
      direccion: direccion_envio,
      productos
    });

    res.status(201).json({
      mensaje: 'Orden registrada con éxito',
      orden
    });
  } catch (error) {
    console.error('Error al registrar orden:', error);
    res.status(500).json({ error: 'Error al guardar la orden' });
  }
}

async function listarOrdenes(req, res) {
  try {
    const ordenes = await orderModel.obtenerOrdenesConItems()
    res.json(ordenes)
  } catch (error) {
    console.error('Error al obtener órdenes:', error)
    res.status(500).json({ error: 'No se pudieron obtener las órdenes' })
  }
}

module.exports = {
  guardarOrden,
  listarOrdenes
}
