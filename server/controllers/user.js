const User = require('../models/user')
const Word = require('../models/word')
const bcrypt = require('bcryptjs')

const controller = {

    getAll: async (req, res) => {
        User.find()
        .then((users) => res.status(200).send(users))
        .catch((err) => res.status(404).send(err))
    },

    getKnown: async(req, res) => {
        User.findOne({token: `${req.body.token}`})
        .then((user) => res.status(200).send(user.knownWords))
        .catch((err) => res.status(404).sent(err))
    },

    makeAdmin: async(req, res) => {
        User.findOneAndUpdate({email: req.body.email}, {$set: {
            role: 'admin'
        }}).then(async () => {
            const users = await User.find()
            res.status(200).send(users)
        }).catch((err) => {
            res.statu(404).send("user not found", err)
        })
    },

    makeUser: async(req, res) => {
        User.findOneAndUpdate({email: req.body.email}, {$set: {
            role: 'user'
        }}).then(async () => {
            const users = await User.find()
            res.status(200).send(users)
        }).catch((err) => {
            res.statu(404).send("user not found", err)
        })
    },

    learnWord: async (req, res) => {
        const user = await User.findOne({token: `${req.body.token}` })
        const word = await Word.findOne({base: `${req.params.base}`})

        if(user) { 
            if(word) {
                const known = []

                user.knownWords.map((word) => {
                    known.push(word.base)
                })
                const learned = new Word({
                    _id: word._id,
                    base: word.base,
                    target: word.target,
                    points: word.points,
                    notes: req.body.notes
                })

                if(!known.includes(learned.base)) {
                    user.knownWords.push(learned)
                    user.score += learned.points
                    await user.save()
                    res.status(200).send({user: user, learned: learned, known: known})
                } else {
                    const known = user.knownWords.find(word => word.base === req.params.base)
                    const edited = new Word({
                        _id: known._id,
                        base: known.base,
                        target: known.target,
                        points: known.points,
                        notes: req.body.notes
                    })

                    user.knownWords.pop(known)
                    user.knownWords.push(edited)
                    await user.save()
                    res.status(200).send("word modified!")
                }
                    
            }
        } else {
            res.status(404).send('user not found')
        }

        // .then(async (user) => {
        //     const found = await Word.findOne({base: `${req.params.base}`})
        //     if(found) {
        //         user.knownWords.push(found)
        //         res.status(200).send(found)
        //     }
        // })
    },

    getByEmail: async (req, res) => {
         User.findOne({email: `${req.params.email}`})
        .then((user) => res.status(200).send(user))
        .catch((err) => res.status(404).sent(err))
    },

    getByToken: async (req, res) => {
         User.findOne({token: `${req.body.token}`})
        .then((user) => res.status(200).send(user))
        .catch((err) => res.status(404).sent(err))
    },

    createNote: async(req, res) => {
        const user = await User.findOne({ token: `${req.body.token}` })
        if(user) { 
                const known = user.knownWords.find(word => word.base === req.params.base)
                const edited = new Word({
                    _id: known._id,
                    base: known.base,
                    target: known.target,
                    points: known.points,
                    notes: req.body.notes
                })
                user.knownWords[user.knownWords.indexOf(known)] = edited
                // user.knownWords.push(edited)
                await user.save()
                res.status(200).send({user: user, edited: edited, known: known})
        } else {
            res.status(404).send('user not found')
        }
    },

    updateProfile: async (req, res) => {

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        

        User.findOneAndUpdate({ token: `${req.body.token}` }, { $set: {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword

        }}).then(async () => {
            const user = await User.find({email: req.body.email})
            res.status(201).send(user)
        }).catch((err) => {
            res.status(404).send('user not found', {error: err})
        })
        
    },

    deleteOne: async(req, res) => {
        User.deleteOne({ email: req.body.email })
        .then(async () => {
            const users = await User.find()
            res.status(200).send({users: users})
        })
        .catch((err) => {
            res.status(404).send(err)
        })
    }
}

module.exports = controller