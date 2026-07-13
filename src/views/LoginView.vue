<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSession, isSupabaseConfigured, signInWithUsername } from '../services/auth'

const route = useRoute()
const router = useRouter()
const username = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

const redirectPath = computed(() => route.query.redirect || '/')

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''

  const { error } = await signInWithUsername(username.value, password.value)

  isSubmitting.value = false

  if (error) {
    errorMessage.value = error.message
    return
  }

  router.push(String(redirectPath.value))
}

onMounted(async () => {
  const { session } = await getSession()

  if (session) {
    router.replace(String(redirectPath.value))
  }
})
</script>

<template>
  <main class="grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-8 sm:px-5">
    <form class="w-full max-w-sm border border-amber-500/20 bg-[#0b0f15]/90 p-6 text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_25px_80px_rgba(0,0,0,0.42)]" @submit.prevent="handleSubmit">
      <p class="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">D6V</p>
      <h1 class="mt-3 text-3xl font-semibold tracking-wide text-zinc-50">Sign in</h1>

      <p v-if="!isSupabaseConfigured" class="mt-4 border border-red-500/30 bg-red-950/40 p-3 text-sm text-red-200">
        Supabase environment variables are missing.
      </p>

      <label class="mt-6 block text-sm font-medium text-zinc-100" for="username">Username</label>
      <input
        id="username"
        v-model="username"
        class="mt-2 w-full border border-white/10 bg-black/35 px-3 py-2 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-300/70 focus:ring-2 focus:ring-amber-500/20"
        autocomplete="username"
        required
      />

      <label class="mt-4 block text-sm font-medium text-zinc-100" for="password">Password</label>
      <input
        id="password"
        v-model="password"
        class="mt-2 w-full border border-white/10 bg-black/35 px-3 py-2 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-300/70 focus:ring-2 focus:ring-amber-500/20"
        autocomplete="current-password"
        required
        type="password"
      />

      <p v-if="errorMessage" class="mt-4 border border-red-500/30 bg-red-950/40 p-3 text-sm text-red-200">{{ errorMessage }}</p>

      <button
        class="mt-6 w-full cursor-pointer border border-amber-300/40 bg-gradient-to-r from-red-800 via-amber-700 to-yellow-600 px-4 py-2.5 font-semibold tracking-wide text-zinc-950 shadow-[0_0_30px_rgba(217,119,6,0.18)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="isSubmitting || !isSupabaseConfigured"
        type="submit"
      >
        {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
      </button>
    </form>
  </main>
</template>
