const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./router')
const { errorHandler } = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

router(app)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
  })
}

app.use(errorHandler)

app.listen(PORT, async () => {
  console.log(`Server started on port: ${PORT}`.cyan.underline)

  await connectDB()
})
