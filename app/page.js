'use client'

import { useState, useEffect } from 'react'
import Calendar from '@/components/Calendar'

export default function Home() {
  const hour = new Date().getHours()
  const isDark = hour > 18 || hour < 6

  return (
    <div className={`min-h-screen flex items-center justify-center p-3 sm:p-6 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <main className="w-full max-w-5xl">
        <Calendar />
      </main>
    </div>
  )
}

