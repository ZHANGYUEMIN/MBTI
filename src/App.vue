<template>
  <div class="app-container">
    <transition name="splash">
      <div v-if="isLoading" class="splash-screen">
        <div class="splash-content">
          <div class="splash-logo">
            <div class="logo-shape circle"></div>
            <div class="logo-shape square"></div>
            <div class="logo-shape triangle"></div>
          </div>
          <h1 class="splash-title">MBTI</h1>
          <p class="splash-subtitle">Discover Yourself</p>
        </div>
      </div>
    </transition>

    <header class="app-header">
      <div class="header-actions">
        <button @click="toggleTheme" class="icon-btn" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
          <Sun v-if="isDark" size="18" />
          <Moon v-else size="18" />
        </button>
        <button 
          @click="toggleLang" 
          class="lang-btn"
        >
          {{ locale === 'zh' ? 'EN' : '中文' }}
        </button>
      </div>
    </header>
    
    <main class="app-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} HAPPY Games</p>
    </footer>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { watch, ref, onMounted } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'

const { t, locale } = useI18n()
const isDark = ref(false)
const isLoading = ref(true)
let isToggling = false

// Initialize theme state
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  // User requested to prioritize default Light Mode, so we ignore system pref for initial load
  // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark') {
    isDark.value = true
  } else {
    isDark.value = false
  }
}

const toggleTheme = () => {
  if (isToggling) return
  isToggling = true
  
  isDark.value = !isDark.value
  
  setTimeout(() => {
    isToggling = false
  }, 300)
}

// Watch for theme changes and apply to DOM
watch(isDark, (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}, { immediate: true })

onMounted(() => {
  initTheme()
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleChange = (e) => {
    // Only update if user hasn't set a preference? 
    // Or just let system take over if it changes?
    // Given the user wants to "switch to dark mode on phone to see changes",
    // we should update it.
    isDark.value = e.matches
  }
  
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange)
  } else {
    // Deprecated but for compatibility
    mediaQuery.addListener(handleChange)
  }
  
  // Splash screen timer
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})

watch(locale, (newLocale) => {
  document.title = newLocale === 'zh' ? 'MBTI 人格测试' : 'MBTI Personality Test'
}, { immediate: true })

const toggleLang = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}
</script>

<style>
.app-container {
  max-width: 640px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Splash Screen */
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-bg);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.splash-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.splash-logo {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}

.logo-shape {
  width: 20px;
  height: 20px;
  background: var(--color-primary);
  opacity: 0;
  animation: shapeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.logo-shape.circle {
  border-radius: 50%;
  background: var(--color-primary);
  animation-delay: 0.1s;
}

.logo-shape.square {
  border-radius: 4px;
  background: var(--color-secondary);
  animation-delay: 0.3s;
}

.logo-shape.triangle {
  width: 0;
  height: 0;
  background: transparent;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid var(--color-text-main);
  animation-delay: 0.5s;
}

.splash-title {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 4px;
  color: var(--color-text-main);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards 0.6s;
}

.splash-subtitle {
  font-size: 1rem;
  color: var(--color-text-light);
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeUp 0.8s ease forwards 0.8s;
}

@keyframes shapeIn {
  from {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Splash Transition */
.splash-leave-active {
  transition: all 0.8s cubic-bezier(0.65, 0, 0.35, 1);
}

.splash-leave-to {
  opacity: 0;
  transform: scale(1.05);
  filter: blur(10px);
}

/* Header Styles */
.app-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  gap: 12px;
  z-index: 100;
}

.app-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.icon-btn {
  background: var(--color-surface);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-main);
  border: var(--glass-border);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s;
}

@media (hover: hover) {
  .icon-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    color: var(--color-primary);
  }
}

.lang-btn {
  background: var(--color-surface);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: var(--color-text-main);
  transition: all 0.3s;
  border: var(--glass-border);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  height: 36px;
  display: flex;
  align-items: center;
}

.lang-btn:hover {
  background: #fff;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.app-footer {
  margin-top: auto;
  padding: 20px 0;
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-text-sub);
  opacity: 0.7;
}
</style>
