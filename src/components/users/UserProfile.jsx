import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Box, Button, Container, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const UserProfile = () => {
  const users = useSelector((state) => state.users.users)
  const currentUser = users[0]
  const [firstName, setFirstName] = useState(currentUser.firstName)
  const [lastName, setLastName] = useState(currentUser.lastName)
  const [email, setEmail] = useState(currentUser.email)
  const [role, setRole] = useState(currentUser.role)

  const handleUpdate = () => {
    // dispatch update action to update user info in store
  }

  const handleSave = () => {
    // dispatch save action to save user info to server
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
            {users.firstname?.value} {users.lastname?.value}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Box sx={{ display: 'inline-block', width: '16px' }} />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Container>
    </Grid>
  )
}

export default UserProfile
