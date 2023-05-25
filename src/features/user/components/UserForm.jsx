import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

const UserForm = ({ user, onSubmit, handleClose, setIsSnackbarOpen }) => {
  const navigate = useNavigate()
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    password: user?.password || '',
    role: user?.role || 'USER'
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
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
              disabled={!isEdit && !!user}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
              disabled={!isEdit && !!user}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              disabled={!isEdit && !!user}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              disabled={!!user}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                disabled={!!user}>
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {!user && (
              <Button type="submit" variant="contained" color="secondary">
                ADD
              </Button>
            )}
            {user && !isEdit && (
              <Button variant="contained" color="secondary" onClick={handleEdit}>
                EDIT
              </Button>
            )}
            {user && isEdit && (
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

export default UserForm
