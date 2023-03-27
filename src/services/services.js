// users data storage
const saveUser = (user) => {
  const users = getUsers()
  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
}

const getUsers = () => {
  const users = localStorage.getItem('users')
  return users ? JSON.parse(users) : []
}

// authors data storage

const saveAuthor = (author) => {
  const authors = getAuthors()
  authors.push(author)
  localStorage.setItem('authors', JSON.stringify(authors))
}

const getAuthors = () => {
  const authors = localStorage.getItem('authors')
  return authors ? JSON.parse(authors) : []
}

// books data storage
const saveBooks = (book) => {
  const books = getBooks()
  books.push(book)
  localStorage.setItem('books', JSON.stringify(books))
}

const getBooks = () => {
  const books = localStorage.getItem('books')
  return books ? JSON.parse(books) : []
}

export { saveUser, getUsers, saveAuthor, getAuthors, saveBooks, getBooks }
