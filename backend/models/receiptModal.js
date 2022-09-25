const mongoose = require('mongoose')

const receiptSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Add a name'],
    },
    description: {
      type: String,
      default: '',
    },
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
    amountCharged: {
      type: mongoose.Decimal128,
      default: 0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Receipt', receiptSchema)
