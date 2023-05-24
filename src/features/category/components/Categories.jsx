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

import { getAllCategories, deleteCategory, setSelectedCategory } from '../slices/categorySlice'

const Categories = () => {
  const dispatch = useDispatch()

  const categories = useSelector((state) => state.categories.categories)
  const status = useSelector((state) => state.categories.status)
  const error = useSelector((state) => state.categories.error)
  const selectedCategory = useSelector((state) => state.categories.selectedCategory)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllCategories())
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, categories.length - page * rowsPerPage)
  const displayedCategories = categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleEdit = (category) => {
    // Handle edit logic here
    setSnackbarMessage('category updated successfully')
    setIsSnackbarOpen(true)
    console.log('Edit category:', category)
  }

  const handleDelete = (categoryId) => {
    dispatch(setSelectedCategory({ categoryId }))
    setIsConfirmationOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteCategory(selectedCategory.categoryId))
      setIsConfirmationOpen(false)
      setSnackbarMessage('category deleted successfully')
      setIsSnackbarOpen(true)
    } catch (error) {
      console.log('Error deleting category:', error.message)
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
        <Typography variant="h4">Categories</Typography>
      </Box>
      <hr />
      <Box sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Book table">
            <TableHead sx={{ backgroundColor: 'secondary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedCategories.map((category) => (
                <TableRow key={category.categoryId}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(category.categoryId)}>
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
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={isConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this category?</Typography>
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

export default Categories
