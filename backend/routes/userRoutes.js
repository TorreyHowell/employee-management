const express = require('express')
const {
  createUserHandler,
  getUserHandler,
  loginUserHandler,
  logoutUserHandler,
  getUsersHandler,
  getUserAdminHandler,
  updateUserAdminHandler,
  changeUserName,
  changeUserEmail,
  changeUserPassword,
} = require('../controllers/userController')
const deserializeUser = require('../middleware/deserializeUser')
const validate = require('../middleware/validateResource')
const userSchema = require('../schema/userSchema')
const router = express.Router()
const requireOwner = require('../middleware/requireOwner')
const requireValidUser = require('../middleware/requireValidUser')

router.post('/', validate(userSchema), createUserHandler)

router.get('/', deserializeUser, getUserHandler)

router.get('/all', [deserializeUser, requireOwner], getUsersHandler)

router.get('/admin/:id', [deserializeUser, requireOwner], getUserAdminHandler)
router.put(
  '/admin/:id',
  [deserializeUser, requireOwner],
  updateUserAdminHandler
)

router.post('/login', loginUserHandler)

router.delete('/logout', deserializeUser, logoutUserHandler)

router.put('/user-name', [deserializeUser, requireValidUser], changeUserName)
router.put('/user-email', [deserializeUser, requireValidUser], changeUserEmail)
router.put(
  '/user-password',
  [deserializeUser, requireValidUser],
  changeUserPassword
)

module.exports = router
