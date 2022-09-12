const mongoose = require('mongoose')

const contractorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Add a name'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Contractor', contractorSchema)
