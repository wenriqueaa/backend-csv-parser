//la variable del modelo con el nombre del modelo y la primera letra en mayuscula
const File = require('./../models/File')
//traer el paquete
const csvToJson = require('csvtojson')

const uploadFile = async (req, res) => {
    //variable file se guarda el archivo, que viene al upload
    const file = req.file
    const fileName = req.file.originalname
    console.log(file)
    try {
        //archivo no existe
        if (!file) return res.status(400).json({
            ok: false,
            msg: 'file is mandatory'
        })
        //guardar el archivo en un objeto json
        const jsonArray = await csvToJson().fromString(file.buffer.toString('utf-8'))
        //
        const dbFile = await File.findOne({ name: fileName })
        //existe el registro, error
        if (dbFile) return res.status(400).json({
            ok: false,
            msg: `file  with name ${fileName} is already exist`
        })
        //crear la instancia del modelo a guardar
        const dbFileToSave = new File({
            name: fileName,
            data: jsonArray
        })
        await dbFileToSave.save()

        return res.status(201).json({
            ok: true,
            msg: `File ${fileName} created!!`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error upload file, pleas contact to support'
        })
    }
}



//getFileById
//getAllFiles
//deleteFileById
/*
const getFileById = async (req, res) => {
    const { id } = req.params
    try {
        const files = await File.findById({ _id: id })
        if (!files) return res.status(400).json({
            ok: false,
            msg: 'not found'
        })
        return res.status(200).json({
            ok: true,
            msg: 'file found',
            files: files
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error please contact to support'
        })
    }
}
*/
const getFileById = async(req, res) => {
    const id = req.params.id
    try {
        const file = await File.findById({_id: id})
        if(!file) return res.status(404).json({
            ok:false,
            msg:'Not found file'
        })       
        return res.status(200).json({
            ok:true,
            msg:'file with Id found',
            file: file
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'contact to support'
        })
    }
}

const getAllFiles = async (req, res) => {
    try {
        //buscar del modelo los atributos y menos el nombre atributo no lo coloca
        //const files = await File.find().select("name -_id")
        const files = await File.find().select("_id name")
        return res.status(200).json({
            ok: true,
            msg: 'files found',
            files: files
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error getting files, please contact to support'
        })

    }

}

const deleteFileById = async(req, res) => {
    const { id } = req.params;
    try {
        const file = await File.findByIdAndDelete(id)
        if (!file) return res.status(400).json({
            ok: false,
            msg: 'FIle not found by Id'
        })
        return res.status(200).json({
            ok: true,
            msg: 'File deleted sucessfuly',
            file: file       
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'error deleting, please contact to support'
        })
    }            
}


module.exports = {
    uploadFile,
    getFileById,
    getAllFiles,
    deleteFileById
}