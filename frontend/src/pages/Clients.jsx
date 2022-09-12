import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  createClient,
  getClients,
  reset as resetClients,
} from '../features/client/clientSlice'
import ClientItem from '../components/ClientItem'
import { Box, Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import Spinner from '../components/Spinner'

function Clients() {
  const { user } = useSelector((state) => state.auth)
  const { clients, clientStatus, clientLoading } = useSelector(
    (state) => state.client
  )
  const [addClient, setAddClient] = useState(false)
  const [client, setClient] = useState({
    name: '',
    address: '',
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClients())

    return () => {
      dispatch(resetClients())
    }
  }, [dispatch])

  const onChange = (e) => {
    setClient((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCancel = () => {
    setAddClient(false)
    setClient({
      name: '',
      address: '',
    })
  }

  const handleSubmit = () => {
    dispatch(createClient(client))

    handleCancel()
  }
  if (clientStatus === 'LOADING') return <Spinner />
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
          onClick={() => setAddClient(true)}
        >
          Add Client
        </Button>

        {addClient && (
          <>
            <Stack mb={2} direction="row" spacing={2}>
              <TextField
                name="name"
                onChange={onChange}
                size="small"
                variant="outlined"
                label="Name"
                autoComplete="off"
              />
              <TextField
                name="address"
                size="small"
                onChange={onChange}
                variant="outlined"
                label="Address"
                autoComplete="off"
              />
            </Stack>
            <Stack mb={2} direction="row" spacing={1}>
              <Button
                onClick={handleCancel}
                color="secondary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} variant="contained">
                Submit
              </Button>
            </Stack>
          </>
        )}
        <Stack spacing={1}>
          {clients.map((client) => (
            <ClientItem key={client._id} isOwner={user.owner} client={client} />
          ))}
        </Stack>
      </Box>
    </>
  )
}
export default Clients
