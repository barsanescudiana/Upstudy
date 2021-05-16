const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    base: {
        type: String, 
        required: true, 
    }, 
    target: {
        type: String, 
        required: true
    }, 
    points: {
        type: Number, 
        required: true, 
    }, 
})

module.exports = mongoose.model('Word', wordSchema)