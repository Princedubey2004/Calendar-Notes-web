'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to manage calendar notes with localStorage persistence.
 */
export const useNotes = () => {
  const [notes, setNotes] = useState([])

  // Load notes from storage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('calendar_app_notes')
      if (savedData) {
        setNotes(JSON.parse(savedData))
      }
    } catch (err) {
      console.error('Failed to load notes from localStorage:', err)
      // fallback to empty array if something is corrupted
      setNotes([])
    }
  }, [])

  // Helper to sync state to localStorage
  const persistNotes = (updatedList) => {
    try {
      localStorage.setItem('calendar_app_notes', JSON.stringify(updatedList))
    } catch (err) {
      console.error('Failed to save notes:', err)
    }
  }

  const addNote = (noteContent) => {
    const newNote = {
      id: Date.now() + Math.random().toString(36).substring(2, 9), // simple unique id
      timestamp: new Date().toISOString(),
      ...noteContent
    }

    setNotes(currentNotes => {
      const newList = [...currentNotes, newNote]
      persistNotes(newList)
      return newList
    })
  }

  const deleteNote = (noteId) => {
    setNotes(currentNotes => {
      const newList = currentNotes.filter(n => n.id !== noteId)
      persistNotes(newList)
      return newList
    })
  }

  const clearNotes = (idsToClear) => {
    setNotes(currentNotes => {
      const newList = currentNotes.filter(n => !idsToClear.includes(n.id))
      persistNotes(newList)
      return newList
    })
  }

  const editNote = (noteId, updatedText) => {
    setNotes(currentNotes => {
      const newList = currentNotes.map(n => 
        n.id === noteId ? { ...n, text: updatedText } : n
      )
      persistNotes(newList)
      return newList
    })
  }

  return { 
    notes, 
    addNote, 
    deleteNote, 
    clearNotes, 
    editNote 
  }
}