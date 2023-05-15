import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { loginFail, loginSuccess } from '../slices/authSlice'

const Login = ({ modalOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const isLoading = useSelector((state) => state.auth.isLoading)
  const error = useSelector((state) => state.auth.error)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    console.log('Logging in...')

    try {
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      const { token } = data
      console.log(data)

      // Decode the token to extract the role
      const decodedToken = jwt_decode(token)
      const { role } = decodedToken

      dispatch(loginSuccess({ role }))

      localStorage.setItem('token', token)

      if (role === 'ADMIN') {
        console.log('Navigating to /dashboard')
        navigate('dashboard')
      } else {
        console.log('Navigating to /homepage')
        navigate('homepage')
      }
    } catch (error) {
      dispatch(loginFail(error.message))
    }
  }
  return (
    <Box>
      <Dialog
        open={modalOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth={true}
        PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mx: 'auto', p: 6 }}>
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              variant="outlined"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              name="password"
              label="Password"
              fullWidth
              margin="normal"
              variant="outlined"
              type={showPassword ? 'text' : 'password'} // toggle password visibility
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="body2" color="text.secondary">
                Forgot password?
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2">
                Don't have an account? <Link to="/register">Register</Link>
              </Typography>
            </Box>
          </form>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
          <Button
            onClick={onClose}
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Login
