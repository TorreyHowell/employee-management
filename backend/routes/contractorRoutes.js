const express = require('express')
const {
  createContractor,
  getContractors,
  getContractor,
  updateContractor,
} = require('../controllers/contractorController')

const deserializeUser = require('../middleware/deserializeUser')
const requireOwner = require('../middleware/requireOwner')
const router = express.Router()

router.post('/', [deserializeUser, requireOwner], createContractor)
router.get('/', [deserializeUser, requireOwner], getContractors)
router.get('/:id', [deserializeUser, requireOwner], getContractor)
router.put('/:id', [deserializeUser, requireOwner], updateContractor)

module.exports = router
