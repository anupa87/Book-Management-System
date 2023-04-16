import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, IconButton, Typography, Card, CardContent, Dialog } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import AddUser from '../forms/AddUserForm'
import AddBook from '../forms/AddBookForm'
import IssueBookForm from '../forms/IssueBookForm'

const AddCards = () => {
  const navigate = useNavigate()
  const [openUserModal, setOpenUserModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [openIssueModal, setOpenIssueModal] = useState(false)

  const handleAddUser = () => {
    setOpenUserModal(true)
  }

  const handleAddBook = () => {
    setOpen(true)
  }

  const handleIssueBook = () => {
    setOpenIssueModal(true)
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
      <Card sx={{ width: 275, mr: 4, backgroundColor: 'secondary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton sx={{ color: 'white' }} onClick={handleIssueBook}>
            <AddIcon />
          </IconButton>
          <CardContent sx={{ mt: 1 }}>
            <Typography variant="h6">Issue Books</Typography>
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
      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { width: '80%' } }}>
        <AddBook open={open} onClose={() => setOpen(false)} setOpen={setOpen} />
      </Dialog>
      <Dialog
        open={openIssueModal}
        onClose={() => setOpenIssueModal(false)}
        PaperProps={{ style: { width: '80%' } }}>
        <IssueBookForm
          openIssueModal={openIssueModal}
          onClose={() => setOpenIssueModal(false)}
          setOpenIssueModal={setOpenIssueModal}
        />
      </Dialog>
    </Box>
  )
}

export default AddCards
