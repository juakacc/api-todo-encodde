const bcripty = require('bcryptjs')
const HttpStatus = require('http-status-codes')
const jwt = require('jsonwebtoken')
const Usuario = require('../model/Usuario')

exports.usuarios_get_all = (req, res, next) => {
    Usuario.findAll()
    .then(usuarios => {
        res.status(HttpStatus.OK).json(usuarios)
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            mensagem: 'Erro interno do servidor'
        })    
    })    
}

exports.usuarios_get_usuario = (req, res, next) => {
    const id = req.params.usuarioId

    Usuario.findByPk(id)
    .then(usuario => {
        if (usuario) {
            res.status(HttpStatus.OK).json(usuario)
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                mensagem: 'Usuário não encontrado'
            })    
        }
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            mensagem: 'Erro interno do servidor'
        })    
    })
}

exports.usuarios_create_usuario = (req, res, next) => {
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
        res.status(HttpStatus.BAD_REQUEST).json({
            mensagem: err.name
        })    
    })    
}

exports.usuarios_login = (req, res, next) => {
    Usuario.findAll({
        where: {
            username: req.body.username
        }
    })
    .then(usuario => {
        if (usuario.length < 1) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                mensagem: 'Usuário inexistente'
            })
        }
        if (!bcripty.compareSync(req.body.password, usuario[0].password)) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                mensagem: 'Senha incorreta'
            })
        }
        const token = jwt.sign({
            username: usuario[0].username,
            id: usuario[0].id
        }, 
        process.env.SECRET_KEY_TOKEN, 
        { expiresIn: '30days' }) // tempo longo para testes

        return res.status(HttpStatus.OK).json({
            mensagem: 'Autenticado com sucesso',
            token: token,
            usuario_id: usuario[0].id
        })
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            mensagem: 'Erro interno do servidor'
        })    
    })
}