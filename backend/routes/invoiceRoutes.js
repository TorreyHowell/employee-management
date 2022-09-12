const express = require('express')
const {
  createInvoice,
  pushHours,
  getUnsentUserInvoices,
  pushReceipt,
  pullHours,
  pullReceipt,
  deleteInvoice,
  sendInvoice,
  getSentInvoices,
  payInvoice,
  denyInvoice,
  getUserInvoices,
  rescindInvoice,
  adminDeleteInvoice,
  getPaidInvoices,
} = require('../controllers/invoiceController')
const router = express.Router()
const deserializeUser = require('../middleware/deserializeUser')
const requireValidUser = require('../middleware/requireValidUser')
const requireAdmin = require('../middleware/requireAdmin')
const requireOwner = require('../middleware/requireOwner')
const validate = require('../middleware/validateResource')

router.post('/', [deserializeUser, requireValidUser], createInvoice)

router.put('/hours/:id', [deserializeUser, requireValidUser], pushHours)

router.put('/receipt/:id', [deserializeUser, requireValidUser], pushReceipt)

router.get(
  '/unsent',
  [deserializeUser, requireValidUser],
  getUnsentUserInvoices
)

router.get('/paid', [deserializeUser, requireOwner], getPaidInvoices)

router.get('/user', [deserializeUser, requireValidUser], getUserInvoices)

router.get('/sent', [deserializeUser, requireAdmin], getSentInvoices)

router.delete(
  '/hours/:parentId/:id',
  [deserializeUser, requireValidUser],
  pullHours
)

router.delete(
  '/receipt/:parentId/:id',
  [deserializeUser, requireValidUser],
  pullReceipt
)

router.delete('/:id', [deserializeUser, requireValidUser], deleteInvoice)

router.delete('/admin/:id', [deserializeUser, requireOwner], adminDeleteInvoice)

router.put('/send/:id', [deserializeUser, requireValidUser], sendInvoice)

router.put('/pay/:id', [deserializeUser, requireOwner], payInvoice)
router.put('/deny/:id', [deserializeUser, requireOwner], denyInvoice)
router.put('/rescind/:id', [deserializeUser, requireValidUser], rescindInvoice)

module.exports = router
