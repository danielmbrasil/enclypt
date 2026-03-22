<script setup lang="ts">
import FolderIcon from '@/components/icons/FolderIcon.vue'
</script>

<template>
  <div class="flex flex-1 items-center justify-center px-6">
    <div class="text-center">
      <div class="mb-4 flex justify-center">
        <FolderIcon class="size-12 text-surface-700" />
      </div>
      <h2 class="text-lg font-semibold text-surface-100">Your vault is empty</h2>
      <p class="mt-1 text-sm text-surface-500">Add your first item to get started.</p>
    </div>
  </div>
</template>
