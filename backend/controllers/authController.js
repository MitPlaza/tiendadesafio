// controllers/authController.js
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

async function register(req, res) {
  const { nombre, email, password, rol = 'cliente' } = req.body

  try {
    const usuarioExistente = await userModel.buscarPorEmail(email)
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const nuevoUsuario = await userModel.crearUsuario({
      nombre,
      email,
      password: hashedPassword,
      rol
    })

    const token = jwt.sign(
      { id: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(201).json({
      mensaje: 'Usuario registrado con éxito',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      },
      token,
    })
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({ error: 'Error al registrar usuario' })
  }
}

async function login(req, res) {
  const { email, password } = req.body

  try {
    const usuario = await userModel.buscarPorEmail(email)
    if (!usuario) {
      return res.status(401).json({ error: 'Email no registrado' })
    }

    const match = await bcrypt.compare(password, usuario.password)
    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    )

    const { password: _, ...datosSinPassword } = usuario
    res.json({
      mensaje: 'Login exitoso',
      usuario: { ...datosSinPassword, rol: usuario.rol },
      token,
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}

module.exports = {
  register,
  login,
}
