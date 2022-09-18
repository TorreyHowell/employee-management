import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Divider, Modal, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import { toast } from 'react-toastify'
import NumberFormat from 'react-number-format'
import {
  getActiveClients,
  reset as resetClients,
} from '../features/client/clientSlice'
import {
  createInvoice,
  deleteInvoice,
  deleteReceipt,
  rescindInvoice,
  reset as resetInvoices,
  sendInvoice,
} from '../features/invoice/invoiceSlice'
import { reset as resetStage } from '../features/modal/confirmModalSlice'
import { deleteHours, getActiveHours } from '../features/hours/hoursSlice'
import HourItem from '../components/HourItem'
import AddHoursReceipts from '../components/AddHoursReceipts'
import {
  deleteUserReceipts,
  getUserReceipts,
  reset as resetCharges,
} from '../features/charges/chargesSlice'
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

function Dashboard() {
  const [rescindModalOpen, setRescindModalOpen] = useState(false)
  const [invoiceId, setInvoiceId] = useState('')
  const { invoices, invoiceStatus } = useSelector((state) => state.invoice)
  const [total, setTotal] = useState(0.0)
  const { hours, hoursStatus, hoursMessage } = useSelector(
    (state) => state.hours
  )
  const { receipts, chargesStatus, chargesMessage } = useSelector(
    (state) => state.charges
  )

  const { isOpen, type, stagedId, parentId, sendIsOpen } = useSelector(
    (state) => state.confirmModal
  )

  const [deleteHourModal, setDeleteHourModal] = useState(false)
  const [hourId, setHourId] = useState('')

  const [deleteReceiptModal, setDeleteReceiptModal] = useState(false)
  const [receiptId, setReceiptId] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActiveHours())
    dispatch(getActiveClients())
    dispatch(getUserReceipts())

    return () => {
      dispatch(resetInvoices())
      dispatch(resetStage())
      dispatch(resetClients())
      dispatch(resetCharges())
    }
  }, [dispatch])

  useEffect(() => {
    if (hoursStatus === 'ERROR') {
      toast.error(hoursMessage)
    }

    if (chargesStatus === 'ERROR') {
      toast.error(chargesMessage)
    }
  }, [hoursStatus, hoursMessage, chargesStatus, chargesMessage])

  useEffect(() => {
    setTotal(0)

    hours.forEach((hour) => {
      setTotal(
        (prevState) =>
          (prevState += hour.amountCharged
            ? parseFloat(hour.amountCharged.$numberDecimal)
            : parseFloat(hour.amountPaid.$numberDecimal))
      )
    })

    receipts.forEach((receipt) => {
      setTotal(
        (prevState) =>
          (prevState += receipt.amountCharged
            ? parseFloat(receipt.amountCharged.$numberDecimal)
            : parseFloat(receipt.amountPaid.$numberDecimal))
      )
    })
  }, [hours, receipts])

  const handleRescindClick = (id) => {
    setRescindModalOpen(true)
    setInvoiceId(id)
  }

  const handleRescind = () => {
    dispatch(rescindInvoice(invoiceId))
    setRescindModalOpen(false)
  }

  const handleDelete = () => {
    if (type === 'hour') {
    } else if (type === 'receipt') {
      dispatch(deleteReceipt({ id: stagedId, parentId: parentId }))
    } else if (type === 'invoice') {
      dispatch(deleteInvoice(stagedId))
    }
    dispatch(resetStage())
  }

  const handleCreateInvoice = () => {
    dispatch(createInvoice())
  }

  const handleSend = () => {
    if (type === 'send') {
      dispatch(sendInvoice(stagedId))
    }
    dispatch(resetStage())
  }

  const handleDeleteHourClick = (id) => {
    setHourId(id)
    setDeleteHourModal(true)
  }

  const handleDeleteReceiptClick = (id) => {
    setReceiptId(id)
    setDeleteReceiptModal(true)
  }

  const handleHourDelete = () => {
    dispatch(deleteHours(hourId))
    setDeleteHourModal(false)
  }

  const handleReceiptDelete = () => {
    dispatch(deleteUserReceipts(receiptId))
    setDeleteReceiptModal(false)
  }

  if (invoiceStatus === 'LOADING') return <></>

  return (
    <>
      <AddHoursReceipts />
      <Box
        sx={{
          width: { sm: 500 },
          margin: 'auto',
        }}
      >
        {total > 0 && (
          <Box mt={3}>
            <Typography variant="h5">
              Total:{' '}
              {
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                  value={total}
                />
              }
            </Typography>
          </Box>
        )}

        {hours.length > 0 && (
          <Stack spacing={1}>
            <Divider>
              <Typography variant="h5">Hours</Typography>
            </Divider>
            {hours.map((item) => (
              <HourItem
                key={item._id}
                hour={item}
                deleteClick={handleDeleteHourClick}
              />
            ))}
          </Stack>
        )}

        {receipts.length > 0 && (
          <Stack spacing={1} mt={2}>
            <Divider>
              <Typography variant="h5">Receipts</Typography>
            </Divider>
            {receipts.map((item) => (
              <ReceiptItem
                key={item._id}
                receipt={item}
                deleteClick={handleDeleteReceiptClick}
              />
            ))}
          </Stack>
        )}

        <Box mt={3}>
          <Button
            variant="outlined"
            fullWidth
            disabled={hours.length < 1}
            sx={{
              marginBottom: 2,
            }}
            onClick={handleCreateInvoice}
          >
            Create Invoice
          </Button>
        </Box>
      </Box>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={isOpen}
        onClose={() => dispatch(resetStage())}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Confirm Delete
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => dispatch(resetStage())}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={sendIsOpen}
        onClose={() => dispatch(resetStage())}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Send Invoice
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              onClick={() => dispatch(resetStage())}
            >
              Cancel
            </Button>
            <Button variant="outlined" fullWidth onClick={handleSend}>
              Send
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={rescindModalOpen}
        onClose={() => setRescindModalOpen(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Rescind Invoice
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              color="secondary"
              variant="outlined"
              fullWidth
              onClick={() => setRescindModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              onClick={handleRescind}
            >
              Rescind
            </Button>
          </Stack>
        </Box>
      </Modal>

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
export default Dashboard
