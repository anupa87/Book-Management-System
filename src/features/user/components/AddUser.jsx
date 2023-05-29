import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import MuiAlert from '@mui/material/Alert'

import UserForm from './UserForm'
import { addUser } from '../slices/userSlice'

const AddUser = ({ setOpenUserModal, openUserModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleSubmit = (user) => {
    dispatch(addUser(user))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
    }, 3000)
    setOpenUserModal(false)
  }

  const handleClose = () => {
    setOpenUserModal(false)
  }

  return (
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
      </DialogTitle>
      <DialogContent>
        <UserForm onSubmit={handleSubmit} />
      </DialogContent>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          User added successfully
        </MuiAlert>
      </Snackbar>
    </Dialog>
  )
}
export default AddUser
