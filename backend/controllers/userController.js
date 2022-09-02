const asyncHandler = require('express-async-handler')
const {
  createUser,
  validatePassword,
  generateAccessRefreshTokens,
  logout,
} = require('../service/userService')
const omit = require('lodash/omit')

const createUserHandler = asyncHandler(async (req, res) => {
  const user = await createUser(req.body)

  if (user) {
    const userData = await generateAccessRefreshTokens(
      omit(user.toJSON(), 'password'),
      req,
      res
    )

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
    const userData = await generateAccessRefreshTokens(user, req, res)

    return res.status(201).json(userData)
  }

  res.status(403)
  throw new Error('Invalid user credentials')
})

const logoutUserHandler = asyncHandler(async (req, res) => {
  try {
    await logout(res.locals.user.session)
  } catch (error) {
    res.status(400)
    throw new Error('Could not find session')
  }

  res.clearCookie('refreshToken')
  res.end()
})

module.exports = {
  createUserHandler,
  getUserHandler,
  loginUserHandler,
  logoutUserHandler,
}
