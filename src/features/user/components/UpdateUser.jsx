import { useState } from 'react'
import { useDispatch } from 'react-redux'

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
import { updateUser } from '../slices/userSlice'

const UpdateUser = ({ setOpenUserModal, openUserModal, selectedUser }) => {
  const dispatch = useDispatch()

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: selectedUser?.firstName || '',
    lastName: selectedUser?.lastName || '',
    email: selectedUser?.email || '',
    password: selectedUser?.password || '',
    role: selectedUser?.role || 'USER'
  })

  const handleUpdateUser = (updatedUser) => {
    const updatedUserData = {
      ...updatedUser,
      password: selectedUser.password,
      role: selectedUser.role
    }

    dispatch(updateUser({ userId: selectedUser.userId, user: updatedUserData }))

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
            Update User
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <UserForm
          user={selectedUser}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdateUser}
          setIsSnackbarOpen={setIsSnackbarOpen}
          handleClose={handleClose}
        />
      </DialogContent>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          User updated successfully
        </MuiAlert>
      </Snackbar>
    </Dialog>
  )
}
export default UpdateUser
