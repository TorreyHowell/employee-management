import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  adminDeleteInvoice,
  getPaidInvoices,
  reset as resetInvoices,
} from '../features/invoice/invoiceSlice'
import SentInvoiceItem from '../components/SentInvoiceItem'
import { Button, Modal, Stack, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { Box } from '@mui/system'

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

function InvoiceHistory() {
  const { invoices, invoiceStatus, invoiceMessage } = useSelector(
    (state) => state.invoice
  )

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [stagedId, setStagedId] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPaidInvoices())

    return () => {
      dispatch(resetInvoices())
    }
  }, [dispatch])

  useEffect(() => {
    if (invoiceStatus === 'ERROR') {
      toast.error(invoiceMessage)
    }
  }, [invoiceMessage, invoiceStatus])

  const deleteClick = (id) => {
    setDeleteModalOpen(true)
    setStagedId(id)
  }

  const handleDelete = () => {
    dispatch(adminDeleteInvoice(stagedId))
    setDeleteModalOpen(false)
  }

  if (invoiceStatus === 'LOADING') return <></>
  return (
    <>
      <Stack spacing={2}>
        {invoices.map((invoice) => (
          <SentInvoiceItem
            key={invoice._id}
            invoice={invoice}
            deleteClick={deleteClick}
          />
        ))}
      </Stack>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Confirm Deny
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              onClick={() => setDeleteModalOpen(false)}
              variant="outlined"
              color="secondary"
              fullWidth
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete()}
              variant="outlined"
              color="error"
              fullWidth
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default InvoiceHistory
