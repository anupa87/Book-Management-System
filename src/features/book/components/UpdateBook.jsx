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

import BookForm from './BookForm'
import { updateBook } from '../slices/bookSlice'

const UpdateBook = ({ setOpenBookModal, openBookModal, selectedBook }) => {
  const dispatch = useDispatch()

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [formData, setFormData] = useState({
    category: selectedBook?.category || null,
    title: selectedBook?.title || '',
    imageURL: selectedBook?.imageURL || '',
    description: selectedBook?.description || '',
    author: selectedBook?.author || null,
    publisher: selectedBook?.publisher || '',
    publishedYear: selectedBook?.publishedYear || '',
    status: selectedBook?.status || null
  })

  const handleUpdateBook = (updatedBook) => {
    const updatedBookData = {
      ...updatedBook
    }

    dispatch(updateBook({ bookId: selectedBook.bookId, book: updatedBookData }))

    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
    }, 3000)
    setOpenBookModal(false)
  }

  const handleClose = () => {
    setOpenBookModal(false)
  }

  return (
    <Dialog open={openBookModal} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" gutterBottom>
            Update Book
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <BookForm
          book={selectedBook}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdateBook}
          setIsSnackbarOpen={setIsSnackbarOpen}
          handleClose={handleClose}
        />
      </DialogContent>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Book updated successfully
        </MuiAlert>
      </Snackbar>
    </Dialog>
  )
}
export default UpdateBook
