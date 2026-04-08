'use client'

/**
 * Individual day cell for the calendar grid.
 * Handles today's highlight, selection state, and holiday markers.
 */
export default function DayCell({ day, selection, onClick, holiday, today, isDark }) {
  
  if (!day) {
    // Empty slot for days from previous/next month in the grid
    return <div className="aspect-square" />
  }

  // Base styles for a normal day
  let classes = "relative group rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer aspect-square text-sm "

  if (selection) {
    // When the user has clicked/highlighted this day
    classes += "bg-blue-600 text-white font-medium shadow-md z-10 scale-105"
  } else {
    // Default look
    classes += "text-gray-300 hover:bg-gray-800/40 hover:scale-105"
    if (today) {
      // Special ring for the current day
      classes += " ring-2 ring-blue-500/40 text-blue-400 font-bold"
    }
  }

  return (
    <div className={classes} onClick={onClick}>
      
      <span className="z-10">{day}</span>

      {/* Blue dot at the bottom if it's today */}
      {today && (
        <div className="absolute bottom-2 w-1.5 h-1.5 bg-blue-400 rounded-full" />
      )}

      {/* Small pulsing dot in the corner for holidays */}
      {holiday && (
        <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${holiday.color} animate-pulse`} />
      )}

      {/* Show holiday name on hover */}
      {holiday && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-[10px] px-2 py-1 rounded-md z-50 whitespace-nowrap shadow-lg border border-white/10 flex items-center gap-1.5">
          <span>{holiday.icon}</span>
          <span className="font-semibold">{holiday.name}</span>
          {/* Small triangle arrow at the bottom of tooltip */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-t-black/90" />
        </div>
      )}

    </div>
  )
}

