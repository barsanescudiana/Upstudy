const router = require('express').Router()
const authRouter = require('./auth')
const wordRouter = require('./word')
const userRouter = require('./user')
const testRouter = require('./test')

router.use('/auth', authRouter)
router.use('/words', wordRouter)
router.use('/user', userRouter)
router.use('/tests', testRouter)

module.exports = router