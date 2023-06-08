import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  CardActions,
  Snackbar
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import MuiAlert from '@mui/material/Alert'

import { updateUser } from '../slices/userSlice'

const PersonalInformation = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.auth.currentUser)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleEdit = (updatedUser) => {
    const updatedUserData = {
      ...updatedUser,
      password: selectedUser.password,
      role: selectedUser.role
    }
    dispatch(updateUser({ userId: selectedUser.userId, user: updatedUserData }))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
    }, 3000)
  }

  return (
    <Box>
      <Card sx={{ maxWidth: 570, my: 6 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            First Name: {currentUser.firstName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Last Name: {currentUser.lastName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Email: {currentUser.email}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            m: 2
          }}>
          <Button variant="contained" onClick={handleEdit}>
            EDIT
          </Button>
          <Button variant="contained">SAVE</Button>
        </CardActions>
        <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
          <MuiAlert elevation={6} variant="filled" severity="success">
            Info updated successfully
          </MuiAlert>
        </Snackbar>
      </Card>

      <Card sx={{ maxWidth: 570, mt: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Change Password
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Current Password" type="password" sx={{ mt: 2 }} />
            <TextField
              label="New Password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowNewPassword()}>
                    <Visibility />
                  </IconButton>
                )
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Confirm New Password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowNewPassword()}>
                    <Visibility />
                  </IconButton>
                )
              }}
              sx={{ mt: 2 }}
            />
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            m: 2
          }}>
          <Button variant="contained">Update Password</Button>
          <Button variant="contained">Save</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default PersonalInformation
