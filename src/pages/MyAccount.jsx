import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import jwtDecode from 'jwt-decode'

import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  CardActions,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Snackbar
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import MuiAlert from '@mui/material/Alert'

import { updateUser, getUserById } from '../features/user/slices/userSlice'

const MyAccount = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.auth.currentUser)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.user_id

        await dispatch(getUserById(userId))

        setUserInfo({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email
        })
      } catch (error) {
        console.error('Failed to fetch user information:', error)
      }
    }
    fetchUserInformation()
  }, [currentUser, dispatch])

  const handleEdit = (updatedUser) => {
    const updatedUserData = {
      ...updatedUser,
      password: selectedUser.password,
      role: selectedUser.role
    }
    dispatch(updateUser({ userId: selectedUser.userId, user: updatedUserData }))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
    }, 3000)
  }
  console.log(userInfo)
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          My Account
        </Typography>
      </Box>
      <hr />
      <Typography sx={{ mt: 1 }}>
        {moment().format('MMMM DD YYYY')} | {moment().format('dddd')},{' '}
        {moment().format('h:mm:ss a')}
      </Typography>

      <Card sx={{ maxWidth: 570, my: 6 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Personal Information
          </Typography>
          <Typography variant="h6" gutterBottom>
            First Name: {userInfo?.firstName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Last Name: {currentUser.lastName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Email: {currentUser.email}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            m: 2
          }}>
          <Button variant="contained" onClick={handleEdit}>
            EDIT
          </Button>
          <Button variant="contained">SAVE</Button>
        </CardActions>
        <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
          <MuiAlert elevation={6} variant="filled" severity="success">
            Info updated successfully
          </MuiAlert>
        </Snackbar>
      </Card>

      <Card sx={{ maxWidth: 570, mt: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Change Password
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Current Password" type="password" sx={{ mt: 2 }} />
            <TextField
              label="New Password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowNewPassword()}>
                    <Visibility />
                  </IconButton>
                )
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Confirm New Password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowNewPassword()}>
                    <Visibility />
                  </IconButton>
                )
              }}
              sx={{ mt: 2 }}
            />
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            m: 2
          }}>
          <Button variant="contained">Update Password</Button>
          <Button variant="contained">Save</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 570, my: 6 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Transaction
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>2023-05-25</TableCell>
                  <TableCell>Book Title</TableCell>
                  <TableCell>Borrowed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default MyAccount
