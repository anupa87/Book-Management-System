import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Container
} from '@mui/material'
// import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'
import Snackbar from '@mui/material/Snackbar'

// import { deleteUser } from '../features/users/userSlice'

const Users = () => {
  const users = useSelector((state) => state.users)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const handleDeleteUser = (userId) => {
  //   dispatch(deleteUser(userId))
  //   setShowSuccessMessage(true)
  //   setTimeout(() => {
  //     setShowSuccessMessage(false)
  //   }, 2000)
  // }

  // const handleEditUser = (id) => {
  //   navigate(`/users/${id}`)
  // }

  const filteredUsers = users.filter((user) => user.role === 'user')

  return (
    <Box sx={{ my: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Users
        </Typography>
      </Box>
      <hr />

      <Grid container spacing={2}>
        {filteredUsers &&
          filteredUsers.map((user) => (
            <Grid
              item
              key={user.id}
              xs={12}
              sm={6}
              md={4}
              sx={{
                mt: 6,
                justifyContent: 'center'
              }}>
              <Card
                onClick={() => showDetail(user.id)}
                style={{ cursor: 'pointer' }}
                sx={{ width: '100%', maxWidth: 300, height: 300 }}>
                <CardMedia
                  component="img"
                  image={user.imageURL}
                  alt={user.image}
                  sx={{
                    objectFit: 'cover',
                    height: '60%'
                  }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1 }} component="h2">
                    {user.firstName} {user.lastName}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
                    {user.email}
                  </Typography>
                </CardContent>
                {/* <CardActions sx={{ justifyContent: 'space-between' }}>
                    <IconButton onClick={() => handleEditUser(user.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon />
                      {showSuccessMessage && (
                        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                          <Snackbar
                            open={showSuccessMessage}
                            message="User deleted successfully"
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                          />
                        </Box>
                      )}
                    </IconButton>
                  </CardActions> */}
              </Card>
            </Grid>
          ))}
      </Grid>

      <Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'secondary.main', ml: 0, mb: 4, mt: 6 }}
          onClick={() => navigate('/dashboard')}>
          Back to dashboard
        </Button>
      </Box>
    </Box>
  )
}

export default Users
