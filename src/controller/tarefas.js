const express = require('express')
const Tarefas = require('../repositorio/Tarefas')
const HttpStatus = require('http-status-codes')

const router = express.Router()

router.get('/', (req, res, next) => {
    Tarefas.findAll()
    .then(tarefas => {
        res.status(HttpStatus.OK).json(tarefas)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/:tarefaId', (req, res, next) => {
    const id = req.params.tarefaId

    Tarefas.findByPk(id)
    .then(tarefa => {
        if (tarefa != null) {
            res.status(HttpStatus.OK).json(tarefa)
        } else {
            res.status(HttpStatus.NOT_FOUND).send()
        }
    })
    .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err)
    })
})

router.post('/', (req, res, next) => {
    Tarefas.create({
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