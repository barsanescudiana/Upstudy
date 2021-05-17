const router = require('express').Router()
const verify = require('../middleware/verifyToken')
const userController = require('../controllers/user')

router.get('/known', userController.getKnown)
router.get('/email', userController.getByEmail)
router.get('/token', userController.getByToken)
router.post('/learn/:base', userController.learnWord)

module.exports = router