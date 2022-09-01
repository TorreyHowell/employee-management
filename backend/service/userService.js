const User = require('../models/userModel')
const omit = require('lodash/omit')

const createUser = async (body) => {
  const { email } = body

  const emailExists = await User.findOne({ email })

  if (emailExists) {
    throw new Error('Email taken')
  }

  const user = await User.create(body)

  return omit(user.toJSON(), ['password', '__v'])
}

const findUser = async (query) => {
  const user = await User.findOne(query)

  return omit(user.toJSON(), ['password', '__v'])
}

const validatePassword = async ({ email, password }) => {
  const user = await User.findOne({ email })

  if (!user) return false

  const isValid = await user.comparePassword(password)

  if (!isValid) return false

  return omit(user.toJSON(), ['password', '__v'])
}

module.exports = {
  createUser,
  findUser,
  validatePassword,
}
