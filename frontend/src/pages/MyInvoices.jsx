import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InvoiceItem from '../components/InvoiceItem'
import { getActiveClients } from '../features/client/clientSlice'
import {
  createInvoice,
  deleteHours,
  deleteInvoice,
  deleteReceipt,
  getActiveInvoices,
  reset as resetInvoices,
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

  const handleCreateInvoice = () => {
    dispatch(createInvoice())
  }

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
            <Button variant="contained" onClick={() => dispatch(resetStage())}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default MyInvoices
