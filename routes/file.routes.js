const express = require('express')
const router = express.Router()
const { uploadFile, getFileById, getAllFiles,deleteFileById } = require('./../controllers/file.controller')
const { upload } = require('./../middlerwares/upload')
const { validateToken } = require('./../middlerwares/validateToken')

//subir archivos, incluido el token
router.post('/upload', validateToken, upload.single('file'), uploadFile)
//buscar todos los archivos
router.get('/files', validateToken, getAllFiles)
//buscar a partir del id
router.get('/file/:id', validateToken, getFileById)
//Elminar file a partir del id
router.delete('/delete-file/:id',validateToken, deleteFileById);

module.exports = router
