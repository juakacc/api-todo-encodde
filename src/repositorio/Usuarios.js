const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Usuarios = sequelize.define('usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
})

Usuarios.sync()

module.exports=Usuarios