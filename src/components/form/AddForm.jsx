import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Container, TextField, Typography, Grid, Box } from '@mui/material'

const AddForm = ({ addUser, addBook, addAuthor }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  })

  // const [author, setAuthor] = useState({
  //   authorNames: []
  // })

  const [book, setBook] = useState({
    ISBN: '',
    title: '',
    description: '',
    publisher: '',
    status: '',
    authorIds: [],
    borrowerId: '',
    borrowDate: '',
    returnDate: ''
  })

  const userFormRef = useRef(null)
  const bookFormRef = useRef(null)

  const handleChange = (e, setState) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmitUser = (e) => {
    e.preventDefault()
    addUser(user)
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    })
    userFormRef.current.reset()

    navigate('/user')
  }
  const handleSubmitBook = (e) => {
    e.preventDefault()
    addBook(book)
    setBook({
      ISBN: '',
      title: '',
      description: '',
      publisher: '',
      status: '',
      authorIds: [],
      borrowerId: '',
      borrowDate: '',
      returnDate: ''
    })
    bookFormRef.current.reset()
    navigate('/books')
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Form
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form ref={bookFormRef} onSubmit={handleBookSubmit}>
              {/* Book form fields */}
              <TextField
                name="ISBN"
                label="ISBN"
                value={book.ISBN}
                onChange={(e) => handleChange(e, setBook)}
                fullWidth
              />
              {/* More book form fields */}
              <Button variant="contained" color="primary" type="submit">
                Add Book
              </Button>
            </form>
          </Grid>
          <Grid item xs={12}>
            <form ref={userFormRef} onSubmit={handleUserSubmit}>
              {/* User form fields */}
              <TextField
                name="firstName"
                label="First Name"
                value={user.firstName}
                onChange={(e) => handleChange(e, setUser)}
                fullWidth
              />
              {/* More user form fields */}
              <Button variant="contained" color="primary" type="submit">
                Add User
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default AddForm
