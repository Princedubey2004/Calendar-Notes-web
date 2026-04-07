'use client'

import { useState } from 'react'

export default function NotesPanel({ rangeStart, rangeEnd, notes, onAddNote, onDeleteNote }) {
  const [inputText, setInputText] = useState('')

  const handlePostNote = (e) => {
    e.preventDefault()
    
    // Validate we have text and a date context
    if (!inputText.trim() || !rangeStart) return

    onAddNote({
      text: inputText,
      start: rangeStart.toISOString(),
      end: (rangeEnd || rangeStart).toISOString()
    })

    setInputText('')
  }

  return (
    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3 flex flex-col flex-1 min-h-0">

      {/* Entry form */}
      <form onSubmit={handlePostNote} className="flex gap-2 mb-3 shrink-0">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="New note..."
        />
        <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-1 text-sm rounded-lg font-medium">
          Add
        </button>
      </form>

      {/* List of active month notes */}
      <ul className="max-h-40 overflow-y-auto space-y-2 pr-1">
        {notes.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No notes for this month.</p>
        ) : (
          notes.map(note => (
            <li 
              key={note.id} 
              className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex justify-between items-start gap-2 shadow-sm"
            >
              <span className="break-all text-sm text-white/90">{note.text}</span>
              <button 
                onClick={() => onDeleteNote(note.id)} 
                className="text-gray-500 hover:text-red-400 transition text-sm px-1.5"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

    </div>
  )
}