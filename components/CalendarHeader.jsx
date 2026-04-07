'use client'

export default function CalendarHeader({ currentDate, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center mb-3">
      
      <h2 className="text-xl font-bold text-white drop-shadow-md">
        {currentDate.toLocaleString("default",{month:"long",year:"numeric"})}
      </h2>

      <div className="flex gap-2">
        <button onClick={onPrev} className="p-2 sm:px-3 sm:py-2 bg-white/10 hover:bg-white/20 active:scale-90 border border-white/20 text-white rounded-lg transition-all duration-200">←</button>
        <button onClick={onNext} className="p-2 sm:px-3 sm:py-2 bg-white/10 hover:bg-white/20 active:scale-90 border border-white/20 text-white rounded-lg transition-all duration-200">→</button>
      </div>
    </div>
  )
}
