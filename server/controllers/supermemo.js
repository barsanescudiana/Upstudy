const User = require('../models/user')
const Word = require('../models/word')
const { supermemo } = require('supermemo')

const controller = {

    algorithm: async(req, res) => {
        const {interval, repetition, efactor} = supermemo(req.body.word, req.body.grade)
        const dueDate = dayjs(Date.now()).add(interval, 'day').toISOString();

        const flashcard = {
            ...req.body.word,
            dueDate: dueDate,
            interval: interval, 
            repetition: repetition, 
            efactor: efactor
        }

        const updated = await User.updateOne(
            {email: req.body.email}, 
            {$push: {
                knownWords: flashcard
            }}
            )
        if(updated.modifiedCount > 0) {
            res.status(200).send({flashcard: flashcard})
        } else {
            res.status(400).send({message: 'error'})
        }
        
    }
}

module.exports = controller
