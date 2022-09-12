import { Backdrop, CircularProgress } from '@mui/material'

function Loading() {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit"></CircularProgress>
    </Backdrop>
  )
}
export default Loading
