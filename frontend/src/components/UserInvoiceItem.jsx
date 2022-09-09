import { Card, CardContent, Divider, Typography } from '@mui/material'
import dayjs from 'dayjs'
import HourItem from './HourItem'
import ReceiptItem from './ReceiptItem'

import { Stack } from '@mui/system'
import NumberFormat from 'react-number-format'

function UserInvoiceItem({ invoice, hideDelete }) {
  return (
    <>
      <Card>
        <CardContent>
          <Stack direction={'row'} justifyContent="space-between">
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
              }}
            >
              {dayjs(invoice.createdAt).format('MM-DD-YYYY')}
            </Typography>

            <Typography variant="h6">
              <NumberFormat
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                value={invoice.amountBilled.$numberDecimal}
              />
            </Typography>
          </Stack>

          <Divider
            sx={{
              marginTop: 2,
              marginBottom: 2,
              fontWeight: 500,
              letterSpacing: '2px',
            }}
          >
            {' '}
            HOURS
          </Divider>
          <Stack spacing={1}>
            {invoice.hours.map((hour) => (
              <HourItem
                hideDelete={hideDelete}
                invoiceId={invoice._id}
                hour={hour}
                key={hour._id}
              />
            ))}
          </Stack>

          <Divider
            sx={{
              marginTop: 2,
              marginBottom: 2,
              fontWeight: 500,
              letterSpacing: '2px',
            }}
          >
            {' '}
            RECEIPTS
          </Divider>

          <Stack spacing={1}>
            {invoice.receipts.map((receipt) => (
              <ReceiptItem
                hideDelete={hideDelete}
                invoiceId={invoice._id}
                key={receipt._id}
                receipt={receipt}
                admin={true}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
export default UserInvoiceItem
