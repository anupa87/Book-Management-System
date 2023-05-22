import { Typography, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const User = ({ user, onEdit, onDelete }) => {
  return (
    <>
      <Typography variant="h5" component="h2">
        {user.firstName} {user.lastName}
      </Typography>
      <Typography variant="body1" component="p">
        {user.email}
      </Typography>
      <IconButton onClick={() => onEdit(user)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(user)}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}

export default User
