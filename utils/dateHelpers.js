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

export const getHoliday = (month, day) => {
  // Fixed holiday dates
  if (month === 0 && day === 1) return 'New Year'
  if (month === 0 && day === 26) return 'Republic Day'
  if (month === 7 && day === 15) return 'Independence Day'
  if (month === 10 && day === 1) return 'Diwali' // Nov 1
  if (month === 11 && day === 25) return 'Christmas'
  return null
}
