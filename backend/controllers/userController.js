const asyncHandler = require('express-async-handler')
const {
  createUser,
  validatePassword,
  generateAccessRefreshTokens,
  logout,
  hashPassword,
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

  return res.status(200).json(user)
})

const getUsersHandler = asyncHandler(async (req, res) => {
  const users = await User.find({})
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

  if (permission === 'verified') {
    q.verifiedUser = true
    q.admin = false
  } else if (permission === 'admin') {
    q.verifiedUser = true
    q.admin = true
  } else if (permission === 'suspend') {
    q.verifiedUser = false
    q.admin = false
  } else {
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

const changeUserName = asyncHandler(async (req, res) => {
  const { name } = req.body

  const user = await User.findById(res.locals.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  user.name = name

  await user.save()

  return res.status(200).json(user.name)
})

const changeUserPassword = asyncHandler(async (req, res) => {
  const { password } = req.body

  const user = await User.findById(res.locals.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const hash = await hashPassword(password)

  user.password = hash

  await user.save()

  return res.status(200).json('Password Changed')
})

const changeUserEmail = asyncHandler(async (req, res) => {
  const { email } = req.body

  const emailExists = await User.findOne({
    email: email,
  })

  if (emailExists) {
    res.status(400)
    throw new Error('Email already exists')
  }

  const user = await User.findById(res.locals.user._id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  user.email = email

  await user.save()

  return res.status(200).json(user.email)
})

module.exports = {
  createUserHandler,
  getUserHandler,
  loginUserHandler,
  logoutUserHandler,
  getUsersHandler,
  getUserAdminHandler,
  updateUserAdminHandler,
  changeUserName,
  changeUserEmail,
  changeUserPassword,
}
