import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export type ThemePreference = 'auto' | 'light' | 'dark'

const STORAGE_KEY = 'theme-preference'

export const useThemeStore = defineStore('theme', () => {
  const preference = ref<ThemePreference>(readStorage())
  const osDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  const resolved = computed<'light' | 'dark'>(() => {
    if (preference.value === 'auto') {
      return osDark.value ? 'dark' : 'light'
    }
    return preference.value
  })

  function readStorage(): ThemePreference {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return 'auto'
  }

  function setPreference(value: ThemePreference) {
    preference.value = value
    localStorage.setItem(STORAGE_KEY, value)
  }

  function init() {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', (e) => {
      osDark.value = e.matches
    })

    watch(
      resolved,
      (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
      },
      { immediate: true },
    )
  }

  return { preference, resolved, setPreference, init }
})
