const express = require('express')
const { getChargesForClient } = require('../controllers/chargeController')

const deserializeUser = require('../middleware/deserializeUser')
const requireOwner = require('../middleware/requireOwner')
const router = express.Router()

router.get('/:id', [deserializeUser, requireOwner], getChargesForClient)

module.exports = router
