import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

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

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import AddBook from '../components/admin/AddBookForm.jsx'

const Books = () => {
  const books = useSelector((state) => state.books)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortColumn, setSortColumn] = useState('title')
  const [selectedBook, setSelectedBook] = useState()
  const [open, setOpen] = useState(false)
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

  const handleTitleLink = (tmpBook) => {
    setSelectedBook(tmpBook)
    setOpen(true)
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
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
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
                      <Link component="button" onClick={() => handleTitleLink(book)}>
                        {book.title}
                      </Link>
                    </TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.publisher}</TableCell>
                    <TableCell>{book.status}</TableCell>
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
      <AddBook
        open={open}
        onClose={() => setOpen(false)}
        setOpen={setOpen}
        bookData={selectedBook}
      />
    </Grid>
  )
}

export default Books
