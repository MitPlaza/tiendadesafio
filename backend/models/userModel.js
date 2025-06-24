// models/userModel.js
const pool = require('../db')


async function crearUsuario({ nombre, email, password, rol }) {
  const res = await pool.query(
    'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, email, password, rol]
  )
  return res.rows[0]
}


async function buscarPorEmail(email) {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  )
  return result.rows[0]
}

module.exports = {
  crearUsuario,
  buscarPorEmail,
}
