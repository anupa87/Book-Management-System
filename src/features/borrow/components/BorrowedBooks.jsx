import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Typography } from '@mui/material'
import moment from 'moment'

import { updateCurrentUserBorrowedBooks } from '../../auth/slices/authSlice'

const BorrowedBooks = () => {
  const dispatch = useDispatch()
  const { books, borrowedBooks } = useSelector((state) => state.books.books)

  const date = moment().format('Do MMMM YYYY')
  const time = moment().format('h:mm A')
  const day = moment().format('dddd')

  useEffect(() => {
    dispatch(
      updateCurrentUserBorrowedBooks([
        {
          ISBN: '978-0-571-29831-6',
          bookId: '1',
          borrowDate: '2023-04-17',
          returnDate: '2023-05-01',
          returned: false
        },
        {
          ISBN: '978-0-345-47618-4',
          bookId: '3',
          borrowDate: '2023-04-17',
          returnDate: '2023-05-01',
          returned: false
        }
      ])
    )
  }, [dispatch])

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6">Borrowed Books</Typography>
      {!borrowedBooks || borrowedBooks.length === 0 ? (
        <Typography>You have no borrowed books.</Typography>
      ) : (
        borrowedBooks.map((book) => (
          <Box key={book.ISBN} sx={{ mt: 2 }}>
            <img
              src={books.find((b) => b.ISBN === book.ISBN).image}
              alt={books.find((b) => b.ISBN === book.ISBN).title}
            />
            <Typography variant="h6">{books.find((b) => b.ISBN === book.ISBN).title}</Typography>
            <Typography>{books.find((b) => b.ISBN === book.ISBN).description}</Typography>
            <Typography>
              Borrowed Date: {moment(book.borrowDate).format('Do MMMM YYYY')} | Return Date:{' '}
              {moment(book.returnDate).format('Do MMMM YYYY')}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  )
}

export default BorrowedBooks
