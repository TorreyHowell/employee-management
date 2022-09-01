const jwt = require('jsonwebtoken')

const signJwt = (data, keyName, options) => {
  let signingKey

  if (keyName === 'access') {
    signingKey = process.env.accessTokenPrivateKey
  } else {
    signingKey = process.env.refreshTokenPrivateKey
  }

  return jwt.sign(data, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

const verifyJwt = (token, keyName) => {
  let publicKey

  if (keyName === 'access') {
    publicKey = process.env.accessTokenPublicKey
  } else {
    publicKey = process.env.refreshTokenPublicKey
  }

  try {
    const decoded = jwt.verify(token, publicKey)

    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    }
  }
}

module.exports = {
  signJwt,
  verifyJwt,
}
