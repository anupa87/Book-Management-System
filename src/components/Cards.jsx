import { useState } from 'react'

import { Box, IconButton, Typography, Card, CardContent, Dialog } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import AddUser from '../features/user/components/AddUser'
import BookForm from '../features/admin/components/BookForm'

const Cards = () => {
  const [openUserModal, setOpenUserModal] = useState(false)
  const [OpenBookModal, setopenBookModal] = useState(false)

  const handleAddUser = () => {
    setOpenUserModal(true)
  }

  const handleAddBook = () => {
    setopenBookModal(true)
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
        onClose={() => setOpenUserModal(false)}
        PaperProps={{ style: { width: '80%' } }}>
        <AddUser
          openUserModal={openUserModal}
          onClose={() => setOpenUserModal(false)}
          setOpenUserModal={setOpenUserModal}
        />
      </Dialog>
      <Dialog
        open={OpenBookModal}
        onClose={() => setopenBookModal(false)}
        PaperProps={{ style: { width: '80%' } }}>
        <BookForm
          OpenBookModal={OpenBookModal}
          onClose={() => setopenBookModal(false)}
          setopenBookModal={setopenBookModal}
        />
      </Dialog>
    </Box>
  )
}

export default Cards
