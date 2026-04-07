'use client'

import { formatMonthYear } from '@/utils/dateHelpers'

export default function CalendarHeader({ currentDate, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between mb-6 px-1">
      <h2 className="text-lg font-bold text-gray-900 tracking-tight">
        {formatMonthYear(currentDate)}
      </h2>

      <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg p-0.5">
        <button
          onClick={onPrev}
          className="p-1.5 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-all text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={onNext}
          className="p-1.5 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-all text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
