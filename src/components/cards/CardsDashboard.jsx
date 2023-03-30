import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, IconButton, Typography, Card, CardContent, Dialog } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import AddUser from '../admin/AddUser'
import AddBook from '../admin/AddBook'

const CardsDashboard = () => {
  const navigate = useNavigate()
  const [showAddUser, setShowAddUser] = useState(false)
  const [showAddBook, setShowAddBook] = useState(false)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [open, setOpen] = useState(false)

  const handleAddUser = () => {
    setShowAddUser(true)
    setOpenUserModal(true)
  }

  const handleAddBook = () => {
    setShowAddBook(true)
    setOpen(true)
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
          <IconButton sx={{ color: 'white' }} onClick={handleAddBook}>
            <AddIcon />
          </IconButton>
          <CardContent sx={{ mt: 1 }}>
            <Typography variant="h6">Add Books</Typography>
          </CardContent>
        </Box>
      </Card>
      <Dialog
        open={openUserModal}
        onClose={() => setOpen(false)}
        PaperProps={{ style: { width: '80%' } }}>
        <AddUser open={openUserModal} onClose={() => setOpen(false)} setOpen={setOpen} />
      </Dialog>
      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { width: '80%' } }}>
        <AddBook open={open} onClose={() => setOpen(false)} setOpen={setOpen} />
      </Dialog>
    </Box>
  )
}

export default CardsDashboard
