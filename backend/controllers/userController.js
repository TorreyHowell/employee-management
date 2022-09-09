const asyncHandler = require('express-async-handler')
const {
  createUser,
  validatePassword,
  generateAccessRefreshTokens,
  logout,
} = require('../service/userService')
const User = require('../models/userModel')

const createUserHandler = asyncHandler(async (req, res) => {
  try {
    const userData = req.body

    const user = await createUser(userData)

    if (user) {
      const userData = await generateAccessRefreshTokens(user, req, res)

      return res.status(201).json(userData)
    }
  } catch (error) {
    res.status(400)
    throw error
  }

  res.status(400)
  throw new Error('Invalid user data')
})

const getUserHandler = asyncHandler(async (req, res) => {
  const user = res.locals.user

  if (!user) {
    res.status(400)
    throw new Error('No user')
  }

  delete user.session

  return res.status(200).json(user)
})

const getUsersHandler = asyncHandler(async (req, res) => {
  const users = await User.find({
    owner: false,
  })
    .sort({
      createdAt: 'desc',
    })
    .select('-password')
    .lean()

  return res.status(200).json(users)
})

const getUserAdminHandler = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password').lean()

  return res.status(200).json(user)
})

const updateUserAdminHandler = asyncHandler(async (req, res) => {
  const { name, email, paidHourly, chargedHourly, permission } = req.body

  const q = {
    name,
    email,
    paidHourly,
    chargedHourly,
  }

  if (permission === 'verifiedUser') {
    q.verifiedUser = true
    q.admin = false
  } else if (permission === 'admin') {
    q.verifiedUser = true
    q.admin = true
  } else {
    q.verifiedUser = false
    q.admin = false
  }

  await User.findByIdAndUpdate(req.params.id, q)

  const returnUser = await User.findById(req.params.id)
    .select('-password')
    .lean()

  return res.status(201).json(returnUser)
})

const loginUserHandler = asyncHandler(async (req, res) => {
  const user = await validatePassword(req.body)

  if (user) {
    const userData = await generateAccessRefreshTokens(user, req, res)

    return res.status(201).json(userData)
  }

  res.status(400)
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
  getUsersHandler,
  getUserAdminHandler,
  updateUserAdminHandler,
}
