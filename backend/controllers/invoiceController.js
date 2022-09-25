const asyncHandler = require('express-async-handler')
const Invoice = require('../models/invoiceModel')
const User = require('../models/userModel')
const Charge = require('../models/chargeModel')
const Receipt = require('../models/receiptModal')
const Hours = require('../models/hoursModel')
const dayjs = require('dayjs')
const { calculateCharges } = require('../service/invoiceService')

const createInvoice = asyncHandler(async (req, res) => {
  const user = res.locals.user

  const { hours, receipts } = req.body

  const hourIds = hours.map((hour) => hour._id)
  const receiptIds = receipts.map((receipt) => receipt._id)

  const checkForHour = await Invoice.findOne({
    hours: { $in: hourIds },
  })

  const checkForReceipt = await Invoice.findOne({
    receipts: { $in: receiptIds },
  })

  if (checkForHour || checkForReceipt) {
    res.status(400)
    throw new Error('Hours or receipts already attached to Invoice')
  }

  const invoice = await Invoice.create({
    user: user._id,
    isOwner: user.owner,
    hours: hourIds,
    receipts: receiptIds,
  })

  if (!invoice) {
    res.status(400)
    throw new Error('Could not create Invoice')
  }

  await Hours.updateMany({ _id: { $in: hourIds } }, { invoice: invoice._id })

  await Receipt.updateMany(
    { _id: { $in: receiptIds } },
    { invoice: invoice._id }
  )

  let amountBilled = 0
  let profit = 0

  const hourItems = await Hours.find({
    _id: { $in: hourIds },
  }).lean()

  const receiptItems = await Charge.find({
    _id: { $in: receiptIds },
  }).lean()

  hourItems.forEach((item) => {
    profit += parseFloat(item.amountPaid)
    amountBilled += parseFloat(item.amountPaid)
  })

  receiptItems.forEach((item) => {
    amountBilled += parseFloat(item.amountCharged)
  })

  invoice.amountBilled = amountBilled
  invoice.profit = profit

  await invoice.save()

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
    .populate('hours')
    .populate('receipts')
    .populate({
      path: 'hours',
      populate: {
        path: 'client',
        model: 'Client',
      },
    })
    .populate({
      path: 'receipts',
      populate: {
        path: 'client',
        model: 'Client',
      },
    })
    .sort({
      createdAt: 'desc',
    })
    .lean()

  invoices.forEach((invoice) => {
    if (invoice.user.toString() !== res.locals.user._id) {
      res.status(403)
      throw new Error('Not authorized')
    }
  })

  return res.status(200).json(invoices)
})

const getPaidInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({
    paid: true,
  })
    .populate('hours')
    .populate('receipts')
    .populate('user', 'name')
    .populate({
      path: 'hours',
      populate: {
        path: 'client',
        model: 'Client',
      },
    })
    .populate({
      path: 'receipts',
      populate: {
        path: 'client',
        model: 'Client',
      },
    })
    .sort({
      createdAt: 'desc',
    })
    .lean()
  return res.status(200).json(invoices)
})

const getSentInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({
    paid: false,
    sent: true,
  })
    .populate('hours')
    .populate('receipts')
    .populate({
      path: 'hours',
      populate: {
        path: 'client',
        model: 'Client',
      },
    })
    .populate({
      path: 'receipts',
      populate: {
        path: 'client',
        model: 'Client',
      },
    })
    .lean()

  return res.status(200).json(invoices)
})

const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (res.locals.user._id.toString() !== invoice.user.toString()) {
    res.status(403)
    throw new Error('not authorized')
  }

  if (invoice.sent || invoice.paid) {
    res.status(400)
    throw new Error("can't delete a sent invoice")
  }

  await Hours.updateMany(
    {
      _id: { $in: invoice.hours },
    },
    {
      invoice: null,
    }
  )

  await Receipt.updateMany(
    { _id: { $in: invoice.receipts } },
    { invoice: null }
  )

  await invoice.remove()

  return res.status(203).json(req.params.id)
})

const adminDeleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (!invoice) {
    res.status(400)
    throw new Error('Invoice not found')
  }

  const receipts = await Receipt.find({
    invoice: invoice._id,
  })

  const hours = await Hours.find({
    invoice: invoice._id,
  })

  const hourIds = hours.map((hour) => hour._id)
  const receiptIds = receipts.map((receipt) => receipt._id)

  await Receipt.deleteMany({
    invoice: invoice._id,
  })

  await Hours.deleteMany({
    invoice: invoice._id,
  })

  Promise.all(
    hours.map(async (hour) => {
      const charge = await Charge.findOne({ hours: hour._id })

      if (!charge) {
        return
      }

      if (charge.bill !== null && charge.bill !== undefined) {
        return
      }

      if (charge.hours.length === 1) {
        await charge.remove()
        return
      }

      charge.hours.pull(hour._id)

      charge.amountCharged =
        parseFloat(charge.amountCharged) - parseFloat(hour.amountCharged)

      charge.profit =
        parseFloat(charge.profit) -
        (parseFloat(hour.amountCharged) - parseFloat(hour.amountPaid))

      await charge.save()
    })
  )

  await Charge.deleteMany({
    receipt: { $in: receiptIds },
    bill: null,
  })

  await invoice.remove()

  return res.status(200).json(invoice._id)
})

const sendInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (res.locals.user._id.toString() !== invoice.user.toString()) {
    res.status(403)
    throw new Error('not authorized')
  }

  invoice.sent = true

  await invoice.save()

  res.status(200).json(invoice._id)
})

const payInvoice = asyncHandler(async (req, res) => {
  await Invoice.findByIdAndUpdate(req.params.id, {
    paid: true,
  })

  res.status(203).json(req.params.id)
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

  res.status(200).json(invoice._id)
})

module.exports = {
  createInvoice,
  pushHours,
  getUnsentUserInvoices,
  pushReceipt,
  pullHours,
  pullReceipt,
  deleteInvoice,
  adminDeleteInvoice,
  sendInvoice,
  getSentInvoices,
  payInvoice,
  denyInvoice,
  getUserInvoices,
  rescindInvoice,
  getPaidInvoices,
}
