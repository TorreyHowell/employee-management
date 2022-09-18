const mongoose = require('mongoose')
const User = require('../models/userModel')

const invoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    hours: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Hours',
    },

    receipts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Charge',
    },

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
    isOwner: {
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

module.exports = mongoose.model('Invoice', invoiceSchema)
