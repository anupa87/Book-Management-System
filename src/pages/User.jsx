import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Grid, Box, Button, Container, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Snackbar from '@mui/material/Snackbar'

import { updateUser } from '../features/users/userSlice'

const User = () => {
  const { id: userId } = useParams()
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const userToUpdate = users.find((user) => user.id === userId)
  console.log({ userToUpdate })

  const [firstName, setFirstName] = useState(userToUpdate.firstName)
  const [lastName, setLastName] = useState(userToUpdate.lastName)
  const [email, setEmail] = useState(userToUpdate.email)
  const [role, setRole] = useState(userToUpdate.role)
  const [isEdit, setIsEdit] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleEdit = () => {
    setIsEdit(true)
    setShowSuccessMessage(false)
  }

  const handleSave = () => {
    const updatedUser = { id: userId, firstName, lastName, email, role }
    dispatch(updateUser(updatedUser))
    setIsEdit(false)
    setFirstName(updatedUser.firstName)
    setLastName(updatedUser.lastName)
    setEmail(updatedUser.email)
    setRole(updatedUser.role)
    setShowSuccessMessage(true)
  }

  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Profile
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

          <Typography variant="h6">
            {userToUpdate.firstName} {userToUpdate.lastName}
          </Typography>
        </Box>
        {showSuccessMessage && (
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <Snackbar
              open={showSuccessMessage}
              autoHideDuration={6000}
              message="User updated successfully"
            />
            {/* <CheckCircle color="success" fontSize="large" /> */}
            <Typography variant="h6" color="success" ml={1}>
              User updated successfully!
            </Typography>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEdit}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
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

export default User
