const router = require('express').Router()
const authRouter = require('./auth')
const wordRouter = require('./word')
const userRouter = require('./user')

router.use('/auth', authRouter)
router.use('/words', wordRouter)
router.use('/user', userRouter)

module.exports = router