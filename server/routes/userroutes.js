const router = require('express').Router()
const controller = require('../controller/usercontroller')

router.get('/', controller.test)
router.post('/login', controller.login)
router.post('/signup', controller.signup)

module.exports = router