const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')
require('dotenv').config()

const check = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] // Desconsidera o Bearer
        const decodificado = jwt.verify(token, process.env.SECRET_KEY_TOKEN)
        req.userData = decodificado
        next()
    } catch (err) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            mensagem: 'Não autorizado'
        })
    }
}

module.exports=check