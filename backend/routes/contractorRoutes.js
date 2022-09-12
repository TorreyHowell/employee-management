const express = require('express')
const { createContractor } = require('../controllers/contractorController')

const deserializeUser = require('../middleware/deserializeUser')
const requireOwner = require('../middleware/requireOwner')
const router = express.Router()

router.post('/', [deserializeUser, requireOwner], createContractor)

module.exports = router
