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

import AuthorForm from './AuthorForm'
import { updateAuthor } from '../slices/authorSlice'

const UpdateAuthor = ({ setOpenAuthorModal, openAuthorModal, selectedAuthor }) => {
  const dispatch = useDispatch()
  console.log(selectedAuthor)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: selectedAuthor?.fullName || '',
    email: selectedAuthor?.email || ''
  })

  const handleUpdateAuthor = (updatedAuthor) => {
    const updatedAuthorData = {
      ...updatedUser
    }
    dispatch(updateAuthor({ authorId: selectedAuthor.authorId, author: updatedAuthorData }))
    // console.log('snackbar testing')
    setIsSnackbarOpen(true)
    // console.log('snackbar testing end')
    setTimeout(() => {
      setIsSnackbarOpen(false)
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
            Update Author
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <AuthorForm
          author={selectedAuthor}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdateAuthor}
          setIsSnackbarOpen={setIsSnackbarOpen}
          handleClose={handleClose}
        />
      </DialogContent>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Author updated successfully
        </MuiAlert>
      </Snackbar>
    </Dialog>
  )
}
export default UpdateAuthor
