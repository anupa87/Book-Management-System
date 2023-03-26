import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Typography, Grid, Box, Card, CardContent } from '@mui/material'

import AddUser from '../components/forms/AddUser'

const Dashboard = ({ addUser }) => {
  const navigate = useNavigate()
  const [showAddUser, setShowAddUser] = useState(false)

  const handleAddUser = () => {
    navigate('/adduser')
  }

  // Display current date
  const currentDate = new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  })
  const currentTime = new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  const dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' })
  const userName = 'Anupa'
  const totalUser = 100
  const totalAuthor = 50
  const totalBooks = 1000

  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          Dashboard
        </Typography>
        <hr />
        <Typography sx={{ mt: 1 }}>
          {currentDate} | {dayOfWeek}, {currentTime}
        </Typography>
        <Typography variant="h5" sx={{ mt: 5, textAlign: 'center' }}>
          Welcome, {userName}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mt: 5 }}>
          <Card sx={{ width: 275, mr: 4, backgroundColor: 'secondary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="body1">{totalUser}</Typography>
            </CardContent>
            <Button variant="contained" onClick={handleAddUser}>
              Add User
            </Button>
            {showAddUser && <AddUser />}
          </Card>
          <Card sx={{ width: 275, mr: 4, backgroundColor: 'secondary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Authors</Typography>
              <Typography variant="body1">{totalAuthor}</Typography>
            </CardContent>
            <Button variant="contained">Add Author</Button>
          </Card>
          <Card sx={{ width: 275, mr: 4, backgroundColor: 'secondary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Books</Typography>
              <Typography variant="body1">{totalBooks}</Typography>
            </CardContent>

            <Button variant="contained">Add Book</Button>
          </Card>
        </Box>
      </Box>
    </Grid>
  )
}

export default Dashboard
