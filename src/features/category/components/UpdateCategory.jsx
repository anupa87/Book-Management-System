import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import MuiAlert from '@mui/material/Alert'

import CategoryForm from './CategoryForm'
import { updateCategory } from '../slices/categorySlice'

const UpdateCategory = ({ setOpenCategoryModal, openCategoryModal, selectedCategory }) => {
  const dispatch = useDispatch()
  console.log(selectedCategory)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: selectedCategory?.name || ''
  })

  const handleUpdateCategory = (updatedCategory) => {
    const updatedCategoryData = {
      ...updatedCategory
    }

    dispatch(
      updateCategory({ categoryId: selectedCategory.categoryId, category: updatedCategoryData })
    )

    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
    }, 3000)
    setOpenUserModal(false)
  }

  const handleClose = () => {
    setOpenUserModal(false)
  }

  return (
    <Dialog open={openCategoryModal} onClose={handleClose} PaperProps={{ style: { width: '80%' } }}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" gutterBottom>
            Update Category
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <CategoryForm
          category={selectedAuthor}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdateCategory}
          setIsSnackbarOpen={setIsSnackbarOpen}
          handleClose={handleClose}
        />
      </DialogContent>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Category updated successfully
        </MuiAlert>
      </Snackbar>
    </Dialog>
  )
}
export default UpdateCategory
