'use client'

export default function CalendarHeader({ currentDate, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center mb-3">
      
      <h2 className="text-lg font-semibold">
        {currentDate.toLocaleString("default",{month:"long",year:"numeric"})}
      </h2>

      <div className="flex gap-2 text-xs sm:text-sm">
        <button onClick={onPrev} className="px-3 py-2 sm:px-2 sm:py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">←</button>
        <button onClick={onNext} className="px-3 py-2 sm:px-2 sm:py-1 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">→</button>
      </div>
    </div>
  )
}
