import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { updateBook } from '../features/books/bookSlice'

const Book = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isEdit, setIsEdit] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const { id: bookId } = useParams()
  const books = useSelector((state) => state.books.books)

  const bookToUpdate = books.find((book) => book.id === bookId)

  const [title, setTitle] = useState(bookToUpdate.title)
  const [description, setDescription] = useState(bookToUpdate.descriptio)

  const handleEdit = () => {
    setIsEdit(true)
    setShowSuccessMessage(false)
  }

  const handleSave = () => {
    const updatedBook = { id: bookId, title, description, publisher }
    dispatch(updateBook(updatedBook))
    setIsEdit(false)
    setTitle(updatedBook.title)
    setDescription(updatedBook.description)
    setShowSuccessMessage(true)
    setTimeout(() => {
      navigate('/books')
    }, 2000)
  }

  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Book Profile
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
        <Box direction="row" spacing={1} alignItems="center">
          <AccountCircleIcon sx={{ fontSize: 100 }} />

          <Typography variant="h6">{bookToUpdate.title}</Typography>
        </Box>
        {showSuccessMessage && (
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Snackbar
              open={showSuccessMessage}
              autoHideDuration={6000}
              message="Book updated successfully"
            />
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEdit}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          {!isEdit ? (
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <>
              <Button variant="contained" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>

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

export default Book
