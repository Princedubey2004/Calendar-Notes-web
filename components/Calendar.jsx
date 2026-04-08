'use client'

import { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import DayCell from './DayCell'
import NotesPanel from './NotesPanel'
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils/dateHelpers'
import { useNotes } from '@/hooks/useNotes'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Just some nice pics for each month to make it look less boring
const monthPictures = {
  0: "https://images.unsplash.com/photo-1457269449834-928af64c684d", // Jan (Snowy vibes)
  1: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", // Feb
  2: "https://images.unsplash.com/photo-1587049352846-4a222e784d38", // Mar
  3: "https://images.unsplash.com/photo-1490750967868-88aa4486c946", // Apr (Spring!)
  4: "https://images.unsplash.com/photo-1469474968028-56623f02e42e", // May
  5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // Jun
  6: "https://images.unsplash.com/photo-1502082553048-f009c37129b9", // Jul
  7: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da", // Aug
  8: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Sep
  9: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e", // Oct
  10: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da", // Nov
  11: "https://images.unsplash.com/photo-1543589077-47d81606c1bf", // Dec
}

// Added Indian holidays as requested - might need to double check dates for next year 
const indianHolidays = {
  "1-26": { name: "Republic Day", icon: "🇮🇳", color: "bg-orange-500" },
  "3-3": { name: "Holi", icon: "🎨", color: "bg-pink-500" },
  "3-20": { name: "Eid al-Fitr", icon: "🌙", color: "bg-emerald-500" },
  "4-14": { name: "Ambedkar Jayanti", icon: "⚖️", color: "bg-blue-600" },
  "8-15": { name: "Independence Day", icon: "🇮🇳", color: "bg-orange-600" },
  "10-2": { name: "Gandhi Jayanti", icon: "👓", color: "bg-gray-500" },
  "10-20": { name: "Dussehra", icon: "🏹", color: "bg-red-600" },
  "11-8": { name: "Diwali", icon: "🪔", color: "bg-yellow-500" },
  "12-25": { name: "Christmas", icon: "🎄", color: "bg-red-500" }
}

// Helper to grab some stats when user selects a range 
const calculateSelectionInfo = (start, end, notesList) => {
  if (!start) return null

  const startTime = start.getTime()
  const endTime = (end || start).getTime()

  let totalDays = 0
  let weekendDays = 0

  // Standard loop to check each day in the range
  for (let current = new Date(startTime); current <= endTime; current.setDate(current.getDate() + 1)) {
    totalDays++
    const dayOfWeek = current.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) weekendDays++
  }

  // Filter notes that overlap with our selection
  const matchingNotes = notesList.filter(note => {
    const noteStart = new Date(note.start).getTime()
    const noteEnd = new Date(note.end).getTime()
    // Overlap logic: max(start) <= min(end)
    return Math.max(startTime, noteStart) <= Math.min(endTime, noteEnd)
  }).length

  return { totalDays, weekendDays, noteCount: matchingNotes }
}

export default function Calendar() {
  const [viewDate, setViewDate] = useState(new Date())
  const [selectionStart, setSelectionStart] = useState(null)
  const [selectionEnd, setSelectionEnd] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const { notes, addNote, deleteNote, clearNotes, editNote } = useNotes()

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const totalDaysInMonth = getDaysInMonth(year, month)
  const startOffset = getFirstDayOfMonth(year, month)

  // Simple check for dark mode based on time 
  // NOTE: might want to let user toggle this manually later
  const currentHour = new Date().getHours()
  const isDark = currentHour > 18 || currentHour < 6

  // Build the grid array (padding with nulls for empty start slots)
  let gridItems = []
  for (let i = 0; i < startOffset; i++) gridItems.push(null)
  for (let i = 1; i <= totalDaysInMonth; i++) gridItems.push(i)

  const handleMonthChange = (direction) => {
    if (isAnimating) return
    setIsAnimating(true)

    // Wait a bit for the animation to start before swapping data
    setTimeout(() => {
      const nextDate = new Date(viewDate)
      nextDate.setMonth(nextDate.getMonth() + direction)
      setViewDate(nextDate)
      
      setTimeout(() => {
        setIsAnimating(false)
      }, 150)
    }, 150)
  }

  const onDateClick = (day) => {
    if (!day) return
    const clickedDate = new Date(year, month, day)

    // Standard range selection logic: 
    // If nothing selected or range already complete, start fresh. 
    // Otherwise, set the end date.
    if (!selectionStart || (selectionStart && selectionEnd)) {
      setSelectionStart(clickedDate)
      setSelectionEnd(null)
    } else {
      setSelectionEnd(clickedDate)
    }
  }

  // Live stats for whatever the user has highlighted
  const selectionInfo = calculateSelectionInfo(selectionStart, selectionEnd, notes)

  const isDaySelected = (day) => {
    if (!day) return false
    const d = new Date(year, month, day)

    if (selectionStart && !selectionEnd) {
      return d.getTime() === selectionStart.getTime()
    }

    if (selectionStart && selectionEnd) {
      return d >= selectionStart && d <= selectionEnd
    }

    return false
  }

  const handleClearMonth = () => {
    setSelectionStart(null)
    setSelectionEnd(null)
    
    // Purge only notes from the current month view
    const idsToClear = notes
      .filter(n => {
        const d = new Date(n.start)
        return d.getFullYear() === year && d.getMonth() === month
      })
      .map(n => n.id)
    clearNotes(idsToClear)
  }

  const today = new Date()
  const isCurrentMonthView = today.getFullYear() === year && today.getMonth() === month
  const todayDateNum = today.getDate()

  const currentImage = monthPictures[month] || monthPictures[0]

  return (
    <div className={`flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      {/* Left side: Month Vibe Image */}
      <div className="h-48 lg:h-auto lg:w-[35%] xl:w-[30%] shrink-0 relative overflow-hidden group">
        <img 
          src={`${currentImage}?auto=format&fit=crop&w=800&q=80`} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
          alt="Month background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"/>
      </div>

      {/* Right side: The actual calendar */}
      <div className={`p-5 sm:p-7 flex-1 flex flex-col relative transition-all duration-300 ${isAnimating ? 'opacity-30 blur-sm pointer-events-none' : 'opacity-100'}`}>
        
        {isAnimating && <div className="absolute inset-0 z-30 cursor-wait"/>}

        <CalendarHeader 
          currentDate={viewDate} 
          onPrev={() => handleMonthChange(-1)} 
          onNext={() => handleMonthChange(1)} 
          isDark={isDark}
        />

        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-6">
          {/* Today Button - Primary */}
          <button
            onClick={() => setViewDate(new Date())}
            className="
              px-4 py-2 rounded-lg
              bg-blue-600/90 text-white
              text-sm font-medium
              shadow-sm
              hover:bg-blue-500
              active:scale-[0.97]
              transition-all duration-150
            "
          >
            Today
          </button>

          {/* Clear Month - Secondary */}
          <button
            onClick={handleClearMonth}
            className="
              px-4 py-2 rounded-lg
              bg-slate-700/40 text-slate-300
              text-sm font-medium
              border border-slate-600/40
              hover:bg-slate-700/70 hover:text-white
              active:scale-[0.97]
              transition-all duration-150
            "
          >
            Clear Month
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {DAYS.map(d => (
            <div key={d} className="text-[10px] text-gray-400 font-bold text-center uppercase tracking-tighter">
              {d}
            </div>
          ))}
        </div>

        {/* Grid of days */}
        <div className="grid grid-cols-7 gap-2 grow">
          {gridItems.map((day, idx) => (
            <DayCell
              key={idx}
              day={day}
              today={isCurrentMonthView && day === todayDateNum}
              selection={isDaySelected(day)}
              holiday={indianHolidays[`${month + 1}-${day}`]}
              onClick={() => onDateClick(day)}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Selection Stats */}
        {selectionInfo && (
          <div className="mt-5 flex gap-5 text-[10px] font-bold text-gray-400 uppercase">
            <span>Selected: <span className="text-blue-500">{selectionInfo.totalDays} days</span></span>
            <span>Weekend: <span className="text-blue-500">{selectionInfo.weekendDays}</span></span>
            <span>Notes: <span className="text-blue-500">{selectionInfo.noteCount} items</span></span>
          </div>
        )}

        {/* Date tracker */}
        <div className="text-[10px] mt-6 text-gray-400 font-medium">
          {selectionStart && `DATE: ${selectionStart.toLocaleDateString()} ${selectionEnd ? ' — '+selectionEnd.toLocaleDateString() : ''}`}
        </div>

        {/* Notes list component */}
        <NotesPanel
          rangeStart={selectionStart}
          rangeEnd={selectionEnd}
          notes={notes.filter(n => {
            const d = new Date(n.start)
            return d.getFullYear() === year && d.getMonth() === month
          })}
          onAddNote={addNote}
          onDeleteNote={deleteNote}
          onEditNote={editNote}
          isDark={isDark}
        />

      </div>

      {/* Preload images for snappier experience */}
      <div className="hidden">
        {Object.values(monthPictures).map((url, i) => (
          <img key={i} src={`${url}?auto=format&fit=crop&w=800&q=80`} alt="" />
        ))}
      </div>
    </div>
  )
}

