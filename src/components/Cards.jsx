import { useState } from 'react'

import { Box, IconButton, Typography, Card, CardContent, Dialog } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import AddUser from '../features/user/components/AddUser'
import AddAuthor from '../features/author/components/AddAuthor'
import AddCategory from '../features/category/components/AddCategory'
import AddBook from '../features/book/components/AddBook'

const Cards = () => {
  const [openUserModal, setOpenUserModal] = useState(false)
  const [openAuthorModal, setOpenAuthorModal] = useState(false)
  const [openCategoryModal, setOpenCategoryModal] = useState(false)
  const [OpenBookModal, setopenBookModal] = useState(false)

  const handleAddUser = () => {
    setOpenUserModal(true)
  }

  const handleAddAuthor = () => {
    setopenAuthorModal(true)
  }

  const handleAddCategory = () => {
    setopenCategoryModal(true)
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
          <IconButton sx={{ color: 'white' }} onClick={handleAddCategory}>
            <AddIcon />
          </IconButton>
          <CardContent sx={{ mt: 1 }}>
            <Typography variant="h6">Add Categories</Typography>
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
        open={openAuthorModal}
        onClose={() => setOpenAuthorModal(false)}
        PaperProps={{ style: { width: '80%' } }}>
        <AddAuthor
          openUserModal={openAuthorModal}
          onClose={() => setOpenAuthorModal(false)}
          setOpenAuthorModal={setOpenAuthorModal}
        />
      </Dialog>

      <Dialog
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        PaperProps={{ style: { width: '80%' } }}>
        <AddCategory
          openCategoryModal={openCategoryModal}
          onClose={() => setOpenCategoryModal(false)}
          setOpenCategoryModal={setOpenCategoryModal}
        />
      </Dialog>

      <Dialog
        open={OpenBookModal}
        onClose={() => setopenBookModal(false)}
        PaperProps={{ style: { width: '80%' } }}>
        <AddBook
          OpenBookModal={OpenBookModal}
          onClose={() => setopenBookModal(false)}
          setopenBookModal={setopenBookModal}
        />
      </Dialog>
    </Box>
  )
}

export default Cards
