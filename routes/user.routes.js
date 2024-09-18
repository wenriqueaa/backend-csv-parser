const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const {createUser, loginUser} = require('./../controllers/user.controller')

//validaciones para usuario
const users = require('./../middlerwares/validationBody')
const validatFields = require('./../middlerwares/validationResult')

//validaciones incluidas en el controler
router.post('/register', users, validatFields, createUser)

//
router.post('/login', loginUser)


module.exports = router
