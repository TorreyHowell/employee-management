const mongoose = require('mongoose')

const billSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    amountCharged: {
      type: mongoose.Decimal128,
      default: 0,
    },

    profit: {
      type: mongoose.Decimal128,
      default: 0,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Bill', billSchema)
