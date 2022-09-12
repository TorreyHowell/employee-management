const Charge = require('../models/chargeModel')
const asyncHandler = require('express-async-handler')

const getChargesForClient = asyncHandler(async (req, res) => {
  const charges = await Charge.find({
    client: req.params.id,
    bill: null,
  })
    .populate('client')
    .lean()

  return res.status(200).json(charges)
})

const createReceiptCharge = asyncHandler(async (req, res) => {
  const { price, store, description, client } = req.body

  const charge = await Charge.create({
    amountCharged: price,
    name: `${store} - Receipt`,
    description,
    client,
    type: 'Receipt',
  })

  return res.status(201).json(charge)
})

const createCustomCharge = asyncHandler(async (req, res) => {
  const { price, name, description, client } = req.body

  const charge = await Charge.create({
    amountCharged: price,
    profit: price,
    name: name,
    description,
    client,
    type: 'Custom',
  })

  return res.status(201).json(charge)
})

const deleteCharge = asyncHandler(async (req, res) => {
  await Charge.findByIdAndDelete(req.params.id)

  return res.status(203).json(req.params.id)
})

module.exports = {
  getChargesForClient,
  deleteCharge,
  createReceiptCharge,
  createCustomCharge,
}
