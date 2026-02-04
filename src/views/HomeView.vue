<template>
  <div class="home-view">
    <div class="hero">
      <h1 class="title animate-fade-up">{{ t('home.title') }}</h1>
      <p class="subtitle animate-fade-up delay-100">{{ t('home.subtitle') }}</p>
    </div>
    
    <div class="version-cards">
      <div class="card animate-fade-up delay-200" @click="startTest('simple')" :class="{ loading: isLoading === 'simple' }">
        <div class="card-icon"><Zap :size="48" stroke-width="1.5" /></div>
        <h3>{{ t('home.start_simple') }}</h3>
        <p>{{ t('home.desc_simple') }}</p>
        <div v-if="isLoading === 'simple'" class="spinner"></div>
      </div>
      
      <div class="card animate-fade-up delay-300" @click="startTest('detailed')" :class="{ loading: isLoading === 'detailed' }">
        <div class="card-icon"><Brain :size="48" stroke-width="1.5" /></div>
        <h3>{{ t('home.start_detailed') }}</h3>
        <p>{{ t('home.desc_detailed') }}</p>
        <div v-if="isLoading === 'detailed'" class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useMbtiStore } from '@/stores/mbti'
import { Zap, Brain } from 'lucide-vue-next'

const { t } = useI18n()
const router = useRouter()
const store = useMbtiStore()
const isLoading = ref(null)

const startTest = async (version) => {
  if (isLoading.value) return
  isLoading.value = version
  
  await store.initTest(version)
  router.push('/test')
  
  isLoading.value = null
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 0 20px;
}

.hero {
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.03em;
  text-shadow: 2px 2px 0px rgba(230, 162, 60, 0.1);
}

.subtitle {
  font-size: 1.1rem;
  color: var(--color-text-light);
  font-weight: 500;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

.version-cards {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  background: var(--color-surface);
  padding: 2.5rem 2rem;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: all 0.4s var(--ease-out-back);
  width: 260px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

/* 装饰性背景圆点 */
.card::before {
  content: '';
  position: absolute;
  top: -20px;
  right: -20px;
  width: 80px;
  height: 80px;
  background: var(--color-primary-light);
  border-radius: 50%;
  opacity: 0.5;
  transition: transform 0.4s var(--ease-out-back);
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-hover);
  border-color: var(--color-primary-light);
}

.card:hover::before {
  transform: scale(1.5);
}

.card:active {
  transform: translateY(-2px) scale(0.98);
}

.card.loading {
  opacity: 0.8;
  pointer-events: none;
}

.card-icon {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  color: var(--color-primary);
  display: flex;
  justify-content: center;
}

.card h3 {
  margin-bottom: 0.8rem;
  color: var(--color-text-main);
  font-size: 1.25rem;
  position: relative;
  z-index: 1;
}

.card p {
  color: var(--color-text-light);
  font-size: 0.95rem;
  position: relative;
  z-index: 1;
  line-height: 1.5;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border: 3px solid var(--color-primary-light);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 2;
}

/* 入场动画 */
.animate-fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s var(--ease-out-back) forwards;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@media (max-width: 600px) {
  .title { font-size: 2.2rem; }
  .version-cards { flex-direction: column; }
  .card { width: 100%; box-sizing: border-box; }
}
</style>
