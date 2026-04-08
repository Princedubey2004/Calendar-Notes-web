'use client'

import { useState, useEffect } from 'react'

export const useNotes = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('calendar_notes')
      if (saved) {
        setNotes(JSON.parse(saved))
      }
    } catch (err) {
      console.log('error loading notes')
    }
  }, [])

  const addNote = (data) => {
    const newItem = {
      id: crypto.randomUUID(),
      created: new Date().toISOString(),
      ...data
    }

    setNotes(prev => {
      const updated = [...prev, newItem]
      localStorage.setItem('calendar_notes', JSON.stringify(updated))
      return updated
    })
  }

  const deleteNote = (id) => {
    setNotes(prev => {
      const updated = prev.filter(n => n.id !== id)
      localStorage.setItem('calendar_notes', JSON.stringify(updated))
      return updated
    })
  }

  const clearNotes = (ids) => {
    setNotes(prev => {
      const updated = prev.filter(n => !ids.includes(n.id))
      localStorage.setItem('calendar_notes', JSON.stringify(updated))
      return updated
    })
  }

  const editNote = (id, newText) => {
    setNotes(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, text: newText } : n)
      localStorage.setItem('calendar_notes', JSON.stringify(updated))
      return updated
    })
  }

  return { notes, addNote, deleteNote, clearNotes, editNote }
}