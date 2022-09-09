import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InvoiceItem from '../components/InvoiceItem'
import {
  getActiveClients,
  reset as resetClients,
} from '../features/client/clientSlice'
import {
  createInvoice,
  deleteHours,
  deleteInvoice,
  deleteReceipt,
  getActiveInvoices,
  rescindInvoice,
  reset as resetInvoices,
  sendInvoice,
} from '../features/invoice/invoiceSlice'
import { reset as resetStage } from '../features/modal/confirmModalSlice'
import Spinner from '../components/Spinner'
import { useState } from 'react'

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
  const { clients } = useSelector((state) => state.client)
  const { isOpen, type, stagedId, parentId, sendIsOpen } = useSelector(
    (state) => state.confirmModal
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActiveInvoices())
    dispatch(getActiveClients())

    return () => {
      dispatch(resetInvoices())
      dispatch(resetStage())
      dispatch(resetClients())
    }
  }, [dispatch])

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
      dispatch(deleteHours({ id: stagedId, parentId: parentId }))
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

  if (invoiceStatus === 'LOADING') return <Spinner />

  return (
    <>
      <Box
        sx={{
          width: { sm: 500 },
          margin: 'auto',
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 2,
          }}
          onClick={handleCreateInvoice}
        >
          Create Invoice
        </Button>

        <Stack spacing={2}>
          {invoices.map((invoice) => (
            <InvoiceItem
              key={invoice._id}
              clients={clients}
              invoice={invoice}
              onRescindClick={handleRescindClick}
            />
          ))}
        </Stack>
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
            <Button variant="contained" onClick={() => dispatch(resetStage())}>
              Cancel
            </Button>
            <Button
              sx={{
                color: '#000',
              }}
              variant="contained"
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
              variant="contained"
              onClick={() => dispatch(resetStage())}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSend}>
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
              variant="contained"
              onClick={() => setRescindModalOpen(false)}
            >
              Cancel
            </Button>
            <Button color="error" variant="contained" onClick={handleRescind}>
              Rescind
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default Dashboard
