const mongoose = require('mongoose')

const hoursSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },

    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },

    charge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Charge',
    },

    number: {
      type: mongoose.Decimal128,
      default: 0,
    },

    amountPaid: {
      type: mongoose.Decimal128,
      default: 0,
    },

    amountCharged: {
      type: mongoose.Decimal128,
      default: 0,
    },

    date: {
      type: Date,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Hours', hoursSchema)
