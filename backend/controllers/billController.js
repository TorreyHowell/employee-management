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

module.exports = {
  createBill,
  getClientBills,
}
