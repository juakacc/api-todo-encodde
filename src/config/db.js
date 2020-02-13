const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')
require('dotenv').config()

const local_db = process.env.LOCAL_DB
const database_db = process.env.DATABASE_DB
const username_db = process.env.USERNAME_DB
const password_db = process.env.PASSWORD_DB

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