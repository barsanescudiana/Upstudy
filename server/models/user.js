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
        min: 8
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
    }], 
    score: {
        type: Number,
        default: 0
    }, 
    token: {
        type: String, 
        required: true
    }
    
})

userSchema.pre('save', async function() {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
})

module.exports = mongoose.model('User', userSchema)