'use client'

import { useState, useEffect } from 'react'
import Quiz from '@/components/quiz'
import Dashboard from '@/components/dashboard'
import { calculateSkills } from '@/utils/calculateSkills'

export default function Home() {
  const [userData, setUserData] = useState<any>(null)
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('userData')
    if (stored) {
      setUserData(JSON.parse(stored))
      setHasCompletedQuiz(true)
    }
  }, [])

  const handleQuizComplete = (answers: string[]) => {
    const data = calculateSkills(answers)
    localStorage.setItem('userData', JSON.stringify(data))
    setUserData(data)
    setHasCompletedQuiz(true)
  }

  if (!hasCompletedQuiz) {
    return <Quiz onComplete={handleQuizComplete} />
  }

  return <Dashboard userData={userData} />
}