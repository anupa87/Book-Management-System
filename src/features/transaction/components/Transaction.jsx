import React from 'react'

import {
  Card,
  CardContent,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'

const Transaction = () => {
  return (
    <Card sx={{ maxWidth: 570, my: 6 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Transaction
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>2023-05-25</TableCell>
                <TableCell>Book Title</TableCell>
                <TableCell>Borrowed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default Transaction
