import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../features/users/userSlice'

import {
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const Users = () => {
  const users = useSelector((state) => state.users.users) // get the users array from the Redux store
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUpdateUser = (userId) => {
    navigate(`/updateuser/${userId}`)
  }

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
  }

  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          All Users
        </Typography>
        <hr />
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="User table">
            <TableHead sx={{ backgroundColor: 'secondary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Role</TableCell>
                <TableCell sx={{ color: 'white' }}>Update</TableCell>
                <TableCell sx={{ color: 'white' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUpdateUser(user.id)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'secondary.main', ml: 0 }}
          onClick={() => navigate('/dashboard')}>
          Back to dashboard
        </Button>
      </Box>
    </Grid>
  )
}

export default Users
