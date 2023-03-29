import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container, TextField, Typography, Grid, Box, IconButton } from '@mui/material'
import { CheckCircle as CheckCircleIcon, Close as CloseIcon } from '@mui/icons-material'

import { updateUser, addUser } from '../../features/users/userSlice'

const UpdateUser = () => {
  const { userId } = useParams()

  const foundUser = useSelector((state) => state.users.users.find((user) => user.id === userId))
  const [user, setUser] = useState(
    foundUser || {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    }
  )
  console.log('founduser', foundUser)
  const formRef = useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleUpdateUser = (id) => {
    console.log(id)
    dispatch(updateUser(user))
  }

  const handleSubmitUser = (e) => {
    e.preventDefault()

    setTimeout(() => {
      if (foundUser) {
        dispatch(updateUser(user))
        setShowSuccessMessage(true)
      } else {
        dispatch(addUser(user))
      }
      navigate('/users', { replace: 'true' })
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
            Update User
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {showSuccessMessage && (
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <CheckCircleIcon color="success" fontSize="large" />
            <Typography variant="h6" color="success" ml={1}>
              `User ${user.name}` updated successfully!
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
              <Button variant="contained" color="primary" onClick={handleUpdateUser}>
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default UpdateUser
