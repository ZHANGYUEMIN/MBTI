<template>
  <div class="app-container">
    <div class="lang-switch">
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
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
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

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
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

.lang-switch {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  display: flex;
  gap: 8px;
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

.icon-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: var(--color-primary);
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
