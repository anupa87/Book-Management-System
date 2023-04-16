import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import Snackbar from '@mui/material/Snackbar'

import { addUser } from '../../features/users/userSlice'

const AddUser = ({ setOpenUserModal, openUserModal }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formRef = useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setBook((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmitUser = (e) => {
    e.preventDefault()
    dispatch(addUser(user)) //dispatch the addUser action with the user data
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
    }, 2000)
    navigate('/users')
  }

  const handleClose = () => {
    setOpenUserModal(false)
  }

  return (
    <Container maxWidth="sm">
      <Dialog open={openUserModal} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
        <DialogTitle>
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
              <Snackbar open={showSuccessMessage} message={'User added successfully!'} />
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
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
              <DialogActions>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Add
                  </Button>
                </Grid>
              </DialogActions>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default AddUser
