import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Grid, Box, Button, Container, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Snackbar from '@mui/material/Snackbar'

import { updateUser } from '../../user/slices/userSlice'

const UpdateUser = () => {
  const { id: userId } = useParams()

  const [isEdit, setIsEdit] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const users = useSelector((state) => state.users)
  const userToUpdate = users.find((user) => user.id === userId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userToUpdate) {
      setFirstName(userToUpdate.firstName)
      setLastName(userToUpdate.lastName)
      setEmail(userToUpdate.email)
      setRole(userToUpdate.role)
    }
  }, [userToUpdate])

  const handleEdit = () => {
    setIsEdit(true)
    setShowSuccessMessage(false)
  }

  const handleCancel = () => {
    setIsEdit(false)
    navigate('/dashboard')
  }

  const handleSave = (event) => {
    const updatedUser = { id: userId, firstName, lastName, email, role }
    dispatch(updateUser(updatedUser))
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      setIsEdit(false)
      navigate('/dashboard', { replace: 'true' })
    }, 2000)
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
          <Box alignItems="center" justifyContent="center" mb={2}>
            <Snackbar
              open={showSuccessMessage}
              message="User updated successfully"
              anchor={{ vertical: 'center', horizontal: 'center' }}
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
        <Box sx={{ mt: 2 }}>
          {!isEdit ? (
            <>
              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
              <Box sx={{ display: 'inline-block', width: '16px' }} />
              <Button variant="contained" onClick={() => navigate('/dashboard')}>
                Back
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
