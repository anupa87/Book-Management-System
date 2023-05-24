import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  CircularProgress,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Snackbar
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MuiAlert from '@mui/material/Alert'

import { getAllAuthors, deleteAuthor, setSelectedAuthor } from '../slices/authorSlice'

const Authors = () => {
  const dispatch = useDispatch()

  const authors = useSelector((state) => state.authors.authors)
  const status = useSelector((state) => state.authors.status)
  const error = useSelector((state) => state.authors.error)
  const selectedAuthor = useSelector((state) => state.authors.selectedAuthor)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllAuthors())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (status === 'failed') {
    return (
      <Typography variant="body1" color="error">
        Error: {error}
      </Typography>
    )
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, authors.length - page * rowsPerPage)
  const displayedAuthors = authors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleEdit = (author) => {
    // Handle edit logic here
    setSnackbarMessage('Author updated successfully')
    setIsSnackbarOpen(true)
    console.log('Edit author:', author)
  }

  const handleDelete = (authorId) => {
    dispatch(setSelectedAuthor({ authorId }))
    setIsConfirmationOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteAuthor(selectedAuthor.authorId))
      setIsConfirmationOpen(false)
      setSnackbarMessage('Author deleted successfully')
      setIsSnackbarOpen(true)
    } catch (error) {
      console.log('Error deleting author:', error.message)
      setIsConfirmationOpen(false)
      setSnackbarMessage(`Error: ${error.message}`)
      setIsSnackbarOpen(true)
    }
  }

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false)
  }

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false)
  }
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
        <Typography variant="h4">Authors</Typography>
      </Box>
      <hr />
      <Box sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Book table">
            <TableHead sx={{ backgroundColor: 'secondary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Full Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedAuthors.map((author) => (
                <TableRow key={author.authorId}>
                  <TableCell>{author.fullName}</TableCell>
                  <TableCell>{author.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(author)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(author.authorId)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[8, 16, 24]}
        component="div"
        count={authors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={isConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this author?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={status === 'succeeded' ? 'success' : 'error'}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default Authors
