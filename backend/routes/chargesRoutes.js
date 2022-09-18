const express = require('express')
const {
  getChargesForClient,
  deleteCharge,
  createReceiptCharge,
  createCustomCharge,
  getAccountingCharges,
  createUserReceiptCharge,
  getUserReceipts,
  deleteUserReceipt,
} = require('../controllers/chargeController')

const deserializeUser = require('../middleware/deserializeUser')
const requireOwner = require('../middleware/requireOwner')
const requireValidUser = require('../middleware/requireValidUser')
const router = express.Router()

router.get('/client/:id', [deserializeUser, requireOwner], getChargesForClient)
router.get(
  '/user-receipts',
  [deserializeUser, requireValidUser],
  getUserReceipts
)
router.get('/accounting', [deserializeUser, requireOwner], getAccountingCharges)

router.delete('/:id', [deserializeUser, requireOwner], deleteCharge)
router.delete(
  '/user-receipt/:id',
  [deserializeUser, requireValidUser],
  deleteUserReceipt
)

router.post('/receipt', [deserializeUser, requireOwner], createReceiptCharge)
router.post(
  '/user-receipt',
  [deserializeUser, requireValidUser],
  createUserReceiptCharge
)
router.post('/custom', [deserializeUser, requireOwner], createCustomCharge)

module.exports = router
