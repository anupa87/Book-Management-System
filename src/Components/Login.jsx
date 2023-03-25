import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const theme = createTheme({
  spacing: 10,
  palette: {
    primary: {
      main: '#254670'
    },
    secondary: {
      main: '#70334E'
    }
  }
})

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }
  return (
    <ThemeProvider theme={theme}>
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
            <Box sx={{ mx: 'auto', maxWidth: '400px', p: 3 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  placeholder="Enter your email"
                />
                <TextField
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'} // toggle password visibility
                  placeholder="Enter your password"
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
    </ThemeProvider>
  )
}

export default Login
