const asyncHandler = require('express-async-handler')
const Client = require('../models/clientModel')
const Charge = require('../models/chargeModel')
const Bill = require('../models/billModel')

const createClient = asyncHandler(async (req, res) => {
  const client = await Client.create(req.body)

  if (!client) {
    return res.status(400).json('Could not create client')
  }

  return res.status(200).json(client)
})

const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find()
    .sort({
      active: 'desc',
      createdAt: 'desc',
    })
    .lean()

  await Promise.all(
    clients.map(async (client) => {
      let count = 0
      count += await Charge.count({
        client: client._id.toString(),
        bill: null,
      })

      count += await Bill.count({
        client: client._id.toString(),
        isPaid: false,
      })

      client.outstandingCharges = count
    })
  )

  clients.sort((a, b) => {
    return b.outstandingCharges - a.outstandingCharges
  })

  return res.status(200).json(clients)
})

const getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  return res.status(200).json(client)
})

const getActiveClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({
    active: true,
  })
    .sort({
      updatedAt: 'desc',
    })
    .select('_id name')
    .lean()

  return res.status(200).json(clients)
})

const changeStatus = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  client.active = !client.active

  await client.save()

  return res.status(200).json({ status: client.status })
})

module.exports = {
  createClient,
  getActiveClients,
  getClients,
  getClient,
  changeStatus,
}
