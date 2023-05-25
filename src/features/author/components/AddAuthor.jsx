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

import AuthorForm from './AuthorForm'
import { addAuthor } from '../slices/authorSlice'

const AddAuthor = ({ setOpenAuthorModal, openAuthorModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const handleSubmit = (author) => {
    dispatch(addAuthor(author))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
      setOpenAuthorModal(false)
      navigate('/admin/dashboard')
    }, 3000)
  }

  const handleClose = () => {
    setOpenAuthorModal(false)
  }

  return (
    <Dialog open={openAuthorModal} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" gutterBottom>
            Add Author
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <AuthorForm onSubmit={handleSubmit} handleClose={handleClose} />
      </DialogContent>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Author added successfully
        </MuiAlert>
      </Snackbar>
    </Dialog>
  )
}
export default AddAuthor
