<template>
  <div class="test-view">
    <div v-if="store.isLoading" class="loading-state">
      <div class="spinner"></div>
    </div>
    
    <div v-else-if="currentQuestion" class="test-content">
      <!-- Progress Bar -->
      <div class="progress-container animate-fade-in">
        <div class="progress-header">
          <div class="progress-info">
            <span class="label">{{ t('test.progress') }}</span>
            <span class="value">{{ store.progressPercent }}%</span>
          </div>
          <div class="question-count">
            {{ store.currentQuestionIndex + 1 }} <span class="divider">/</span> {{ store.totalQuestions }}
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: store.progressPercent + '%' }"></div>
        </div>
      </div>

      <!-- Question Card -->
      <div class="question-container">
        <transition name="slide-fade" mode="out-in">
          <div :key="currentQuestion.id" class="question-card">
            <h2 class="question-prompt">{{ currentQuestion.text[locale] }}</h2>

            <!-- Bipolar Scale (Semantic Differential) -->
            <div class="scale-container">
              
              <!-- Option 2 (Left / Negative Value) -->
              <div class="scale-label left" :class="{ active: store.answers[currentQuestion.id] < 0 }">
                {{ currentQuestion.options[1].text[locale] }}
              </div>

              <div class="scale-options">
                <!-- -2: Strong Option 2 -->
                <button 
                  class="scale-btn size-xl color-secondary"
                  :class="{ selected: store.answers[currentQuestion.id] === -2 }"
                  @click="handleAnswer(-2)"
                ></button>
                
                <!-- -1: Option 2 -->
                <button 
                  class="scale-btn size-md color-secondary"
                  :class="{ selected: store.answers[currentQuestion.id] === -1 }"
                  @click="handleAnswer(-1)"
                ></button>
                
                <!-- 0: Neutral -->
                <button 
                  class="scale-btn size-sm color-neutral"
                  :class="{ selected: store.answers[currentQuestion.id] === 0 }"
                  @click="handleAnswer(0)"
                ></button>
                
                <!-- +1: Option 1 -->
                <button 
                  class="scale-btn size-md color-primary"
                  :class="{ selected: store.answers[currentQuestion.id] === 1 }"
                  @click="handleAnswer(1)"
                ></button>
                
                <!-- +2: Strong Option 1 -->
                <button 
                  class="scale-btn size-xl color-primary"
                  :class="{ selected: store.answers[currentQuestion.id] === 2 }"
                  @click="handleAnswer(2)"
                ></button>
              </div>

              <!-- Option 1 (Right / Positive Value) -->
              <div class="scale-label right" :class="{ active: store.answers[currentQuestion.id] > 0 }">
                {{ currentQuestion.options[0].text[locale] }}
              </div>

            </div>
            
            <!-- Mobile Labels (Below scale) -->
            <div class="mobile-labels">
              <span class="left">{{ currentQuestion.options[1].text[locale] }}</span>
              <span class="right">{{ currentQuestion.options[0].text[locale] }}</span>
            </div>

          </div>
        </transition>
      </div>

      <!-- Navigation -->
      <div class="navigation animate-fade-in delay-200">
        <button 
          class="nav-btn prev" 
          @click="store.prevQuestion"
          :disabled="store.currentQuestionIndex === 0"
        >
          {{ t('test.prev') }}
        </button>
        
        <button 
          class="nav-btn next" 
          @click="handleNext"
          :disabled="store.answers[currentQuestion.id] === undefined"
        >
          {{ t('test.next') }}
        </button>
      </div>
    </div>
    
    <div v-else class="error-state">
      <p>No questions loaded.</p>
      <button @click="router.push('/')">Return Home</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useMbtiStore } from '@/stores/mbti'
import { Check } from 'lucide-vue-next'

const { t, locale } = useI18n()
const router = useRouter()
const store = useMbtiStore()

// Redirect if no questions loaded (e.g. refresh)
onMounted(() => {
  if (store.totalQuestions === 0 && !store.isLoading) {
    router.push('/')
  }
})

const currentQuestion = computed(() => store.currentQuestion)

const handleAnswer = (value) => {
  if (!currentQuestion.value) return
  store.answerQuestion(currentQuestion.value.id, value)
  
  // Auto advance
  if (store.currentQuestionIndex < store.totalQuestions - 1) {
    setTimeout(() => {
      store.nextQuestion()
    }, 300) // Slightly longer delay for animation
  } else {
    // Finished
    setTimeout(() => {
      router.push('/result')
    }, 300)
  }
}

const handleNext = () => {
  if (store.currentQuestionIndex < store.totalQuestions - 1) {
    store.nextQuestion()
  } else {
    router.push('/result')
  }
}
</script>

<style scoped>
.test-view {
  padding-top: 2rem;
  max-width: 720px; /* Wider for scale */
  margin: 0 auto;
  min-height: 60vh;
  padding: 20px;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-primary-light);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Progress Bar */
.progress-container { margin-bottom: 3rem; }
.progress-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 12px; }
.progress-info .label { font-size: 0.85rem; color: var(--color-text-light); margin-bottom: 4px; display: block;}
.progress-info .value { font-size: 1.5rem; font-weight: 700; color: var(--color-primary); line-height: 1; }
.question-count { font-size: 0.9rem; color: var(--color-text-light); font-weight: 600; }
.progress-track { height: 6px; background: #EAEAEA; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--color-primary); transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 3px; }

/* Question Card */
.question-card {
  padding: 1rem 0;
}

.question-prompt {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--color-text-main);
  min-height: 3.6em; 
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  line-height: 1.4;
  font-weight: 700;
}

/* Scale Styles */
.scale-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 1rem;
}

.scale-label {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-light);
  transition: all 0.3s;
  max-width: 25%;
}

.scale-label.left { text-align: right; color: var(--color-secondary); opacity: 0.6; }
.scale-label.right { text-align: left; color: var(--color-primary); opacity: 0.6; }

.scale-label.active {
  opacity: 1;
  transform: scale(1.05);
}

.scale-options {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px; /* Spacing between circles */
  flex: 2;
}

.scale-btn {
  border-radius: 50%;
  border: 2px solid; 
  background: transparent;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
}

.scale-btn:hover {
  transform: scale(1.2);
}

/* Sizes */
.size-xl { width: 50px; height: 50px; }
.size-md { width: 40px; height: 40px; }
.size-sm { width: 30px; height: 30px; }

/* Colors */
.color-secondary {
  border-color: var(--color-secondary);
  color: var(--color-secondary);
}
.color-secondary.selected {
  background-color: var(--color-secondary);
  box-shadow: 0 0 15px rgba(135, 192, 202, 0.4);
}

.color-primary {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.color-primary.selected {
  background-color: var(--color-primary);
  box-shadow: 0 0 15px rgba(230, 162, 60, 0.4);
}

.color-neutral {
  border-color: #D1D1D1;
  color: #D1D1D1;
}
.color-neutral:hover { border-color: #999; }
.color-neutral.selected {
  background-color: #999;
  border-color: #999;
}

/* Mobile specific */
.mobile-labels {
  display: none;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
  color: var(--color-text-light);
  font-weight: 600;
}
.mobile-labels .left { color: var(--color-secondary); }
.mobile-labels .right { color: var(--color-primary); }

/* Navigation */
.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  align-items: center;
}

.nav-btn {
  padding: 12px 28px;
  border-radius: var(--radius-btn);
  background: transparent;
  color: var(--color-text-light);
  font-weight: 600;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(0,0,0,0.03);
  color: var(--color-text-main);
}

.nav-btn.next {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(230, 162, 60, 0.2);
}

.nav-btn.next:hover:not(:disabled) {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(230, 162, 60, 0.3);
}

.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: #E0E0E0;
  color: #999;
  box-shadow: none;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Slide Fade Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-fade-enter-from { opacity: 0; transform: translateY(10px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-10px); }

.animate-fade-in { animation: fadeIn 0.5s ease forwards; }
.delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

@media (max-width: 600px) {
  .scale-container { justify-content: center; }
  .scale-label { display: none; } /* Hide side labels on mobile */
  .mobile-labels { display: flex; } /* Show bottom labels */
  .question-prompt { font-size: 1.2rem; }
  .test-view { padding: 16px; }
  .size-xl { width: 44px; height: 44px; }
  .size-md { width: 36px; height: 36px; }
  .size-sm { width: 28px; height: 28px; }
  .scale-options { gap: 10px; }
}
</style>
