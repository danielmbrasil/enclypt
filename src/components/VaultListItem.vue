<script setup lang="ts">
import { toast } from 'vue-sonner'
import VaultItemIcon from '@/components/VaultItemIcon.vue'
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue'

const props = defineProps<{
  cipher: {
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
  }
}>()

const firstUri = props.cipher.login?.uris?.[0]?.uri

async function copyPassword() {
  const password = props.cipher.login?.password
  if (!password) return

  try {
    await navigator.clipboard.writeText(password)
    toast.success('Password copied to clipboard')
  } catch {
    toast.error('Failed to copy password')
  }
}
</script>

<template>
  <div class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-surface-800/50">
    <VaultItemIcon :uri="firstUri" />

    <div class="min-w-0 flex-1">
      <p class="truncate text-sm font-medium text-surface-100">{{ cipher.name }}</p>
      <p v-if="cipher.login?.username" class="truncate text-xs text-surface-500">
        {{ cipher.login.username }}
      </p>
    </div>

    <button v-if="cipher.login?.password" @click.stop="copyPassword"
      class="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-surface-500 transition hover:bg-surface-800 hover:text-surface-300"
      title="Copy password">
      <ClipboardIcon class="size-4" />
    </button>
  </div>
</template>
