import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, TextField, Typography, Grid, Box } from '@mui/material'

const UserAddModal = ({ addUser }) => {
  const navigate = useNavigate()
  const userFormRef = useRef(null)
  const [formInputData, setFormInputData] = useState({})

  const handleChange = (e) => {
    setFormInputData({ ...formInputData, [e.target.name]: e.target.value })
  }

  const handleSubmitUser = (e) => {
    e.preventDefailt()
    const firstName = userFormRef.current.firstName.value
    const lastName = userFormRef.current.lastName.value
    const email = userFormRef.current.email.value
    const password = userFormRef.current.password.value
    const role = userFormRef.current.role.value

    addUser({
      firstName,
      lastName,
      email,
      password,
      role
    })

    userFormRef.current.reset()
    navigate('/user')
  }
  return (
    <Box
      sx={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Add User
      </Typography>
      <form ref={userFormRef} onSubmit={handleSubmitUser}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="lastName"
              label="Last Name"
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
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField name="role" label="Role" fullWidth required onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default UserAddModal
