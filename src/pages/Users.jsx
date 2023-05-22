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
  TablePagination
} from '@mui/material'

import User from '../features/user/components/User'
import { getAllUsers } from '../features/user/slices/userSlice'
import { deleteUser } from '../features/user/slices/userSlice'

const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users.users)
  const status = useSelector((state) => state.users.status)
  const error = useSelector((state) => state.users.error)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  console.log(users)

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
  console.log(filteredUsers)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage)
  const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleEdit = (user) => {
    // Handle edit logic here
    console.log('Edit user:', user)
  }

  const handleDelete = (user) => {
    dispatch(deleteUser(user.userId))
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
                <TableRow key={user.id}>
                  <TableCell>
                    {`${user.firstName}
                    ${user.lastName}`}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <User user={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
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
    </Container>
  )
}

export default Users
