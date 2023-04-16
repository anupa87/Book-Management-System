import { Box, Typography } from '@mui/material'

import AddCards from '../components/admin/AddCards'

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h3" sx={{ my: 2 }}>
        Dashboard
      </Typography>
      <hr />
      <AddCards />
    </Box>
  )
}
export default Dashboard
