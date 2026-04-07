'use client'

// Individual box for each day in the month
export default function DayCell({ day, selection, onClick, holiday, today }) {
  
  // Return empty div if it's just padding for start of month
  if (!day) {
    return <div className="aspect-square" />
  }

  // Combine classes based on state
  let boxClasses = "aspect-square flex items-center justify-center text-xs sm:text-sm rounded cursor-pointer relative group transition"

  if (selection) {
    // Sheer glassy blue for active range
    boxClasses += " bg-blue-500/15 ring-1 ring-blue-400 text-blue-700 dark:text-blue-300"
  } else {
    // Subtle hover effect
    boxClasses += " hover:bg-white/10 text-gray-600 dark:text-gray-300"
  }

  return (
    <div className={boxClasses} onClick={onClick}>
      
      <span>{day}</span>

      {/* Blue dot for the current real-world date */}
      {today && (
        <div className="absolute bottom-1 w-1 h-1 bg-blue-400 rounded-full" />
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
