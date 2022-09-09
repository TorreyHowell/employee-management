const requireValidUser = (req, res, next) => {
  const user = res.locals.user

  if (!user.verifiedUser) {
    res.status(403)
    return new Error('Not authorized')
  }

  return next()
}

module.exports = requireValidUser
