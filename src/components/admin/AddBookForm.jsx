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

import { addBook } from '../../features/books/bookSlice'

const AddBook = ({ setopenBookModal, OpenBookModal }) => {
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
    likesCount: null
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formRef = useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setBook((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmitBook = (e) => {
    e.preventDefault()
    dispatch(addBook(book))
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
    formRef.current.reset()
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 2000)
    navigate('/books')
  }

  const handleClose = () => {
    setopenBookModal(false)
  }

  return (
    <Container maxWidth="sm">
      <Dialog open={OpenBookModal} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h4" gutterBottom>
              Add Book
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {showSuccessMessage && (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Snackbar
                open={showSuccessMessage}
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
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default AddBook
