import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  IconButton,
  InputAdornment
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { loginSuccess } from '../../features/auth/authSlice'
import { selectUsers } from '../../features/users/userSlice'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const users = useSelector(selectUsers)

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
    const foundUser = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    )

    if (foundUser) {
      dispatch(loginSuccess(foundUser))
      navigate('/home')
    } else {
      console.log('User not found or incorrect password.')
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80)',
              height: '90vh',
              width: '50vw',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '0.2%'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mx: 'auto', p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>

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
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2, width: '25%', mx: 'auto' }}>
                  Login
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
