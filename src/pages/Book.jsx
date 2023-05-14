import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Badge,
  Button
} from '@mui/material'
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material'

import { selectCurrentRole } from '../features/auth/slices/authSlice'
import { borrowBook, issueBook } from '../features/book/slices/bookSlice'

const Book = () => {
  const { ISBN: bookISBN } = useParams()
  const books = useSelector((state) => state.books.books)
  const selectedBook = books.find((book) => book.ISBN === bookISBN)
  const [liked, setLiked] = useState(false)

  const currentRole = useSelector(selectCurrentRole)
  const isBorrowed = selectedBook.status === 'borrowed'

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleBorrow = () => {
    const borrowedBook = { ...selectedBook, status: 'borrowed' }
    dispatch(borrowBook(borrowedBook))
    navigate('/homepage')
  }

  const handleIssue = () => {
    const issuedBook = { ...selectedBook, status: 'issued' }
    dispatch(issueBook(issuedBook))
    navigate('/dashboard')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 4
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {selectedBook.title}
        </Typography>
      </Box>
      <hr />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mt: 6,
          mb: 4,
          gap: '16px'
        }}>
        <Box
          sx={{
            flex: 1
          }}>
          <Card sx={{ maxWidth: 600, height: 400 }}>
            <CardMedia
              component="img"
              height="80%"
              width="100%"
              image={selectedBook.imageURL}
              alt={selectedBook.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingBottom: '16px'
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleLike} aria-label="like">
                  {liked ? (
                    <Badge badgeContent={selectedBook.likes} color="secondary">
                      <FavoriteIcon />
                    </Badge>
                  ) : (
                    <Badge badgeContent={selectedBook.likes} color="secondary">
                      <FavoriteBorderIcon />
                    </Badge>
                  )}
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              ml: 4
            }}>
            <Typography variant="h4" gutterBottom>
              Book Information
            </Typography>
            <Typography variant="subtitle1">
              {selectedBook.author} ({selectedBook.publishedYear})
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {selectedBook.description}
            </Typography>
          </Box>
          <Box
            mt={6}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Box sx={{ flex: '0 0 auto', ml: 2 }}>
              <Button
                variant="contained"
                component={RouterLink}
                to="/books"
                color="secondary"
                sx={{ flex: '0 0 auto', mr: 2 }}>
                Back to books
              </Button>
            </Box>
            {selectedBook.status === 'available' ? (
              currentRole === 'admin' ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleIssue}
                  disabled={isBorrowed}
                  sx={{
                    width: '25%',
                    '&:hover': {
                      backgroundColor: '#0069d9'
                    }
                  }}>
                  Issue
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBorrow}
                  disabled={isBorrowed}
                  sx={{
                    width: '25%',
                    ml: 2,
                    '&:hover': {
                      backgroundColor: '#0069d9'
                    }
                  }}>
                  Borrow
                </Button>
              )
            ) : (
              <Button variant="contained" disabled sx={{ width: '25%', ml: 10 }} color="primary">
                Not Available
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Book
