const get = require('lodash/get')
const { reIssueAccessToken } = require('../service/sessionService')
const { verifyJwt } = require('../utils/jwtUtils')

const deserializeUser = async (req, res, next) => {
  const refreshToken = get(req, 'cookies.refreshToken')

  res.setHeader('x-access-token', '')

  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )

  const { decoded, expired } = verifyJwt(accessToken, 'access')

  if (decoded && !expired) {
    res.locals.user = decoded
    return next()
  }

  if (refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken)

    if (!newAccessToken) {
      return next()
    }

    res.setHeader('x-access-token', newAccessToken)

    const result = verifyJwt(newAccessToken, 'access')

    if (!result) {
      return next()
    }

    res.locals.user = result.decoded
    res.locals.user.accessToken = newAccessToken

    return next()
  }

  return next()
}

module.exports = deserializeUser
