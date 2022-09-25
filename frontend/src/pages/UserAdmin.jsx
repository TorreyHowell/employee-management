import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserAdmin,
  reset as resetUsers,
  updateUserAdmin,
} from '../features/users/userSlice'
import {
  Box,
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useState } from 'react'
import { toast } from 'react-toastify'
import UserActivity from '../components/UserActivity'

function UserAdmin() {
  const { user } = useSelector((state) => state.users)
  const [hasChanged, setHasChanged] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paidHourly: '',
    chargedHourly: '',
    permission: '',
  })

  const [disabledInput, setDisableInput] = useState({
    name: true,
    email: true,
    paidHourly: true,
    chargedHourly: true,
    permission: true,
  })

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserAdmin(params.id))

    return () => {
      dispatch(resetUsers())
    }
  }, [dispatch, params.id])

  useEffect(() => {
    if (user) {
      let permission = ''

      if (user.verifiedUser) {
        permission = 'verified'
      }

      if (user.admin) {
        permission = 'admin'
      }

      if (user.owner) {
        permission = 'owner'
      }

      setFormData({
        name: user.name,
        email: user.email,
        paidHourly: user.paidHourly.$numberDecimal,
        chargedHourly: user.chargedHourly.$numberDecimal,
        permission: permission,
      })
    }
  }, [user])

  const onChange = (e) => {
    setHasChanged(true)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onDisabledChange = (e) => {
    setDisableInput((prevState) => ({
      ...prevState,
      [e.target.name]: !prevState[e.target.name],
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (formData.name.length < 1) {
      return toast.error('Enter a name')
    }

    dispatch(
      updateUserAdmin({
        query: formData,
        id: params.id,
      })
    )

    setHasChanged(false)
    setDisableInput({
      name: true,
      email: true,
      paidHourly: true,
      chargedHourly: true,
      permission: true,
    })
  }

  if (!user) return <></>
  return (
    <>
      <Box mb={3}>
        <Stack
          mb={5}
          direction="row"
          justifyContent="space-between"
          alignItems={'start'}
        >
          <Fab
            onClick={() => navigate('/users')}
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
                  {user.name}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Box component={'form'} onSubmit={onSubmit} autoComplete="off">
          <Stack mt={2} direction="row" justifyContent={'center'}>
            <TextField
              label="Name"
              fullWidth
              size="small"
              disabled={disabledInput.name}
              value={formData.name}
              name="name"
              onChange={onChange}
            />
            <Button
              sx={{
                display: disabledInput.name ? 'inline' : 'none',
              }}
              name="name"
              onClick={onDisabledChange}
            >
              Change
            </Button>
            <Button
              sx={{
                display: !disabledInput.name ? 'block' : 'none',
              }}
              name="name"
              onClick={onDisabledChange}
            >
              Cancel
            </Button>
          </Stack>

          <Stack mt={2} direction="row" justifyContent={'center'}>
            <TextField
              fullWidth
              label="Email"
              size="small"
              disabled={disabledInput.email}
              value={formData.email}
              name="email"
              onChange={onChange}
            />
            <Button
              sx={{
                display: disabledInput.email ? 'inline' : 'none',
              }}
              name="email"
              onClick={onDisabledChange}
            >
              Change
            </Button>
            <Button
              sx={{
                display: !disabledInput.email ? 'block' : 'none',
              }}
              name="email"
              onClick={onDisabledChange}
            >
              Cancel
            </Button>
          </Stack>

          <Stack mt={2} direction="row" justifyContent={'center'}>
            <TextField
              fullWidth
              label="Paid Hourly"
              type={'number'}
              inputProps={{
                min: '0',
                step: '.01',
              }}
              size="small"
              disabled={disabledInput.paidHourly}
              value={formData.paidHourly}
              name="paidHourly"
              onChange={onChange}
            />

            <Button
              sx={{
                display: disabledInput.paidHourly ? 'block' : 'none',
              }}
              name="paidHourly"
              onClick={onDisabledChange}
            >
              Change
            </Button>
            <Button
              sx={{
                display: !disabledInput.paidHourly ? 'block' : 'none',
              }}
              name="paidHourly"
              onClick={onDisabledChange}
            >
              Cancel
            </Button>
          </Stack>

          <Stack mt={2} direction="row" justifyContent={'center'}>
            <TextField
              fullWidth
              label="Charged Hourly"
              type={'number'}
              inputProps={{
                min: '0',
                step: '.01',
              }}
              size="small"
              disabled={disabledInput.chargedHourly}
              value={formData.chargedHourly}
              name="chargedHourly"
              onChange={onChange}
            />

            <Button
              sx={{
                display: disabledInput.chargedHourly ? 'block' : 'none',
              }}
              name="chargedHourly"
              onClick={onDisabledChange}
            >
              Change
            </Button>
            <Button
              sx={{
                display: !disabledInput.chargedHourly ? 'block' : 'none',
              }}
              name="chargedHourly"
              onClick={onDisabledChange}
            >
              Cancel
            </Button>
          </Stack>

          <Stack mt={2} direction="row" justifyContent={'center'}>
            <FormControl fullWidth size="small">
              <InputLabel id="select">Permission</InputLabel>
              <Select
                labelId="select"
                label="Permission"
                inputProps={{
                  min: '0',
                }}
                disabled={disabledInput.permission}
                value={formData.permission}
                name="permission"
                onChange={onChange}
              >
                <MenuItem value={'verified'}>Verified</MenuItem>
                <MenuItem value={'admin'}>Admin</MenuItem>
                <MenuItem value={'suspend'}>Suspended</MenuItem>
              </Select>
            </FormControl>

            <Button
              sx={{
                display: disabledInput.permission ? 'block' : 'none',
              }}
              name="permission"
              onClick={onDisabledChange}
            >
              Change
            </Button>
            <Button
              sx={{
                display: !disabledInput.permission ? 'block' : 'none',
              }}
              name="permission"
              onClick={onDisabledChange}
            >
              Cancel
            </Button>
          </Stack>

          {hasChanged && (
            <>
              <Stack mt={2} direction={'row'} justifyContent="center">
                <Button variant="outlined" type="submit">
                  Submit Changes
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Box>

      <UserActivity />
    </>
  )
}
export default UserAdmin
