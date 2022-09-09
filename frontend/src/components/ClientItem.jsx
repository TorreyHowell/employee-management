import { Button, Paper, Typography } from '@mui/material'
import { Box, Stack, Badge } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function ClientItem({ client, isOwner }) {
  const navigate = useNavigate()
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          padding: 1,
          backgroundColor: '#3d3d3d',
        }}
      >
        <Stack
          direction={{ sx: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {client.active ? (
              <>
                <Badge
                  sx={{
                    marginRight: 2,
                  }}
                  badgeContent={client.outstandingCharges}
                  color="secondary"
                >
                  <WbSunnyIcon />
                </Badge>
              </>
            ) : (
              <>
                <Badge
                  sx={{
                    marginRight: 2,
                  }}
                  badgeContent={client.outstandingCharges}
                  color="secondary"
                >
                  <DarkModeIcon />
                </Badge>
              </>
            )}

            <Box width={{ xs: '80%', sm: 250 }}>
              <Typography noWrap={true} variant="h6">
                {client.name}
              </Typography>
            </Box>
          </Box>
          <Stack justifyContent={'center'}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/client/${client._id}`)}
            >
              View
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}
export default ClientItem
