const asyncHandler = require('express-async-handler')
const dayjs = require('dayjs')
const { createSession } = require('../service/sessionService')
const { createUser, validatePassword } = require('../service/userService')
const { signJwt } = require('../utils/jwtUtils')

const createUserHandler = asyncHandler(async (req, res) => {
  const user = await createUser(req.body)

  if (user) {
    const session = await createSession(user._id, req.get('user-agent') || '')

    const accessToken = signJwt({ ...user, session: session._id }, 'access', {
      expiresIn: '15m',
    })

    const refreshToken = signJwt({ ...user, session: session._id }, 'refresh', {
      expiresIn: '30d',
    })

    res.cookie('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate(),
    })

    const userData = {
      ...user,
      accessToken,
    }

    return res.status(201).json(userData)
  }

  res.status(400)
  throw new Error('Invalid user data')
})

const getUserHandler = asyncHandler(async (req, res) => {
  return res.status(200).json(res.locals.user)
})

const loginUserHandler = asyncHandler(async (req, res) => {
  const user = await validatePassword(req.body)

  if (user) {
    const session = await createSession(user._id, req.get('user-agent') || '')

    const accessToken = signJwt({ ...user, session: session._id }, 'access', {
      expiresIn: '15m',
    })

    const refreshToken = signJwt({ ...user, session: session._id }, 'refresh', {
      expiresIn: '30d',
    })

    res.cookie('refreshToken', refreshToken, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: dayjs().add(30, 'days').toDate(),
    })

    const userData = {
      ...user,
      accessToken,
    }

    res.status(201).json(userData)
  }

  res.status(403)
  throw new Error('Invalid user credentials')
})

module.exports = {
  createUserHandler,
  getUserHandler,
  loginUserHandler,
}
