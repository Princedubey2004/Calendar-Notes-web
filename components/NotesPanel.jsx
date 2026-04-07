'use client'

import { useState } from 'react'

export default function NotesPanel({ rangeStart, rangeEnd, notes, onAddNote, onDeleteNote }) {
  const [text, setText] = useState('')

  const formatDate = (d) => {
    if (!d) return ''
    return d.toLocaleDateString()
  }

  const hasSel = !!rangeStart
  const isRange = rangeStart && rangeEnd

  let label = 'No date selected'

  if (isRange) {
    label = `${formatDate(rangeStart)} - ${formatDate(rangeEnd)}`
  } else if (hasSel) {
    label = formatDate(rangeStart)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text.trim() || !hasSel) return

    onAddNote({
      text: text.trim(),
      start: rangeStart.toISOString(),
      end: (rangeEnd || rangeStart).toISOString()
    })

    setText('')
  }

  let list = []

  if (hasSel) {
    const s1 = rangeStart.getTime()
    const e1 = (rangeEnd || rangeStart).getTime()

    list = notes.filter(n => {
      const s2 = new Date(n.start).getTime()
      const e2 = new Date(n.end).getTime()

      return Math.max(s1, s2) <= Math.min(e1, e2)
    })
  }

  return (
    <div className="mt-4 pt-4 border-t">

      <h3 className="text-sm font-medium mb-3">
        Notes ({label})
      </h3>

      {hasSel ? (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">

          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="add note..."
            className="flex-1 border px-2 py-1 rounded text-sm"
          />

          <button className="bg-black text-white px-3 py-1 text-sm rounded">
            Add
          </button>

        </form>
      ) : (
        <p className="text-sm text-gray-500 mb-3">
          select a date first
        </p>
      )}

      {hasSel && list.length === 0 && (
        <p className="text-sm text-gray-400">no notes</p>
      )}

      <ul className="space-y-2 max-h-[150px] overflow-y-auto">
        {list.map(n => (
          <li key={n.id} className="border p-2 rounded text-sm flex justify-between">

            <span>{n.text}</span>

            <button
              onClick={() => onDeleteNote(n.id)}
              className="text-red-500"
            >
              x
            </button>

          </li>
        ))}
      </ul>

    </div>
  )
}