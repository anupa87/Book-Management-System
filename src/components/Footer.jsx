import { Box, Typography, Link } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import { Padding } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#70334E',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        Padding: '2rem'
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Opening Hours : Monday - Friday ( 9am - 5pm)
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
          <Typography variant="body1" gutterBottom>
            123 Main Street, Anytown, USA
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
            Follow Us :
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
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
