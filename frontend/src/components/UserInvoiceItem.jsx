import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import HourItem from './HourItem'
import ReceiptItem from './ReceiptItem'

import { Stack } from '@mui/system'
import NumberFormat from 'react-number-format'

function UserInvoiceItem({
  invoice,
  hideDelete,
  deleteClick,
  sendClick,
  rescindClick,
}) {
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

          {!invoice.sent && (
            <Stack mt={2} spacing={1} direction={'row'}>
              <Button
                onClick={() => deleteClick(invoice._id)}
                fullWidth
                color="error"
                variant="outlined"
              >
                Delete
              </Button>
              <Button
                onClick={() => sendClick(invoice._id)}
                fullWidth
                variant="outlined"
              >
                Send
              </Button>
            </Stack>
          )}

          {invoice.sent && !invoice.paid && (
            <Box mt={2}>
              <Button
                onClick={() => rescindClick(invoice._id)}
                color="secondary"
                fullWidth
                variant="outlined"
              >
                Rescind
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  )
}
export default UserInvoiceItem
