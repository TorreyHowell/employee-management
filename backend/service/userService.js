const User = require('../models/userModel')
const omit = require('lodash/omit')
const { createSession } = require('../service/sessionService')
const dayjs = require('dayjs')
const Session = require('../models/sessionModel')
const { signJwt } = require('../utils/jwtUtils')
const bcrypt = require('bcryptjs')

const createUser = async (userData) => {
  const { email } = userData

  const emailExists = await User.findOne({ email })

  if (emailExists) {
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(userData.password, salt)

  userData.password = hash

  const user = await User.create(userData)

  return omit(user.toJSON(), ['password', '__v'])
}

const validatePassword = async ({ email, password }) => {
  const user = await User.findOne({ email })

  if (!user) return false

  const isValid = await user.comparePassword(password)

  if (!isValid) return false

  return omit(user.toJSON(), ['password', '__v'])
}

const generateAccessRefreshTokens = async (user, req, res) => {
  const session = await createSession(user._id, req.get('user-agent') || '')

  const accessToken = signJwt({ ...user, session: session._id }, 'access', {
    expiresIn: '15m',
  })

  const refreshToken = signJwt({ ...user, session: session._id }, 'refresh', {
    expiresIn: '30d',
  })

  res.cookie('refreshToken', refreshToken, {
    // process.env.NODE_ENV !== 'development'
    secure: false,
    httpOnly: true,
    expires: dayjs().add(30, 'days').toDate(),
  })

  const userData = {
    ...user,
    accessToken,
  }

  return userData
}

const logout = async (sessionId) => {
  await Session.findByIdAndDelete(sessionId)
}

module.exports = {
  createUser,
  validatePassword,
  generateAccessRefreshTokens,
  logout,
}
