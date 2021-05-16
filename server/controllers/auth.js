const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { registerValidation, loginValidation } = require('../validation')

const controller = {
    register: async (req, res) => {
        const { error } = registerValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        
        const emailExists = await User.findOne({ email: req.body.email })
        if(emailExists) return res.status(400).send('Email already exists!')

        //hash the password 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            name: req.body.name,
            email: req.body.email, 
            password: hashPassword
        })

        try { 
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
            user.token = token
            const saved = await user.save()
            res.status(200).send({user: saved})
        } catch(err) {
            res.status(400).send(err)
        }
    },

    login: async (req, res) => {
        const { error } = loginValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        
        const user = await User.findOne({ email: req.body.email })
        if(!user) return res.status(400).send(`Email doesn't exist!`)

        //password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass) return res.status(400).send(`Invalid password!`)

        //create and assign token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        user.token = token
        await user.save()

        res.send({user: user, token: token})
    } 
}

module.exports = controller