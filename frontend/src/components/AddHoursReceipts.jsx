import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import dayjs from 'dayjs'
import AddIcon from '@mui/icons-material/Add'
import { Stack } from '@mui/system'
import { useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { toast } from 'react-toastify'
import { createHours } from '../features/hours/hoursSlice'
import { createUserReceiptCharge } from '../features/charges/chargesSlice'
import { createUserReceipt } from '../features/receipts/receiptSlice'
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

function AddHoursReceipts() {
  const { clients } = useSelector((state) => state.client)
  const [date, setDate] = useState(dayjs())
  const [addNewHours, setAddNewHours] = useState(false)
  const [addNewReceipt, setAddNewReceipt] = useState(false)
  const [newHourData, setNewHourData] = useState({
    client: '',
    amount: 0,
  })
  const [newReceiptData, setNewReceiptData] = useState({
    client: '',
    store: '',
    price: 0,
    description: '',
  })

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
      description: '',
    })
    setDate(dayjs())
  }

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

    hourData.number = hourData.hours
    hourData.clientId = hourData.client

    dispatch(createHours(hourData))

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

    dispatch(createUserReceipt(receiptData))

    handleCancel()
  }

  const onHourChange = (e) => {
    setNewHourData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onReceiptChange = (e) => {
    setNewReceiptData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Box
        component={'form'}
        autoComplete="off"
        sx={{
          marginTop: 2,
        }}
      >
        {!addNewHours && !addNewReceipt && (
          <Stack direction={'row'} spacing={1}>
            <Button
              fullWidth
              onClick={() => setAddNewHours(true)}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              Hours
            </Button>
            <Button
              fullWidth
              onClick={() => setAddNewReceipt(true)}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              Receipt
            </Button>
          </Stack>
        )}

        {addNewHours && (
          <Stack direction={'row'} spacing={1} mb={2}>
            <Button fullWidth onClick={onHourSubmit} variant="outlined">
              Submit
            </Button>
            <Button
              fullWidth
              color="secondary"
              onClick={handleCancel}
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        )}

        {addNewReceipt && (
          <Stack direction={'row'} spacing={1} mb={2}>
            <Button fullWidth onClick={onReceiptSubmit} variant="outlined">
              Submit
            </Button>
            <Button
              fullWidth
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
                fullWidth
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
              <Box sx={{ minWidth: '50%' }}>
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
            </Stack>
            <Box mt={1}>
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
                    <TextField size="small" fullWidth {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </>
        )}

        {addNewReceipt && (
          <>
            <Stack direction={'row'} spacing={1}>
              <TextField
                fullWidth
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
                fullWidth
                value={newReceiptData.store}
                onChange={onReceiptChange}
                name="store"
                id="store"
                label="Store"
                size="small"
              />

              <Box sx={{ width: '100%' }}>
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

            <Box mt={1}>
              <TextField
                minRows={2}
                onChange={onReceiptChange}
                name="description"
                id="description"
                value={newReceiptData.description}
                fullWidth
                multiline
                label="Description"
              />
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
export default AddHoursReceipts
