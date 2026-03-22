<script setup lang="ts">
import { ref } from 'vue'
import VaultSearchBar from '@/components/VaultSearchBar.vue'
import VaultList from '@/components/VaultList.vue'
import VaultEmptyState from '@/components/VaultEmptyState.vue'

const searchQuery = ref('')

const mockCiphers = [
  {
    id: '1',
    type: 1,
    name: 'GitHub',
    favorite: true,
    login: {
      username: 'daniel@example.com',
      password: 'ghp_s3cur3-t0k3n!2024',
      uris: [{ uri: 'https://github.com', match: null }],
      totp: null,
    },
  },
  {
    id: '2',
    type: 1,
    name: 'Google',
    favorite: false,
    login: {
      username: 'daniel@gmail.com',
      password: 'g00gl3-p@ssw0rd!',
      uris: [{ uri: 'https://google.com', match: null }],
      totp: null,
    },
  },
  {
    id: '3',
    type: 1,
    name: 'Netflix',
    favorite: false,
    login: {
      username: 'daniel@example.com',
      password: 'n3tfl1x-str3@m!',
      uris: [{ uri: 'https://netflix.com', match: null }],
      totp: null,
    },
  },
  {
    id: '4',
    type: 1,
    name: 'AWS Console',
    favorite: true,
    login: {
      username: 'admin@company.io',
      password: 'Aws!Pr0d-2024#Key',
      uris: [{ uri: 'https://aws.amazon.com', match: null }],
      totp: null,
    },
  },
  {
    id: '5',
    type: 1,
    name: 'Spotify',
    favorite: false,
    login: {
      username: 'daniel@gmail.com',
      password: 'sp0t1fy-b3@ts!',
      uris: [{ uri: 'https://spotify.com', match: null }],
      totp: null,
    },
  },
  {
    id: '6',
    type: 1,
    name: 'Slack',
    favorite: false,
    login: {
      username: 'daniel@company.io',
      password: 'sl@ck-t3@m-2024',
      uris: [{ uri: 'https://slack.com', match: null }],
      totp: null,
    },
  },
  {
    id: '7',
    type: 2,
    name: 'Recovery Codes',
    favorite: false,
    secureNote: {
      text: 'Backup recovery codes for 2FA',
    },
    login: null,
  },
  {
    id: '8',
    type: 1,
    name: 'Vercel',
    favorite: false,
    login: {
      username: 'daniel@example.com',
      password: 'v3rc3l-d3pl0y!',
      uris: [{ uri: 'https://vercel.com', match: null }],
      totp: null,
    },
  },
]
</script>

<template>
  <div class="flex flex-1 flex-col">
    <template v-if="mockCiphers.length > 0">
      <div class="px-4 pt-4 pb-2">
        <VaultSearchBar v-model="searchQuery" />
      </div>

      <VaultList :ciphers="mockCiphers" class="flex-1 px-2" />
    </template>

    <VaultEmptyState v-else />
  </div>
</template>
