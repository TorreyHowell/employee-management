const express = require('express')
const { createClient } = require('../controllers/clientController')
const router = express.Router()
const deserializeUser = require('../middleware/deserializeUser')
const validate = require('../middleware/validateResource')

router.post('/', createClient)

module.exports = router
