const router = require('express').Router()
const controller = require('../controller/controller')

router.get('/', controller.test1)
router.post('/', controller.test2)

module.exports = router