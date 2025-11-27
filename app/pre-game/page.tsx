'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowRight } from 'lucide-react'

const steps = [
  {
    title: 'Conferir Configurações',
    content: 'Verifique suas configurações de jogo: resolução, qualidade gráfica, sensibilidade do mouse, binds de teclado, configurações de áudio e vídeo.',
    checklist: [
      'Resolução definida',
      'Qualidade gráfica otimizada',
      'Sensibilidade do mouse ajustada',
      'Binds de teclado configurados',
      'Configurações de áudio ok',
      'Configurações de vídeo ok'
    ]
  },
  {
    title: 'Guia de Respiração',
    content: 'Pratique respiração profunda para focar e reduzir ansiedade.',
    guide: [
      'Inspire profundamente por 4 segundos',
      'Segure a respiração por 4 segundos',
      'Expire lentamente por 4 segundos',
      'Repita 5 vezes'
    ]
  },
  {
    title: 'Frase Motivacional',
    content: 'Lembre-se: cada partida é uma oportunidade de crescimento. Mantenha o foco e dê o seu melhor!',
    quote: 'A vitória pertence aos mais perseverantes. - Napoleão Bonaparte'
  }
]

export default function PreGame() {
  const [currentStep, setCurrentStep] = useState(0)
  const [checklist, setChecklist] = useState<boolean[]>(new Array(steps[0].checklist?.length || 0).fill(false))
  const router = useRouter()

  const handleChecklistChange = (index: number) => {
    const newChecklist = [...checklist]
    newChecklist[index] = !newChecklist[index]
    setChecklist(newChecklist)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (steps[currentStep + 1].checklist) {
        setChecklist(new Array(steps[currentStep + 1].checklist!.length).fill(false))
      }
    } else {
      router.push('/')
    }
  }

  const step = steps[currentStep]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Ascensão Pré-Game</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl mb-4">{step.title}</h2>
          <p className="mb-4">{step.content}</p>
          
          {step.checklist && (
            <div className="space-y-2 mb-4">
              {step.checklist.map((item, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checklist[index]}
                    onChange={() => handleChecklistChange(index)}
                    className="rounded"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          )}
          
          {step.guide && (
            <div className="space-y-2 mb-4">
              {step.guide.map((item, index) => (
                <p key={index} className="flex items-center space-x-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          )}
          
          {step.quote && (
            <blockquote className="border-l-4 border-blue-400 pl-4 italic">
              {step.quote}
            </blockquote>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={nextStep}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto"
            disabled={step.checklist && !checklist.every(Boolean)}
          >
            <span>{currentStep < steps.length - 1 ? 'Próximo' : 'Concluído'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}