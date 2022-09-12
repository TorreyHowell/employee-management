import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import generateChargeTableData from '../utils/generateChargeTableData'
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import {
  deleteCharge,
  getClientBills,
  getClientCharges,
  reset as resetCharges,
} from '../features/charges/chargesSlice'
import { Box } from '@mui/system'
import { createBill } from '../features/charges/chargesSlice'

import CircleIcon from '@mui/icons-material/Circle'
import NumberFormat from 'react-number-format'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { changeStatus, getClient } from '../features/client/clientSlice'
import SettingsIcon from '@mui/icons-material/Settings'
import CreateCharge from '../components/CreateCharge'

const columns = [
  { field: 'col1', headerName: 'Name', width: 200 },
  { field: 'col2', headerName: 'Price', width: 150 },
  { field: 'col3', headerName: 'Date', width: 150 },
  { field: 'col4', headerName: 'Type', width: 150 },
]

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

function Client() {
  const [tableData, setTableData] = useState(null)
  const [selectedCharges, setSelectedCharges] = useState([])
  const [createModal, setCreateModal] = useState(false)
  const [deleteChargeModal, setDeleteChargeModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { charges, bills } = useSelector((state) => state.charges)
  const { client } = useSelector((state) => state.client)

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getClient(params.id))
    dispatch(getClientCharges(params.id))
    dispatch(getClientBills(params.id))

    return () => {
      dispatch(resetCharges())
    }
  }, [dispatch, params.id])

  useEffect(() => {
    if (charges.length > 0) {
      setTableData(generateChargeTableData(charges))
    }
  }, [charges])

  const handleRowSelection = (params) => {
    setSelectedCharges(params)
  }

  const handleSetStatus = () => {
    dispatch(changeStatus(params.id))
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCreateBill = () => {
    dispatch(
      createBill({
        clientId: params.id,
        charges: selectedCharges,
      })
    )
    setCreateModal(false)
  }

  const handleDeleteCharge = () => {
    dispatch(deleteCharge(selectedCharges[0]))

    setDeleteChargeModal(false)
  }

  if (!client) return <></>

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
            onClick={() => navigate('/clients')}
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
                  {client.name}
                </Typography>
                <Typography align="right" variant="h6">
                  {client.address}
                </Typography>
              </Box>
              <IconButton onClick={menuClick}>
                <SettingsIcon fontSize="large" />
              </IconButton>
            </Stack>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleSetStatus}>
                {client.active ? 'Set To Inactive' : 'Set To Active'}
              </MenuItem>
            </Menu>
          </Box>
        </Stack>

        {charges.length > 0 && (
          <>
            <Typography variant="h6">Outstanding Charges</Typography>
            <div>
              <div style={{ height: 400 }}>
                {tableData && (
                  <DataGrid
                    onSelectionModelChange={handleRowSelection}
                    checkboxSelection={true}
                    rows={tableData}
                    columns={columns}
                  />
                )}
              </div>
            </div>
          </>
        )}

        <Box mt={1} mb={3}>
          <Stack direction={'row'} spacing={2} mb={2}>
            <CreateCharge />
            {charges.length > 0 && (
              <Button
                variant="outlined"
                fullWidth
                disabled={selectedCharges.length !== 1}
                color="error"
                onClick={() => setDeleteChargeModal(true)}
              >
                Delete Charge
              </Button>
            )}
          </Stack>
          {charges.length > 0 && (
            <Button
              variant="outlined"
              fullWidth
              disabled={selectedCharges.length < 1}
              onClick={() => setCreateModal(true)}
            >
              Create Bill
            </Button>
          )}
        </Box>

        {bills.length > 0 && (
          <>
            <Typography mt={2} variant="h6">
              History
            </Typography>
            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <List
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  bgcolor: '#2d2d2d',
                  maxHeight: 400,
                  p: 0,
                }}
              >
                {bills.map((bill, index) => (
                  <Box key={bill._id}>
                    <ListItem
                      secondaryAction={
                        <Button
                          variant="outlined"
                          onClick={() => navigate(`/bill/${bill._id}`)}
                          edge="end"
                        >
                          View
                        </Button>
                      }
                    >
                      <Stack
                        direction={'row'}
                        spacing={3}
                        justifyContent="space-between"
                        alignContent="center"
                      >
                        <Stack
                          direction={'row'}
                          alignItems="center"
                          sx={{ width: '100%' }}
                        >
                          <CircleIcon
                            sx={{
                              fontSize: 15,
                              mr: 1,
                            }}
                            color={bill.isPaid ? 'success' : 'error'}
                          />
                          <Typography variant="h6">
                            {dayjs(bill.createdAt).format('M-D-YY')}
                          </Typography>
                        </Stack>

                        <Typography variant="h6">
                          <NumberFormat
                            displayType="text"
                            thousandSeparator={true}
                            prefix="$"
                            value={bill.amountCharged.$numberDecimal}
                          />
                        </Typography>
                      </Stack>
                    </ListItem>
                    {bills.length > index + 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Box>
          </>
        )}
      </Box>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={createModal}
        onClose={() => setCreateModal(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Create Bill
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              fullWidth
              onClick={() => setCreateModal(false)}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={() => handleCreateBill()}
              variant="outlined"
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={deleteChargeModal}
        onClose={() => setDeleteChargeModal(false)}
      >
        <Box sx={style}>
          <Typography variant="h6" align="center">
            Delete Charge
          </Typography>

          <Stack mt={1} direction={'row'} spacing={3} justifyContent="center">
            <Button
              fullWidth
              onClick={() => setDeleteChargeModal(false)}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={() => handleDeleteCharge()}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
export default Client
