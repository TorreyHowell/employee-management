const express = require('express')
const router = express.Router()
const deserializeUser = require('../middleware/deserializeUser')
const requireAdmin = require('../middleware/requireAdmin')
const requireValidUser = require('../middleware/requireValidUser')
const requireOwner = require('../middleware/requireOwner')
const validate = require('../middleware/validateResource')
const {
  adminGetUserActiveReceipts,
  createUserReceiptCharge,
  getUserReceipts,
  deleteReceipt,
} = require('../controllers/receiptController')

router.get(
  '/admin/user/:id',
  [deserializeUser, requireOwner],
  adminGetUserActiveReceipts
)

router.get('/user', [deserializeUser, requireValidUser], getUserReceipts)

router.get(
  '/admin/user/:id',
  [deserializeUser, requireOwner],
  adminGetUserActiveReceipts
)

router.post(
  '/user',
  [deserializeUser, requireValidUser],
  createUserReceiptCharge
)

router.delete('/:id', [deserializeUser, requireValidUser], deleteReceipt)

module.exports = router
