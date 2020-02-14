const express = require('express')

const UsuarioService = require('../service/usuarioService')
const checarAuth = require('../middleware/checar-auth')
require('dotenv').config()

const router = express.Router()

router.get('/', checarAuth, UsuarioService.usuarios_get_all)

router.get('/:usuarioId', checarAuth, UsuarioService.usuarios_get_usuario)

router.post('/', UsuarioService.usuarios_create_usuario)

router.post('/login', UsuarioService.usuarios_login)

module.exports = router