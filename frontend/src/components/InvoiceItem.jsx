import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import UndoIcon from '@mui/icons-material/Undo'
import { useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addHours, addReceipt } from '../features/invoice/invoiceSlice'
import NumberFormat from 'react-number-format'
import { stage, stageSend } from '../features/modal/confirmModalSlice'

const ITEM_HEIGHT = 50
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function InvoiceItem({ invoice, clients, onRescindClick }) {
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

          {!invoice.sent && (
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
                    variant="outlined"
                  >
                    Hours
                  </Button>
                  <Button
                    onClick={() => setAddNewReceipt(true)}
                    startIcon={<AddIcon />}
                    variant="outlined"
                  >
                    Receipt
                  </Button>
                </Stack>
              )}

              {addNewHours && (
                <Stack direction={'row'} spacing={2} mb={2}>
                  <Button onClick={onHourSubmit} variant="outlined">
                    Submit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleCancel}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </Stack>
              )}

              {addNewReceipt && (
                <Stack direction={'row'} spacing={2} mb={2}>
                  <Button onClick={onReceiptSubmit} variant="outlined">
                    Submit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={handleCancel}
                    variant="outlined"
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
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="job-label">Job</InputLabel>
                        <Select
                          labelId="job-label"
                          id="job"
                          label="job"
                          onChange={onHourChange}
                          name="client"
                          value={newHourData.client}
                          MenuProps={MenuProps}
                        >
                          {clients.map((client) => (
                            <MenuItem key={client._id} value={client._id}>
                              {client.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

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

                    <FormControl fullWidth size="small">
                      <InputLabel id="job-label">Job</InputLabel>
                      <Select
                        labelId="job-label"
                        onChange={onReceiptChange}
                        name="client"
                        label="Job"
                        value={newReceiptData.client}
                        MenuProps={MenuProps}
                      >
                        {clients.map((client) => (
                          <MenuItem key={client._id} value={client._id}>
                            {client.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
          )}

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
          {invoice.sent ? (
            <Stack
              direction={'row'}
              spacing={2}
              sx={{
                width: '100%',
              }}
              justifyContent="space-evenly"
            >
              <Button
                endIcon={<UndoIcon />}
                variant="outlined"
                color="secondary"
                onClick={() => onRescindClick(invoice._id)}
                disabled={addNewHours || addNewReceipt}
                fullWidth
              >
                Rescind
              </Button>
            </Stack>
          ) : (
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
                variant="outlined"
                onClick={handleSend}
                disabled={addNewHours || addNewReceipt}
                fullWidth
              >
                Send
              </Button>
              <Button
                endIcon={<DeleteIcon />}
                color="error"
                variant="outlined"
                onClick={handleDelete}
                disabled={addNewHours || addNewReceipt}
                fullWidth
              >
                Delete
              </Button>
            </Stack>
          )}
        </CardActions>
      </Card>
    </>
  )
}
export default InvoiceItem
