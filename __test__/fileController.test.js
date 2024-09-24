const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const File = require('./../models/File')
const { generateToken } = require('./../middlerwares/jwtGenerate')
const path = require('path')

describe('File Controller Tests', () => {
    let tokenTest
    // const idExternal = new mongoose.Types.ObjectId()
    // console.info(idExternal)
    const filePath = path.resolve(__dirname, 'transporte-especial-de-pacientes-tep-corte-17-07-2024.csv')
    beforeAll(async () => {
        await File.deleteMany()
        tokenTest = generateToken('test@test.com')
    }, 10000)

    afterAll(async() => {
        await mongoose.connection.close()
    })

    // it('Debería subir un archivo CSV y guardarlo en base de datos', async() => {
    //      const filePath = path.resolve(__dirname, 'transporte-especial-de-pacientes-tep-corte-17-07-2024.csv')
    //      console.log(filePath)
    //      const response = await request(app)
    //                      .post('/api/upload')
    //                      .set('Authorization', `Bearer ${ tokenTest }`)
    //                      .attach('file', filePath)

    //     expect(response.statusCode).toBe(201)
    //     expect(response.body).toHaveProperty('msg', 'File transporte-especial-de-pacientes-tep-corte-17-07-2024.csv created!!')
    // })

    // it('No debería subir un file si no se adjunta', async() => {
    //     const response = await request(app)
    //                     .post('/api/upload')
    //                     .set('Authorization', `Bearer ${ tokenTest }`)

    //     expect(response.statusCode).toBe(400)
    // })

    it('Debería traer un file si se llama por ID', async() => {

        const csvFile = await new File({
            name:`prueba_by_ID.csv`
             , data:[]
         }).save()
        //  console.info('csvFile ', csvFile._id)
         const routeApi = `/api/file/${csvFile._id}`
         console.info('route', `${routeApi}`)
         console.info('csvFile name', csvFile._id)
         console.info('csvFile name', csvFile.name)
        const response = await request(app)
        .get(`${routeApi}`)
        .set('Authorization', `Bearer ${tokenTest}`)
        console.info('response.statusCode', response.statusCode, csvFile._id)
        // console.info('response', response)

        // expect(response.statusCode).toBe(200)
      
    })
    // it('Error file si se llama por ID que no existe', async() => {
    //      const response = await request(app)
    //     .get(`/api/file/${idExternal}`)
    //      .set('Authorization', `Bearer ${tokenTest}`)
    //      expect(response.statusCode).toBe(404)
      
    // })
    it('Debería borrar un file si se llama por ID', async() => {
        // se genera una archivo        
        const csvFile = await new File({
            name:`delete_by_ID.csv`
             , data:[]
         }).save()
         const idDelete = csvFile._id
        //se invoca el api para borrar
         const routeApi = `/api/delete-file/${idDelete}`
        const response = await request(app)
        .delete(`${routeApi}`)
        .set('Authorization', `Bearer ${tokenTest}`)
        console.info('response.statusCode', response.statusCode)
        console.info('routeApi', routeApi )
        console.info('idDelete', idDelete)
        console.info('response.msg ok', response.msg, response.ok)

        expect(response.statusCode).toBe(200)
      
    })

})



