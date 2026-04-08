'use client'

import { useState } from 'react'

/**
 * Panel to manage notes for selected dates.
 * Displays input field and a list of existing notes.
 */
export default function NotesPanel({ rangeStart, rangeEnd, notes, onAddNote, onDeleteNote, isDark, onEditNote }) {
  const [newNoteText, setNewNoteText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [tempEditText, setTempEditText] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    
    // Safety checks: need text and a selected date
    if (!newNoteText.trim() || !rangeStart) return

    onAddNote({
      text: newNoteText,
      start: rangeStart.toISOString(),
      end: (rangeEnd || rangeStart).toISOString()
    })
    
    // Reset after adding
    setNewNoteText('')
  }

  // Simple formatter for the date labels on notes
  const getNoteDateLabel = (start, end) => {
    const s = new Date(start)
    const e = new Date(end)
    const monthName = s.toLocaleDateString(undefined, { month: 'short' })
    
    // If it's just one day, don't show a range
    if (s.getTime() === e.getTime()) {
      return `${s.getDate()} ${monthName}`
    }
    return `${s.getDate()}-${e.getDate()} ${monthName}`
  }

  return (
    <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col gap-4">

      {/* Input section */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          className={`flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${
            isDark ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-gray-50 text-gray-900 placeholder-gray-400'
          }`}
          placeholder={rangeStart ? "What's happening?" : "Select a date first..."}
        />
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2 text-sm rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          Add
        </button>
      </form>

      {/* List of notes */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {notes.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500 italic">No notes for this month yet.</p>
          </div>
        ) : (
          notes.map(note => (
            <div 
              key={note.id} 
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-3 text-sm text-white flex justify-between items-start gap-3 transition-transform hover:scale-[1.01]"
            >
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase text-blue-400 block mb-0.5">
                  {getNoteDateLabel(note.start, note.end)}
                </span>
                
                {editingId === note.id ? (
                  <input
                    value={tempEditText}
                    onChange={e => setTempEditText(e.target.value)}
                    className="w-full bg-gray-700 text-white px-2 py-1 rounded outline-none border border-blue-500/50"
                    autoFocus
                  />
                ) : (
                  <p className="leading-relaxed opacity-90 break-words">
                    {note.text}
                  </p>
                )}
              </div>

              {/* Action buttons on the right */}
              <div className="flex gap-2 pt-1">
                {editingId === note.id ? (
                  <button
                    onClick={() => {
                      onEditNote(note.id, tempEditText)
                      setEditingId(null)
                    }}
                    className="text-[10px] uppercase font-bold text-green-400 hover:brightness-110"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(note.id)
                      setTempEditText(note.text)
                    }}
                    className="text-[10px] uppercase font-bold text-blue-400 hover:brightness-110"
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => onDeleteNote(note.id)} 
                  className="text-[10px] uppercase font-bold text-red-500 hover:brightness-110"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}