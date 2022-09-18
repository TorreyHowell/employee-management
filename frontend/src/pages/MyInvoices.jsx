import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserInvoiceItem from '../components/UserInvoiceItem'
import {
  getActiveClients,
  reset as resetClients,
} from '../features/client/clientSlice'
import {
  deleteInvoice,
  deleteReceipt,
  getUserInvoices,
  rescindInvoice,
  reset as resetInvoices,
  sendInvoice,
} from '../features/invoice/invoiceSlice'
import { reset as resetStage } from '../features/modal/confirmModalSlice'

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

function MyInvoices() {
  const { invoices } = useSelector((state) => state.invoice)
  const { user } = useSelector((state) => state.auth)
  const [deleteModal, setDeleteModal] = useState(false)
  const [rescindModal, setRescindModal] = useState(false)
  const [sendModal, setSendModal] = useState(false)
  const [invoiceId, setInvoiceId] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInvoices())
    dispatch(getActiveClients())

    return () => {
      dispatch(resetInvoices())
      dispatch(resetStage())
      dispatch(resetClients())
    }
  }, [dispatch])

  const deleteClick = (id) => {
    setInvoiceId(id)
    setDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(deleteInvoice(invoiceId))
    setDeleteModal(false)
  }

  const rescindClick = (id) => {
    setInvoiceId(id)
    setRescindModal(true)
  }

  const handleRescind = () => {
    dispatch(rescindInvoice(invoiceId))
    setRescindModal(false)
  }

  const sendClick = (id) => {
    setInvoiceId(id)
    setSendModal(true)
  }

  const handleSend = () => {
    dispatch(sendInvoice(invoiceId))
    setSendModal(false)
  }

  return (
    <>
      <Box
        sx={{
          width: { sm: 500 },
          margin: 'auto',
        }}
      >
        <Stack spacing={2}>
          {invoices.length > 0 &&
            invoices.map((invoice) => (
              <UserInvoiceItem
                key={invoice._id}
                hideDelete={true}
                user={user}
                invoice={invoice}
                deleteClick={deleteClick}
                sendClick={sendClick}
                rescindClick={rescindClick}
              />
            ))}
        </Stack>
      </Box>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={sendModal}
        onClose={() => setSendModal(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Send Invoice
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={() => setSendModal(false)}
            >
              Cancel
            </Button>
            <Button fullWidth variant="outlined" onClick={handleSend}>
              Send
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={rescindModal}
        onClose={() => setRescindModal(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Rescind Invoice
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={() => setRescindModal(false)}
            >
              Cancel
            </Button>
            <Button fullWidth variant="outlined" onClick={handleRescind}>
              Rescind
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Delete Invoice
          </Typography>

          <Stack mt={1} direction={'row'} spacing={2} justifyContent="center">
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="outlined" fullWidth onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default MyInvoices
