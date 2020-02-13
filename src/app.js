const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')

const tarefasRotas = require('./controller/tarefas')
const usuariosRotas = require('./controller/usuarios')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Resquested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/tarefas', tarefasRotas)
app.use('/usuarios', usuariosRotas)

app.get('/', function(req, res) {
    res.send('API - TODO Encodde')
})

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app