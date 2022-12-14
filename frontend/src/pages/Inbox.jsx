import { Button, Modal, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SentInvoiceItem from '../components/SentInvoiceItem'
import {
  denyInvoice,
  getSentInvoices,
  payInvoice,
} from '../features/invoice/invoiceSlice'

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

function Inbox() {
  const [payModalOpen, setPayModalOpen] = useState(false)
  const [denyModalOpen, setDenyModalOpen] = useState(false)
  const [invoiceId, setInvoiceId] = useState('')

  const { invoices, invoiceStatus } = useSelector((state) => state.invoice)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSentInvoices())
  }, [dispatch])

  const handlePayClick = (id) => {
    setPayModalOpen(true)
    setInvoiceId(id)
  }

  const handlePay = () => {
    dispatch(payInvoice(invoiceId))
    setPayModalOpen(false)
  }

  const handleDenyClick = (id) => {
    setDenyModalOpen(true)
    setInvoiceId(id)
  }

  const handleDeny = () => {
    dispatch(denyInvoice(invoiceId))
    setDenyModalOpen(false)
  }

  if (invoiceStatus === 'LOADING') return <></>
  return (
    <>
      <Box
        sx={{
          width: { sm: 500 },
          margin: 'auto',
        }}
      >
        {invoices.length < 1 && (
          <Typography variant="h6" mt={3} align="center">
            Empty
          </Typography>
        )}
        <Stack spacing={2}>
          {invoices.map((invoice) => (
            <SentInvoiceItem
              key={invoice._id}
              invoice={invoice}
              payClick={handlePayClick}
              denyClick={handleDenyClick}
            />
          ))}
        </Stack>
      </Box>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={payModalOpen}
        onClose={() => setPayModalOpen(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Pay Invoice
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              onClick={() => setPayModalOpen(false)}
              color="secondary"
              variant="outlined"
              fullWidth
            >
              Cancel
            </Button>
            <Button variant="outlined" fullWidth onClick={() => handlePay()}>
              Pay
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={denyModalOpen}
        onClose={() => setDenyModalOpen(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Confirm Deny
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              onClick={() => setDenyModalOpen(false)}
              variant="outlined"
              fullWidth
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeny()}
              variant="outlined"
              color="error"
              fullWidth
            >
              Deny
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default Inbox
