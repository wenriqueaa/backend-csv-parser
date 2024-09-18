const { body } = require('express-validator')

// normalizeEmail que sea email y no este vacio
const users = [
    body('email', 'Ups!! Email is required').notEmpty(),
    body('email', 'Email is not valid!!').isEmail(),
    body('password', 'Hola revisando!! password must contain at least, uppercase, lowercase, numbers and characters').isStrongPassword()
]

module.exports = users
