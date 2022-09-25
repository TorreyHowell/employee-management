import { Box, Button, Divider, Modal, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  deleteHours,
  getUserActiveHours,
  reset as resetHours,
} from '../features/hours/hoursSlice'
import HourItem from '../components/HourItem'
import { useState } from 'react'
import {
  adminGetUserActiveReceipts,
  deleteUserReceipt,
  reset as resetReceipts,
} from '../features/receipts/receiptSlice'
import ReceiptItem from '../components/ReceiptItem'

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

function UserActivity() {
  const { hours } = useSelector((state) => state.hours)
  const { receipts } = useSelector((state) => state.receipts)

  const [itemId, setItemId] = useState()

  const [deleteHourModal, setDeleteHourModal] = useState(false)
  const [deleteReceiptModal, setDeleteReceiptModal] = useState(false)

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserActiveHours(params.id))
    dispatch(adminGetUserActiveReceipts(params.id))

    return () => {
      dispatch(resetHours())
      dispatch(resetReceipts())
    }
  }, [dispatch, params.id])

  const deleteHourClick = (id) => {
    setItemId(id)
    setDeleteHourModal(true)
  }

  const handleHourDelete = () => {
    dispatch(deleteHours(itemId))
    setDeleteHourModal(false)
  }

  const deleteReceiptClick = (id) => {
    setItemId(id)
    setDeleteReceiptModal(true)
  }

  const handleReceiptDelete = () => {
    setDeleteReceiptModal(false)
    dispatch(deleteUserReceipt(itemId))
  }

  return (
    <>
      <Divider>
        <Typography variant="h6">Activity</Typography>
      </Divider>

      <Stack spacing={1}>
        {hours.map((hour) => (
          <HourItem hour={hour} deleteClick={deleteHourClick} />
        ))}

        {receipts.map((receipt) => (
          <ReceiptItem receipt={receipt} deleteClick={deleteReceiptClick} />
        ))}
      </Stack>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={deleteHourModal}
        onClose={() => setDeleteHourModal(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Delete Hours
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              onClick={() => setDeleteHourModal(false)}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              onClick={handleHourDelete}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={deleteReceiptModal}
        onClose={() => setDeleteReceiptModal(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Delete Receipt
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              onClick={() => setDeleteReceiptModal(false)}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              onClick={handleReceiptDelete}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default UserActivity
