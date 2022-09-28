import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBill,
  updateBill,
  reset as resetCharges,
  deleteBill,
  updateBillPrice,
} from '../features/charges/chargesSlice'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ShareIcon from '@mui/icons-material/Share'
import Spinner from '../components/Spinner'
import dayjs from 'dayjs'
import NumberFormat from 'react-number-format'
import generateChargeTableData from '../utils/generateChargeTableData'
import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'
import EditIcon from '@mui/icons-material/Edit'

const columns = [
  { field: 'col1', headerName: 'Name', width: 200 },
  { field: 'col2', headerName: 'Price', width: 150 },
  { field: 'col3', headerName: 'Date', width: 150 },
  { field: 'col4', headerName: 'Type', width: 150 },
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function Bill() {
  const { bill, chargesStatus } = useSelector((state) => state.charges)

  const [tableData, setTableData] = useState(null)
  const [statusModal, setStatusModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [newPrice, setNewPrice] = useState(0)
  const [editPrice, setEditPrice] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBill(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if (chargesStatus === 'DELETED') {
      navigate(`/client/${bill?.client?._id}`)
    }

    if (bill?.charges) {
      setNewPrice(bill.amountCharged.$numberDecimal)
      setTableData(generateChargeTableData(bill.charges))
    }
  }, [chargesStatus, navigate, bill])

  useEffect(() => {
    return () => {
      dispatch(resetCharges())
    }
  }, [dispatch])

  const handleShare = () => {
    const href = window.location.href

    navigator.clipboard.writeText(href.replace('bill', 'public/bill'))
  }

  const handleStatusChange = () => {
    dispatch(
      updateBill({
        id: params.id,
        query: {
          paid: !bill.isPaid,
        },
      })
    )

    setStatusModal(false)
  }

  const handleEdit = () => {
    const price = parseFloat(newPrice).toFixed(2)
    const original = parseFloat(bill.amountCharged.$numberDecimal).toFixed(2)

    if (price === original) {
      setEditModal(false)
      return toast.error('Prices are the same')
    }

    if (price <= 0 || isNaN(price) || price === undefined) {
      setEditModal(false)
      return toast.error('Enter valid price')
    }

    dispatch(
      updateBillPrice({
        id: params.id,
        query: {
          price: price,
        },
      })
    )

    setEditPrice(false)
    setEditModal(false)
  }

  const handleDeleteBill = () => {
    dispatch(deleteBill(params.id))
    setDeleteModal(false)
  }

  if (!bill) return <Spinner />
  return (
    <>
      <Box
        sx={{
          width: { xs: '100%', sm: 500 },
          margin: 'auto',
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <Fab
              onClick={() => navigate('/client/' + bill.client._id)}
              size="small"
              sx={{ marginTop: '8px' }}
            >
              <ChevronLeftIcon
                sx={{
                  fontSize: '50px',
                }}
              />
            </Fab>
          </Grid>

          <Grid item xs={7}>
            <Stack
              direction={'row'}
              alignItems="start"
              justifyContent={'flex-end'}
              spacing={2}
            >
              <Stack sx={{ width: '100%' }}>
                <Typography noWrap align="right" variant="h6">
                  {bill.client.name}
                </Typography>
                <Typography noWrap align="right" variant="h6">
                  {dayjs(bill.createdAt).format('M-D-YY')}
                </Typography>
              </Stack>
              <IconButton onClick={handleShare}>
                <ShareIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <Stack mt={5} direction={'column'}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" noWrap>
              Status: {bill.isPaid ? 'Paid' : 'Pending'}
            </Typography>
            <Stack direction="row" alignItems="center">
              <Typography noWrap variant="h6">
                Balance:{' '}
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                  value={bill.amountCharged.$numberDecimal}
                />
              </Typography>
              <IconButton
                onClick={() => setEditPrice((prevState) => !prevState)}
              >
                <EditIcon color="primary" fontSize="small" />
              </IconButton>
            </Stack>

            {editPrice && (
              <Stack mt={1} mb={1} sx={{ width: '50%' }} spacing={1}>
                <TextField
                  type="number"
                  inputProps={{
                    min: '0',
                  }}
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  size="small"
                  label="New Price"
                />
                <Button onClick={() => setEditModal(true)} variant="outlined">
                  Submit
                </Button>
              </Stack>
            )}
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography noWrap variant="h6">
              Profit:{' '}
              <NumberFormat
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                value={bill.profit.$numberDecimal}
              />
            </Typography>
          </Box>
        </Stack>

        {tableData && (
          <>
            <Typography mt={3} variant="h6">
              Charges
            </Typography>
            <div>
              <div style={{ height: 400 }}>
                {tableData && <DataGrid rows={tableData} columns={columns} />}
              </div>
            </div>

            <Stack direction={'row'} mt={2} spacing={2}>
              {bill.isPaid ? (
                <>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => setStatusModal(true)}
                    fullWidth
                  >
                    Set Unpaid
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() => setStatusModal(true)}
                    fullWidth
                  >
                    Set Paid
                  </Button>
                  <Button
                    onClick={() => setDeleteModal(true)}
                    color="error"
                    variant="outlined"
                    fullWidth
                  >
                    Delete Bill
                  </Button>
                </>
              )}
            </Stack>
          </>
        )}
      </Box>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={statusModal}
        onClose={() => setStatusModal(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            {bill.paid ? 'Set bill to unpaid' : 'Set bill to paid'}
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              fullWidth
              onClick={() => setStatusModal(false)}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={() => handleStatusChange()}
              variant="outlined"
            >
              Change
            </Button>
          </Stack>
        </Box>
      </Modal>
      {!bill.isPaid && (
        <>
          <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
          >
            <Box sx={style}>
              <Typography variant="h6" align="center">
                Delete Bill
              </Typography>

              <Stack
                mt={1}
                direction={'row'}
                spacing={3}
                justifyContent="center"
              >
                <Button
                  fullWidth
                  onClick={() => setDeleteModal(false)}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={() => handleDeleteBill()}
                  color="error"
                  variant="outlined"
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          </Modal>
        </>
      )}

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={editModal}
        onClose={() => setEditModal(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Change Bill Price
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              fullWidth
              onClick={() => setEditModal(false)}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={() => handleEdit()}
              color="primary"
              variant="outlined"
            >
              Change
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default Bill
