const { Schema, model} = require('mongoose')

const fileSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: Object
        , required: true
    }
})

const Files = model('Files', fileSchema, 'Files')
module.exports = Files