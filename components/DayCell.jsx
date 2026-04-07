'use client'

import { isToday } from '@/utils/dateHelpers'

export default function DayCell({ day, month, year, selection, onClick }) {
  if (!day) return <div className="aspect-square" />

  const today = isToday(year, month, day)
  const isStart = selection === 'start'
  const isEnd = selection === 'end'
  const inRange = selection === 'middle'
  const isSelected = isStart || isEnd

  let wrapClass = 'py-0.5 '
  if (isStart && !isEnd) wrapClass += 'bg-blue-50/60 rounded-l-2xl pl-0.5'
  if (isEnd && !isStart) wrapClass += 'bg-blue-50/60 rounded-r-2xl pr-0.5'
  if (inRange) wrapClass += 'bg-blue-50/60'

  let textClass = 'relative aspect-square flex flex-col items-center justify-center text-sm cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] '

  if (isSelected) {
    textClass += 'bg-blue-600 text-white font-medium rounded-2xl shadow-md shadow-blue-500/20 scale-105 z-10'
  } else if (inRange) {
    textClass += 'text-blue-800 font-medium'
  } else {
    textClass += 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-2xl'
  }

  return (
    <div className={wrapClass}>
      <div className={textClass} onClick={onClick}>
        <span>{day}</span>
        {today && !isSelected && (
          <div className="absolute bottom-1.5 w-1 h-1 bg-blue-500 rounded-full" />
        )}
      </div>
    </div>
  )
}
