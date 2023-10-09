import { useState } from 'react'

import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

const BookForm = ({ book, onSubmit, handleClose, categories, authors }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    categoryId: book?.category?.categoryId || '',
    title: book?.title || '',
    imageURL: book?.imageURL || '',
    description: book?.description || '',
    authorId: book?.author?.authorId || '',
    publisher: book?.publisher || '',
    publishedDate: book?.publishedDate || '',
    status: 'AVAILABLE'
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'category') {
      setFormData((prevState) => ({ ...prevState, categoryId: value }))
    } else if (name === 'author') {
      setFormData((prevState) => ({ ...prevState, authorId: value }))
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // If it's a new entry (not in edit mode), set the status to "AVAILABLE"
    if (!isEdit) {
      const updatedFormData = { ...formData, status: 'AVAILABLE' }
      onSubmit(updatedFormData)
    } else {
      // If it's in edit mode, no need to change status
      onSubmit(formData)
    }
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancel = () => {
    setIsEdit(false)
    handleClose()
  }

  const handleSave = () => {
    setIsEdit(false)
    onSubmit(formData)
    handleClose()
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.categoryId}
                onChange={handleChange}
                required
                disabled={!isEdit && !!book}>
                {categories.map((category) => (
                  <MenuItem key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              disabled={!isEdit && !!book}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              fullWidth
              disabled={!isEdit && !!book}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              disabled={!isEdit && !!book}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Author</InputLabel>
              <Select
                name="author"
                value={formData.authorId}
                onChange={handleChange}
                required
                disabled={!isEdit && !!book}>
                {authors.map((author) => (
                  <MenuItem key={author.authorId} value={author.authorId}>
                    {author.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              fullWidth
              disabled={!isEdit && !!book}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Published Date"
              name="publishedDate"
              type="date"
              value={formData.publishedDate}
              onChange={handleChange}
              fullWidth
              required
              disabled={!isEdit && !!book}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item xs={12}>
            {!book && (
              <Button type="submit" variant="contained" color="secondary">
                ADD
              </Button>
            )}
            {book && !isEdit && (
              <Button variant="contained" color="secondary" onClick={handleEdit}>
                EDIT
              </Button>
            )}
            {book && isEdit && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                  <Button variant="contained" color="success" onClick={handleSave}>
                    SAVE
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleCancel}>
                    CANCEL
                  </Button>
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default BookForm
