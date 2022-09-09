const asyncHandler = require('express-async-handler')
const Invoice = require('../models/invoiceModel')
const User = require('../models/userModel')
const dayjs = require('dayjs')
const { calculateCharges } = require('../service/invoiceService')

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

  return res.status(201).json(await invoice.populate('hours.client', 'name'))
})

const pullHours = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.parentId)

  if (!invoice) {
    res.status(400)
    throw new Error('Invoice not found')
  }

  if (res.locals.user._id.toString() !== invoice.user.toString()) {
    res.status(403)
    throw new Error('not authorized')
  }

  await invoice.hours.id(req.params.id).remove()

  await invoice.save()

  return res.status(200).json(await invoice.populate('hours.client', 'name'))
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

const pullReceipt = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.parentId)

  if (!invoice) {
    res.status(400)
    throw new Error('Invoice not found')
  }

  if (res.locals.user._id.toString() !== invoice.user.toString()) {
    res.status(403)
    throw new Error('not authorized')
  }

  await invoice.receipts.id(req.params.id).remove()

  await invoice.save()

  return res.status(200).json(invoice)
})

const getUnsentUserInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({
    user: res.locals.user._id,
    paid: false,
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

const getUserInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({
    user: res.locals.user._id,
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

const getSentInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({
    paid: false,
    sent: true,
  })
    .populate('hours.client', 'name')
    .lean()

  return res.status(200).json(invoices)
})

const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (res.locals.user._id.toString() !== invoice.user.toString()) {
    res.status(403)
    throw new Error('not authorized')
  }

  await invoice.remove()

  return res.status(203).json(req.params.id)
})

const sendInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (res.locals.user._id.toString() !== invoice.user.toString()) {
    res.status(403)
    throw new Error('not authorized')
  }

  invoice.sent = true

  await invoice.save()

  res.status(203).json(await invoice.populate('hours.client', 'name'))
})

const payInvoice = asyncHandler(async (req, res) => {
  await Invoice.findByIdAndUpdate(req.params.id, {
    paid: true,
  })

  res.status(203).json(req.params.id)

  await calculateCharges(req.params.id)
})

const denyInvoice = asyncHandler(async (req, res) => {
  await Invoice.findByIdAndUpdate(req.params.id, {
    sent: false,
  })

  res.status(203).json(req.params.id)
})

const rescindInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (!invoice) {
    res.status(400)
    throw new Error('Invoice not found')
  }

  if (res.locals.user._id.toString() !== invoice.user.toString()) {
    res.status(403)
    throw new Error('not authorized')
  }

  invoice.sent = false

  await invoice.save()

  res.status(203).json(await invoice.populate('hours.client', 'name'))
})

module.exports = {
  createInvoice,
  pushHours,
  getUnsentUserInvoices,
  pushReceipt,
  pullHours,
  pullReceipt,
  deleteInvoice,
  sendInvoice,
  getSentInvoices,
  payInvoice,
  denyInvoice,
  getUserInvoices,
  rescindInvoice,
}
