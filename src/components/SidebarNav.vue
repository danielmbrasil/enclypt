<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import LockIcon from '@/components/icons/LockIcon.vue'
import ShieldIcon from '@/components/icons/ShieldIcon.vue'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import KeyIcon from '@/components/icons/KeyIcon.vue'
import CogIcon from '@/components/icons/CogIcon.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import LogOutIcon from '@/components/icons/LogOutIcon.vue'

const route = useRoute()
const router = useRouter()

const STORAGE_KEY = 'sidebar-collapsed'

const collapsed = ref(readCollapsed())

function readCollapsed(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

function toggleCollapsed() {
  collapsed.value = !collapsed.value
  localStorage.setItem(STORAGE_KEY, String(collapsed.value))
}

function handleLogout() {
  router.push('/login')
}

const navItems = [
  { to: '/vault', label: 'Vault', icon: ShieldIcon },
  { to: '/vault/new', label: 'New Entry', icon: PlusIcon },
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
  <aside class="hidden md:flex flex-col border-r border-surface-800 bg-surface-900 transition-all duration-200"
    :class="collapsed ? 'w-16' : 'w-56'">
    <!-- Branding -->
    <div class="flex items-center gap-2.5 px-4 py-5" :class="collapsed ? 'justify-center' : ''">
      <LockIcon class="size-6 shrink-0 text-accent-400" />
      <span v-if="!collapsed" class="text-lg font-semibold tracking-tight text-surface-100 truncate">
        enclypt
      </span>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-1 flex-col gap-1 px-2 py-2">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition" :class="[
          isActive(item.to)
            ? 'bg-surface-800 text-accent-400'
            : 'text-surface-400 hover:bg-surface-800/50 hover:text-surface-200',
          collapsed ? 'justify-center' : '',
        ]" :title="collapsed ? item.label : undefined">
        <component :is="item.icon" class="size-5 shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Footer: Logout + Collapse toggle -->
    <div class="flex flex-col gap-1 border-t border-surface-800 px-2 py-2">
      <button @click="handleLogout"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-surface-400 transition hover:bg-surface-800/50 hover:text-surface-200 cursor-pointer"
        :class="collapsed ? 'justify-center' : ''" :title="collapsed ? 'Log out' : undefined">
        <LogOutIcon class="size-5 shrink-0" />
        <span v-if="!collapsed" class="truncate">Log out</span>
      </button>

      <button @click="toggleCollapsed"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-surface-400 transition hover:bg-surface-800/50 hover:text-surface-200 cursor-pointer"
        :class="collapsed ? 'justify-center' : ''" :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'">
        <ChevronLeftIcon class="size-5 shrink-0 transition-transform duration-200"
          :class="collapsed ? 'rotate-180' : ''" />
        <span v-if="!collapsed" class="truncate">Collapse</span>
      </button>
    </div>
  </aside>
</template>
