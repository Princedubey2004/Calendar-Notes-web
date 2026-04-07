'use client'

import { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import DayCell from './DayCell'
import NotesPanel from './NotesPanel'
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils/dateHelpers'
import { useNotes } from '@/hooks/useNotes'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// This maps each month to a cool Unsplash photo
const monthPictures = {
  0: "https://images.unsplash.com/photo-1457269449834-928af64c684d", // Jan
  1: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", // Feb
  2: "https://images.unsplash.com/photo-1587049352846-4a222e784d38", // Mar
  3: "https://images.unsplash.com/photo-1490750967868-88aa4486c946", // Apr
  4: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", // May
  5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Jun
  6: "https://images.unsplash.com/photo-1502082553048-f009c37129b9", // Jul
  7: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da", // Aug
  8: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Sep
  9: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e", // Oct
  10: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da", // Nov
  11: "https://images.unsplash.com/photo-1543589077-47d81606c1bf", // Dec
}

const indianHolidays = {
  "1-1": { name: "New Year", icon: "🎉", color: "bg-blue-500" },
  "1-26": { name: "Republic Day", icon: "🇮🇳", color: "bg-green-500" },
  "3-8": { name: "Holi", icon: "🎨", color: "bg-pink-500" },
  "8-15": { name: "Independence Day", icon: "🇮🇳", color: "bg-green-600" },
  "11-1": { name: "Diwali", icon: "🪔", color: "bg-yellow-500" },
  "12-25": { name: "Christmas", icon: "🎄", color: "bg-red-500" }
}

export default function Calendar() {
  const [viewDate, setViewDate] = useState(new Date())
  const [rangeStart, setRangeStart] = useState(null)
  const [rangeEnd, setRangeEnd] = useState(null)

  const { notes, addNote, deleteNote, clearNotes } = useNotes()

  const currentYear = viewDate.getFullYear()
  const currentMonth = viewDate.getMonth()

  const daysCount = getDaysInMonth(currentYear, currentMonth)
  const emptyBoxes = getFirstDayOfMonth(currentYear, currentMonth)

  // Auto-dark mode if it's evening
  const hour = new Date().getHours()
  const darkTheme = hour > 18 || hour < 6

  // Prepare the day list for the grid
  let calendarDays = []
  for (let i = 0; i < emptyBoxes; i++) calendarDays.push(null)
  for (let i = 1; i <= daysCount; i++) calendarDays.push(i)

  const movePrev = () => {
    const d = new Date(viewDate)
    d.setMonth(d.getMonth() - 1)
    setViewDate(d)
  }

  const moveNext = () => {
    const d = new Date(viewDate)
    d.setMonth(d.getMonth() + 1)
    setViewDate(d)
  }

  const selectDate = (dayNum) => {
    if (!dayNum) return
    const target = new Date(currentYear, currentMonth, dayNum)

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(target)
      setRangeEnd(null)
    } else {
      setRangeEnd(target)
    }
  }

  const checkHighlight = (day) => {
    if (!day) return false
    const d = new Date(currentYear, currentMonth, day)

    if (rangeStart && !rangeEnd) {
      return d.getTime() === rangeStart.getTime()
    }

    if (rangeStart && rangeEnd) {
      return d >= rangeStart && d <= rangeEnd
    }

    return false
  }

  const wipeMonthData = () => {
    setRangeStart(null)
    setRangeEnd(null)
    
    // Find notes for this specific month and year
    const notesToPurge = notes
      .filter(n => {
        const d = new Date(n.start)
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth
      })
      .map(n => n.id)
    clearNotes(notesToPurge)
  }

  const todayObj = new Date()
  const matchesCurrent = todayObj.getFullYear() === currentYear && todayObj.getMonth() === currentMonth
  const realTodayDate = todayObj.getDate()

  const headerPic = monthPictures[currentMonth] || monthPictures[0]

  return (
    <div className={`flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-lg backdrop-blur-md transition-all duration-300 ${darkTheme ? 'bg-gray-900 text-white' : 'bg-white'}`}>

      {/* Picture Banner */}
      <div className="h-44 relative lg:h-auto lg:w-1/3 xl:w-2/5 shrink-0 overflow-hidden">
        <img 
          src={`${headerPic}?auto=format&fit=crop&w=800&q=80`} 
          className="w-full h-full object-cover lg:absolute lg:inset-0 transition-transform duration-700 hover:scale-105" 
          alt="nature"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
      </div>

      <div className="p-3 sm:p-5 lg:p-6 flex-1 min-w-0 flex flex-col">

        <CalendarHeader currentDate={viewDate} onPrev={movePrev} onNext={moveNext} />

        {/* Buttons for navigation / clearing */}
        <div className="flex justify-between mb-3">
          <button 
            onClick={() => setViewDate(new Date())} 
            className="px-3 py-1 text-xs bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
          >
            Today
          </button>
          <button 
            onClick={wipeMonthData} 
            className="px-3 py-1 text-xs bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
          >
            Clear Month
          </button>
        </div>

        {/* Week headings */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-xs mb-2 text-gray-400 font-medium">
          {DAYS.map(dayName => <div key={dayName} className="text-center">{dayName}</div>)}
        </div>

        {/* The day cells */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {calendarDays.map((day, idx) => (
            <DayCell
              key={idx}
              day={day}
              today={matchesCurrent && day === realTodayDate}
              selection={checkHighlight(day)}
              holiday={indianHolidays[`${currentMonth + 1}-${day}`]}
              onClick={() => selectDate(day)}
            />
          ))}
        </div>

        {/* Selection subtext */}
        <div className="text-xs mt-3 text-gray-500 italic">
          {rangeStart && `Plan: ${rangeStart.toDateString()} ${rangeEnd ? ' to '+rangeEnd.toDateString() : ''}`}
        </div>

        <NotesPanel
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          notes={notes.filter(n => {
            const d = new Date(n.start)
            return d.getFullYear() === currentYear && d.getMonth() === currentMonth
          })}
          onAddNote={addNote}
          onDeleteNote={deleteNote}
        />

      </div>

      {/* Behind the scenes image pre-loader */}
      <div className="hidden">
        {Object.values(monthPictures).map((src, idx) => (
          <img key={idx} src={`${src}?auto=format&fit=crop&w=800&q=80`} alt="" fetchPriority="low" />
        ))}
      </div>
    </div>
  )
}
