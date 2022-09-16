import dayjs from 'dayjs'

const generateChargeTableData = ({ bills, receipts, invoices }) => {
  const rows = []

  let revenue = 0
  let expenses = 0
  let profit = 0

  receipts.forEach((charge) => {
    revenue += parseFloat(charge.amountCharged.$numberDecimal)
    expenses += parseFloat(charge.amountCharged.$numberDecimal)

    return rows.push({
      id: charge._id,
      col1: charge.name,
      col2: `$${charge.amountCharged.$numberDecimal.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )}`,
      col3: dayjs(charge.createdAt).format('MM-DD-YYYY'),
      col4: charge.type,
      col5: charge.client.name,
      col6: 'Expense',
    })
  })

  invoices.forEach((item) => {
    revenue += parseFloat(item.amountBilled.$numberDecimal)
    expenses += parseFloat(item.amountBilled.$numberDecimal)

    return rows.push({
      id: item._id,
      col1: `${item.user.name} - Invoice`,
      col2: `$${item.amountBilled.$numberDecimal.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )}`,
      col3: dayjs(item.createdAt).format('MM-DD-YYYY'),
      col4: 'Invoice',
      col5: '...',
      col6: 'Expense',
    })
  })

  bills.forEach((bill) => {
    revenue += parseFloat(bill.amountCharged.$numberDecimal)
    profit += parseFloat(bill.amountCharged.$numberDecimal)

    return rows.push({
      id: bill._id,
      col1: `${bill.client.name} - Bill`,
      col2: `$${bill.amountCharged.$numberDecimal.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )}`,
      col3: dayjs(bill.createAt).format('MM-DD-YYYY'),
      col4: 'Paid Bill',
      col5: bill.client.name,
      col6: 'Income',
    })
  })

  if (rows.length < 1) return null

  const sorted = rows.sort((a, b) => {
    return new Date(b.col3) - new Date(a.col3)
  })

  const netProfit = profit - expenses

  return {
    rows: sorted,
    data: {
      revenue: revenue.toFixed(2),
      netProfit: netProfit.toFixed(2),
    },
  }
}

export default generateChargeTableData
