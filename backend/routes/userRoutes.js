const express = require('express')
const {
  createUserHandler,
  getUserHandler,
  loginUserHandler,
} = require('../controllers/userController')
const deserializeUser = require('../middleware/deserializeUser')
const validate = require('../middleware/validateResource')
const userSchema = require('../schema/userSchema')
const router = express.Router()

router.post('/', validate(userSchema), createUserHandler)

router.get('/', deserializeUser, getUserHandler)

router.post('/login', loginUserHandler)

module.exports = router
