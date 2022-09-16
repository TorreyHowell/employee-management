const asyncHandler = require('express-async-handler')
const Bill = require('../models/billModel')
const Charge = require('../models/chargeModel')

const getClientBills = asyncHandler(async (req, res) => {
  const bills = await Bill.find({
    client: req.params.id,
  })
    .sort({ isPaid: 'desc' })
    .lean()

  return res.status(200).json(bills)
})

const getBill = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id).populate('client').lean()

  if (!bill) {
    res.status(400)
    throw new Error('No bill found')
  }

  const charges = await Charge.find({
    bill: bill._id,
  })

  bill.charges = charges

  return res.status(200).json(bill)
})

const updateBill = asyncHandler(async (req, res) => {
  const { paid } = req.body

  await Bill.findByIdAndUpdate(req.params.id, {
    isPaid: paid,
  })

  const updated = await Bill.findById(req.params.id).populate('client').lean()

  return res.status(201).json(updated)
})

const updateBillPrice = asyncHandler(async (req, res) => {
  const newPrice = req.body.price

  const bill = await Bill.findById(req.params.id)

  const original = parseFloat(bill.profit.toString())

  bill.amountCharged = newPrice
  bill.profit = (newPrice - original + original).toFixed(2)

  await bill.save()

  console.log(bill.toJSON())

  res.status(201).json(bill.toObject())
})

const deleteBill = asyncHandler(async (req, res) => {
  const billId = req.params.id

  const bill = Bill.findById(billId)

  if (bill.isPaid) {
    throw new Error('Cant delete paid bills')
  }

  try {
    await Charge.updateMany({ bill: billId }, { bill: null })

    await Bill.findByIdAndDelete(billId)
  } catch (error) {}

  return res.status(200).json(billId)
})

const createBill = asyncHandler(async (req, res) => {
  const charges = req.body.charges

  if (charges.length < 1) {
    res.status(400)
    throw new Error('No charges')
  }

  const bill = await Bill.create({})

  let amountCharged = 0
  let profit = 0

  await Promise.all(
    charges.map(async (id) => {
      const charge = await Charge.findById(id)

      if (charge.bill) {
        await bill.remove()
        throw new Error('Charge already assigned to bill')
      }

      charge.bill = bill._id

      await charge.save()

      amountCharged += parseFloat(charge.amountCharged.toString())
      profit += parseFloat(charge.profit.toString())
    })
  ).catch(function (err) {
    throw err
  })

  bill.amountCharged = amountCharged
  bill.profit = profit
  bill.client = req.params.id

  await bill.save()

  return res.status(201).json({
    chargeIds: req.body.charges,
    bill,
  })
})

const getPaidBills = asyncHandler(async (req, res) => {
  try {
    const bills = await Bill.find({
      isPaid: true,
    })
      .populate('client', 'name')
      .lean()

    return res.status(200).json(bills)
  } catch (error) {
    throw error
  }
})
module.exports = {
  createBill,
  getClientBills,
  getBill,
  updateBill,
  deleteBill,
  updateBillPrice,
  getPaidBills,
}
