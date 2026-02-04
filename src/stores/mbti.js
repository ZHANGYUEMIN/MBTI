import { defineStore } from 'pinia'
import { ref, computed, shallowRef } from 'vue'
import { personalityTypes } from '../data/personality_types'

export const useMbtiStore = defineStore('mbti', () => {
  // --- State ---
  const currentVersion = ref(null) // 'simple' | 'detailed'
  const questions = shallowRef([]) // Use shallowRef for performance with large arrays
  const answers = ref({}) // { [questionId]: value } (1 or 0)
  const currentQuestionIndex = ref(0)
  const isLoading = ref(false)

  // --- Getters ---
  const totalQuestions = computed(() => questions.value.length)
  
  const progressPercent = computed(() => {
    if (totalQuestions.value === 0) return 0
    return Math.round((Object.keys(answers.value).length / totalQuestions.value) * 100)
  })

  const currentQuestion = computed(() => {
    return questions.value[currentQuestionIndex.value] || null
  })

  const isFinished = computed(() => {
    return totalQuestions.value > 0 && Object.keys(answers.value).length === totalQuestions.value
  })

  // --- Actions ---
  
  async function initTest(version) {
    isLoading.value = true
    currentVersion.value = version
    answers.value = {}
    currentQuestionIndex.value = 0
    
    try {
      let module
      if (version === 'simple') {
        module = await import('../data/questions_simple.js')
      } else {
        module = await import('../data/questions_detailed.js')
      }
      questions.value = module.default
    } catch (e) {
      console.error('Failed to load questions:', e)
      questions.value = []
    } finally {
      isLoading.value = false
    }
  }

  function answerQuestion(qId, value) {
    answers.value[qId] = value
  }

  function nextQuestion() {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++
    }
  }

  function prevQuestion() {
    if (currentQuestionIndex.value > 0) {
      currentQuestionIndex.value--
    }
  }
  
  function resetTest() {
    answers.value = {}
    currentQuestionIndex.value = 0
    currentVersion.value = null
    questions.value = []
  }

  // --- Scoring Logic ---
  const result = computed(() => {
    if (questions.value.length === 0) return null

    const scores = { 
      E: 0, I: 0, 
      S: 0, N: 0, 
      T: 0, F: 0, 
      J: 0, P: 0 
    }

    // Calculate raw scores
    questions.value.forEach(q => {
      const userVal = answers.value[q.id]
      if (userVal === undefined) return // Skip unanswered

      const targetDim = q.direction // e.g., 'E'
      const otherDim = q.dimension.replace(targetDim, '') // e.g., 'I'

      // Likert Scale Logic:
      // userVal ranges from -2 (Strongly Option 2) to +2 (Strongly Option 1)
      // Option 1 usually matches 'targetDim' (q.direction)
      // Option 2 usually matches 'otherDim'
      
      // Map scale value to points
      // +2 -> 3 points to Target
      // +1 -> 2 points to Target
      // 0  -> 1 point to Both (Neutral) ? Or 0? 
      // Let's use simple weight multiplication as requested:
      // "数值正负方向" logic
      
      // Let's assume:
      // Option 1 (Value 1 in DB) is the "Positive" side of the slider (+1, +2)
      // Option 2 (Value 0 in DB) is the "Negative" side of the slider (-1, -2)
      
      const absVal = Math.abs(userVal)
      // Base weight for the question (usually 1 or 1.2)
      // We multiply by magnitude (1 for weak, 2 for strong)
      // If neutral (0), we add nothing to avoid skewing? 
      // 16P usually counts neutral as no score.
      
      if (userVal > 0) {
        // Leaning towards Option 1 (Target Dimension)
        scores[targetDim] += q.weight * absVal
      } else if (userVal < 0) {
        // Leaning towards Option 2 (Other Dimension)
        scores[otherDim] += q.weight * absVal
      }
      // If 0, no score added to either side (Neutral)
    })

    // Calculate percentages & Type
    const pairs = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']]
    let typeStr = ''
    const percentages = {}

    pairs.forEach(([d1, d2]) => {
      const s1 = scores[d1]
      const s2 = scores[d2]
      const total = s1 + s2
      
      let p1 = 0
      if (total > 0) {
        p1 = Math.round((s1 / total) * 100)
      } else {
        p1 = 50 // Should not happen if answered
      }
      
      // Anti-tie logic: strictly no 50/50 display if possible, but internal logic needs a fallback
      if (p1 === 50) {
         // Fallback to Introverted/iNtuitive/Feeling/Perceiving if strictly equal (rare due to weights)
         // But for display, we might show "Balanced" text in UI
         // For type string generation:
         if (['I', 'N', 'F', 'P'].includes(d2)) {
           typeStr += d2
         } else {
           typeStr += d1
         }
      } else {
        typeStr += p1 > 50 ? d1 : d2
      }

      percentages[d1] = p1
      percentages[d2] = 100 - p1
    })

    return {
      type: typeStr,
      scores,
      percentages,
      details: personalityTypes[typeStr] || personalityTypes['INFP'] // Fallback
    }
  })

  return {
    currentVersion,
    questions,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progressPercent,
    isFinished,
    isLoading,
    answers,
    result,
    initTest,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    resetTest
  }
})
