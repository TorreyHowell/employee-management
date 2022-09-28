import { Grid, IconButton, Paper, Box, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import NumberFormat from 'react-number-format'

function ReceiptItem({ receipt, invoiceId, deleteClick, hideDelete }) {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          padding: 1,
          backgroundColor: '#2d2d2d',
        }}
      >
        <Grid container alignItems={'center'}>
          <Grid item xs={5}>
            <Typography noWrap variant="h6">
              <NumberFormat
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                value={receipt.amountCharged.$numberDecimal}
              />{' '}
              {receipt.name.replace(' - Receipt', '')}
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography noWrap variant="h6">
              {receipt.client.name}
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
                <IconButton onClick={() => deleteClick(receipt._id)}>
                  <DeleteForeverIcon color="error" />
                </IconButton>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* <Stack direction={'row'} spacing={2} justifyContent="space-between">
          <Stack direction={'row'} spacing={2} alignItems="center">
            <Typography variant="h6">
              <NumberFormat
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                value={receipt.amountCharged.$numberDecimal}
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
        </Stack> */}
      </Paper>
    </>
  )
}
export default ReceiptItem
