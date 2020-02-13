const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const local_db = 'localhost'
const database_db = 'todo_api'
const username_db = 'juakadb'
const password_db = 'juaka123'

mysql.createConnection({
    user: username_db,
    password: password_db
}).then(connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${database_db}`)
})

const sequelize = new Sequelize(database_db, username_db, password_db, {
    host: local_db,
    dialect: 'mysql'
})

sequelize.authenticate()
.then(() => {
    console.log('Conexão com o BD estabelecida com sucesso!')
})
.catch(err => {
    console.error('Erro ao conectar o BD:', err)
})

module.exports=sequelize