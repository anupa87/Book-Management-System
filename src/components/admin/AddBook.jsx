import { useState, useRef } from 'react'
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
import { CheckCircle as CheckCircleIcon, Close as CloseIcon } from '@mui/icons-material'

import { addBook } from '../../features/books/bookSlice'

const AddBook = ({ open, onClose, setOpen }) => {
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
    authorIds: []
  })

  const formRef = useRef(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name, value)
    setBook({ ...book, [name]: value })
  }

  const handleSubmitBook = (e) => {
    e.preventDefault()
    console.log(book)
    dispatch(addBook(book)) //dispatch the addBook action with the book data
    setBook({
      ISBN: '',
      title: '',
      description: '',
      publisher: '',
      publishedDate: '',
      status: '',
      borrowerId: '',
      borrowDate: '',
      returnDate: '',
      authorIds: []
    })
    setShowSuccessMessage(true)
    formRef.current.reset()
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 1000)
    navigate('/books')
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
              Add Book
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {showSuccessMessage && (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <CheckCircleIcon color="success" fontSize="large" />
              <Typography variant="h6" color="success" ml={1}>
                Book,{title} added successfully!
              </Typography>
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
                  name="authorIds"
                  label="Author Id/s"
                  value={book.authorIds}
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
                  Add
                </Button>
              </Grid>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default AddBook
