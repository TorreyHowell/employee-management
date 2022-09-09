const requireOwner = (req, res, next) => {
  const user = res.locals.user

  if (!user?.owner) {
    res.status(403)
    return next(new Error('Owner route, you are not authorized'))
  }

  return next()
}

module.exports = requireOwner
