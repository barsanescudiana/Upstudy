const router = require('express').Router()
const verify = require('../middleware/verifyToken')
const userController = require('../controllers/user')

router.get('/', userController.getAll)
router.get('/known', userController.getKnown)
router.get('/:email', userController.getByEmail)
router.get('/token', userController.getByToken)
router.post('/learn/:base', userController.learnWord)
router.post('/note/:base', userController.createNote)
router.put('/update', userController.updateProfile)
router.post('/delete', userController.deleteOne)
router.post('/admin', userController.makeAdmin)
router.post('/user', userController.makeUser)

module.exports = router