import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Grid, Box, IconButton, Typography, Card, CardContent } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import AddUser from '../forms/AddUser'
// import AddAuthor from '../components/forms/AddAuthor'
// import AddBook from '../components/forms/AddBook'

const CardsDashboard = () => {
  const [showAddUser, setShowAddUser] = useState(false)

  const handleAddUser = ({ addUser }) => {
    navigate('/adduser')
  }
  const handleAddAuthor = () => {
    navigate('/addauthor')
  }
  const handleAddBook = () => {
    navigate('/addbook')
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, ml: 8, mb: 2 }}>
      <Card sx={{ width: 275, mr: 4, backgroundColor: 'secondary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton sx={{ color: 'white' }} onClick={handleAddUser}>
            <AddIcon />
          </IconButton>
          <CardContent sx={{ mt: 1 }}>
            <Typography variant="h6">Add Users</Typography>
          </CardContent>
        </Box>
      </Card>
      <Card sx={{ width: 275, mr: 4, backgroundColor: 'secondary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton sx={{ color: 'white' }} onClick={handleAddAuthor}>
            <AddIcon />
          </IconButton>
          <CardContent sx={{ mt: 1 }}>
            <Typography variant="h6">Add Authors</Typography>
          </CardContent>
        </Box>
      </Card>
      <Card sx={{ width: 275, mr: 4, backgroundColor: 'secondary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton sx={{ color: 'white' }} onClick={handleAddBook}>
            <AddIcon />
          </IconButton>
          <CardContent sx={{ mt: 1 }}>
            <Typography variant="h6">Add Books</Typography>
          </CardContent>
        </Box>
        {showAddUser && <AddUser />}
      </Card>
    </Box>
  )
}

export default CardsDashboard
