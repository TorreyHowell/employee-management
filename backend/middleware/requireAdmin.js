const requireAdmin = (req, res, next) => {
  const user = res.locals.user

  if (!user?.admin) {
    res.status(403)
    return next(new Error('Admin route, you are not authorized'))
  }

  return next()
}

module.exports = requireAdmin
