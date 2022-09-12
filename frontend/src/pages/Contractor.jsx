import {
  Box,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  getContractor,
  reset as resetContractor,
  updateContractor,
} from '../features/contractors/contractorSlice'
import { toast } from 'react-toastify'

function Contractor() {
  const { contractor } = useSelector((state) => state.contractors)

  const [changeName, setChangeName] = useState(false)
  const [newContractor, setNewContractor] = useState({
    name: '',
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(getContractor(params.id))

    return () => {
      dispatch(resetContractor())
    }
  }, [dispatch, params.id])

  useEffect(() => {
    if (contractor?.name) {
      setNewContractor({
        name: contractor.name,
      })
    }
  }, [contractor?.name])

  const menuClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSetStatus = () => {
    handleClose()
    dispatch(
      updateContractor({
        id: params.id,
        query: {
          name: contractor?.name,
          active: !contractor.active,
        },
      })
    )
  }

  const handleEditName = () => {
    if (newContractor?.name === contractor?.name) {
      return toast.error('Enter a new name')
    }

    dispatch(
      updateContractor({
        id: params.id,
        query: {
          name: newContractor?.name,
          active: contractor?.active,
        },
      })
    )

    setChangeName(false)
  }

  const onChange = (e) => {
    setNewContractor((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  if (!contractor) return <></>
  return (
    <>
      <Box
        sx={{
          width: { xs: '100%', sm: 500 },
          margin: 'auto',
        }}
      >
        <Stack
          mb={5}
          direction="row"
          justifyContent="space-between"
          alignItems={'start'}
        >
          <Fab
            onClick={() => navigate('/contractors')}
            size="small"
            sx={{ marginTop: '8px' }}
          >
            <ChevronLeftIcon
              sx={{
                fontSize: '50px',
              }}
            />
          </Fab>

          <Box>
            <Stack direction={'row'} alignItems="start" spacing={2}>
              <Box sx={{ marginTop: '8px' }}>
                <Typography align="right" variant="h6">
                  {contractor.name}
                </Typography>
              </Box>
              <IconButton onClick={menuClick}>
                <SettingsIcon fontSize="large" />
              </IconButton>
            </Stack>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleSetStatus}>
                {contractor.active ? 'Set To Inactive' : 'Set To Active'}
              </MenuItem>
            </Menu>
          </Box>
        </Stack>

        <Box component={'form'} autoComplete="off">
          <Stack mt={2} direction="row" justifyContent={'center'}>
            <TextField
              label="Name"
              fullWidth
              size="small"
              disabled={!changeName}
              value={newContractor.name}
              name="name"
              onChange={onChange}
            />
            <Button
              sx={{
                display: !changeName ? 'inline' : 'none',
              }}
              name="name"
              onClick={() => setChangeName(true)}
            >
              Change
            </Button>
            <Button
              sx={{
                display: changeName ? 'block' : 'none',
              }}
              name="name"
              onClick={() => setChangeName(false)}
            >
              Cancel
            </Button>
          </Stack>

          {changeName && (
            <>
              <Stack mt={2} direction={'row'} justifyContent="center">
                <Button
                  variant="outlined"
                  type="submit"
                  onClick={handleEditName}
                >
                  Submit Changes
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Box>
    </>
  )
}
export default Contractor
