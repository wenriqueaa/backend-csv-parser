const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const File = require('./../models/File')
const { generateToken } = require('./../middlerwares/jwtGenerate')
const path = require('path')

describe('File Controller Tests', () => {
    let tokenTest
    const idExternal = new mongoose.Types.ObjectId()
    console.info(idExternal)
    const filePath = path.resolve(__dirname, 'transporte-especial-de-pacientes-tep-corte-17-07-2024.csv')
    beforeAll(async () => {
        await File.deleteMany()
        tokenTest = generateToken('test@test.com')
    }, 10000)

    afterAll(async() => {
        await mongoose.connection.close()
    })

    it('Debería subir un archivo CSV y guardarlo en base de datos', async() => {
         const filePath = path.resolve(__dirname, 'transporte-especial-de-pacientes-tep-corte-17-07-2024.csv')
         console.log(filePath)
         const response = await request(app)
                         .post('/api/upload')
                         .set('Authorization', `Bearer ${ tokenTest }`)
                         .attach('file', filePath)

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('msg', 'File transporte-especial-de-pacientes-tep-corte-17-07-2024.csv created!!')
    })

    it('No debería subir un file si no se adjunta', async() => {
        const response = await request(app)
                        .post('/api/upload')
                        .set('Authorization', `Bearer ${ tokenTest }`)

        expect(response.statusCode).toBe(400)
    })

    it('Debería traer un file si se llama por ID', async() => {
        const csvFile = await new File({
             name:idExternal+'.csv'
             , data:[]
         }).save()
        //  console.info('csvFile ', csvFile._id)
         const routeApi = '/api/file/'+csvFile._id
         console.info('route', routeApi)
         console.info('csvFile name', csvFile.name)
        const response = await request(app)
        .get('/api/file/'+csvFile._id)
        .set('Authorization', `Bearer ${tokenTest}`)
        console.info('response.statusCode', response.statusCode)
        console.info('response', response)

        // expect(response.statusCode).toBe(200)
      
    })
    it('Error file si se llama por ID que no existe', async() => {
         const response = await request(app)
        .get(`/api/file/${idExternal}`)
        //  .get(`api/file/66ee164d098ba945498d8dc4`)
         .set('Authorization', `Bearer ${tokenTest}`)
        //  .set('params', `id="66ee164d098ba945498d8dc4"`)
//         console.info('Debería traer un file ', response)
         expect(response.statusCode).toBe(404)
      
    })
})



