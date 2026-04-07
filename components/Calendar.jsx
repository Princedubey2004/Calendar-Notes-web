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
  const [animating, setAnimating] = useState(false)

  const { notes, addNote, deleteNote, clearNotes } = useNotes()

  const currentYear = viewDate.getFullYear()
  const currentMonth = viewDate.getMonth()

  const daysCount = getDaysInMonth(currentYear, currentMonth)
  const emptyBoxes = getFirstDayOfMonth(currentYear, currentMonth)

  // Auto-dark mode based on system time 
  const hour = new Date().getHours()
  const darkTheme = hour > 18 || hour < 6

  // Prepare the day list for the rendering grid
  let calendarDays = []
  for (let i = 0; i < emptyBoxes; i++) calendarDays.push(null)
  for (let i = 1; i <= daysCount; i++) calendarDays.push(i)

  const changeMonth = (offset) => {
    if (animating) return
    setAnimating(true)

    // Mid-transition swap (ensures the data change is masked by the animation)
    setTimeout(() => {
      const d = new Date(viewDate)
      d.setMonth(d.getMonth() + offset)
      setViewDate(d)
      
      setTimeout(() => {
        setAnimating(false)
      }, 150)
    }, 150)
  }

  const movePrev = () => changeMonth(-1)
  const moveNext = () => changeMonth(1)

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
    <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 min-h-[600px] flex flex-col">

      {/* FULL BACKGROUND IMAGE CAROUSEL */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={`${headerPic}?auto=format&fit=crop&w=1200&q=80`} 
          className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110 scale-105" 
          alt="background"
        />
        {/* Multi-layer readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/60 backdrop-blur-[1px]"/>
      </div>

      {/* INTERACTIVE CONTENT LAYER */}
      <div className={`relative z-10 p-4 sm:p-6 flex-1 flex flex-col transition-all duration-500 ease-in-out ${animating ? 'opacity-30 scale-98 blur-md pointer-events-none' : 'opacity-100 scale-100 blur-0'}`}>
        
        {/* Subtle switch overlay */}
        {animating && (
          <div className="absolute inset-0 z-20 bg-white/5 backdrop-blur-[2px] rounded-2xl"/>
        )}

        <CalendarHeader currentDate={viewDate} onPrev={movePrev} onNext={moveNext} />

        {/* Floating Quick Actions */}
        <div className="flex justify-between mb-4">
          <button 
            onClick={() => setViewDate(new Date())} 
            className="px-4 py-1.5 text-xs bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white rounded-lg backdrop-blur-md transition-all font-medium"
          >
            Today
          </button>
          <button 
            onClick={wipeMonthData} 
            className="px-4 py-1.5 text-xs bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white rounded-lg backdrop-blur-md transition-all font-medium"
          >
            Clear Month
          </button>
        </div>

        {/* Week Day Labels */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-[10px] sm:text-xs mb-3 text-white/60 font-bold uppercase tracking-widest text-center">
          {DAYS.map(dayName => <div key={dayName} className="drop-shadow-sm">{dayName}</div>)}
        </div>

        {/* The Glass Grid */}
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

        {/* Status Line */}
        <div className="text-[10px] sm:text-xs mt-4 text-white/50 italic font-medium tracking-wide drop-shadow-sm">
          {rangeStart && `Schedule: ${rangeStart.toLocaleDateString()} ${rangeEnd ? ' → '+rangeEnd.toLocaleDateString() : ''}`}
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

      {/* Image Preloader */}
      <div className="hidden">
        {Object.values(monthPictures).map((src, idx) => (
          <img key={idx} src={`${src}?auto=format&fit=crop&w=1200&q=80`} alt="" />
        ))}
      </div>
    </div>
  )
}
