import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Grid, Box, Typography, Card, CardContent, CardActions, Button, Link } from '@mui/material'

import heroImage from '../../public/assests/heroImage.jpg'
import Footer from '../components/Footer'
import Search from '../components/Search'

const Homepage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allBooks = useSelector((state) => state.books)
  const allUsers = useSelector((state) => state.users)
  const authUserId = useSelector((state) => state.auth.id)

  console.log({ allBooks })
  console.log({ allUsers })

  const handleUpdateBook = (book) => {
    // handle renew book logic
  }

  const handleDeleteBook = (bookId) => {
    // handle return book logic
  }

  const handleBorrowBook = (book) => {
    // handle borrow book logic
  }

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ position: 'relative' }}>
          <img
            src={heroImage}
            alt="Hero Image"
            style={{ width: '100%', height: '65vh', objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100vw',
              textAlign: 'center',
              backgroundColor: '#70334E',
              padding: 2
            }}>
            <Typography variant="h2" sx={{ mb: 1 }} color="#FFFFFF">
              Welcome to BookSphere
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2, underline: 'none' }}>
              <Typography variant="h6" gutterBottom>
                Opening: Monday - Friday ( 9:00 - 16:00)
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ mb: 2 }} color="#FFFFFF">
              <Link href="/login" color="#FFFFFF" underline="hover">
                Login
              </Link>{' '}
              |{' '}
              <Link href="/register" color="#FFFFFF" underline="hover">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Search />
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ my: 4 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4">Featured Books</Typography>
            <Button variant="outlined" color="primary">
              View All Books
            </Button>
          </Box>
          <hr />
          <Grid container spacing={2}>
            {allBooks.map((book) => (
              <Grid
                item
                key={book.id}
                xs={12}
                sm={6}
                md={4}
                sx={{
                  mt: 6
                }}>
                <Card sx={{ width: 500, height: 300 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {book.borrowerId === authUserId ? (
                      <>
                        <Button size="small" onClick={() => handleUpdateBook(book)}>
                          Renew
                        </Button>
                        <Button size="small" onClick={() => handleDeleteBook(book.id)}>
                          Return
                        </Button>
                      </>
                    ) : (
                      <Button size="small" onClick={() => handleBorrowBook(book)}>
                        Borrow
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 4,
              mb: '2'
            }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Upcoming Events
            </Typography>
            <Button variant="outlined" color="primary" sx={{ my: 2 }}>
              View All Events
            </Button>
          </Box>
          <hr />
          <Grid container spacing={2} sx={{ my: 4 }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Event 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut quam id elit maximus
                egestas. Morbi elementum turpis nec urna euismod, eget tempor velit fermentum. Duis
                vestibulum euismod vestibulum. Donec et consequat dolor. Aliquam vel enim non nunc
                mattis blandit. Proin ultricies blandit nulla, a rhoncus justo bibendum non.
              </Typography>
              <Button size="small">Learn More</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Event 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut quam id elit maximus
                egestas. Morbi elementum turpis nec urna euismod, eget tempor velit fermentum. Duis
                vestibulum euismod vestibulum. Donec et consequat dolor. Aliquam vel enim non nunc
                mattis blandit. Proin ultricies blandit nulla, a rhoncus justo bibendum non.
              </Typography>
              <Button size="small">Learn More</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Event 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut quam id elit maximus
                egestas. Morbi elementum turpis nec urna euismod, eget tempor velit fermentum. Duis
                vestibulum euismod vestibulum. Donec et consequat dolor. Aliquam vel enim non nunc
                mattis blandit. Proin ultricies blandit nulla, a rhoncus justo bibendum non.
              </Typography>
              <Button size="small">Learn More</Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: '#70334E',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Footer />
      </Grid>
    </Grid>
  )
}

export default Homepage
