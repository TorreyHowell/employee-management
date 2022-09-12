const Contractor = require('../models/contractorModel')
const asyncHandler = require('express-async-handler')

const createContractor = asyncHandler(async (req, res) => {
  const { name } = req.body

  const contractor = await Contractor.create({
    name,
  })

  return res.status(200).json(contractor)
})

module.exports = {
  createContractor,
}
