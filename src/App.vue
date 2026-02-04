<template>
  <div class="app-container">
    <div class="lang-switch">
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
import { watch } from 'vue'

const { t, locale } = useI18n()

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
}

.lang-btn {
  background: rgba(255, 255, 255, 0.6);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: var(--color-text-main);
  transition: all 0.3s;
  border: 1px solid transparent;
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
