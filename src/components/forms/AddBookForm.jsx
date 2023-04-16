import { useState, useRef, useEffect } from 'react'
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

import { addBook, updateBook } from '../../features/books/bookSlice'

const AddBookForm = ({ open, setOpen, bookData }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [book, setBook] = useState({
    ISBN: '',
    title: '',
    description: '',
    publisher: '',
    status: '',
    borrowerId: '',
    publishedDate: '',
    borrowDate: '',
    returnDate: '',
    ...bookData
  })

  useEffect(() => {
    if (bookData && !book.ISBN) {
      setBook(bookData)
    }
  })

  const formRef = useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setBook((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmitBook = (e) => {
    e.preventDefault()
    dispatch(bookData ? updateBook(book) : addBook(book))
    setBook({
      ISBN: '',
      title: '',
      description: '',
      publisher: '',
      publishedDate: '',
      status: '',
      borrowerId: '',
      borrowDate: '',
      returnDate: ''
    })
    setShowSuccessMessage(true)
    formRef.current.reset()
    setTimeout(() => {
      navigate('/books')
    }, 2000)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container maxWidth="sm">
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" gutterBottom>
              {bookData ? 'Update Book' : 'Add Book'}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {showSuccessMessage && (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                message={
                  bookData
                    ? 'Book, {book.title} updated successfully!'
                    : 'Book, {book.title} added successfully!'
                }
              />
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <form ref={formRef} onSubmit={handleSubmitBook}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="ISBN"
                  label="ISBN"
                  value={book.ISBN}
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  value={book.title}
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  value={book.description}
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="publisher"
                  label="Publisher"
                  value={book.publisher}
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="publishedDate"
                  label="Published Date"
                  value={book.publishedDate}
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="borrowerId"
                  label="Borrower Id"
                  value={book.borrowerId}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="borrowDate"
                  label="Borrow Date"
                  value={book.borrowDate}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="returnDate"
                  label="Return Date"
                  value={book.returnDate}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="status"
                  label="status"
                  value={book.status}
                  fullWidth
                  required
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  {bookData ? 'Update' : 'Add'}
                </Button>
              </Grid>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default AddBookForm
