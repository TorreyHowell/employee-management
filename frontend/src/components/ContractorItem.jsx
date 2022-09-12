import { Button, Paper, Typography } from '@mui/material'
import { Box, Stack, Badge } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function ContractorItem({ contractor }) {
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
        <Stack justifyContent="space-between">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {contractor.active ? (
              <>
                <Badge
                  sx={{
                    marginRight: { xs: 1, sm: 2 },
                  }}
                  badgeContent={contractor.outstandingCharges}
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
                  badgeContent={contractor.outstandingCharges}
                  color="secondary"
                >
                  <DarkModeIcon />
                </Badge>
              </>
            )}

            <Box width={{ xs: '80%', sm: 250 }}>
              <Typography noWrap={true} variant="h6">
                {contractor.name}
              </Typography>
            </Box>
          </Box>
          <Stack justifyContent={'center'}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/contractor/${contractor._id}`)}
              size="small"
            >
              View
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </>
  )
}
export default ContractorItem
