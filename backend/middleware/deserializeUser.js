const get = require('lodash/get')
const { reIssueAccessToken } = require('../service/sessionService')
const { verifyJwt } = require('../utils/jwtUtils')

const deserializeUser = async (req, res, next) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )

  const refreshToken = get(req, 'cookies.refreshToken')

  const { decoded, expired } = verifyJwt(accessToken, 'access')

  if (decoded) {
    res.locals.user = decoded

    return next()
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken)

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)
    }

    const result = verifyJwt(newAccessToken, 'access')

    if (!result) {
      return next(new Error('Could not deserialize user'))
    }

    res.locals.user = result.decoded

    return next()
  }

  return next(new Error('Could not deserialize user'))
}

module.exports = deserializeUser
