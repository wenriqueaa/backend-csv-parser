//el nombre de la variable User debe coincidir con el nombre del archivo User.js
//User es el modelo
const User = require('./../models/User')
//trae el objeto bcrypt
const bcrypt = require('bcrypt')
//trae la funcion generatetoken
const {generateToken} = require('./../middlerwares/jwtGenerate')

const createUser = async(req, res) => {
    // desestructurar el schema
    const {  email, password } = req.body
    try {
        const user = await User.findOne ({ email: email })
        if(user) return res.status(400).json({
            ok: false,
            msg: `${email} is already exist in database`
        })
        //algoritmo de encriptacion
        const salt = bcrypt.genSaltSync()

        const dbUser = new User ({
            email: email,
            password: password
        })
        //accedemos al password para encriptarlo
        dbUser.password = bcrypt.hashSync(password, salt)
        await dbUser.save()
        return res.status(201).json({
            ok: true,
            msg: `${email} created successfuly`
        })

    } catch(error) {
        console.log(error)
        return res.status(500).json[{
            ok: false,
            msg: `Please contact to support`
        }]
    }
}

const loginUser = async(req, res) => {
    const { email, password } = req.body
    try { 
        //validar el email
        const dbUser = await User.findOne({ email })
        //si no encuentra email, salimos
        if(!dbUser) return res.status(400).json({
            ok: false,
            msg: 'User doesnt exist !!!'
        })
        //validar el password
        const validatePassword = bcrypt.compareSync(password, dbUser.password)
        //password no coincide
        if(!validatePassword) return res.status(400).json({
            ok: false,
            msg: 'incorrect password'
        })
        //generar el token
        const token = await generateToken(dbUser._id, dbUser.email)

        return res.status(200).json({
            ok:true,
            msg: `${dbUser.email}, Wellcome app`,
            token: token
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'please contact to development team'
        })
    }
}



module.exports = {
    createUser,
    loginUser }