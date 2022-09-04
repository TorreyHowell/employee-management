import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import HourItem from './HourItem'
import ReceiptItem from './ReceiptItem'
import SendIcon from '@mui/icons-material/Send'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack } from '@mui/system'
import { useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addHours, addReceipt } from '../features/invoice/invoiceSlice'
import NumberFormat from 'react-number-format'
import { stage, stageSend } from '../features/modal/confirmModalSlice'

function InvoiceItem({ invoice, clients }) {
  const [addNewHours, setAddNewHours] = useState(false)
  const [addNewReceipt, setAddNewReceipt] = useState(false)

  const [newHourData, setNewHourData] = useState({
    client: '',
    hours: 0,
  })

  const [newReceiptData, setNewReceiptData] = useState({
    client: '',
    store: '',
    price: 0,
  })

  const [date, setDate] = useState(dayjs())

  const dispatch = useDispatch()

  const handleCancel = () => {
    setAddNewHours(false)
    setAddNewReceipt(false)
    setNewHourData({
      client: '',
      hours: 0,
    })
    setNewReceiptData({
      client: '',
      store: '',
      price: 0,
    })
    setDate(dayjs())
  }

  const onHourChange = (e) => {
    setNewHourData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onReceiptChange = (e) => [
    setNewReceiptData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    })),
  ]

  const onHourSubmit = () => {
    const hourData = {
      ...newHourData,
      date: date.format('MM/DD/YYYY'),
    }

    hourData.hours = parseInt(hourData.hours, 10)

    if (hourData.hours <= 0 || isNaN(hourData.hours)) {
      return toast.error('Hours Required')
    }

    if (!hourData.client) {
      return toast.error('Select Job')
    }

    const addHourData = {
      hourData,
      invoiceId: invoice._id,
    }

    dispatch(addHours(addHourData))

    handleCancel()
  }

  const onReceiptSubmit = () => {
    const receiptData = {
      ...newReceiptData,
      date: date.format('MM/DD/YYYY'),
    }

    receiptData.price = parseFloat(receiptData.price).toFixed(2)

    if (receiptData.price <= 0 || isNaN(receiptData.price)) {
      return toast.error('Enter a price')
    }

    if (!receiptData.client) {
      return toast.error('Select Job')
    }

    if (!receiptData.store) {
      return toast.error('Enter Store')
    }

    const addNewReceiptData = {
      receiptData,
      invoiceId: invoice._id,
    }

    dispatch(addReceipt(addNewReceiptData))

    handleCancel()
  }

  const handleSend = () => {
    dispatch(stageSend({ id: invoice._id, type: 'send' }))
  }

  const handleDelete = () => {
    dispatch(stage({ id: invoice._id, type: 'invoice' }))
  }

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

          <Box
            component={'form'}
            autoComplete="off"
            sx={{
              marginTop: 2,
            }}
          >
            {!addNewHours && !addNewReceipt && (
              <Stack direction={'row'} spacing={2}>
                <Button
                  onClick={() => setAddNewHours(true)}
                  startIcon={<AddIcon />}
                  variant="contained"
                >
                  Hours
                </Button>
                <Button
                  onClick={() => setAddNewReceipt(true)}
                  startIcon={<AddIcon />}
                  variant="contained"
                >
                  Receipt
                </Button>
              </Stack>
            )}

            {addNewHours && (
              <Stack direction={'row'} spacing={2} mb={2}>
                <Button onClick={onHourSubmit} variant="contained">
                  Submit
                </Button>
                <Button
                  color="secondary"
                  onClick={handleCancel}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Stack>
            )}

            {addNewReceipt && (
              <Stack direction={'row'} spacing={2} mb={2}>
                <Button onClick={onReceiptSubmit} variant="contained">
                  Submit
                </Button>
                <Button
                  color="secondary"
                  onClick={handleCancel}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Stack>
            )}

            {addNewHours && (
              <>
                <Stack direction={'row'} spacing={1}>
                  <TextField
                    type={'number'}
                    id="hours"
                    name="hours"
                    inputProps={{
                      min: '0',
                    }}
                    onChange={onHourChange}
                    value={newHourData.hours || ''}
                    label="Hours"
                    size="small"
                  />
                  <TextField
                    select
                    onChange={onHourChange}
                    name="client"
                    fullWidth
                    label="Job"
                    size="small"
                    value={newHourData.client}
                  >
                    {clients.map((client) => (
                      <MenuItem key={client._id} value={client._id}>
                        {client.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        views={['year', 'month', 'day']}
                        label="Date"
                        id="date"
                        name="date"
                        inputFormat="MM/DD/YYYY"
                        value={date}
                        onChange={setDate}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Stack>
              </>
            )}

            {addNewReceipt && (
              <>
                <Stack direction={'row'} spacing={1}>
                  <TextField
                    value={newReceiptData.price || ''}
                    onChange={onReceiptChange}
                    name="price"
                    id="price"
                    type={'number'}
                    label="Price"
                    size="small"
                    inputProps={{
                      min: '0',
                    }}
                  />

                  <TextField
                    select
                    onChange={onReceiptChange}
                    name="client"
                    fullWidth
                    label="Job"
                    size="small"
                    value={newReceiptData.client}
                  >
                    {clients.map((client) => (
                      <MenuItem key={client._id} value={client._id}>
                        {client.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack direction={'row'} mt={1} spacing={1}>
                  <TextField
                    value={newReceiptData.store}
                    onChange={onReceiptChange}
                    name="store"
                    id="store"
                    label="Store"
                    size="small"
                  />

                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        views={['year', 'month', 'day']}
                        label="Date"
                        id="date"
                        name="date"
                        inputFormat="MM/DD/YYYY"
                        value={date}
                        onChange={setDate}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Stack>
              </>
            )}
          </Box>

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
              <HourItem invoiceId={invoice._id} hour={hour} key={hour._id} />
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
              endIcon={<SendIcon />}
              variant="contained"
              onClick={handleSend}
              disabled={addNewHours || addNewReceipt}
            >
              Send
            </Button>
            <Button
              sx={{
                color: '#000',
              }}
              endIcon={<DeleteIcon />}
              color="error"
              variant="contained"
              onClick={handleDelete}
              disabled={addNewHours || addNewReceipt}
            >
              Delete
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  )
}
export default InvoiceItem
