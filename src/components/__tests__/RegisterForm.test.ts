import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RegisterForm from '@/components/RegisterForm.vue'
import { createTestRouter } from './helpers'
import type { Router } from 'vue-router'

let router: Router

beforeEach(async () => {
  router = createTestRouter()
  router.push('/register')
  await router.isReady()
})

function mountRegisterForm() {
  return mount(RegisterForm, {
    global: {
      plugins: [router],
    },
  })
}

describe('RegisterForm', () => {
  it('renders the heading and subtitle', () => {
    const wrapper = mountRegisterForm()

    expect(wrapper.text()).toContain('enclypt')
    expect(wrapper.text()).toContain('Create your vault')
  })

  it('renders email, password, and confirm password fields', () => {
    const wrapper = mountRegisterForm()

    const emailInput = wrapper.find('input[type="email"]')
    const passwordInputs = wrapper.findAll('input[type="password"]')

    expect(emailInput.exists()).toBe(true)
    expect(passwordInputs).toHaveLength(2)
  })

  it('shows validation error for invalid email', async () => {
    const wrapper = mountRegisterForm()

    await wrapper.find('input[type="email"]').setValue('bad')
    await wrapper.find('#register-master-password').setValue('validpassword123')
    await wrapper.find('#register-confirm-password').setValue('validpassword123')
    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Please enter a valid email address')
    })
  })

  it('shows validation error for short password', async () => {
    const wrapper = mountRegisterForm()

    await wrapper.find('input[type="email"]').setValue('user@example.com')
    await wrapper.find('#register-master-password').setValue('short')
    await wrapper.find('#register-confirm-password').setValue('short')
    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Master password must be at least 8 characters long')
    })
  })

  it('shows validation error when passwords do not match', async () => {
    const wrapper = mountRegisterForm()

    await wrapper.find('input[type="email"]').setValue('user@example.com')
    await wrapper.find('#register-master-password').setValue('validpassword123')
    await wrapper.find('#register-confirm-password').setValue('differentpassword')
    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => {
      expect(wrapper.text()).toContain('Passwords do not match')
    })
  })

  it('navigates to /vault on valid submit', async () => {
    const wrapper = mountRegisterForm()

    await wrapper.find('input[type="email"]').setValue('user@example.com')
    await wrapper.find('#register-master-password').setValue('validpassword123')
    await wrapper.find('#register-confirm-password').setValue('validpassword123')
    await wrapper.find('form').trigger('submit')

    await vi.waitFor(() => {
      expect(router.currentRoute.value.path).toBe('/vault')
    })
  })

  it('has a link to /login', () => {
    const wrapper = mountRegisterForm()

    const link = wrapper.find('a[href="/login"]')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Sign in')
  })
})
