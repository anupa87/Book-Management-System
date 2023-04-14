import { Box, Typography, Link } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#70334E',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4
      }}>
      <Box
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <Typography variant="body1" gutterBottom>
            Ladugatan 18B
          </Typography>
          <Typography variant="body1" gutterBottom>
            70226, Heslinki
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: info@booksphere.fi
          </Typography>
          <Typography variant="body1" gutterBottom>
            Phone: (358) 456-7890
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ mr: 1 }}>
              <FacebookIcon />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ mr: 1 }}>
              <TwitterIcon />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ mr: 1 }}>
              <InstagramIcon />
            </Link>
          </Box>
          <Box sx={{ mt: 4, borderTop: '1px solid white', paddingTop: 2 }}>
            <Typography variant="body2" align="center">
              &copy;{' '}
              <Link
                href="https://portfolio-website-lhr8bzbr9-anupa87.vercel.app/"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="hover">
                {' '}
                anupa2023
              </Link>{' '}
              | &copy;{' '}
              <Link
                href="https://unsplash.com"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="hover">
                Image unsplash
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
