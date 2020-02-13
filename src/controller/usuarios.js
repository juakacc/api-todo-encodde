const express = require('express')
const Usuario = require('../model/Usuario')
const bcripty = require('bcryptjs')
const HttpStatus = require('http-status-codes')
const jwt = require('jsonwebtoken')
const checarAuth = require('../middleware/checar-auth')
require('dotenv').config()

const router = express.Router()

router.get('/', checarAuth, (req, res, next) => {
    Usuario.findAll()
    .then(usuarios => {
        res.status(HttpStatus.OK).json(usuarios)
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    })    
})

router.get('/:usuarioId', checarAuth, (req, res, next) => {
    const id = req.params.usuarioId

    Usuario.findByPk(id)
    .then(usuario => {
        if (usuario) {
            res.status(HttpStatus.OK).json(usuario)
        } else {
            res.status(HttpStatus.NOT_FOUND).send()
        }
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    })
})

router.post('/', (req, res, next) => {
    const salt = bcripty.genSaltSync(10)
    const password = bcripty.hashSync(req.body.password, salt)
    
    Usuario.create({
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

router.post('/login', (req, res, next) => {
    Usuario.findAll({
        where: {
            username: req.body.username
        }
    })
    .then(usuario => {
        if (usuario.length < 1) {
            res.status(HttpStatus.UNAUTHORIZED).json({
                mensagem: 'Usuário inexistente'
            })
        }
        bcripty.compareSync(req.body.password, usuario[0].password, (err, result) => {
            if (err) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    mensagem: 'Erro na validação'
                })
            }
            if (!result) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    mensagem: 'Senha incorreta'
                })  
            }
            const token = jwt.sign({
                    username: usuario[0].username,
                    id: usuario[0].id
                }, 
                process.env.SECRET_KEY_TOKEN, 
                { expiresIn: '1h' })

            return res.status(HttpStatus.OK).json({
                mensagem: 'Autenticado com sucesso',
                token: token
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    })
})

module.exports = router