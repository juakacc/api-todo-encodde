const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const Usuario = require('./Usuarios')

const Tarefas = sequelize.define('tarefa', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendente'
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    timestamps: false
})

Tarefas.sync()

module.exports=Tarefas