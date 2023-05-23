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

import { getAllUsers, deleteUser, setSelectedUser } from '../features/user/slices/userSlice'

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users.users)
  const status = useSelector((state) => state.users.status)
  const error = useSelector((state) => state.users.error)
  const selectedUser = useSelector((state) => state.users.selectedUser)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllUsers())
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

  const filteredUsers = users.filter((user) => user.role === 'USER')

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage)
  const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleEdit = (user) => {
    // Handle edit logic here
    setSnackbarMessage('User updated successfully')
    setIsSnackbarOpen(true)
    console.log('Edit user:', user)
  }

  const handleDelete = (userId) => {
    dispatch(setSelectedUser({ userId }))
    setIsConfirmationOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteUser(selectedUser.userId))
      setIsConfirmationOpen(false)
      setSnackbarMessage('User deleted successfully')
      setIsSnackbarOpen(true)
    } catch (error) {
      console.log('Error deleting user:', error.message)
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
        <Typography variant="h4">Users</Typography>
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
              {displayedUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>
                    {`${user.firstName}
                    ${user.lastName}`}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.userId)}>
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
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={isConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this user?</Typography>
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

export default Users
