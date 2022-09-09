const get = require('lodash/get')
const { reIssueAccessToken } = require('../service/sessionService')
const { verifyJwt } = require('../utils/jwtUtils')

const deserializeUser = async (req, res, next) => {
  const refreshToken = get(req, 'cookies.refreshToken')

  if (refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken)

    if (!newAccessToken) {
      console.log('here')
      res.setHeader('x-access-token', 'expired')
      return next()
    }

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
