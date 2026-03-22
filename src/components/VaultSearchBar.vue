<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'

defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="relative">
    <SearchIcon
      class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-surface-500"
    />
    <input
      type="text"
      placeholder="Search vault..."
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full rounded-lg border border-surface-800 bg-surface-900 py-2.5 pl-10 pr-4 text-sm text-surface-100 placeholder-surface-500 outline-none transition focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
    />
  </div>
</template>
