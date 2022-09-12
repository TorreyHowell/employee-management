const userRoutes = require('./routes/userRoutes')
const clientRoutes = require('./routes/clientRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')
const chargesRoutes = require('./routes/chargesRoutes')
const billRoutes = require('./routes/billRoutes')
const contractorRoutes = require('./routes/contractorRoutes')

const router = (app) => {
  app.use('/api/users', userRoutes)
  app.use('/api/clients', clientRoutes)
  app.use('/api/invoice', invoiceRoutes)
  app.use('/api/charges', chargesRoutes)
  app.use('/api/bills', billRoutes)
  app.use('/api/contractors', contractorRoutes)
}

module.exports = router
