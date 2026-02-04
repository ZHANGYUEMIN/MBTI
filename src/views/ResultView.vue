<template>
  <div class="result-view" v-if="result">
    <div id="result-content" class="result-card animate-fade-up">
      <div class="header">
        <p class="subtitle">{{ t('result.title') }}</p>
        <h1 class="type-title">
          <span 
            v-for="(char, index) in result.type.split('')" 
            :key="index"
            class="char animate-pop"
            :style="{ animationDelay: index * 0.1 + 's' }"
          >{{ char }}</span>
        </h1>
        <h2 class="type-name animate-fade-in delay-500">{{ result.details[locale].name }}</h2>
      </div>

      <div class="charts">
        <div class="chart-row" v-for="(dim, index) in dimensions" :key="dim.key" :style="{ animationDelay: (0.4 + index * 0.1) + 's' }">
          <div class="label left" :class="{ active: result.percentages[dim.left] > 50 }">
            {{ dim.left }}
            <span class="pct">{{ result.percentages[dim.left] }}%</span>
          </div>
          <div class="bar-container">
            <div class="bar-fill left" :style="{ width: result.percentages[dim.left] + '%' }"></div>
            <div class="bar-fill right" :style="{ width: result.percentages[dim.right] + '%' }"></div>
          </div>
          <div class="label right" :class="{ active: result.percentages[dim.right] > 50 }">
            <span class="pct">{{ result.percentages[dim.right] }}%</span>
            {{ dim.right }}
          </div>
        </div>
      </div>

      <div class="analysis animate-fade-up delay-800">
        <div class="section">
          <h3><FileText :size="20" /> {{ t('result.analysis') }}</h3>
          <p>{{ result.details[locale].traits }}</p>
        </div>
        <div class="divider"></div>
        <div class="section">
          <h3><Star :size="20" /> {{ t('result.strengths') }}</h3>
          <p>{{ result.details[locale].strengths }}</p>
        </div>
        <div class="divider"></div>
        <div class="section">
          <h3><AlertTriangle :size="20" /> {{ t('result.blindspots') }}</h3>
          <p>{{ result.details[locale].blindspots }}</p>
        </div>
        <div class="divider"></div>
        <div class="section">
          <h3><Briefcase :size="20" /> {{ t('result.career') }}</h3>
          <p>{{ result.details[locale].career }}</p>
        </div>
      </div>
    </div>

    <div class="actions animate-fade-up delay-1000">
      <button class="action-btn secondary" @click="handleRetake">
        {{ t('result.retake') }}
      </button>
      <button class="action-btn primary" @click="exportImage">
        {{ t('result.export') }}
      </button>
    </div>
  </div>
  <div v-else class="loading">
    <p>No result found.</p>
    <button class="action-btn secondary" @click="handleRetake">Return Home</button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useMbtiStore } from '@/stores/mbti'
import { FileText, Star, AlertTriangle, Briefcase } from 'lucide-vue-next'
import html2canvas from 'html2canvas'

const { t, locale } = useI18n()
const router = useRouter()
const store = useMbtiStore()

const result = computed(() => store.result)

onMounted(() => {
  if (!result.value) {
    router.push('/')
  }
})

const dimensions = [
  { key: 'EI', left: 'E', right: 'I' },
  { key: 'SN', left: 'S', right: 'N' },
  { key: 'TF', left: 'T', right: 'F' },
  { key: 'JP', left: 'J', right: 'P' }
]

const handleRetake = () => {
  store.resetTest()
  router.push('/')
}

const exportImage = async () => {
  const element = document.getElementById('result-content')
  if (!element) return
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#F9F7F2' // Updated background color
    })
    
    const link = document.createElement('a')
    link.download = `MBTI-Result-${result.value.type}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (err) {
    console.error('Export failed', err)
    alert('Export failed, please try again.')
  }
}
</script>

<style scoped>
.result-view {
  padding-bottom: 60px;
  max-width: 640px;
  margin: 0 auto;
  padding: 20px;
}

.result-card {
  background: var(--color-surface);
  padding: 3rem 2rem;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-soft);
  margin-bottom: 2.5rem;
  position: relative;
  overflow: hidden;
}

.result-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px dashed var(--color-border);
}

.subtitle {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.type-title {
  font-size: 4.5rem;
  color: var(--color-primary);
  margin: 0.5rem 0;
  line-height: 1;
  display: inline-flex;
  gap: 2px;
}

.char {
  display: inline-block;
  opacity: 0;
  /* animation will be applied inline */
}

.type-name {
  font-size: 1.8rem;
  color: var(--color-text-main);
  font-weight: 600;
  margin-top: 0.5rem;
}

.charts {
  margin-bottom: 3rem;
}

.chart-row {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  gap: 12px;
  opacity: 0;
  transform: translateY(10px);
  animation: slideUp 0.6s var(--ease-out-back) forwards;
}

.label {
  width: 60px;
  font-weight: 700;
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.1rem;
}

.label.active {
  color: var(--color-primary);
}

.label.left { justify-content: flex-end; }
.label.right { justify-content: flex-start; }

.pct {
  font-size: 0.75rem;
  opacity: 0.6;
  margin: 0 6px;
  font-weight: 400;
}

.bar-container {
  flex: 1;
  height: 14px;
  background: #F0F0F0;
  border-radius: 7px;
  display: flex;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.bar-fill.left {
  background: var(--color-primary);
  border-right: 2px solid #fff;
}

.bar-fill.right {
  background: var(--color-secondary);
}

.analysis {
  opacity: 0;
  /* Animation handled by class */
}

.section {
  padding: 1rem 0;
}

.divider {
  height: 1px;
  background: var(--color-border);
  margin: 0.5rem 0;
}

.section h3 {
  font-size: 1.15rem;
  margin-bottom: 0.8rem;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.section p {
  color: var(--color-text-main);
  line-height: 1.7;
  font-size: 1.05rem;
  opacity: 0.9;
}

.actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  opacity: 0;
}

.action-btn {
  padding: 14px 36px;
  border-radius: var(--radius-btn);
  font-weight: 700;
  font-size: 1.05rem;
  transition: all 0.3s;
  letter-spacing: 0.02em;
}

.action-btn.primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 8px 20px rgba(230, 162, 60, 0.25);
}

.action-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(230, 162, 60, 0.35);
  background: var(--color-primary-hover);
}

.action-btn.secondary {
  background: white;
  color: var(--color-text-main);
  border: 1px solid #E0E0E0;
}

.action-btn.secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: #fff;
}

.loading {
  text-align: center;
  padding: 60px;
  color: var(--color-text-light);
}

/* Animations */
.animate-fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s var(--ease-out-back) forwards;
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
}

.animate-pop {
  animation: popIn 0.6s var(--ease-out-back) forwards;
}

.delay-500 { animation-delay: 0.5s; }
.delay-800 { animation-delay: 0.8s; }
.delay-1000 { animation-delay: 1.0s; }

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.5) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .type-title { font-size: 3.5rem; }
  .result-card { padding: 2rem 1.5rem; }
  .actions { flex-direction: column; width: 100%; }
  .action-btn { width: 100%; }
}
</style>
