const router = require('express').Router()
const verify = require('../middleware/verifyToken')
const wordController = require('../controllers/word')

router.get('/', verify, wordController.getAll)
router.get('/random', verify, wordController.getRandom)
router.get('/target/:base', verify, wordController.getTargetByBase)
router.get('/:base', verify, wordController.getByBase)
router.get('/unknown/all', verify, wordController.getUnknown)

module.exports = router