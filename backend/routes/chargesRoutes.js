const express = require('express')
const {
  getChargesForClient,
  deleteCharge,
  createReceiptCharge,
  createCustomCharge,
  getAccountingCharges,
} = require('../controllers/chargeController')

const deserializeUser = require('../middleware/deserializeUser')
const requireOwner = require('../middleware/requireOwner')
const router = express.Router()

router.get('/client/:id', [deserializeUser, requireOwner], getChargesForClient)

router.get('/accounting', [deserializeUser, requireOwner], getAccountingCharges)

router.delete('/:id', [deserializeUser, requireOwner], deleteCharge)

router.post('/receipt', [deserializeUser, requireOwner], createReceiptCharge)
router.post('/custom', [deserializeUser, requireOwner], createCustomCharge)

module.exports = router
