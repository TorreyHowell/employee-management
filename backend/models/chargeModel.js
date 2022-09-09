const mongoose = require('mongoose')

const chargeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Add a name'],
    },
    type: {
      type: String,
      required: [true, 'Add a type'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    bill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bill',
    },
    amountCharged: {
      type: mongoose.Decimal128,
      default: 0,
    },
    profit: {
      type: mongoose.Decimal128,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Charge', chargeSchema)
