const asyncHandler = require('express-async-handler')
const Client = require('../models/clientModel')

const createClient = asyncHandler(async (req, res) => {
  const client = await Client.create(req.body)

  if (!client) {
    return res.status(400).json('Could not create client')
  }

  return res.status(200).json(client)
})

module.exports = {
  createClient,
}
