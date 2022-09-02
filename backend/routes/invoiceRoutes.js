const express = require('express')
const {
  createInvoice,
  pushHours,
  getUnsentUserInvoices,
  pushReceipt,
} = require('../controllers/invoiceController')
const router = express.Router()
const deserializeUser = require('../middleware/deserializeUser')
const requireValidUser = require('../middleware/requireValidUser')
const validate = require('../middleware/validateResource')

router.post('/', [deserializeUser, requireValidUser], createInvoice)
router.put('/:id', [deserializeUser, requireValidUser], pushHours)
router.put('/receipt/:id', [deserializeUser, requireValidUser], pushReceipt)
router.get(
  '/unsent',
  [deserializeUser, requireValidUser],
  getUnsentUserInvoices
)
module.exports = router
