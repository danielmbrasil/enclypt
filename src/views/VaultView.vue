<script setup lang="ts">
import { useRouter } from 'vue-router'
import LockIcon from '@/components/icons/LockIcon.vue'
import FolderIcon from '@/components/icons/FolderIcon.vue'

const router = useRouter()

function handleLogout() {
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-svh flex-col bg-surface-950">
    <header class="border-b border-surface-800 px-6 py-4">
      <div class="mx-auto flex max-w-4xl items-center justify-between">
        <div class="flex items-center gap-2.5">
          <LockIcon class="size-6 text-accent-400" />
          <span class="text-lg font-semibold tracking-tight text-surface-100">enclypt</span>
        </div>
        <button
          @click="handleLogout"
          class="cursor-pointer text-sm font-medium text-surface-400 transition hover:text-surface-200"
        >
          Log out
        </button>
      </div>
    </header>

    <main class="flex flex-1 items-center justify-center px-6">
      <div class="text-center">
        <div class="mb-4 flex justify-center">
          <FolderIcon class="size-12 text-surface-700" />
        </div>
        <h2 class="text-lg font-semibold text-surface-100">Your vault is empty</h2>
        <p class="mt-1 text-sm text-surface-500">Add your first item to get started.</p>
      </div>
    </main>
  </div>
</template>
