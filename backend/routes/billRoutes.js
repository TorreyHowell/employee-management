const express = require('express')
const {
  createBill,
  getClientBills,
  getBill,
  updateBill,
  deleteBill,
  updateBillPrice,
  getPaidBills,
} = require('../controllers/billController')

const deserializeUser = require('../middleware/deserializeUser')
const requireOwner = require('../middleware/requireOwner')
const router = express.Router()

router.post('/:id', [deserializeUser, requireOwner], createBill)
router.put('/:id', [deserializeUser, requireOwner], updateBill)
router.put('/price/:id', [deserializeUser, requireOwner], updateBillPrice)
router.delete('/:id', [deserializeUser, requireOwner], deleteBill)
router.get('/client/:id', [deserializeUser, requireOwner], getClientBills)
router.get('/:id', [deserializeUser, requireOwner], getBill)

router.get('/paid/bills', [deserializeUser, requireOwner], getPaidBills)

module.exports = router
