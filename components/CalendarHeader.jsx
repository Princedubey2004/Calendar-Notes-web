'use client'

export default function CalendarHeader({ currentDate, onPrev, onNext, isDark }) {
  return (
    <div className="flex justify-between items-center mb-6">
      
      <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
      </h2>

      <div className="flex gap-2">
        <button 
          onClick={onPrev} 
          className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 transition text-xs text-white"
        >
          ←
        </button>
        <button 
          onClick={onNext} 
          className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 transition text-xs text-white"
        >
          →
        </button>
      </div>
    </div>
  )
}
