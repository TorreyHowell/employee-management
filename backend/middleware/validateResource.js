const validate = (schema) => (req, res, next) => {
  const valid = schema(req.body)

  if (!valid) {
    errorMessages = []

    schema.errors.forEach((error) => {
      return errorMessages.push({
        instance: error.instancePath,
        message: error.message,
      })
    })
    res.status(400)
    return next(new Error('Invalid input'))
  }

  return next()
}

module.exports = validate
