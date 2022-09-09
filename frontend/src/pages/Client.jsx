import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Fab,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import generateChargeTableData from '../utils/generateChargeTableData'
import { DataGrid } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import {
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

const columns = [
  { field: 'col1', headerName: 'Name', width: 200 },
  { field: 'col2', headerName: 'Price', width: 150 },
  { field: 'col3', headerName: 'Date', width: 150 },
  { field: 'col4', headerName: 'Type', width: 150 },
]

function Client() {
  const [tableData, setTableData] = useState(null)
  const [selectedCharges, setSelectedCharges] = useState([])
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
    setTableData(generateChargeTableData(charges))
  }, [charges])

  const handleRowSelection = (params) => {
    setSelectedCharges(params)
  }

  const handleCreateBill = () => {
    dispatch()
    createBill({
      clientId: params.id,
      charges: selectedCharges,
    })
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
            <Box mt={1} mb={3}>
              <Stack direction={'row'} spacing={2} mb={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  disabled={selectedCharges.length !== 1}
                  onClick={() => navigate(`/edit-charge/${selectedCharges[0]}`)}
                >
                  Edit Charge
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  disabled={selectedCharges.length !== 1}
                  color="error"
                >
                  Delete Charge
                </Button>
              </Stack>
              <Button
                variant="outlined"
                fullWidth
                disabled={selectedCharges.length < 1}
                color="success"
                onClick={handleCreateBill}
              >
                Create Bill
              </Button>
            </Box>
          </>
        )}

        {bills.length > 0 && (
          <>
            <Typography variant="h6">History</Typography>
            <Box
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <List
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  bgcolor: '#2d2d2d',
                  maxHeight: 400,
                }}
              >
                {bills.map((bill) => (
                  <ListItem
                    key={bill._id}
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
                ))}
              </List>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
export default Client
