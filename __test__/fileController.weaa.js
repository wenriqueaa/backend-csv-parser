const request = require('supertest')
const app = require('./../index')
const mongoose = require('mongoose')
const File = require('./../models/File')
const { generateToken } = require('./../middlerwares/jwtGenerate')
const path = require('path')

describe('File Controller Testing', () => {
    const filePath = path.resolve(__dirname,'transporte-especial-de-pacientes-tep-corte-17-07-2024.csv')
    const emailTest = 'acme@acme.com'
    const tokenTest = generateToken(emailTest)
    // const fileNameTest = 'test.csv'
    // const dataHeaderTest = 'id,describe'
    // const newLine = '\r\n'    
    // const dataLineTest = '1,Bogota'
    // const dataTest = `${dataHeaderTest}${newLine}${dataLineTest}`
    // const fileNameNotCSV = 'test.txt'
    const file = {orginalName:filePath, data:''}

    beforeAll(async () => {
        await File.deleteMany()
    }, 10000 //wait miliseconds, here config 10 seconds
    )
    afterAll(async () => {
        await mongoose.connection.close()
    })
    it('Debería subir un archivo CSV y guardarlo en la base de datos', async () => {
        console.log(tokenTest)
        console.log(filePath)

        const response = await request(app)
            .post('/api/upload')
            .set('Authorization', `Bearer ${tokenTest}`)
            .attach('file', filePath)
            console.info( 'Debería subir', response)
    //         expect(response.statusCode).toBe(201)
     })
    // it('No debería guardar en la base de datos si el archivo no viene adjunto', async () => {
    //     console.log(tokenTest)
    //     console.log(filePath)

    //     const response = await request(app)
    //         .post('/api/upload')
    //         .set('Authorization', `Bearer ${tokenTest}`)
    //         expect(response.statusCode).toBe(400)
    // })


    // it('Debería traer un file si se llama por ID', async() => {
    //     const response = await request(app)
    //     .post('/api/upload')
    //     .set('Authorization', `Bearer ${tokenTest}`)
    //     .attach('file', filePath)
    //     console.info(response)
    // })
    // const id = req.params.id
    //     if(!file) return res.status(404).json({
    //         ok:false,
    //         msg:'Not found file'
    //     })       
    //     return res.status(200).json({
    //         ok:true,
    //         msg:'file with Id found',
    //         file: file
    //     })
    //     return res.status(500).json({
    //         ok:false,
    //         msg:'contact to support'
        // it('responds with json', function(done) {
        //   request(app)
        //     .post('/uploadFile')
        //     .send(filecsv)
        //     .set('Accept', 'application/json')
        //     .expect('Content-Type', /json/)
        //     .expect(200)
        //     .end(function(err, res) {
        //       if (err) return done(err);
        //       return done();
        //     });
        // });



}
)