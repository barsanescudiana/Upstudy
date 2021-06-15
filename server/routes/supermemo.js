const router = require('express').Router()
const superMemoController = require('../controllers/supermemo')

router.post('/algorithm', superMemoController.algorithm)