import { useState } from 'react'
import events from './constant/events'
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material'

const Events = () => {
  const [showAllEvents, setShowAllEvents] = useState(false)

  const toggleShowAllEvents = () => {
    setShowAllEvents(!showAllEvents)
  }

  const displayedEvents = showAllEvents ? events : events.slice(0, 3)
  return (
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
        <Button variant="outlined" color="primary" sx={{ my: 2 }} onClick={toggleShowAllEvents}>
          {showAllEvents ? 'Show Less' : 'View All Events'}
        </Button>
      </Box>
      <hr />
      {displayedEvents.map((event) => (
        <Box key={event.id} sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="body2">{event.description}</Typography>
          <Button size="small">Learn More</Button>
        </Box>
      ))}
    </Box>
  )
}

export default Events
