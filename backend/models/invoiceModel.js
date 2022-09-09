const mongoose = require('mongoose')
const User = require('../models/userModel')

const hourSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    hours: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

const receiptSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    price: {
      type: mongoose.Decimal128,
      required: [true, 'Add a price'],
    },
    store: {
      type: String,
      required: [true, 'Add a store'],
    },
    date: {
      type: Date,
      required: [true, 'Add a date'],
    },
  },
  { timestamps: true }
)

const invoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    hours: [hourSchema],

    receipts: [receiptSchema],

    combinedHours: [hourSchema],

    amountBilled: {
      type: mongoose.Decimal128,
      default: 0,
    },

    profit: {
      type: mongoose.Decimal128,
      default: 0,
    },

    paid: {
      type: Boolean,
      default: false,
    },
    datePaid: {
      type: Date,
    },
    pending: {
      type: Boolean,
      default: false,
    },
    sent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

invoiceSchema.pre('save', async function (next) {
  let totalCost = 0
  let gains = 0

  const user = await User.findById(this.user)

  //Calculating hours

  let hours = 0

  this.hours.forEach((doc) => {
    return (hours += doc.hours)
  })

  const hoursPay = hours * user.paidHourly

  gains += hoursPay
  totalCost += hoursPay

  // Calculating receipts
  let cost = 0

  this.receipts.forEach((doc) => {
    return (cost += parseFloat(doc.price.toString()))
  })
  totalCost += cost

  this.amountBilled = totalCost.toFixed(2)

  this.profit = gains.toFixed(2)

  return next()
})

module.exports = mongoose.model('Invoice', invoiceSchema)
