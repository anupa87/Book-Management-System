import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material'
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material'

const BookSingle = ({ title, description, imageURL, author, publishedYear }) => {
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
  }

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader title={title} />
      <CardMedia component="img" height="400" image={imageURL} alt={title} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            {author}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Published: {publishedYear}
          </Typography>
          <IconButton onClick={handleLike} aria-label="like">
            {liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default BookSingle
