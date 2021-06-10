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
        unique: true, 
    }, 
    notes: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Word', wordSchema)