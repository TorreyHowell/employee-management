import { IconButton, Paper, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import NumberFormat from 'react-number-format'
import { stage } from '../features/modal/confirmModalSlice'
import { useDispatch } from 'react-redux'

function ReceiptItem({ receipt, invoiceId, admin, hideDelete }) {
  const dispatch = useDispatch()
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          padding: 1,
          backgroundColor: '#3d3d3d',
        }}
      >
        <Stack direction={'row'} spacing={2} justifyContent="space-between">
          <Stack direction={'row'} spacing={2} alignItems="center">
            <Typography variant="h6">
              <NumberFormat
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                value={receipt.price.$numberDecimal}
              />
            </Typography>
            <Typography variant="h6">{receipt.store} </Typography>
            <Typography variant="h6">
              {dayjs(receipt.date).format('MM-DD')}{' '}
            </Typography>
          </Stack>

          {!hideDelete && (
            <Stack direction={'row'} alignItems="center">
              <IconButton
                onClick={() =>
                  dispatch(
                    stage({
                      id: receipt._id,
                      type: 'receipt',
                      parentId: invoiceId,
                    })
                  )
                }
              >
                <DeleteForeverIcon color="error" />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Paper>
    </>
  )
}
export default ReceiptItem
