const request = require('supertest')
const app = require('./../index')
const moongose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./../models/User')


describe('User Controller testing', () =>{
    beforeeach(async()=>{
        await User.deleteMany()
    }, 10000 ) //Espera de 10 mil milisegundos

    AfterAll(async()=>{
        await moongose.connection.close()
    })
})
