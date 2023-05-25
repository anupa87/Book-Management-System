import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Grid, Box, Button, Container, TextField, Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

import { updateBook } from '../slices/bookSlice'

const UpdateBook = () => {
  const { ISBN: bookISBN } = useParams()
  const [isEdit, setIsEdit] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [title, setTitle] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [status, setStatus] = useState('')
  const [borrowerId, setBorrowerId] = useState(null)
  const [borrowDate, setBorrowDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [likesCount, setLikesCount] = useState(null)

  const books = useSelector((state) => state.books.books)
  const bookToUpdate = books.find((book) => book.ISBN === bookISBN)
  console.log({ bookToUpdate })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (bookToUpdate) {
      setTitle(bookToUpdate.title)
      setImageURL(bookToUpdate.imageURL)
      setDescription(bookToUpdate.description)
      setAuthor(bookToUpdate.author)
      setPublisher(bookToUpdate.publisher)
      setPublishedYear(bookToUpdate.publishedYear)
      setStatus(bookToUpdate.status)
      setBorrowerId(bookToUpdate.borrowerId)
      setBorrowDate(bookToUpdate.borrowDate)
      setReturnDate(bookToUpdate.returnDate)
      setLikesCount(bookToUpdate.likesCount)
    }
  }, [bookToUpdate])

  const handleEdit = () => {
    setIsEdit(true)
    setShowSuccessMessage(false)
  }

  const handleCancel = () => {
    setIsEdit(false)
    navigate('/dashboard')
  }

  const handleSave = (event) => {
    const updatedBook = {
      title,
      imageURL,
      description,
      author,
      publisher,
      publishedYear,
      status,
      borrowerId,
      borrowDate,
      returnDate,
      likesCount
    }
    dispatch(updateBook(updatedBook))
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      setIsEdit(false)
      navigate('/dashboard', { replace: 'true' })
    }, 2000)
  }
  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Update Book
        </Typography>
        <hr />
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center',
          mt: 5
        }}>
        {showSuccessMessage && (
          <Box alignItems="center" justifyContent="center" mb={2}>
            <Snackbar
              open={showSuccessMessage}
              message="Book updated successfully"
              anchor={{ vertical: 'center', horizontal: 'center' }}
            />
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <TextField
            name="title"
            label="Title"
            value={title}
            fullWidth
            required
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="imageURL"
            label="Image"
            value={imageURL}
            fullWidth
            required
            onChange={(e) => setImageURL(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="description"
            label="Description"
            value={description}
            fullWidth
            required
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="author"
            label="Author"
            value={author}
            fullWidth
            required
            onChange={(e) => setAuthor(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="publisher"
            label="Publisher"
            value={publisher}
            fullWidth
            required
            onChange={(e) => setPublisher(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="publishedYear"
            label="Published Year"
            value={publishedYear}
            fullWidth
            required
            onChange={(e) => setPublishedYear(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="status"
            label="status"
            value={status}
            fullWidth
            required
            onChange={(e) => setStatus(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="borrowerId"
            label="Borrower Id"
            value={borrowerId}
            fullWidth
            onChange={(e) => setborrowerId(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="borrowDate"
            label="Borrow Date"
            value={borrowDate}
            fullWidth
            onChange={(e) => setborrowDate(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="returnDate"
            label="Return Date"
            value={returnDate}
            fullWidth
            onChange={(e) => setreturnDate(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            name="likesCount"
            label="Likes Count"
            value={likesCount}
            fullWidth
            onChange={(e) => setLikesCount(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          {!isEdit ? (
            <>
              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
              <Box sx={{ display: 'inline-block', width: '16px' }} />
              <Button variant="contained" onClick={() => navigate('/dashboard')}>
                Back
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
              <Box sx={{ display: 'inline-block', width: '16px' }} />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Grid>
  )
}

export default UpdateBook
