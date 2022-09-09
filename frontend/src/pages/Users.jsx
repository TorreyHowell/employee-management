import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/users/userSlice'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Users() {
  const { users } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (!users) return <></>
  return (
    <>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid item xs={6} key={user._id}>
            <Paper
              elevation={0}
              sx={{
                padding: 1,
                backgroundColor: '#3d3d3d',
              }}
            >
              <Box>
                <Typography variant="h6" noWrap>
                  {user.name}
                </Typography>

                {user.verifiedUser && (
                  <>
                    <Typography variant="subtitle2" noWrap>
                      Verified
                    </Typography>
                  </>
                )}

                {!user.verifiedUser && (
                  <>
                    <Typography variant="subtitle2" noWrap>
                      Not Verified
                    </Typography>
                  </>
                )}

                {user.admin && (
                  <>
                    <Typography variant="subtitle2" noWrap>
                      Admin
                    </Typography>
                  </>
                )}

                <Button
                  onClick={() => navigate(`/admin/profile/${user._id}`)}
                  size="small"
                  variant="outlined"
                  fullWidth
                >
                  Profile
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
export default Users
