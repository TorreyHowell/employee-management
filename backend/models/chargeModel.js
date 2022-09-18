const mongoose = require('mongoose')

const chargeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Add a name'],
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: [true, 'Add a type'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contractor',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    hours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hours',
      },
    ],
    receipt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receipt',
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
