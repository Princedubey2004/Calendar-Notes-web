'use client'

import { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import DayCell from './DayCell'
import NotesPanel from './NotesPanel'
import { getDaysInMonth, getFirstDayOfMonth } from '@/utils/dateHelpers'
import { useNotes } from '@/hooks/useNotes'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Calendar() {
  const [activeMonthDate, setActiveMonthDate] = useState(new Date())
  const [selectionStart, setSelectionStart] = useState(null)
  const [selectionEnd, setSelectionEnd] = useState(null)
  const { notes, addNote, deleteNote } = useNotes()

  const year = activeMonthDate.getFullYear()
  const month = activeMonthDate.getMonth()

  const totalDays = getDaysInMonth(year, month)
  const startingDayOffset = getFirstDayOfMonth(year, month)

  // Fill initial empty slots for the month's offset
  const calendarGrid = Array(startingDayOffset).fill(null)
  for (let iter = 1; iter <= totalDays; iter++) {
    calendarGrid.push(iter)
  }

  const goToPrevious = () => {
    setActiveMonthDate(d => {
      const newD = new Date(d)
      newD.setMonth(newD.getMonth() - 1)
      return newD
    })
  }

  const goToNext = () => {
    setActiveMonthDate(d => {
      const newD = new Date(d)
      newD.setMonth(newD.getMonth() + 1)
      return newD
    })
  }

  const onDaySelect = (day) => {
    if (!day) return
    const clickedDateObj = new Date(year, month, day)

    // Handle the first click when starting a new selection
    if(!selectionStart){
      setSelectionStart(clickedDateObj)
      return
    }

    if(!selectionEnd){
      setSelectionEnd(clickedDateObj)
    } else {
      setSelectionStart(clickedDateObj)
      setSelectionEnd(null)
    }
  }

  const checkRange = (d) => {
    if(!selectionStart || !selectionEnd) return false

    if(d >= selectionStart && d <= selectionEnd){
      return true
    }

    return false
  }

  const getRangeVisualState = (day) => {
    if (!day) return null
    const dateObj = new Date(year, month, day)
    const current = dateObj.getTime()

    if (selectionStart && selectionEnd) {
      const lower = Math.min(selectionStart.getTime(), selectionEnd.getTime())
      const upper = Math.max(selectionStart.getTime(), selectionEnd.getTime())

      if (current === lower) return 'start'
      if (current === upper) return 'end'
      if (current > lower && current < upper) return 'middle'
    } else if (selectionStart && !selectionEnd) {
      if (current === selectionStart.getTime()) return 'start'
    }

    return null
  }

  return (
    <div className="w-full flex-1 flex flex-col">
      <CalendarHeader
        currentDate={activeMonthDate}
        onPrev={goToPrevious}
        onNext={goToNext}
      />

      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {calendarGrid.map((day, i) => (
          <DayCell
            key={i}
            day={day}
            month={month}
            year={year}
            selection={getRangeVisualState(day)}
            onClick={() => onDaySelect(day)}
          />
        ))}
      </div>

      <NotesPanel 
        rangeStart={selectionStart}
        rangeEnd={selectionEnd}
        notes={notes}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
      />
    </div>
  )
}
