'use client'

import { useState } from 'react'

export default function NotesPanel({ rangeStart, rangeEnd, notes, onAddNote, onDeleteNote, isDark, onEditNote }) {
  const [inputText, setInputText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const handlePostNote = (e) => {
    e.preventDefault()
    if (!inputText.trim() || !rangeStart) return

    onAddNote({
      text: inputText,
      start: rangeStart.toISOString(),
      end: (rangeEnd || rangeStart).toISOString()
    })
    setInputText('')
  }

  const formatDateLabel = (start, end) => {
    const s = new Date(start)
    const e = new Date(end)
    const month = s.toLocaleDateString(undefined, { month: 'short' })
    return s.getTime() === e.getTime() 
      ? `${s.getDate()} ${month}`
      : `${s.getDate()}-${e.getDate()} ${month}`
  }

  return (
    <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col gap-4">

      {/* Input Form */}
      <form onSubmit={handlePostNote} className="flex gap-2 shrink-0">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={`flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
            isDark ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-gray-50 text-gray-900 placeholder-gray-400'
          }`}
          placeholder="Type a note and press Add..."
        />
        <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2 text-sm rounded-xl font-bold transition-all">
          Add
        </button>
      </form>

      {/* Notes List */}
      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic text-center py-4">No notes scheduled for this month.</p>
        ) : (
          notes.map(note => (
            <div 
              key={note.id} 
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white flex justify-between items-start gap-4 transition-all hover:scale-[1.01] transition-transform"
            >
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  {formatDateLabel(note.start, note.end)}
                </span>
                
                {editingId === note.id ? (
                  <input
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="w-full bg-gray-700 text-white px-2 py-1 rounded outline-none border border-blue-500/50"
                    autoFocus
                  />
                ) : (
                  <p className="leading-relaxed break-keep truncate sm:whitespace-normal">
                    {note.text}
                  </p>
                )}
              </div>

              <div className="flex gap-2 shrink-0 pt-0.5">
                {editingId === note.id ? (
                  <button
                    onClick={() => {
                      onEditNote(note.id, editText)
                      setEditingId(null)
                    }}
                    className="text-[10px] uppercase font-bold text-green-400 hover:text-green-300 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(note.id)
                      setEditText(note.text)
                    }}
                    className="text-[10px] uppercase font-bold text-blue-400 hover:text-blue-300 transition"
                  >
                    Edit
                  </button>
                )}
                <button 
                  onClick={() => onDeleteNote(note.id)} 
                  className="text-[10px] uppercase font-bold text-red-500 hover:text-red-400 transition"
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