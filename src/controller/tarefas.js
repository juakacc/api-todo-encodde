const express = require('express')
const TarefaService = require('../service/tarefaService')
const checarAuth = require('../middleware/checar-auth')

const router = express.Router()

router.get('/', checarAuth, TarefaService.tarefas_get_all)

router.get('/:tarefaId', checarAuth, TarefaService.tarefas_get_tarefa)

router.post('/', checarAuth, TarefaService.tarefas_create_tarefa)

module.exports = router