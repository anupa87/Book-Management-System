import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Container, TextField, Typography, Grid, Box, IconButton } from '@mui/material'
import { CheckCircle as CheckCircleIcon, Close as CloseIcon } from '@mui/icons-material'

const AddAuthor = () => {
  const navigate = useNavigate()
  const [author, setAuthor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bookId: ''
  })

  const formRef = useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name, value)
    setAuthor({ ...author, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAuthor({
      firstName: '',
      lastName: '',
      email: '',
      bookId: ''
    })
    setShowSuccessMessage(true)
    formRef.current.reset()
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 1000)
  }

  const handleClose = () => {
    navigate('/dashboard')
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
            Add Author
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {showSuccessMessage && (
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <CheckCircleIcon color="success" fontSize="large" />
            <Typography variant="h6" color="success" ml={1}>
              Author added successfully!
            </Typography>
          </Box>
        )}
        <form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="firstName"
                label="First Name"
                value={author.firstName}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="lastName"
                label="Last Name"
                value={author.lastName}
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
                value={author.email}
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="bookId"
                label="Book ID"
                value={author.bookId}
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

export default AddAuthor
