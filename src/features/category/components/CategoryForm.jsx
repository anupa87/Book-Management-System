import { useState } from 'react'

import { Box, Grid, TextField, Button } from '@mui/material'

const CategoryForm = ({ category, onSubmit, handleClose }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    name: category?.fullName || ''
  })

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
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              disabled={!isEdit && !!category}
            />
          </Grid>

          <Grid item xs={12}>
            {!category && (
              <Button type="submit" variant="contained" color="secondary">
                ADD
              </Button>
            )}
            {category && !isEdit && (
              <Button variant="contained" color="secondary" onClick={handleEdit}>
                EDIT
              </Button>
            )}
            {category && isEdit && (
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

export default CategoryForm
