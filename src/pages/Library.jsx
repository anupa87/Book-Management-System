import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Grid,
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Chip,
  Button,
  Snackbar
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import SearchBar from '../features/book/components/SearchBar'
import { setSearch, getAllBooks } from '../features/book/slices/bookSlice'
import { setSelectedCategory } from '../features/category/slices/categorySlice'
import { borrowBook } from '../features/borrow/slices/borrowSlice'

const Library = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const books = useSelector((state) => state.books.books)
  const searchInput = useSelector((state) => state.books.search)
  const categories = useSelector((state) => state.categories.categories)
  const selectedCategory = useSelector((state) => state.categories.selectedCategory)
  const currentUser = useSelector((state) => state.auth.currentUser)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  useEffect(() => {
    dispatch(getAllBooks())
  }, [dispatch])

  const handleSearchInputChange = (event) => {
    dispatch(setSearch(event.target.value))
  }

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory({ categoryId: category }))
  }

  const handleBorrow = (bookId) => {
    dispatch(borrowBook(bookId))
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
    }, 2000)
  }

  const handleIssue = (bookId) => {
    setIsSnackbarOpen(true)
    setTimeout(() => {
      setIsSnackbarOpen(false)
    }, 2000)
  }

  const filteredBooks = selectedCategory
    ? books.filter(
        (book) =>
          book.category.categoryId === selectedCategory &&
          book.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : books.filter((book) => book.title.toLowerCase().includes(searchInput.toLowerCase()))

  console.log(currentUser)
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
        <Typography variant="h4">Books</Typography>
      </Box>
      <hr />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '50%' }}>
          <SearchBar onChange={handleSearchInputChange} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 10,
          gap: 6
        }}>
        <Chip
          label="All"
          clickable
          color={selectedCategory === null ? 'primary' : 'secondary'}
          onClick={() => handleCategorySelect(null)}
          sx={{ minWidth: '100px' }}
        />
        {categories.map((category) => (
          <Chip
            key={category.categoryId}
            label={category.name}
            clickable
            color={selectedCategory === category.categoryId ? 'primary' : 'secondary'}
            onClick={() => handleCategorySelect(category.categoryId)}
            sx={{ minWidth: '100px' }}
          />
        ))}
      </Box>
      <Grid container spacing={2}>
        {filteredBooks.map((book) => (
          <Grid
            item
            key={book.bookId}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            sx={{
              mt: 6
            }}>
            <Card sx={{ width: 300, height: 350 }}>
              <CardMedia
                component="img"
                image={book.imageURL}
                alt={book.title}
                sx={{
                  objectFit: 'cover',
                  height: '60%'
                }}
              />
              <CardHeader
                title={book.title}
                sx={{
                  textDecoration: 'none',
                  '& .MuiCardHeader-title': {
                    fontSize: '1.2rem',
                    fontWeight: 'semi-bold',
                    color: '#000000',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  },
                  pb: 0,
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={() => navigate(`/books/${book.bookId}`)}
              />
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {book.author.fullName}
                </Typography>
              </CardContent>
              <CardActions>
                {currentUser && currentUser.role === 'ADMIN' ? (
                  <Button onClick={() => handleIssue(book.bookId)}>Issue book</Button>
                ) : (
                  <Button onClick={() => handleBorrow(book.bookId)}>Borrow</Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={isSnackbarOpen} autoHideDuration={3000}>
        <MuiAlert elevation={6} variant="filled" severity="success">
          Book added successfully
        </MuiAlert>
      </Snackbar>
    </Box>
  )
}

export default Library
