import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBook } from '../features/books/bookSlice'

import {
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Link,
  TableSortLabel
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const Books = () => {
  const books = useSelector((state) => state.books.books)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortColumn, setSortColumn] = useState('title')
  const sortDirection = sortOrder === 'asc' ? 'desc' : 'asc'
  const sortIcon = sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />

  const sortedBooks = [...books].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue)
    } else {
      return bValue.localeCompare(aValue)
    }
  })

  const handleSortClick = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortOrder('asc')
    }
  }

  const handleUpdateBook = (book) => {
    const updateUserUrl = `/update/${book.id}`
    navigate(updateUserUrl, { state: book })
  }

  const handleDeleteBook = (bookId) => {
    dispatch(deleteBook(bookId))
  }

  const handleTitleLink = (borrowerId) => {
    navigate(`/books/${id}`)
  }

  const handleStatusLink = (borrowerId) => {
    navigate(`/users/${borrowerId}`)
  }
  return (
    <Grid item xs={10}>
      <Box>
        <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
          All Books
        </Typography>
        <hr />
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="User table">
            <TableHead sx={{ backgroundColor: 'secondary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>ISBN</TableCell>
                <TableCell sx={{ color: 'white' }}>
                  <TableSortLabel
                    active={sortColumn === 'title'}
                    direction={sortDirection}
                    onClick={() => handleSortClick('title')}
                    sx={{ color: 'white' }}>
                    Title {sortColumn === 'title' ? sortIcon : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ color: 'white' }}>Description</TableCell>
                <TableCell sx={{ color: 'white' }}>Author</TableCell>
                <TableCell sx={{ color: 'white' }}>Publisher</TableCell>
                <TableCell sx={{ color: 'white' }}>Publish Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Update</TableCell>
                <TableCell sx={{ color: 'white' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedBooks &&
                sortedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell component="th" scope="row">
                      {book.ISBN}
                    </TableCell>
                    <TableCell>
                      <Link component="button" onClick={() => handleTitleLink(book.borrowerId)}>
                        {book.title}
                      </Link>
                    </TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.authorId}</TableCell>
                    <TableCell>{book.publisher}</TableCell>
                    <TableCell>{book.publisedDate}</TableCell>
                    <TableCell>
                      <Link component="button" onClick={() => handleStatusLink(book.borrowerId)}>
                        {book.status}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleUpdateBook(book)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteBook(book.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'secondary.main', ml: 0 }}
          onClick={() => navigate('/dashboard')}>
          Back to dashboard
        </Button>
      </Box>
    </Grid>
  )
}

export default Books
