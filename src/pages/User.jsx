import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  CardActions
} from '@mui/material'

import { updatePassword } from '../features/auth/slices/authSlice'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function User() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)

  const dispatch = useDispatch()

  const handleChangePassword = () => {
    if (!password || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields')
      return
    }
    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm password do not match')
      return
    }
    dispatch(updatePassword({ userId: currentUser.id, password, newPassword }))
      .then(() => {
        setPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
        setError('')
        alert('Password updated successfully')
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 4
        }}>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          My Account
        </Typography>
      </Box>
      <hr />
      <Box>
        <Box sx={{ mt: 4, mb: 4 }}>
          <CardMedia
            component="img"
            image={currentUser.imageURL}
            alt={currentUser.image}
            sx={{
              objectFit: 'cover',
              width: { xs: '100%', md: '50%' }
            }}
          />
        </Box>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Card sx={{ maxWidth: 570, mt: 4 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                {currentUser.firstName} {currentUser.lastName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: {currentUser.email}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Current Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    )
                  }}
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Confirm New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(event) => setConfirmNewPassword(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    )
                  }}
                  sx={{ mt: 2 }}
                />
              </Box>
              {error && (
                <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                m: 2
              }}>
              <Box>
                <Button variant="contained" onClick={handleChangePassword}>
                  Update Password
                </Button>
              </Box>
              <Box>
                <Button variant="contained" component={RouterLink} to="/UpdateUser">
                  Save
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Container>
  )
}

export default User
