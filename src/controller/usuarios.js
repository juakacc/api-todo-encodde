const express = require('express')
const Usuarios = require('../repositorio/Usuarios')
const bcripty = require('bcryptjs')
const HttpStatus = require('http-status-codes')

const router = express.Router()

router.get('/', (req, res, next) => {
    Usuarios.findAll()
    .then(usuarios => {
        res.status(HttpStatus.OK).json(usuarios)
    })
    .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err.name)
    })    
})

router.get('/:usuarioId', (req, res, next) => {
    const id = req.params.usuarioId
    if (id === 'esse') {
        res.status(200).json({
            message: 'Está usando um id especial'
        })
    } else {
        res.status(200).json({
            message: 'Seu id não é especial'
        })
    }
})

router.post('/', (req, res, next) => {
    const salt = bcripty.genSaltSync(10)
    const password = bcripty.hashSync(req.body.password, salt)
    // bcrypt.compareSync("not_bacon", hash) - voltar
    Usuarios.create({
        nome: req.body.nome,
        username: req.body.username,
        password: password
    })
    .then(usuario => {
        res.status(HttpStatus.CREATED).json(usuario.dataValues)
    })
    .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json(err.name)    
    })    
})

module.exports = router