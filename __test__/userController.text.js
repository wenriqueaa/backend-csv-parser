const request = require('supertest')
const app = require('./../index')
const moongose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./../models/User')


describe('User Controller testing', () =>{
    const emailTest = "acme@acme.com"
    const passwordTest = "Clave#654321"
beforeEach(async()=>{
        await User.deleteMany()
    }, 10000 ) //Espera de 10 mil milisegundos

    afterAll(async()=>{
        await moongose.connection.close()
    })
    // it("Este test registra un nuevo usuario en la base de datos",
    //     async () => {
    //         const response = await request(app)
    //     .post('/api/register')
    //     .send({email:emailTest,password:passwordTest})
    //     expect()
    //     }
    // )
    it("Debería loggear a un usuario con credenciales correctas",
        async () => {
            const hashedPassword = bcrypt.hashSync(passwordTest,10)
            const user = await new User(
                {email:emailTest
                , password:hashedPassword}
            )
            user.save()
            const response = await request(app)
                .post('/api/login')
                .send({email:user.email,password:passwordTest})
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('msg', `${user.email}, Wellcome app`)
            expect(response.body).toHaveProperty('token')

        }
    )
    it("No Debería loggear a un usuario con contraseña incorrecta",
        async () => {
            const hashedPassword = bcrypt.hashSync(passwordTest,10)
            const user = await new User(
                {email:emailTest
                , password:hashedPassword}
            )
            user.save()
            const response = await request(app)
                .post('/api/login')
                .send({email:user.email,password:user.password})
            expect(response.statusCode).toBe(400)
            expect(response.body).toHaveProperty('msg', 'incorrect password')
            expect(response.body).toHaveProperty('ok', false)

        }
    )
    // it("retornar un error de servidor al hacer login",
    //     async () => {
    //         jest.spyOn(User, 'findOne').mockImplementationOnce(
    //             () => {
    //                 throw new Error('simulando error en base de datos') 
    //             }
    //         )
    //         const response = await request(app)
    //             .post('/api/login')
    //             .send({email:emailTest,password:passwordTest})
    //         expect(response.statusCode).toBe(500)
    //         expect(response.body).toHaveProperty('msg', 'please contact to development team')
    //         expect(response.body).toHaveProperty('ok', false)

    //     }
    // )
    it("No Debería crear un usuario con contraseña incorrecta",
        async () => {
            const response = await request(app)
                .post('/api/register')
                .send({email:emailTest,password:'password'})
            expect(response.statusCode).toBe(400)
            expect(response.body.msg.password).toHaveProperty('msg', 'Hola revisando!! password must contain at least, uppercase, lowercase, numbers and characters')
            expect(response.body).toHaveProperty('ok', false)

        }
    )

})
