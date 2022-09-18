import { Box, Grid, IconButton, Paper, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import dayjs from 'dayjs'

function HourItem({ hour, deleteClick, hideDelete }) {
  return (
    <>
      <Box>
        <Paper
          elevation={0}
          sx={{
            padding: 1,
            backgroundColor: '#2d2d2d',
          }}
        >
          <Grid container alignItems={'center'}>
            <Grid item xs={3}>
              <Typography noWrap variant="h6">
                {hour.number.$numberDecimal}hr
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography noWrap variant="h6">
                {hour.client.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography noWrap variant="h6">
                {dayjs(hour.date).format('M-D')}
              </Typography>
            </Grid>

            {!hideDelete && (
              <Grid item xs={2}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                  <IconButton onClick={() => deleteClick(hour._id)}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </Box>
              </Grid>
            )}
          </Grid>

          {/* <Stack direction={'row'} spacing={2} justifyContent="space-between">
            <Stack direction={'row'} spacing={2} alignItems="center">
              <Typography variant="h6">
                {hour.number.$numberDecimal} hr
              </Typography>
              <Typography variant="h6">{hour.client.name} </Typography>
              <Typography variant="h6">
                {dayjs(hour.date).format('M-D')}{' '}
              </Typography>
              <Typography variant="h6">
                <NumberFormat
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                  value={
                    hour.amountCharged
                      ? hour.amountCharged.$numberDecimal
                      : hour.amountPaid.$numberDecimal
                  }
                />
              </Typography>
            </Stack>

            <Stack direction={'row'} alignItems="center">
              <IconButton onClick={() => deleteClick(hour._id)}>
                <DeleteForeverIcon color="error" />
              </IconButton>
            </Stack>
          </Stack> */}
        </Paper>
      </Box>
    </>
  )
}
export default HourItem
