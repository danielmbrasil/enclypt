<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import LockIcon from '@/components/icons/LockIcon.vue'

const router = useRouter()

function handleSubmit() {
  router.push('/vault')
}

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.email({ message: 'Please enter a valid email address' }),
    masterPassword: zod
      .string()
      .min(8, { message: 'Master password must be at least 8 characters long' }),
  }),
)
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center bg-surface-950 px-6 py-12">
    <div class="w-full max-w-sm">
      <div class="mb-10 text-center">
        <div class="mb-3 flex items-center justify-center">
          <LockIcon class="size-10 text-accent-400" />
        </div>
        <h1 class="text-2xl font-semibold tracking-tight text-surface-100">enclypt</h1>
        <p class="mt-1 text-sm text-surface-500">Unlock your vault</p>
      </div>

      <Form :validation-schema="validationSchema" @submit="handleSubmit" class="space-y-5">
        <div>
          <label for="email" class="mb-1.5 block text-sm font-medium text-surface-300">
            Email
          </label>
          <Field name="email" v-slot="{ field, errors, meta }">
            <input
              v-bind="field"
              id="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="block w-full rounded-lg border bg-surface-900 px-3.5 py-2.5 text-sm text-surface-100 placeholder-surface-600 outline-none transition focus:ring-2"
              :class="
                errors.length && meta.touched
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25'
                  : 'border-surface-700 focus:border-accent-500 focus:ring-accent-500/25'
              "
            />
          </Field>
          <ErrorMessage name="email" as="p" class="mt-1.5 text-xs text-red-400" />
        </div>

        <div>
          <label for="master-password" class="mb-1.5 block text-sm font-medium text-surface-300">
            Master password
          </label>
          <Field name="masterPassword" v-slot="{ field, errors, meta }">
            <input
              v-bind="field"
              id="master-password"
              type="password"
              autocomplete="current-password"
              placeholder="Enter your master password"
              class="block w-full rounded-lg border bg-surface-900 px-3.5 py-2.5 text-sm text-surface-100 placeholder-surface-600 outline-none transition focus:ring-2"
              :class="
                errors.length && meta.touched
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25'
                  : 'border-surface-700 focus:border-accent-500 focus:ring-accent-500/25'
              "
            />
          </Field>
          <ErrorMessage name="masterPassword" as="p" class="mt-1.5 text-xs text-red-400" />
        </div>

        <button
          type="submit"
          class="w-full cursor-pointer rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 focus:ring-offset-surface-950"
        >
          Access vault
        </button>
      </Form>

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
