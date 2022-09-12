import {
  Box,
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

function SentInvoiceItem({ invoice, payClick, denyClick, deleteClick }) {
  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2} direction={'row'} justifyContent="space-between">
            <Stack sx={{ width: '60%' }}>
              <Typography noWrap variant="h6">
                {invoice.user.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                }}
              >
                {dayjs(invoice.createdAt).format('MM-DD-YYYY')}
              </Typography>
            </Stack>

            <Box sx={{ width: '40%' }}>
              <Typography noWrap variant="h6" align="right">
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                  value={invoice.amountBilled.$numberDecimal}
                />
              </Typography>
            </Box>
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
          {!invoice.paid ? (
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
                variant="outlined"
                onClick={() => payClick(invoice._id)}
                fullWidth
              >
                Pay
              </Button>
              <Button
                fullWidth
                endIcon={<DoDisturbIcon />}
                color="error"
                variant="outlined"
                onClick={() => denyClick(invoice._id)}
              >
                Deny
              </Button>
            </Stack>
          ) : (
            <>
              <Box sx={{ width: '90%', margin: 'auto' }}>
                <Button
                  fullWidth
                  color="error"
                  variant="outlined"
                  onClick={() => deleteClick(invoice._id)}
                >
                  Delete
                </Button>
              </Box>
            </>
          )}
        </CardActions>
      </Card>
    </>
  )
}
export default SentInvoiceItem
