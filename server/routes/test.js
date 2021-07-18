const router = require('express').Router()
const verify = require('../middleware/verifyToken')
const testController = require('../controllers/test')

router.get('/', testController.getAll)
router.get('/:level', testController.getByLevel)
router.get('/test/:title', testController.getByTitle)


module.exports = router