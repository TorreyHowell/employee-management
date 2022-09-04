import { IconButton, Paper, Stack, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { stage } from '../features/modal/confirmModalSlice'

function HourItem({ hour, invoiceId }) {
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
            <Typography variant="h6">{hour.hours} hr</Typography>
            <Typography variant="h6">{hour.client.name} </Typography>
            <Typography variant="h6">
              {dayjs(hour.date).format('M-D')}{' '}
            </Typography>
          </Stack>

          <Stack direction={'row'} alignItems="center">
            <IconButton
              onClick={() =>
                dispatch(
                  stage({
                    id: hour._id,
                    type: 'hour',
                    parentId: invoiceId,
                  })
                )
              }
            >
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}
export default HourItem
