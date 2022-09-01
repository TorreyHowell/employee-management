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
    return res.status(400).send(errorMessages)
  }

  return next()
}

module.exports = validate
