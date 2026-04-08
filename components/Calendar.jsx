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

// Helper to calculate statistics for a specific range of days
const getSelectionStats = (start, end, notes) => {
  if (!start) return null

  const s = start.getTime()
  const e = (end || start).getTime()

  let total = 0
  let weekend = 0

  // Iterate over duration and pluck stats
  for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
    total++
    const day = d.getDay()
    if (day === 0 || day === 6) weekend++
  }

  // Check how many of our notes fall into this bucket
  const noteCount = notes.filter(n => {
    const ns = new Date(n.start).getTime()
    const ne = new Date(n.end).getTime()
    return Math.max(s, ns) <= Math.min(e, ne)
  }).length

  return { total, weekend, noteCount }
}

export default function Calendar() {
  const [viewDate, setViewDate] = useState(new Date())
  const [rangeStart, setRangeStart] = useState(null)
  const [rangeEnd, setRangeEnd] = useState(null)
  const [animating, setAnimating] = useState(false)

  const { notes, addNote, deleteNote, clearNotes, editNote } = useNotes()

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

  // Calculate live stats for the current range selection
  const stats = getSelectionStats(rangeStart, rangeEnd, notes)

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

  // Monthly vibe image selected from our preset map
  const headerPic = monthPictures[currentMonth] || monthPictures[0]

  return (
    <div className={`flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-800 transition-all duration-300 ${darkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      {/* SIDE PANEL: Cinematic Monthly Visual */}
      <div className="h-48 lg:h-auto lg:w-[35%] xl:w-[30%] shrink-0 relative overflow-hidden group">
        <img 
          src={`${headerPic}?auto=format&fit=crop&w=800&q=80`} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
          alt="monthly vibe"
        />
        {/* Multistage gradient for extra depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"/>
      </div>

      {/* MAIN CONTENT: Calendar & Interaction Section */}
      <div className={`p-4 sm:p-6 lg:p-8 flex-1 flex flex-col relative transition-all duration-300 ${animating ? 'opacity-30 blur-[1px] pointer-events-none' : 'opacity-100'}`}>
        
        {/* Transition blocker (prevents double-clicks during month switch) */}
        {animating && <div className="absolute inset-0 z-20 cursor-wait"/>}

        <CalendarHeader 
          currentDate={viewDate} 
          onPrev={movePrev} 
          onNext={moveNext} 
          isDark={darkTheme}
        />

        {/* Action Toolbar */}
        <div className="flex justify-between mb-6">
          <button 
            onClick={() => setViewDate(new Date())} 
            className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition text-xs text-white border border-white/5"
          >
            Today
          </button>
          <button 
            onClick={wipeMonthData} 
            className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition text-xs text-white border border-white/5"
          >
            Clear Month
          </button>
        </div>

        {/* Day Headings */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
          {DAYS.map(day => (
            <div key={day} className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-bold text-center uppercase tracking-widest px-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 grow">
          {calendarDays.map((day, idx) => (
            <DayCell
              key={idx}
              day={day}
              today={matchesCurrent && day === realTodayDate}
              selection={checkHighlight(day)}
              holiday={indianHolidays[`${currentMonth + 1}-${day}`]}
              onClick={() => selectDate(day)}
              isDark={darkTheme}
            />
          ))}
        </div>

        {/* Dynamic Analytics Tray */}
        {stats && (
          <div className="mt-4 flex gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <span>Selected: <span className="text-blue-500">{stats.total} days</span></span>
            <span>Weekend: <span className="text-blue-500">{stats.weekend}</span></span>
            <span>Notes: <span className="text-blue-500">{stats.noteCount}</span></span>
          </div>
        )}

        {/* Selected Date Context */}
        <div className="text-[10px] sm:text-xs mt-6 text-gray-400 dark:text-gray-500 font-medium">
          {rangeStart && `SCHEDULED: ${rangeStart.toLocaleDateString()} ${rangeEnd ? ' → '+rangeEnd.toLocaleDateString() : ''}`}
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
          onEditNote={editNote}
          isDark={darkTheme}
        />

      </div>

      <div className="hidden">
        {Object.values(monthPictures).map((src, idx) => (
          <img key={idx} src={`${src}?auto=format&fit=crop&w=800&q=80`} alt="" />
        ))}
      </div>
    </div>
  )
}
