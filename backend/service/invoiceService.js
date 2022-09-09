const Invoice = require('../models/invoiceModel')
const Charge = require('../models/chargeModel')

const calculateCharges = async (invoiceId) => {
  try {
    const invoice = await Invoice.findById(invoiceId).populate('user')

    const combinedHours = {}

    invoice.hours.forEach((hour) => {
      if (combinedHours[hour.client]) {
        return (combinedHours[hour.client].hours =
          combinedHours[hour.client].hours + hour.hours)
      }

      combinedHours[hour.client] = hour
    })

    invoice.receipts.forEach((receipt) => {
      Charge.create({
        name: `${receipt.store} Receipt`,
        type: 'Receipt',
        user: invoice.user._id,
        client: receipt.client,
        amountCharged: receipt.price,
      })
    })

    for (const key in combinedHours) {
      const amountCharged =
        combinedHours[key].hours * invoice.user.chargedHourly
      const paidToUser = combinedHours[key].hours * invoice.user.paidHourly
      const profit = (amountCharged - paidToUser).toFixed(2)

      Charge.create({
        name: `${invoice.user.name} Labor`,
        type: 'Labor',
        user: invoice.user._id,
        client: key,
        amountCharged: amountCharged,
        profit: profit,
      })
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  calculateCharges,
}
