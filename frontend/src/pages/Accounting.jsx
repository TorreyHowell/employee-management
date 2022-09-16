import { Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountingCharges } from '../features/charges/chargesSlice'
import generateAccountingTable from '../utils/generateAccountingTable'

const columns = [
  { field: 'col1', headerName: 'Name', width: 200 },
  { field: 'col2', headerName: 'Charge', width: 150 },
  { field: 'col3', headerName: 'Date', width: 150 },
  { field: 'col4', headerName: 'Type', width: 150 },
  { field: 'col5', headerName: 'Client', width: 150 },
  { field: 'col6', headerName: 'Income/Expense', width: 150 },
]
function Accounting() {
  const [tableData, setTableData] = useState(null)
  const [data, setData] = useState(null)

  const { chargesStatus, bills, receipts, invoices } = useSelector(
    (state) => state.charges
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAccountingCharges())
  }, [dispatch])

  useEffect(() => {
    if (chargesStatus === 'SUCCESS') {
      const data = generateAccountingTable({
        bills,
        receipts,
        invoices,
      })
      setTableData(data.rows)
      setData(data.data)
    }
  }, [chargesStatus, bills, receipts, invoices])
  return (
    <>
      <Typography variant="h4">Cash Flow</Typography>

      {data && (
        <>
          <Typography variant="h6">
            Revenue:{' '}
            {
              <NumberFormat
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                value={data.revenue}
              />
            }
          </Typography>
          <Typography variant="h6" mb={1}>
            Net Income:{' '}
            {
              <NumberFormat
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                value={data.netProfit}
              />
            }
          </Typography>
        </>
      )}

      <div>
        <div style={{ height: 400 }}>
          {tableData && <DataGrid rows={tableData} columns={columns} />}
        </div>
      </div>
    </>
  )
}
export default Accounting
