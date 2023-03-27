import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Button, Container, TextField, Typography, Grid, Box, IconButton } from '@mui/material'
import { CheckCircle as CheckCircleIcon, Close as CloseIcon } from '@mui/icons-material'

import { addUser } from '../../features/users/userSlice'
const AddUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  })

  const formRef = useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name, value)
    setUser({ ...user, [name]: value })
  }

  const handleSubmitUser = (e) => {
    e.preventDefault()
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    })
    setShowSuccessMessage(true)
    formRef.current.reset()
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 1000)
  }

  const handleClose = () => {
    navigate('/users')
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" gutterBottom>
            Add User
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {showSuccessMessage && (
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <CheckCircleIcon color="success" fontSize="large" />
            <Typography variant="h6" color="success" ml={1}>
              User added successfully!
            </Typography>
          </Box>
        )}
        <form ref={formRef} onSubmit={handleSubmitUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstName"
                label="First Name"
                value={user.firstName}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                label="Last Name"
                value={user.lastName}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                value={user.email}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={user.password}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="role"
                label="Role"
                value={user.role}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default AddUser
