const express = require('express')
const Tarefa = require('../model/Tarefa')
const HttpStatus = require('http-status-codes')
const checarAuth = require('../middleware/checar-auth')

const router = express.Router()

router.get('/', checarAuth, (req, res, next) => {
    Tarefa.findAll()
    .then(tarefas => {
        res.status(HttpStatus.OK).json(tarefas)
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    })
})

router.get('/:tarefaId', checarAuth, (req, res, next) => {
    const id = req.params.tarefaId

    Tarefa.findByPk(id)
    .then(tarefa => {
        if (tarefa) {
            res.status(HttpStatus.OK).json(tarefa)
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                mensagem: 'Tarefa não encontrada'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    })
})

router.post('/', checarAuth, (req, res, next) => {
    Tarefa.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        status: req.body.status,
        usuario_id: req.body.usuario_id
    })
    .then(tarefa => {
        res.status(HttpStatus.CREATED).json(tarefa)
    })
    .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json(err.name)
    })    
})

module.exports = router