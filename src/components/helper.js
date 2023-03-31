export const calculateDueDate = (renewCount) => {
  const daysToAdd = renewCount === 0 ? 14 : 7
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + daysToAdd)
  return dueDate.toISOString()
}
