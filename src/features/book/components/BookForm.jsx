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
    category: book?.category || null,
    title: book?.title || '',
    imageURL: book?.imageURL || '',
    description: book?.description || '',
    author: book?.author || null,
    publisher: book?.publisher || '',
    publishedYear: book?.publishedYear || '',
    numberOfCopies: book?.numberOfCopies || '',
    availableCopies: book?.availableCopies || ''
  })

  console.log(categories)
  console.log(authors)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
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
                value={formData.category}
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
                value={formData.author}
                onChange={handleChange}
                required
                disabled={!isEdit && !!book}>
                {authors.map((author) => (
                  <MenuItem key={author.authorId} value={author.authorId}>
                    {author.name}
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
              label="Published Year"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              fullWidth
              disabled={!isEdit && !!book}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Copies"
              name="numberOfCopies"
              value={formData.numberOfCopies}
              onChange={handleChange}
              fullWidth
              disabled={!isEdit && !!book}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Available Copies"
              name="availableCopies"
              value={formData.availableCopies}
              onChange={handleChange}
              fullWidth
              disabled={!isEdit && !!book}
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
