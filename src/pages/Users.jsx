import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Container
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Snackbar from '@mui/material/Snackbar'

import { deleteUser } from '../features/users/userSlice'

const Users = () => {
  const users = useSelector((state) => state.users)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 2000)
  }

  const handleEditUser = (id) => {
    navigate(`/users/${id}`)
  }

  const filteredUsers = users.filter((user) => user.role === 'user')

  return (
    <Container>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          All Users
        </Typography>
        <hr />
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2} sx={{ flexWrap: 'wrap' }}>
          {filteredUsers &&
            filteredUsers.map((user) => (
              <Grid
                item
                key={user.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{
                  width: '100%',
                  maxWidth: '20%',
                  borderRadius: '10px',
                  padding: '8px'
                }}>
                <Card
                  onClick={() => showDetail(user.id)}
                  style={{ cursor: 'pointer' }}
                  sx={{ backgroundColor: '#F5F5F5' }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }} component="h2">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography sx={{ mb: 2 }}>{user.role}</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                      {user.email}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between' }}>
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
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'secondary.main', ml: 0 }}
          onClick={() => navigate('/dashboard')}>
          Back to dashboard
        </Button>
      </Box>
    </Container>
  )
}

export default Users
