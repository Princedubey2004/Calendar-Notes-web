'use client'

export default function DayCell({ day, selection, onClick, holiday, today, isDark }) {
  
  if (!day) {
    return <div className="aspect-square" />
  }

  // Refined clean state
  let containerClasses = "rounded-lg flex items-center justify-center text-sm text-gray-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all cursor-pointer aspect-square"

  if (selection) {
    // Solid blue high-visibility selection
    containerClasses = "rounded-lg flex items-center justify-center text-sm bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 active:scale-95 transition cursor-pointer aspect-square z-10 scale-105"
  } else if (today) {
    // Distinct 'Today' highlight
    containerClasses += " ring-2 ring-blue-500/50 dark:ring-blue-400/30 text-blue-500 dark:text-blue-400 font-bold"
  }

  return (
    <div className={containerClasses} onClick={onClick}>
      
      <span>{day}</span>

      {/* Today indicator dot */}
      {today && (
        <div className="absolute bottom-1 w-1 h-1 bg-blue-400 rounded-full" />
      )}

      {/* Holiday Indicator */}
      {holiday && (
        <span className={`w-1.5 h-1.5 rounded-full ml-1 shrink-0 ${holiday.color} opacity-80`} />
      )}

      {/* Holiday Tooltip */}
      {holiday && (
        <div className="absolute bottom-full mb-1 hidden group-hover:block w-max max-w-[140px] bg-gray-900 text-white text-[10px] px-2 py-1.5 rounded-md z-50 shadow-xl border border-gray-800">
          {holiday.icon} {holiday.name}
        </div>
      )}

    </div>
  )
}
