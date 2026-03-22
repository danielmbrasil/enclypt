<script setup lang="ts">
import VaultListItem from '@/components/VaultListItem.vue'

defineProps<{
  ciphers: {
    id: string
    type: number
    name: string
    login?: {
      username: string | null
      password: string | null
      uris: { uri: string; match: string | null }[]
      totp: string | null
    } | null
    secureNote?: {
      text: string
    } | null
  }[]
}>()
</script>

<template>
  <div class="flex flex-col gap-0.5 overflow-y-auto">
    <VaultListItem v-for="cipher in ciphers" :key="cipher.id" :cipher="cipher" />
  </div>
</template>
