export function currentDate () {
  const date = new Date()
  return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
}

export function currentDay () {
  const date = new Date()
  return date.getDate()
}
