import dayjs from 'dayjs'

const generateChargeTableData = (charges) => {
  const rows = []
  charges.forEach((charge) => {
    return rows.push({
      id: charge._id,
      col1: charge.name,
      col2: `$${charge.amountCharged.$numberDecimal.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )}`,
      col3: dayjs(charge.createdAt).format('MM-DD-YYYY'),
      col4: charge.type,
    })
  })

  return rows
}

export default generateChargeTableData
