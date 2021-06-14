const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Word = require('../models/word')
const jwt = require('jsonwebtoken')

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
        }
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
    }
    
})

module.exports = mongoose.model('User', userSchema)