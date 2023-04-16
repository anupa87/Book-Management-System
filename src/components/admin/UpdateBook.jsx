import { useState, useEffect } from 'react'
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

import { updateBook } from '../../features/books/bookSlice'

const UpdateBook = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [book, setBook] = useState({
    ISBN: '',
    title: '',
    imageURL: '',
    description: '',
    author: '',
    publisher: '',
    publishedYear: '',
    status: '',
    borrowerId: null,
    borrowDate: '',
    returnDate: '',
    likesCount: null,
    ...bookData
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (bookData && !book.ISBN) {
      setBook(bookData)
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setBook((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleEdit = () => {
    setIsEdit(true)
    setShowSuccessMessage(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(updateBook(book))
    setBook({
      ISBN: '',
      title: '',
      imageURL: '',
      description: '',
      author: '',
      publisher: '',
      publishedYear: '',
      status: '',
      borrowerId: null,
      borrowDate: '',
      returnDate: '',
      likesCount: null
    })
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 2000)
    navigate('/books')
  }

  const handleClose = () => {
    navigate('/dashboard')
  }

  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h4" sx={{ mt: 2, mb: 2 }} gutterBottom>
          Update Book
        </Typography>
        <hr />
      </Box>
      {showSuccessMessage && (
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Snackbar
            open={showSuccessMessage}
            message={'Book updated successfully!'}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
        </Box>
      )}
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
              name="imageURL"
              label="Image"
              value={book.imageURL}
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
              name="author"
              label="Author"
              value={book.author}
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
              name="publishedYear"
              label="Published Year"
              value={book.publishedYear}
              fullWidth
              required
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
              name="likesCount"
              label="Likes Count"
              value={book.likesCount}
              fullWidth
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
    </Container>
  )
}

export default UpdateBook
