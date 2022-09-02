const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Add a name'],
    },
    address: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Client', clientSchema)
