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

import { addBook } from '../../book/slices/bookSlice'

const AddBook = ({ setopenBookModal, openBookModal }) => {
  const [book, setBook] = useState({
    category: '',
    title: '',
    imageURL: '',
    description: '',
    author: '',
    publisher: '',
    publishedYear: '',
    numberofCopies: null,
    availableCopies: null
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
      category: '',
      title: '',
      imageURL: '',
      description: '',
      author: '',
      publisher: '',
      publishedYear: '',
      numberofCopies: null
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
          {showSuccessMessage && (
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Snackbar open={showSuccessMessage} message="Book added successfully!" />
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          <BookForm handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default AddBook
