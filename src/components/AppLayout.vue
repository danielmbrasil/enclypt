<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarNav from '@/components/SidebarNav.vue'
import BottomNav from '@/components/BottomNav.vue'
</script>

<template>
  <div class="flex min-h-svh bg-surface-950">
    <!-- Desktop sidebar -->
    <SidebarNav />

    <!-- Main content -->
    <main class="flex flex-1 flex-col pb-16 md:pb-0">
      <RouterView />
    </main>

    <!-- Mobile bottom nav -->
    <BottomNav />
  </div>
</template>
