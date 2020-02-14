
const Tarefa = require('../model/Tarefa')
const HttpStatus = require('http-status-codes')

exports.tarefas_get_all = (req, res, next) => {
    Tarefa.findAll({
        where: {
            usuario_id: req.userData.id
        }
    })
    .then(tarefas => {
        res.status(HttpStatus.OK).json(tarefas)
    })
    .catch(err => {
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            mensagem: 'Erro interno do servidor'
        })    
    })
}

exports.tarefas_get_tarefa = (req, res, next) => {
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
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            mensagem: 'Erro interno do servidor'
        })    
    })
}

exports.tarefas_create_tarefa = (req, res, next) => {
    const status = req.body.status

    if (!status_valid(status)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            mensagem: 'Status inválido. Valores válidos: pendente, fazendo e concluida'
        })
    }
    Tarefa.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        status: status,
        usuario_id: req.userData.id
    })
    .then(tarefa => {
        res.status(HttpStatus.CREATED).json(tarefa)
    })
    .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json({
            mensagem: err.name
        })
    })    
}

const status_valid = status => {
    const s = status.toLowerCase()
    return s == 'pendente' || s != 'fazendo' || s != 'concluida'
}

exports.tarefas_update_tarefa = (req, res, next) => {
    const status = req.body.status

    if (!status_valid(status)) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            mensagem: 'Status inválido. Valores válidos: pendente, fazendo e concluida'
        })
    }
    Tarefa.update({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        status: status,
        usuario_id: req.userData.id
    }, {
        where: {
            id: req.params.tarefaId
        }
    })
    .then(tarefa => {
        res.status(HttpStatus.CREATED).json(tarefa)
    })
    .catch(err => {
        res.status(HttpStatus.BAD_REQUEST).json({
            mensagem: err.name
        })
    })    
}