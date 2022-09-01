const userRoutes = require('./routes/userRoutes')

const router = (app) => {
  app.use('/api/users', userRoutes)
}

module.exports = router
