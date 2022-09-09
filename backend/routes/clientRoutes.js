const express = require('express')
const {
  createClient,
  getActiveClients,
  getClients,
  getClient,
  changeStatus,
} = require('../controllers/clientController')
const router = express.Router()
const deserializeUser = require('../middleware/deserializeUser')
const requireAdmin = require('../middleware/requireAdmin')
const requireValidUser = require('../middleware/requireValidUser')
const requireOwner = require('../middleware/requireOwner')
const validate = require('../middleware/validateResource')

router.post('/', [deserializeUser, requireAdmin], createClient)
router.get('/active', [deserializeUser, requireValidUser], getActiveClients)
router.get('/', [deserializeUser, requireAdmin], getClients)
router.get('/:id', [deserializeUser, requireOwner], getClient)
router.post('/status/:id', [deserializeUser, requireOwner], changeStatus)

module.exports = router
