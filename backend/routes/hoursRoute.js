const express = require('express')
const router = express.Router()
const deserializeUser = require('../middleware/deserializeUser')
const requireAdmin = require('../middleware/requireAdmin')
const requireValidUser = require('../middleware/requireValidUser')
const requireOwner = require('../middleware/requireOwner')
const validate = require('../middleware/validateResource')
const {
  createHours,
  getUserActiveHours,
  deleteHours,
  adminGetUserActiveHours,
} = require('../controllers/hourController')

router.post('/', [deserializeUser, requireValidUser], createHours)
router.delete('/:id', [deserializeUser, requireValidUser], deleteHours)
router.get('/active', [deserializeUser, requireValidUser], getUserActiveHours)

router.get(
  '/admin/active/:id',
  [deserializeUser, requireOwner],
  adminGetUserActiveHours
)

module.exports = router
