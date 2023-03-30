// users data storage
import data from '../../public/data/data.json'

const saveUser = (user) => {
  const users = getUsers()
  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
}

const getUsers = () => {
  const users = localStorage.getItem('users')
  if (!users) {
    localStorage.setItem('users', JSON.stringify(data.users))
    return data.users
  }
  return users ? JSON.parse(users) : []
}

// books data storage
const saveBooks = (book) => {
  const books = getBooks()
  books.push(book)
  localStorage.setItem('books', JSON.stringify(books))
}

const getBooks = () => {
  const books = localStorage.getItem('books')
  if (!books) {
    localStorage.setItem('books', JSON.stringify(data.books))
    return data.books
  }
  return books ? JSON.parse(books) : []
}

export { saveUser, getUsers, saveBooks, getBooks }
