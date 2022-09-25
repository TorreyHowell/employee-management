const Charge = require('../models/chargeModel')
const Receipt = require('../models/receiptModal')
const asyncHandler = require('express-async-handler')

const getUserReceipts = asyncHandler(async (req, res) => {
  const receipts = await Receipt.find({
    user: res.locals.user._id,
    invoice: null,
  })
    .populate('client', 'name')
    .lean()

  return res.status(200).json(receipts)
})

const adminGetUserActiveReceipts = asyncHandler(async (req, res) => {
  const receipts = await Receipt.find({
    user: req.params.id,
    invoice: null,
  })
    .populate('client', 'name')
    .lean()

  return res.status(200).json(receipts)
})

const createUserReceiptCharge = asyncHandler(async (req, res) => {
  const { price, store, description, client } = req.body

  const receipt = await Receipt.create({
    amountCharged: price,
    name: `${store} - Receipt`,
    description,
    user: res.locals.user._id,
    client,
  }).then((receipt) => receipt.populate('client', 'name'))

  await Charge.create({
    amountCharged: price,
    name: `${store} - Receipt`,
    description,
    user: res.locals.user._id,
    client,
    type: 'Receipt',
    receipt: receipt._id,
  })

  return res.status(201).json(receipt)
})

const deleteReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id)

  if (
    receipt.user.toString() !== res.locals.user._id &&
    !res.locals.user.admin
  ) {
    res.status(400)
    throw new Error('Not Authorized')
  }

  const charge = await Charge.findOne({
    receipt: req.params.id,
  })

  if (!charge) {
    await receipt.remove()
    return res.status(200).json(req.params.id)
  }

  if (charge.bill !== null && charge.bill !== undefined) {
    res.status(400)
    throw new Error("Can't delete receipt attached to bill")
  }
  await charge.remove()
  await receipt.remove()

  return res.status(200).json(req.params.id)
})

module.exports = {
  createUserReceiptCharge,
  getUserReceipts,
  adminGetUserActiveReceipts,
  deleteReceipt,
}
