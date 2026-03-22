<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { useThemeStore } from './stores/theme'

const theme = useThemeStore()
theme.init()
</script>

<template>
  <RouterView />
  <Toaster :theme="theme.resolved" position="bottom-right" :duration="2000" :rich-colors="true" />
</template>
