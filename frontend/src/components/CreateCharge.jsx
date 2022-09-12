import {
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { toSafeInteger } from 'lodash'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  createCustomCharge,
  createReceiptCharge,
} from '../features/charges/chargesSlice'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: 500 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: { xs: 1, sm: 4 },
}

function CreateCharge() {
  const { chargesStatus, message } = useSelector((state) => state.charges)

  const [modalOpen, setModalOpen] = useState(false)

  const [newReceipt, setNewReceipt] = useState({
    price: 0,
    store: '',
    description: '',
  })

  const [newCustom, setNewCustom] = useState({
    price: 0,
    name: '',
    description: '',
  })

  const [addReceipt, setAddReceipt] = useState(true)
  const [addCustom, setAddCustom] = useState(false)
  const [addContractor, setAddContractor] = useState(false)

  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    if (chargesStatus === 'CHARGE_CREATED') {
      setNewReceipt({
        price: 0,
        store: '',
        description: '',
      })
      setNewCustom({
        price: 0,
        name: '',
        description: '',
      })
      toast.success('Charge Created')
    }
  }, [chargesStatus])

  const handleCreateReceipt = () => {
    const price = parseFloat(newReceipt.price).toFixed(2)

    if (price <= 0 || isNaN(price) || price === undefined) {
      return toast.error('Enter a valid price')
    }

    dispatch(
      createReceiptCharge({
        ...newReceipt,
        price: price,
        client: params.id,
      })
    )
  }

  const handleCreateCustom = () => {
    const price = parseFloat(newCustom.price).toFixed(2)

    if (price <= 0 || isNaN(price) || price === undefined) {
      return toast.error('Enter a valid price')
    }

    dispatch(
      createCustomCharge({
        ...newCustom,
        price: price,
        client: params.id,
      })
    )
  }

  const handleType = (type) => {
    if (type === 'receipt') {
      setAddReceipt(true)
      setAddCustom(false)
      setAddContractor(false)
    }

    if (type === 'custom') {
      setAddReceipt(false)
      setAddCustom(true)
      setAddContractor(false)
    }

    if (type === 'contractor') {
      setAddReceipt(false)
      setAddCustom(false)
      setAddContractor(true)
    }
  }

  const handleReceiptChange = (e) => {
    setNewReceipt((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCustomChange = (e) => {
    setNewCustom((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        variant="outlined"
        fullWidth
        color="success"
      >
        Create Charge
      </Button>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Box sx={style}>
          <Grid container mb={3}>
            <Grid item xs={4}>
              <Button
                onClick={() => handleType('receipt')}
                fullWidth
                variant="outlined"
                color={addReceipt ? 'success' : 'secondary'}
              >
                <Typography variant="button" noWrap>
                  Receipt
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={() => handleType('custom')}
                fullWidth
                variant="outlined"
                color={addCustom ? 'success' : 'secondary'}
              >
                <Typography variant="button" noWrap>
                  Custom
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={() => handleType('contractor')}
                fullWidth
                variant="outlined"
                color={addContractor ? 'success' : 'secondary'}
              >
                <Typography variant="button" noWrap>
                  Contractor
                </Typography>
              </Button>
            </Grid>
          </Grid>

          {/* Create Receipt */}
          {addReceipt && (
            <>
              <Stack direction={'row'} spacing={1} mb={1}>
                <TextField
                  inputProps={{
                    min: '0',
                  }}
                  name="price"
                  value={newReceipt.price || ''}
                  onChange={handleReceiptChange}
                  type="number"
                  fullWidth
                  size="small"
                  label="Price"
                />
                <TextField
                  name="store"
                  value={newReceipt.store}
                  onChange={handleReceiptChange}
                  fullWidth
                  size="small"
                  label="Store"
                />
              </Stack>
              <TextField
                name="description"
                value={newReceipt.description}
                onChange={handleReceiptChange}
                multiline
                fullWidth
                label="Description"
              />
              <Box mt={3}>
                <Button
                  fullWidth
                  onClick={() => handleCreateReceipt()}
                  variant="outlined"
                  color="success"
                >
                  Create
                </Button>
              </Box>
            </>
          )}

          {/* Create Custom Charge */}
          {addCustom && (
            <>
              <Box component={'form'} autoComplete="off">
                <Stack direction={'row'} spacing={1} mb={1}>
                  <TextField
                    inputProps={{
                      min: '0',
                    }}
                    name="price"
                    value={newCustom.price || ''}
                    onChange={handleCustomChange}
                    type="number"
                    fullWidth
                    size="small"
                    label="Price"
                  />
                  <TextField
                    name="name"
                    value={newCustom.name}
                    onChange={handleCustomChange}
                    fullWidth
                    size="small"
                    label="Name"
                  />
                </Stack>
                <TextField
                  name="description"
                  value={newCustom.description}
                  onChange={handleCustomChange}
                  multiline
                  fullWidth
                  label="Description"
                />
              </Box>
              <Box mt={3}>
                <Button
                  fullWidth
                  onClick={() => handleCreateCustom()}
                  variant="outlined"
                  color="success"
                >
                  Create
                </Button>
              </Box>
            </>
          )}

          <Box mt={1} direction={'row'}>
            <Button
              fullWidth
              onClick={() => setModalOpen(false)}
              variant="outlined"
              color="secondary"
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
export default CreateCharge
