export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate()
}

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay()
}

export const formatMonthYear = (date) => {
  return date.toLocaleString('default', { month: 'long', year: 'numeric' })
}

export const isToday = (year, month, day) => {
  const t = new Date()
  return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day
}
