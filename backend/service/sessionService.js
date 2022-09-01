const Session = require('../models/sessionModel')
const { verifyJwt, signJwt } = require('../utils/jwtUtils')
const get = require('lodash/get')
const { findUser } = require('./userService')

const createSession = async (userId, userAgent) => {
  const session = await Session.create({ user: userId, userAgent })

  return session.toJSON()
}

const reIssueAccessToken = async (refreshToken) => {
  const { decoded } = verifyJwt(refreshToken, 'refresh')

  if (!decoded || !get(decoded, 'session')) return false

  const session = await Session.findById(get(decoded, 'session'))

  if (!session || !session.valid) return false

  const user = await findUser({ _id: session.user })

  if (!user) return false

  const accessToken = signJwt({ ...user, session: session._id }, 'access', {
    expiresIn: '15m',
  })

  return accessToken
}
module.exports = {
  createSession,
  reIssueAccessToken,
}
