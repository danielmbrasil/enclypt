import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'
import { createTestRouter } from './helpers'
import type { Router } from 'vue-router'

let router: Router

beforeEach(async () => {
  router = createTestRouter()
  router.push('/login')
  await router.isReady()
})

function mountLoginForm() {
  return mount(LoginForm, {
    global: {
      plugins: [router],
    },
  })
}

describe('LoginForm', () => {
  it('renders the heading and subtitle', () => {
    const wrapper = mountLoginForm()

    expect(wrapper.text()).toContain('enclypt')
    expect(wrapper.text()).toContain('Unlock your vault')
  })

  it('renders email and password fields', () => {
    const wrapper = mountLoginForm()

    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    expect(emailInput.exists()).toBe(true)
    expect(passwordInput.exists()).toBe(true)
  })

  it('shows validation error for invalid email', async () => {
    const wrapper = mountLoginForm()

    await wrapper.find('input[type="email"]').setValue('bad')
    await wrapper.find('input[type="password"]').setValue('validpassword123')
    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Please enter a valid email address')
    })
  })

  it('shows validation error for short password', async () => {
    const wrapper = mountLoginForm()

    await wrapper.find('input[type="email"]').setValue('user@example.com')
    await wrapper.find('input[type="password"]').setValue('short')
    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Master password must be at least 8 characters long')
    })
  })

  it('navigates to /vault on valid submit', async () => {
    const wrapper = mountLoginForm()

    await wrapper.find('input[type="email"]').setValue('user@example.com')
    await wrapper.find('input[type="password"]').setValue('validpassword123')
    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => {
      expect(router.currentRoute.value.path).toBe('/vault')
    })
  })

  it('has a link to /register', () => {
    const wrapper = mountLoginForm()

    const link = wrapper.find('a[href="/register"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Create one')
  })
})
