const router = require('express').Router()
const {addUser,loginUser} = require('../controllers/auth_controller')

router.post('/signup',addUser)
router.post('/signin',loginUser)
module.exports = router