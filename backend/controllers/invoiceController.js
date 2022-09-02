const asyncHandler = require('express-async-handler')
const Invoice = require('../models/invoiceModel')
const User = require('../models/userModel')
const dayjs = require('dayjs')

const createInvoice = asyncHandler(async (req, res) => {
  const user = res.locals.user

  const invoice = await Invoice.create({
    user: user._id,
  })

  if (!invoice) {
    res.status(400)
    throw new Error('Could not create Invoice')
  }

  return res.status(201).json(invoice)
})

const pushHours = asyncHandler(async (req, res) => {
  const user = await User.findById(res.locals.user._id)

  let invoice = await Invoice.findById(req.params.id)

  if (!user || !invoice) {
    res.status(400)
    throw new Error('something went wrong')
  }

  if (user._id.toString() !== invoice.user.toString()) {
    res.status(403)
    throw new Error('not authorized')
  }

  invoice.hours.push({
    ...req.body,
    date: dayjs(req.body.date),
  })

  await invoice.save()

  return res.status(201).json(invoice)
})

const pushReceipt = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (!invoice) {
    res.status(400)
    throw new Error('Invoice not found')
  }

  if (invoice.user.toString() !== res.locals.user._id) {
    res.status(403)
    throw new Error('not authorized')
  }

  invoice.receipts.push({
    ...req.body,
    date: dayjs(req.body.date),
  })

  await invoice.save()

  return res.status(201).json(invoice)
})

const getUnsentUserInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({
    user: res.locals.user._id,
    sent: false,
  })
    .populate('hours.client', 'name')
    .lean()

  invoices.forEach((invoice) => {
    if (invoice.user.toString() !== res.locals.user._id) {
      res.status(403)
      throw new Error('Not authorized')
    }
  })

  return res.status(200).json(invoices)
})

module.exports = {
  createInvoice,
  pushHours,
  getUnsentUserInvoices,
  pushReceipt,
}
