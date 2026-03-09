<script setup lang="ts">
import { computed, ref } from 'vue'

const email = ref('')
const masterPassword = ref('')
const emailTouched = ref(false)
const masterPasswordTouched = ref(false)

const emailInvalid = computed(
  () => emailTouched.value && email.value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value),
)

const masterPasswordInvalid = computed(
  () =>
    masterPasswordTouched.value && (masterPassword.value === '' || masterPassword.value.length < 8),
)

function handleSubmit() {}
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center bg-surface-950 px-6 py-12">
    <div class="w-full max-w-sm">
      <div class="mb-10 text-center">
        <div class="mb-3 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-10 text-accent-400"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1" />
          </svg>
        </div>
        <h1 class="text-2xl font-semibold tracking-tight text-surface-100">enclypt</h1>
        <p class="mt-1 text-sm text-surface-500">Unlock your vault</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label for="email" class="mb-1.5 block text-sm font-medium text-surface-300">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            placeholder="you@example.com"
            @blur="emailTouched = true"
            class="block w-full rounded-lg border bg-surface-900 px-3.5 py-2.5 text-sm text-surface-100 placeholder-surface-600 outline-none transition focus:ring-2"
            :class="
              emailInvalid
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25'
                : 'border-surface-700 focus:border-accent-500 focus:ring-accent-500/25'
            "
          />
          <p v-if="emailInvalid" class="mt-1.5 text-xs text-red-400">
            Please enter a valid email address
          </p>
        </div>

        <div>
          <label for="master-password" class="mb-1.5 block text-sm font-medium text-surface-300">
            Master password
          </label>
          <input
            id="master-password"
            v-model="masterPassword"
            type="password"
            autocomplete="current-password"
            required
            placeholder="Enter your master password"
            @blur="masterPasswordTouched = true"
            class="block w-full rounded-lg border bg-surface-900 px-3.5 py-2.5 text-sm text-surface-100 placeholder-surface-600 outline-none transition focus:ring-2"
            :class="
              masterPasswordInvalid
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25'
                : 'border-surface-700 focus:border-accent-500 focus:ring-accent-500/25'
            "
          />
          <p v-if="masterPasswordInvalid" class="mt-1.5 text-xs text-red-400">
            Please enter a valid master password (at least 8 characters)
          </p>
        </div>

        <button
          type="submit"
          class="w-full cursor-pointer rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 focus:ring-offset-surface-950"
        >
          Access vault
        </button>
      </form>

      <p class="mt-8 text-center text-sm text-surface-500">
        Don't have an account?
        <RouterLink
          to="/register"
          class="font-medium text-accent-400 transition hover:text-accent-300"
        >
          Create one
        </RouterLink>
      </p>
    </div>
  </div>
</template>
