import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
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

import { loginSuccess } from '../../features/auth/authSlice'
import { selectUsers } from '../../features/users/userSlice'

const Login = ({ modalOpen, onClose }) => {
  const users = useSelector(selectUsers)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.')
      return
    }

    const user = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    )
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentRole')

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      localStorage.setItem('currentRole', JSON.stringify(user.role))
      navigate('/homepage')
    } else {
      setError('User not found or incorrect password.')
    }
  }
  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    const role = localStorage.getItem('currentRole')
    if (user && role && !isLoggedIn) {
      dispatch(loginSuccess({ user: JSON.parse(user), role: JSON.parse(role) }))
    }
  }, [dispatch, isLoggedIn])

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
          {error?.length && <div>{error}</div>}
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
