const router = require('express').Router()
const verify = require('../middleware/verifyToken')
const wordController = require('../controllers/word')

router.get('/', wordController.getAll)
router.get('/random/:email', wordController.getRandom)
router.get('/target/:base', verify, wordController.getTargetByBase)
router.get('/:base', verify, wordController.getByBase)
router.get('/unknown/:email', wordController.getUnknown)

module.exports = router