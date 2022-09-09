const express = require('express')
const { createBill, getClientBills } = require('../controllers/billController')

const deserializeUser = require('../middleware/deserializeUser')
const requireOwner = require('../middleware/requireOwner')
const router = express.Router()

router.post('/:id', [deserializeUser, requireOwner], createBill)
router.get('/client/:id', [deserializeUser, requireOwner], getClientBills)

module.exports = router
