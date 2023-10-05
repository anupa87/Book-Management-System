import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
import { getAllCategories } from '../../category/slices/categorySlice'
import { getAllAuthors } from '../../author/slices/authorSlice'

const UpdateBook = ({ setOpenBookModal, openBookModal, selectedBook }) => {
  const dispatch = useDispatch()

  const categories = useSelector((state) => state.categories.categories)
  const authors = useSelector((state) => state.authors.authors)
  const error = useSelector((state) => state.books.error)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [formData, setFormData] = useState({
    categoryId: selectedBook?.category?.categoryId || '',
    title: selectedBook?.title || '',
    imageURL: selectedBook?.imageURL || '',
    description: selectedBook?.description || '',
    authorId: selectedBook?.author?.authorId || '',
    publisher: selectedBook?.publisher || '',
    publishedYear: selectedBook?.publishedYear || '',
    status: selectedBook?.status || null
  })

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllAuthors())
  }, [dispatch])

  const handleUpdateBook = (updatedBook) => {
    dispatch(updateBook({ bookId: selectedBook.bookId, book: updatedBook }))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
      setOpenBookModal(false)
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
          categories={categories}
          authors={authors}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdateBook}
          handleClose={handleClose}
        />
      </DialogContent>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        {error ? (
          <MuiAlert elevation={6} variant="filled" severity="error">
            {error}
          </MuiAlert>
        ) : (
          <MuiAlert elevation={6} variant="filled" severity="success">
            Book updated successfully
          </MuiAlert>
        )}
      </Snackbar>
    </Dialog>
  )
}
export default UpdateBook
