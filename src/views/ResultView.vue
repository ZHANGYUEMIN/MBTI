<template>
  <div class="result-view" v-if="result">
    <div id="result-content" class="result-card animate-fade-up glass-card">
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
        <div class="personalized-comment section glass-card">
          <p>{{ personalizedComment }}</p>
        </div>
        
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

const personalizedComment = computed(() => {
  if (!result.value) return ''
  const p = result.value.percentages
  const lang = locale.value
  let comments = []

  // E/I
  if (p.E > 75) comments.push(lang === 'zh' ? '你是一个能量爆棚的外向者，社交是你的充电站！' : 'You are a highly energetic extrovert!')
  else if (p.I > 75) comments.push(lang === 'zh' ? '你享受独处的宁静，内心世界丰富而深邃。' : 'You enjoy the peace of solitude and have a rich inner world.')
  else comments.push(lang === 'zh' ? '你在动与静之间保持着微妙的平衡，既能享受社交也能独处。' : 'You maintain a balance between social activity and solitude.')

  // N/S
  if (p.N > 70) comments.push(lang === 'zh' ? '你富有想象力，总是着眼于未来和可能性。' : 'You are imaginative and focused on future possibilities.')
  else if (p.S > 70) comments.push(lang === 'zh' ? '你脚踏实地，善于处理具体细节和现实问题。' : 'You are grounded and good at handling concrete details.')

  // T/F
  if (p.T > 70) comments.push(lang === 'zh' ? '你逻辑严密，善于理性分析问题。' : 'You are logical and good at rational analysis.')
  else if (p.F > 70) comments.push(lang === 'zh' ? '你富有同情心，决策时常考虑他人的感受。' : 'You are empathetic and consider others feelings in decisions.')

  // J/P
  if (p.J > 75) comments.push(lang === 'zh' ? '你喜欢井井有条，计划性强，是天生的组织者。' : 'You like order and planning, a natural organizer.')
  else if (p.P > 75) comments.push(lang === 'zh' ? '你灵活随性，善于适应变化，总能发现意外的惊喜。' : 'You are flexible and spontaneous, good at adapting to change.')

  return comments.join(' ')
})

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
    // 临时移除动画类，防止截图时元素未显示
    element.classList.remove('animate-fade-up')
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: document.documentElement.classList.contains('dark') ? '#121212' : '#F9F7F2',
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById('result-content')
        if (clonedElement) {
          // 移除所有动画类
          clonedElement.classList.remove('animate-fade-up')
          
          // 强制重置样式以保证清晰度
          clonedElement.style.boxShadow = 'none'
          clonedElement.style.backdropFilter = 'none'
          clonedElement.style.webkitBackdropFilter = 'none'
          // 导出时使用纯色背景，避免透明度问题
          clonedElement.style.background = document.documentElement.classList.contains('dark') ? '#1E1E1E' : '#FFFFFF'
          clonedElement.style.borderRadius = '0' // 可选：导出时去掉圆角？不，保留圆角好看点
          
          // 强制所有子元素可见
          const allElements = clonedElement.querySelectorAll('*')
          allElements.forEach(el => {
            el.classList.remove('animate-fade-up', 'animate-pop', 'animate-fade-in', 'delay-500', 'delay-800', 'delay-1000')
            el.style.setProperty('opacity', '1', 'important')
            el.style.setProperty('transform', 'none', 'important')
            el.style.setProperty('animation', 'none', 'important')
            el.style.setProperty('transition', 'none', 'important')
          })
          
          // 专门修复图表行
          const chartRows = clonedElement.querySelectorAll('.chart-row')
          chartRows.forEach(row => {
             row.style.opacity = '1'
             row.style.transform = 'none'
          })
        }
      }
    })
    
    // 恢复原元素的类（其实不恢复也行，因为页面不会刷新）
    element.classList.add('animate-fade-up')
    
    const link = document.createElement('a')
    link.download = `MBTI-Result-${result.value.type}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (err) {
    console.error('Export failed', err)
    alert('导出图片失败，请重试或截屏保存。')
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

.personalized-comment {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: 16px;
  background: var(--color-primary-light);
  border: 1px solid rgba(230, 162, 60, 0.2);
}

.personalized-comment p {
  margin: 0;
  font-weight: 600;
  color: var(--color-primary-hover);
  font-size: 1.1rem;
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
