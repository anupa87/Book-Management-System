import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

import BookForm from './BookForm'
import { addBook } from '../slices/bookSlice'
import { getAllCategories } from '../../category/slices/categorySlice'
import { getAllAuthors } from '../../author/slices/authorSlice'

const AddBook = ({ setOpenBookModal, openBookModal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const categories = useSelector((state) => state.categories.categories)
  const authors = useSelector((state) => state.authors.authors)

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllAuthors())
  }, [dispatch])

  const handleSubmit = (book) => {
    dispatch(addBook(book))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
      navigate('/admin/books')
    }, 3000)
  }

  const handleClose = () => {
    setOpenBookModal(false)
  }

  return (
    <Dialog open={openBookModal} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" gutterBottom>
            Add Book
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <BookForm onSubmit={handleSubmit} categories={categories} authors={authors} />
      </DialogContent>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Book added successfully
        </MuiAlert>
      </Snackbar>
    </Dialog>
  )
}

export default AddBook
