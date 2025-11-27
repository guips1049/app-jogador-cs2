'use client'

import { useState, useEffect } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { Settings, Gamepad2, Brain, Target } from 'lucide-react'

interface UserData {
  name: string
  timePlaying: string
  skills: Record<string, number>
}

export default function Dashboard({ userData }: { userData: UserData }) {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const today = new Date().toDateString()
    const lastLogin = localStorage.getItem('lastLogin')
    const currentStreak = parseInt(localStorage.getItem('streak') || '0')

    if (lastLogin === today) {
      setStreak(currentStreak)
    } else {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      if (lastLogin === yesterday.toDateString()) {
        setStreak(currentStreak + 1)
      } else {
        setStreak(1)
      }
      localStorage.setItem('lastLogin', today)
      localStorage.setItem('streak', streak.toString())
    }
  }, [])

  const radarData = Object.entries(userData.skills).map(([skill, value]) => ({
    skill: skill.charAt(0).toUpperCase() + skill.slice(1),
    value
  }))

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">CS2 Pro</h1>
        </div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-2 text-blue-400">
            <Gamepad2 size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Settings size={20} />
            <span>Configurações</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Target size={20} />
            <span>Ascensão Pré-Game</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Brain size={20} />
            <span>Reset Mental</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Target size={20} />
            <span>Assistente Tático</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Pro Tático Performance</h1>
        
        {/* User Info */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl mb-2">Olá, {userData.name}!</h2>
          <div className="bg-gray-800 p-4 rounded-lg inline-block">
            <p>Tempo jogando: {userData.timePlaying}</p>
            <p>Check-in diário: {streak} dias</p>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="mb-8">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 4]} />
              <Radar name="Habilidades" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
            Ascensão Pré-Game
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold">
            Assistente Tático
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold">
            Reset Mental
          </button>
        </div>
      </div>
    </div>
  )
}