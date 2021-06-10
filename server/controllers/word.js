const Word = require('../models/word')
const User = require('../models/user')

const controller = {
    getAll: async (req, res) => {
        Word.find()
        .then((words) => {
            res.status(200).send(words)
        })
        .catch((err) => {
            res.status(404).send({message: 'No words found!'})
        })

    },

    getByBase: async (req, res) => {
        Word.find({base: `${req.params.base}`})
        .then((word) => res.status(200).send(word))
        .catch((err) => res.status(404).send(err))
    },

    getTargetByBase: async (req, res) => {
        Word.findOne({base: req.params.base})
        .then((word) => {
            res.status(200).send(word.target)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
    },

    getRandom: async (req, res) => {

        const user = await User.findOne({email: `${req.params.email}`})
        if(!user) return res.status(404).send(`Email doesn't exist!`)

        let known = [];
        user.knownWords.map((word) => {
            known.push(word.base)
        })

        const aggr = Word.aggregate([
            { $match: { base: { $nin: known}}},
            { $sample: { size: 5}}
        ])
        let words = []
        for await (const doc of aggr) {
            words.push(doc)
        }
        if(words.length !== 0) return res.status(200).send(words)
        else return res.status(404).send('No words found')
    },

    getUnknown: async (req, res) => {
        const user = await User.findOne({email: `${req.params.email}`})
        if(!user) return res.status(404).send(`Email doesn't exist!`)

        let known = [];
        user.knownWords.map((word) => {
            known.push(word.base)
        })

        let words = await Word.find({ base: {$nin: known}})
        if(!words) return res.status(404).send('No words in db')

        res.status(202).send(words)

    },

    insertWord: async(req, res) => {
        const word = new Word({
            base: req.body.base, 
            target: req.body.target,
            points: req.body.points
        })

         try { 
            const saved = await word.save()
            const words = await Word.find()
            res.status(200).send({word: saved, words: words})
        } catch(err) {
            res.status(400).send(err)
        }
    },

    deleteByBase: async(req, res) => {
        Word.findOneAndDelete({base: req.body.base})
        .then(async () => {
            const words = await Word.find()
            res.status(200).send(words)
        })
        .catch((err) => {
            res.status(404).send(err)
        })
    }
}

module.exports = controller