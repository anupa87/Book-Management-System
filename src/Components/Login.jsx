import React, { useState } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid, TextField, FormControlLabel, Checkbox, Button, Typography, Box } from '@mui/material'

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

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
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
              <form>
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
                  type="password"
                  placeholder="Enter your password"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                  sx={{ mt: 1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={showPassword}
                      onChange={handleShowPassword}
                    />
                  }
                  label="Show password"
                  sx={{ mt: 1 }}
                />
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
                <Grid container justifyContent="flex-end">
                  <Grid
                    item
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ alignItems: 'center' }}>
                      Forgot password?
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default Login
