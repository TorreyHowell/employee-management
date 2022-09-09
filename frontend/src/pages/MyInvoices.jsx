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
  deleteHours,
  deleteInvoice,
  deleteReceipt,
  getUserInvoices,
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
  const { isOpen, type, stagedId, parentId, sendIsOpen } = useSelector(
    (state) => state.confirmModal
  )

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

  const handleSend = () => {
    if (type === 'send') {
      dispatch(sendInvoice(stagedId))
    }
    dispatch(resetStage())
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
          {invoices.map((invoice) => (
            <UserInvoiceItem
              key={invoice._id}
              hideDelete={true}
              user={user}
              invoice={invoice}
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
            <Button variant="contained" color="error" onClick={handleDelete}>
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
    </>
  )
}
export default MyInvoices
