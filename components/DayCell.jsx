'use client'

// Individual box for each day in the month
export default function DayCell({ day, selection, onClick, holiday, today }) {
  
  // Return empty div if it's just padding for start of month
  if (!day) {
    return <div className="aspect-square" />
  }

  // Glassmorphism classes based on state
  let boxClasses = "aspect-square flex items-center justify-center text-xs sm:text-sm rounded-lg cursor-pointer relative group transition-all duration-200 hover:scale-110 active:scale-90 z-0 hover:z-10 backdrop-blur-sm shadow-sm"

  if (selection) {
    // High-visibility 'solid' glass highlight for selection
    boxClasses += " bg-white/30 ring-2 ring-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"
  } else {
    // Subtle frosted glass for unselected cells
    boxClasses += " bg-black/10 dark:bg-white/5 hover:bg-white/15 text-white font-medium drop-shadow-sm"
  }

  return (
    <div className={boxClasses} onClick={onClick}>
      
      <span className="drop-shadow-md">{day}</span>

      {/* Blue dot today indicator with pulse and glow */}
      {today && (
        <div className="absolute bottom-1.5 w-1 h-1 bg-blue-300 rounded-full animate-pulse shadow-[0_0_10px_rgba(147,197,253,1)]" />
      )}

      {/* Little dot if it's a designated holiday */}
      {holiday && (
        <span className={`w-1.5 h-1.5 rounded-full ml-1 shrink-0 ${holiday.color}`} />
      )}

      {/* hover tooltip for holiday info */}
      {holiday && (
        <div className="absolute bottom-full mb-1 hidden group-hover:block w-max max-w-[120px] bg-black text-white text-[10px] px-2 py-1 rounded z-50 shadow-md">
          {holiday.icon} {holiday.name}
        </div>
      )}

    </div>
  )
}
