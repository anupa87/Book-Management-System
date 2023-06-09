import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'

const Register = ({ modalOpen, onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'USER'
  })
  const error = useSelector((state) => state.auth.error)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleRegister = async () => {
    try {
      dispatch(signupStart())

      const response = await authService.signup(formData)

      const { token } = response.data
      const decodedToken = jwtDecode(token)
      const { userId, firstName, lastName, email, role } = decodedToken

      dispatch(signupSuccess({ userId, firstName, lastName, email, role }))

      if (role === 'ADMIN') {
        navigate('admin/dashboard')
      } else {
        navigate('/books')
      }
    } catch (error) {
      dispatch(signupFail(error.message))
      setError(error.response.data.error)
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
        <DialogTitle sx={{ textAlign: 'center' }}>Sign Up</DialogTitle>
        <DialogContent sx={{ mx: 'auto', p: 6 }}>
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleRegister}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              sx={{ marginBottom: '1rem' }}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              sx={{ marginBottom: '1rem' }}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ marginBottom: '1rem' }}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              sx={{ marginBottom: '1rem' }}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formData.role} onChange={handleChange} required>
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </FormControl>
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
              <Button type="submit" variant="contained" color="secondary">
                REGISTER
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Register
