'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft } from 'lucide-react'

const maps = ['Mirage', 'Dust2', 'Inferno', 'Ancient', 'Anubis', 'Vertigo', 'Nuke', 'Overpass']

export default function AssistenteTatico() {
  const [selectedMap, setSelectedMap] = useState('')
  const [consideration, setConsideration] = useState('')
  const [history, setHistory] = useState<Record<string, string[]>>({})
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('tacticalHistory')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  const saveConsideration = () => {
    if (!selectedMap || !consideration.trim()) return

    const newHistory = {
      ...history,
      [selectedMap]: [...(history[selectedMap] || []), consideration.trim()]
    }
    setHistory(newHistory)
    localStorage.setItem('tacticalHistory', JSON.stringify(newHistory))
    setConsideration('')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={() => router.push('/')} className="mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">Assistente Tático</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Adicionar Consideração</h2>
            
            <div className="mb-4">
              <label className="block mb-2">Mapa:</label>
              <select
                value={selectedMap}
                onChange={(e) => setSelectedMap(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded"
              >
                <option value="">Selecione um mapa</option>
                {maps.map(map => (
                  <option key={map} value={map}>{map}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Consideração:</label>
              <textarea
                value={consideration}
                onChange={(e) => setConsideration(e.target.value)}
                placeholder="Ex: Na mirage round pistol rushar 4 b e 1 l da certo"
                className="w-full p-2 bg-gray-700 rounded h-32"
              />
            </div>

            <button
              onClick={saveConsideration}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded font-semibold flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Salvar</span>
            </button>
          </div>

          {/* History Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Histórico por Mapa</h2>
            
            {selectedMap && history[selectedMap] ? (
              <div className="space-y-2">
                {history[selectedMap].map((item, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded">
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Nenhuma consideração salva para este mapa.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}