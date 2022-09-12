const Contractor = require('../models/contractorModel')
const asyncHandler = require('express-async-handler')
const { rest } = require('lodash')

const createContractor = asyncHandler(async (req, res) => {
  const { name } = req.body

  const contractor = await Contractor.create({
    name,
  })

  return res.status(200).json(contractor)
})

const getContractors = asyncHandler(async (req, res) => {
  const contractors = await Contractor.find().lean()

  return res.status(200).json(contractors)
})

const getContractor = asyncHandler(async (req, res) => {
  const contractor = await Contractor.findById(req.params.id).lean()

  if (!contractor) {
    res.status(400)
    throw new Error('contractor no found')
  }

  return res.status(200).json(contractor)
})

const updateContractor = asyncHandler(async (req, res) => {
  const { name, active } = req.body

  await Contractor.findByIdAndUpdate(req.params.id, {
    name,
    active,
  })

  const contractor = await Contractor.findById(req.params.id).lean()

  return res.status(200).json(contractor)
})

module.exports = {
  createContractor,
  getContractors,
  getContractor,
  updateContractor,
}
