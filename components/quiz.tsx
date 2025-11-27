'use client'

import { useState } from 'react'

const questions = [
  {
    question: 'Qual seu nome?',
    type: 'text',
    options: null
  },
  {
    question: 'Quanto tempo joga CS?',
    type: 'select',
    options: ['Menos de 1 ano', '1-3 anos', '3-5 anos', 'Mais de 5 anos']
  },
  {
    question: 'Qual a sua função preferida no time?',
    type: 'multiple',
    options: ['A. Fragger', 'B. Suporte', 'C. Sniper', 'D. IGL (In-Game Leader)']
  },
  {
    question: 'Como você avalia a sua mira em comparação com outros jogadores?',
    type: 'multiple',
    options: ['A. Excelente', 'B. Boa', 'C. Mediana', 'D. Preciso melhorar']
  },
  {
    question: 'Você costumava treinar sua mira fora do jogo?',
    type: 'multiple',
    options: ['A. Sempre', 'B. Às vezes', 'C. Raramente', 'D. Nunca']
  },
  {
    question: 'Você usa a comunicação de voz frequentemente durante as partidas?',
    type: 'multiple',
    options: ['A. Sim, sempre', 'B. Frequentemente', 'C. Raramente', 'D. Nunca']
  },
  {
    question: 'Qual é a sua estratégia preferida ao atacar?',
    type: 'multiple',
    options: ['A. Agressiva', 'B. Tática, usando utilitários', 'C. Defensiva', 'D. Espionagem e informação']
  },
  {
    question: 'Você conhece bem os mapas?',
    type: 'multiple',
    options: ['A. Exatamente, sou um especialista', 'B. Sim, conheço a maioria', 'C. Conheço apenas algumas áreas', 'D. Não, preciso aprender mais']
  },
  {
    question: 'Você é bom em prever os movimentos do time inimigo?',
    type: 'multiple',
    options: ['A. Sempre', 'B. Frequentemente', 'C. Às vezes', 'D. Não sou bom nisso']
  },
  {
    question: 'Com que frequência você estuda as jogadas e técnicas de jogadores profissionais?',
    type: 'multiple',
    options: ['A. Sempre', 'B. Muitas vezes', 'C. Raramente', 'D. Nunca']
  },
  {
    question: 'Como você lida com a pressão durante um jogo decisivo?',
    type: 'multiple',
    options: ['A. Mantenho a calma e foco', 'B. Tento me concentrar', 'C. Fico nervoso, mas consigo jogar', 'D. Sinto que minha performance diminui']
  },
  {
    question: 'Você analisa suas próprias jogadas após as partidas?',
    type: 'multiple',
    options: ['A. Sim, sempre', 'B. Às vezes, em jogos importantes', 'C. Raramente', 'D. Nunca']
  },
  {
    question: 'Você sabe utilizar todos os utilitários (granadas) de forma eficaz?',
    type: 'multiple',
    options: ['A. Sim, sou experiente', 'B. Sou razoável', 'C. Preciso de prática', 'D. Não, estou aprendendo']
  },
  {
    question: 'Com que frequência você joga com seu time regular?',
    type: 'multiple',
    options: ['A. Todos os dias', 'B. Várias vezes por semana', 'C. Raramente', 'D. Nunca, jogo sozinho']
  },
  {
    question: 'Você tem conhecimento sobre as mecânicas de eco e economia no jogo?',
    type: 'multiple',
    options: ['A. Sim, sou muito bom nisso', 'B. Tenho conhecimento básico', 'C. Raramente penso sobre isso', 'D. Não, não entendo muito']
  },
  {
    question: 'Como você se sente sobre a leitura de jogo?',
    type: 'multiple',
    options: ['A. Excelente, sei o que fazer em quase todas as situações', 'B. Boa, mas às vezes hesito', 'C. Mediana', 'D. Preciso melhorar']
  },
  {
    question: 'Qual a sua disponibilidade para treinos e aperfeiçoamentos?',
    type: 'multiple',
    options: ['A. Estou disponível sempre que possível', 'B. Algumas vezes na semana', 'C. Raramente', 'D. Não tenho tempo']
  }
]

export default function Quiz({ onComplete }: { onComplete: (answers: any[]) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Inicial</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl mb-4">{question.question}</h2>
        {question.type === 'text' && (
          <input
            type="text"
            className="w-full p-2 bg-gray-700 rounded"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAnswer((e.target as HTMLInputElement).value)
              }
            }}
            autoFocus
          />
        )}
        {question.type === 'select' && (
          <select
            className="w-full p-2 bg-gray-700 rounded"
            onChange={(e) => handleAnswer(e.target.value)}
            autoFocus
          >
            <option value="">Selecione...</option>
            {question.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        )}
        {question.type === 'multiple' && (
          <div className="space-y-2">
            {question.options?.map((option, i) => (
              <button
                key={i}
                className="w-full text-left p-3 bg-gray-700 rounded hover:bg-gray-600"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        Pergunta {currentQuestion + 1} de {questions.length}
      </div>
    </div>
  )
}