import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Grid, Box, Button, Container, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Snackbar from '@mui/material/Snackbar'

import { updateUser } from '../../features/users/userSlice'

const UpdateUser = () => {
  const { id: userId } = useParams()
  const users = useSelector((state) => state.users)

  const userToUpdate = users.find((user) => user.id === userId)
  console.log({ userToUpdate })

  const [firstName, setFirstName] = useState(userToUpdate.firstName)
  const [lastName, setLastName] = useState(userToUpdate.lastName)
  const [email, setEmail] = useState(userToUpdate.email)
  const [role, setRole] = useState(userToUpdate.role)
  const [isEdit, setIsEdit] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    setTimeout(() => {
      navigate('/users')
    }, 2000)
  }

  const handleCancel = () => {
    navigate('/dashboard')
  }

  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Update User
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
              message="User updated successfully"
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
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
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-evenly' }}>
          {!isEdit ? (
            <>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleEdit}>
                Edit
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

export default UpdateUser
