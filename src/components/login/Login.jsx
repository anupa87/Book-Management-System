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

const Login = () => {
  const users = useSelector(selectUsers)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = (formData) => {
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
      const role = user.role
      console.log(role)
      dispatch(loginSuccess({ user, role: user.role }))
      localStorage.setItem('currentUser', JSON.stringify(user))
      localStorage.setItem('currentRole', JSON.stringify(user.role))
      navigate('/')
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
    <Box sx={{ mx: 'auto', p: 3 }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {error?.length && <div>{error}</div>}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleLogin(formData)
            }}>
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
            <Grid container justifyContent="space-between">
              <Grid item>
                <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
              </Grid>
              <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Forgot password?
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                Don't have an account? <Link to="/signup">Register</Link>
              </Typography>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Login
