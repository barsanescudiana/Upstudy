const Test = require('../models/test')

const controller = {
    getAll: async (req, res) => {
        Test.find()
        .then((tests) => {
            res.status(200).send(tests)
        })
        .catch((err) => {
            res.status(404).send({message: 'No tests found!'})
        })

    },
    getByLevel: async (req, res) => {
        Test.find({level: req.params.level})
        .then((tests) => {
            res.status(200).send(tests)
        })
        .catch((err) => {
            res.status(404).send({message: `No ${level} tests found!`})
        })

    },

    getByTitle: async (req, res) => {
        Test.find({title: req.params.title})
        .then((test) => {
            res.status(200).send(test)
        })
        .catch((err) => {
            res.status(404).sent('not found')
        })
    }
}

module.exports = controller