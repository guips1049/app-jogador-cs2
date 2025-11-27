export function calculateSkills(answers: string[]) {
  const name = answers[0]
  const timePlaying = answers[1]

  // Function to get points from option
  const getPoints = (option: string) => {
    if (option.startsWith('A.')) return 4
    if (option.startsWith('B.')) return 3
    if (option.startsWith('C.')) return 2
    if (option.startsWith('D.')) return 1
    return 0
  }

  // Questions 2-16 are the skill questions (index 2 to 16)
  const skillAnswers = answers.slice(2)

  const mira = (getPoints(skillAnswers[1]) + getPoints(skillAnswers[2])) / 2 // q3, q4
  const comunicacao = getPoints(skillAnswers[3]) // q5
  const estrategia = getPoints(skillAnswers[4]) // q6
  const conhecimento = (getPoints(skillAnswers[5]) + getPoints(skillAnswers[6]) + getPoints(skillAnswers[13])) / 3 // q7, q8, q15
  const mental = (getPoints(skillAnswers[8]) + getPoints(skillAnswers[9])) / 2 // q10, q11
  const utilitarios = (getPoints(skillAnswers[10]) + getPoints(skillAnswers[12])) / 2 // q12, q14
  const disciplina = (getPoints(skillAnswers[7]) + getPoints(skillAnswers[11]) + getPoints(skillAnswers[14])) / 3 // q9, q13, q16

  const skills = {
    mira,
    comunicacao,
    estrategia,
    conhecimento,
    mental,
    utilitarios,
    disciplina
  }

  return { name, timePlaying, skills }
}