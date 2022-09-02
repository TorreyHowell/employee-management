const userRoutes = require('./routes/userRoutes')
const clientRoutes = require('./routes/clientRoutes')
const invoiceRoutes = require('./routes/invoiceRoutes')

const router = (app) => {
  app.use('/api/users', userRoutes)
  app.use('/api/clients', clientRoutes)
  app.use('/api/invoice', invoiceRoutes)
}

module.exports = router
