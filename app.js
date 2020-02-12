var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.send('Api - TODO Encodde')
})

var users = [
    {id: 1, username: 'joaquim', email: 'juakacc@gmail.com'},
    {id: 2, username: 'joao', email: 'juakacc@gmail.com'},
    {id: 3, username: 'maria', email: 'juakacc@gmail.com'},
]

app.get('/api/listaUsers', function(req, res) {
    res.send(users)
})

app.listen(8888, function() {
    console.log('Servidor rodando na porta 8888')
})