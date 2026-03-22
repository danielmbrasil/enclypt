<script setup lang="ts">
import { ref } from 'vue'
import GlobeIcon from '@/components/icons/GlobeIcon.vue'

const props = defineProps<{
  uri?: string
}>()

const failed = ref(false)

const faviconUrl = (() => {
  if (!props.uri) return null
  try {
    const url = new URL(props.uri)
    return `${url.origin}/favicon.ico`
  } catch {
    return null
  }
})()
</script>

<template>
  <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-800">
    <img
      v-if="faviconUrl && !failed"
      :src="faviconUrl"
      :alt="''"
      class="size-5 rounded-sm"
      @error="failed = true"
    />
    <GlobeIcon v-else class="size-5 text-surface-500" />
  </div>
</template>
