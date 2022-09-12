const express = require('express')
const {
  getChargesForClient,
  deleteCharge,
  createReceiptCharge,
  createCustomCharge,
} = require('../controllers/chargeController')

const deserializeUser = require('../middleware/deserializeUser')
const requireOwner = require('../middleware/requireOwner')
const router = express.Router()

router.get('/:id', [deserializeUser, requireOwner], getChargesForClient)

router.delete('/:id', [deserializeUser, requireOwner], deleteCharge)

router.post('/receipt', [deserializeUser, requireOwner], createReceiptCharge)
router.post('/custom', [deserializeUser, requireOwner], createCustomCharge)

module.exports = router
