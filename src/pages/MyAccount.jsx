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
  Snackbar
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import MuiAlert from '@mui/material/Alert'

import { updateUser, getUserById } from '../features/user/slices/userSlice'
import Transaction from '../features/transaction/components/Transaction'

const MyAccount = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.auth.currentUser)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')

  useEffect(() => {
    const fetchUserInformation = () => {
      try {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        const userId = decodedToken.user_id

        dispatch(getUserById(userId))
        console.log('currentUser:', currentUser)

        setUserInfo({
          firstName: currentUser?.firstName || decodedToken.firstName,
          lastName: user?.lastName,
          email: currentUser?.email || decodedToken.email
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
      <Transaction />
      <Card sx={{ maxWidth: 570, my: 6 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            First Name: {userInfo?.firstName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Last Name: {userInfo?.lastName}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Email: {userInfo?.email}
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
    </Box>
  )
}

export default MyAccount
