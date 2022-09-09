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

module.exports = {
  getChargesForClient,
}
