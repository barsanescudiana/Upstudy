const mongoose = require('mongoose')
const dayjs = require('dayjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    }, 
    email: {
        type: String,
        unique: true, 
        required: true
    }, 
    password: {
        type: String, 
        required: true, 
        min: 5,
        max: 255
    }, 
    date: {
        type: Date, 
        default: Date.now
    },
    knownWords: [{
        base: {
            type: String, 
        }, 
        target: {
            type: String, 
        }, 
        points: {
            type: Number, 
        },
        notes: {
            type: String, 
            default: null
        },
        dueDate: {
            type: String, 
            required: true,
            default: dayjs(Date.now()).add(1, 'day').toDate()
        }, 
        interval: {
            type: Number,
            default: 0
        }, 
        repetition: {
            type: Number,
            default: 0
        },
        efactor: {
            type: Number,
            default: 2.5
        }
    }],
    tests: [{
        level: {
            type: String, 
            
        }, 
        title: {
            type: String, 
            
        }, 
        text: {
            type: String,  
        }, 
        questions: [{
            text: {
                type: String, 
                 
            }, 
            answers: [{
                text: {
                    type: String,
                    
                }, 
                correct: {
                    type: Boolean,
                    
                }
            }]
        }],
        grade: {
            type: Number,
        },

    }], 
    score: {
        type: Number,
        default: 0
    }, 
    token: {
        type: String, 
        required: true
    }, 
    role: {
        type: String,
        default: 'user'
    },

    
})

module.exports = mongoose.model('User', userSchema)