const User = require('../models/user')
const Word = require('../models/word')

const controller = {

    getKnown: async(req, res) => {
        User.findOne({token: `${req.body.token}`})
        .then((user) => res.status(200).send(user.knownWords))
        .catch((err) => res.status(404).sent(err))
    },

    learnWord: async (req, res) => {
        const user = await User.findOne({ token: `${req.body.token}` })
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
                })

                if(!known.includes(learned.base)) {
                    user.knownWords.push(learned)
                    user.score += learned.points
                    await user.save()
                    res.status(200).send({user: user, learned: learned, known: known})
                } else 
                    res.send("Word already known!")
            }
        } else {
            res.status(404).send()
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
         User.findOne({email: `${req.body.email}`})
        .then((user) => res.status(200).send(user))
        .catch((err) => res.status(404).sent(err))
    },

    getByToken: async (req, res) => {
         User.findOne({token: `${req.body.token}`})
        .then((user) => res.status(200).send(user))
        .catch((err) => res.status(404).sent(err))
    },
 
}

module.exports = controller