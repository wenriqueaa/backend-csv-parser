const multer = require('multer')

//guardar en memoria el archivo antes
const storage = multer.memoryStorage()

//variable para cargar
const upload =multer({ storage: storage})


module.exports = { upload }