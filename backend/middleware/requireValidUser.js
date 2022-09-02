const requireValidUser = (req, res, next) => {
  const user = res.locals.user
  console.log(user)

  if (!user.verifiedUser) {
    return res.status(403).json('Not authorized')
  }

  return next()
}

module.exports = requireValidUser
