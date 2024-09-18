const express = require('express')
// en app tengo toda la funcionalidad de express
const app = express()

//Configurar el archivo manejo de las variables de entorno
const dotenv = require('dotenv')
//manejo peticiones 
const cors = require('cors')
const api = require('./routes/api.routes')

const path = require('path')

dotenv.config();
const port = process.env.PORT
const databaseConnect = require('./db/config')
databaseConnect()

//Para que express entienda los archivos formato JSON
app.use(express.json())
//Para que express reconozca las urls
app.use(express.urlencoded({ extended: false }))

app.use(cors())

/*
app.use('/', express.static(__dirname + '/dist/frontend-csv-parser/browser'))
app.get('/*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname + '/dist/frontend-csv-parser/browser'))
})
*/

app.use('/', express.static(__dirname + '/dist/frontend-csv-parser/browser'));
app.get('/*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname + "/dist/frontend-csv-parser/browser/index.html"));
});


//para usar las ruta
app.use('/', api)

//colocar a escuchar el servidor express
// app.listen(port, () => {
//     console.log(`Servidor conectado en el puerto ${port}`)
// })

module.exports = app