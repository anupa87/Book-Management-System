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

import CategoryForm from './CategoryForm'
import { addCategory } from '../slices/categorySlice'

const AddCategory = ({ setOpenUserModal, openUserModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleSubmit = (category) => {
    dispatch(addCategory(category))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
      navigate('/admin/dashboard')
    }, 3000)
  }

  const handleClose = () => {
    setOpenUserModal(false)
  }

  return (
    <Dialog open={openUserModal} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" gutterBottom>
            Add Category
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <CategoryForm onSubmit={handleSubmit} />
      </DialogContent>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Category added successfully
        </MuiAlert>
      </Snackbar>
    </Dialog>
  )
}
export default AddCategory
