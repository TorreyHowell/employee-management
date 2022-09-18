const Charge = require('../models/chargeModel')
const Bill = require('../models/billModel')
const Invoice = require('../models/invoiceModel')
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

const getUserReceipts = asyncHandler(async (req, res) => {
  const receipts = await Charge.find({
    type: 'Receipt',
    user: res.locals.user._id,
    invoice: null,
  })
    .populate('client', 'name')
    .lean()

  return res.status(200).json(receipts)
})

const deleteUserReceipt = asyncHandler(async (req, res) => {
  const receipt = await Charge.findById(req.params.id)

  if (receipt.user.toString() !== res.locals.user._id) {
    res.status(400)
    throw new Error('Not Authorized')
  }

  if (receipt.bill !== null && receipt.bill !== undefined) {
    res.status(400)
    throw new Error("Can't delete receipt attached to bill")
  }

  await receipt.remove()

  return res.status(200).json(req.params.id)
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

const createUserReceiptCharge = asyncHandler(async (req, res) => {
  const { price, store, description, client } = req.body

  const charge = await Charge.create({
    amountCharged: price,
    name: `${store} - Receipt`,
    description,
    user: res.locals.user._id,
    client,
    type: 'Receipt',
  }).then((charge) => charge.populate('client', 'name'))

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

const getAccountingCharges = asyncHandler(async (req, res) => {
  try {
    const bills = await Bill.find({
      isPaid: true,
    })
      .populate('client', 'name')
      .lean()

    const receipts = await Charge.find({
      type: 'Receipt',
      user: null,
    })
      .populate('client', 'name')
      .lean()

    const invoices = await Invoice.find({
      paid: true,
      isOwner: false,
    })
      .populate('user', 'name')
      .lean()

    return res.status(200).json({
      bills: bills,
      receipts: receipts,
      invoices: invoices,
    })
  } catch (error) {
    throw error
  }
})

module.exports = {
  getChargesForClient,
  deleteCharge,
  createReceiptCharge,
  createCustomCharge,
  getAccountingCharges,
  createUserReceiptCharge,
  getUserReceipts,
  deleteUserReceipt,
}
