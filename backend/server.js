const express = require('express')
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

app.use(errorHandler)

app.listen(PORT, async () => {
  console.log(`Server started on port: ${PORT}`.cyan.underline)

  await connectDB()
})
