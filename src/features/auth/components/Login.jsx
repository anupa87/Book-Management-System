import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

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

import { loginFail, loginStart, loginSuccess, login } from '../slices/authSlice'

const Login = ({ modalOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
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
    if (!formData.email || !formData.password) {
      dispatch(loginFail('Please provide your email and password.'))
      return
    }
    try {
      dispatch(loginStart())
      const token = await (async () => {
        return dispatch(login(formData))
      })()
      if (token) {
        localStorage.setItem('token', token)

        const decodedToken = jwtDecode(token)
        const { role } = decodedToken

        if (role === 'ADMIN') {
          navigate('admin/dashboard')
        } else {
          navigate('/books')
        }
      } else {
        throw new Error('Invalid response data.')
      }
    } catch (error) {
      dispatch(loginFail(error.message))
      setFormData({ email: '', password: '' })
    }
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <Box>
      <Dialog
        open={modalOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth={true}
        PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ textAlign: 'center' }}>Login</DialogTitle>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="body2" color="text.secondary">
                Forgot password?
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Button variant="text" onClick={handleRegister}>
                  Register
                </Button>
              </Typography>
            </Box>
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
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Login
