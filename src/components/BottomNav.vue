<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import ShieldIcon from '@/components/icons/ShieldIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import KeyIcon from '@/components/icons/KeyIcon.vue'
import CogIcon from '@/components/icons/CogIcon.vue'

const route = useRoute()

const navItems = [
  { to: '/vault', label: 'Vault', icon: ShieldIcon },
  { to: '/vault/new', label: 'New', icon: PlusIcon },
  { to: '/generator', label: 'Generator', icon: KeyIcon },
  { to: '/settings', label: 'Settings', icon: CogIcon },
]

function isActive(path: string): boolean {
  if (path === '/vault') {
    return route.path === '/vault'
  }
  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="fixed inset-x-0 bottom-0 z-50 border-t border-surface-800 bg-surface-900 md:hidden">
    <div class="flex items-center justify-around">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition"
        :class="isActive(item.to) ? 'text-accent-400' : 'text-surface-500 hover:text-surface-300'"
      >
        <component :is="item.icon" class="size-5" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
