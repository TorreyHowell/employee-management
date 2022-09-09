import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import HourItem from './HourItem'
import ReceiptItem from './ReceiptItem'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import { Stack } from '@mui/system'
import NumberFormat from 'react-number-format'

function SentInvoiceItem({ invoice, payClick, denyClick, user, hideDelete }) {
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
                hideDelete={invoice.sent}
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
                invoiceId={invoice._id}
                key={receipt._id}
                receipt={receipt}
                hideDelete={invoice.sent}
              />
            ))}
          </Stack>
        </CardContent>
        <CardActions>
          <Stack
            direction={'row'}
            spacing={2}
            sx={{
              width: '100%',
            }}
            justifyContent="space-evenly"
          >
            <Button
              endIcon={<AttachMoneyIcon />}
              variant="contained"
              onClick={() => payClick(invoice._id)}
              fullWidth
            >
              Pay
            </Button>
            <Button
              sx={{
                color: '#000',
              }}
              fullWidth
              endIcon={<DoDisturbIcon />}
              color="error"
              variant="contained"
              onClick={() => denyClick(invoice._id)}
            >
              Deny
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  )
}
export default SentInvoiceItem
