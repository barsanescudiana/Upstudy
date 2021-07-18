const User = require('../models/user')
const Word = require('../models/word')
const Test = require('../models/test')
const bcrypt = require('bcryptjs')
const { supermemo } = require('supermemo')
const dayjs = require('dayjs')
const user = require('../models/user')

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
            res.status(404).send("user not found", err)
        })
    },

    makeUser: async(req, res) => {
        User.findOneAndUpdate({email: req.body.email}, {$set: {
            role: 'user'
        }}).then(async () => {
            const users = await User.find()
            res.status(200).send(users)
        }).catch((err) => {
            res.status(404).send(err)
        })
    },

    revision: async(req, res) => {
        const user = await User.findOne({token: req.body.token})
        const word = await Word.findOne({base: req.params.base})

        if(user) {
            if(word) {
                user.knownWords.splice(user.knownWords.indexOf(user.knownWords.find(item => item.base === word.base)), 1)
                const learned = new Word({
                    _id: word._id,
                    base: word.base,
                    target: word.target,
                    points: word.points,
                    notes: req.body.notes ? req.body.notes : null
                })

                const {interval, repetition, efactor} = supermemo({...learned, interval: 0, repetition: 0, efactor: 2.5}, req.body.grade)
                const dueDate = dayjs(Date.now()).add(interval, 'day').toISOString();

                const flashcard = {
                    _id: word._id,
                    base: word.base,
                    target: word.target,
                    points: word.points,
                    notes: req.body.notes ? req.body.notes : null,
                    dueDate: dueDate,
                    interval: interval, 
                    repetition: repetition, 
                    efactor: efactor
                }
                user.knownWords.push(flashcard)
                await user.save()
                res.status(200).send(flashcard)
            } else {
                res.status(404).send('word not found')
            }
        } else {
            res.status(404).send('user not found')
        }
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

                const {interval, repetition, efactor} = supermemo({...learned, interval: 0, repetition: 0, efactor: 2.5}, req.body.grade)
                const dueDate = dayjs(Date.now()).add(interval, 'day').toISOString();

                const flashcard = {
                    _id: word._id,
                    base: word.base,
                    target: word.target,
                    points: word.points,
                    notes: req.body.notes,
                    dueDate: dueDate,
                    interval: interval, 
                    repetition: repetition, 
                    efactor: efactor
                }

                if(!known.includes(learned.base)) {
                    user.knownWords.push(flashcard)
                    user.score += learned.points
                    await user.save()
                    res.status(200).send({user: user, learned: flashcard, known: known})
                } else {
                    const known = user.knownWords.find(word => word.base === req.params.base)

                    const edited = {
                        _id: known._id,
                        base: known.base,
                        target: known.target,
                        points: known.points,
                        notes: req.body.notes,
                        dueDate: dueDate,
                        interval: interval, 
                        repetition: repetition, 
                        efactor: efactor
                    }

                    user.knownWords.splice(user.knownWords.findIndex(word => word.base === req.params.base), 1)
                    user.knownWords.push(edited)
                    await user.save()
                    res.status(200).send("word modified!")
                }
                    
            }
        } else {
            res.status(404).send('user not found')
        }
    },

    getTests: async(req, res) => {
        const user = await User.findOne({email: req.params.email})
        if (user) {
            if(user.tests) {
                res.status(200).send(user.tests)
            } else {
                res.status(404).send('tests not found')
            }
        } else {
            res.status(404).send('user not found')
        }
    },

    takeTest: async(req, res) => {
        const user = await User.findOne({token: `${req.body.token}` })
        const test = await Test.findOne({title: `${req.body.title}`})

        if(user) {
            if(test) {
                const taken = {
                    _id: test.id,
                    text: test.text, 
                    title: test.title, 
                    questions: test.questions, 
                    level: test.level, 
                    grade: req.body.grade
                }
                if(user.tests.find(test => test.title === taken.title)) user.tests.splice(user.tests.indexOf(test => test.title === taken.title), 1)
                user.tests.push(taken)
                await user.save()
                res.status(200).send(taken)
            } else {
                res.status(404).send('test not found')
            }
        } else {
            res.status(404).send('user not found')
        }
    },

    getAvailableTests: async(req, res) => {
        const user = await User.findOne({email: req.params.email})
        const tests = await Test.find()

        if(tests) {
            if(user) {
                user.tests.map(item => {
                    tests.splice(tests.indexOf(tests.find(test => test.title === item.title)), 1)
                })
                res.status(200).send(tests)
            } else {
                res.status(404).send('not found')
            }
        } else {
            res.status(404).send('not found')
        }

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
                    notes: req.body.notes,
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
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
    }, 
}

module.exports = controller