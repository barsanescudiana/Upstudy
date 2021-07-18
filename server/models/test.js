const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    level: {
        type: String, 
        required: true, 
    }, 
    title: {
        type: String, 
        required: true
    }, 
    text: {
        type: String, 
        required: true,
        unique: true, 
    }, 
    questions: [{
        text: {
            type: String, 
            required: true   
        }, 
        answers: [{
            text: {
                type: String,
                required: true,
            }, 
            correct: {
                type: Boolean,
                required: true
            }
        }]
    }],
    
})

module.exports = mongoose.model('Test', testSchema)