const saveUser = (user) => {
  const users = getUsers()
  console.log('users before:', users)

  //check if the user already exists
  const existingUser = users.find((u) => u.id === user.id)
  if (existingUser) {
    Object.assign(existingUser, user) //update exisitng user
  } else {
    users.push(user)
  }
  localStorage.setItem('users', JSON.stringify(users))
  console.log('users after:', getUsers())
}

const getUsers = () => {
  const users = localStorage.getItem('users')
  return users ? JSON.parse(users) : []
}

export { saveUser, getUsers }
