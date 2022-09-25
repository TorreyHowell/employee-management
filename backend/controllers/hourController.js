const asyncHandler = require('express-async-handler')
const Hours = require('../models/hoursModel')
const User = require('../models/userModel')
const Client = require('../models/clientModel')
const Charge = require('../models/chargeModel')
const dayjs = require('dayjs')

const getUserActiveHours = asyncHandler(async (req, res) => {
  const userId = res.locals.user._id

  let hours = []

  if (res.locals.user.owner) {
    hours = await Hours.find({
      user: userId,
      invoice: null,
    }).populate('client', 'name')
  } else {
    hours = await Hours.find({
      user: userId,
      invoice: null,
    })
      .populate('client', 'name')
      .select('-amountCharged')
  }

  return res.status(200).json(hours)
})

const adminGetUserActiveHours = asyncHandler(async (req, res) => {
  const userId = req.params.id

  const hours = await Hours.find({
    user: userId,
    invoice: null,
  })
    .populate('client', 'name')
    .lean()

  return res.status(200).json(hours)
})

const deleteHours = asyncHandler(async (req, res) => {
  const hoursId = req.params.id
  const charge = await Charge.findOne({
    hours: hoursId,
  })

  const hours = await Hours.findById(hoursId)

  if (hours.user.toString() !== res.locals.user._id && !res.locals.user.owner) {
    res.status(400)
    throw new Error('Not authorized')
  }

  if (!hours) {
    res.status(400)
    throw new Error('Could not find hours')
  }
  if (!charge) {
    await hours.remove()
    return res.status(200).json(hoursId)
  }

  if (charge.bill !== null && charge.bill !== undefined) {
    res.status(400)
    throw new Error("Can't delete hour attached to bill")
  }

  if (charge.hours.length === 1) {
    await charge.remove()
  } else {
    charge.hours.pull(hoursId)

    charge.amountCharged =
      parseFloat(charge.amountCharged) - parseFloat(hours.amountCharged)

    charge.profit =
      parseFloat(charge.profit) -
      (parseFloat(hours.amountCharged) - parseFloat(hours.amountPaid))

    await charge.save()
  }

  await hours.remove()

  res.status(200).json(hoursId)
})

const createHours = asyncHandler(async (req, res) => {
  const { number, clientId, date } = req.body

  const user = await User.findById(res.locals.user._id)
  const client = await Client.findById(clientId)

  if (!user || !client) {
    res.status(400)
    throw new Error('Could not create')
  }

  const amountCharged = parseFloat(number) * parseFloat(user.chargedHourly)

  let amountPaid

  amountPaid = parseFloat(number) * parseFloat(user.paidHourly)

  const hours = await Hours.create({
    user: user._id,
    client: client._id,
    number: number,
    amountPaid,
    amountCharged,
    date: dayjs(date),
  }).then((hours) => hours.populate('client', 'name'))

  const sameCharge = await Charge.findOne({
    user: user._id,
    client: client._id,
    bill: null,
  })

  if (sameCharge) {
    sameCharge.hours.push(hours._id)

    sameCharge.amountCharged =
      parseFloat(sameCharge.amountCharged) + parseFloat(hours.amountCharged)

    sameCharge.profit =
      parseFloat(sameCharge.profit) +
      (parseFloat(hours.amountCharged) - parseFloat(hours.amountPaid))

    await sameCharge.save()
  } else {
    await Charge.create({
      name: `${user.name} - Labor`,
      type: 'Labor',
      user: user._id,
      client: client._id,
      hours: [hours._id],
      amountCharged: hours.amountCharged,
      profit: hours.amountCharged - hours.amountPaid,
    })
  }

  const hoursObject = hours.toObject()

  if (!res.locals.user.owner) {
    delete hoursObject.amountCharged
  }

  return res.status(201).json(hoursObject)
})

module.exports = {
  createHours,
  getUserActiveHours,
  deleteHours,
  adminGetUserActiveHours,
}
