<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <PageHero title="Profile" />

    <section class="relative mt-12 overflow-hidden border border-amber-300/50 bg-[#07140c]/25 shadow-[0_0_32px_rgba(251,191,36,0.15),inset_0_0_24px_rgba(251,191,36,0.04)]">
      <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/75 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.5)]"></div>
      <div class="relative mx-auto max-w-2xl px-6 py-10 text-center sm:px-10 sm:py-12">
        <h2 class="text-2xl font-semibold tracking-wide sm:text-3xl">
          <span class="inline-block bg-gradient-to-r from-red-600 via-orange-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(251,191,36,0.14)]">
            Session
          </span>
        </h2>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-100">
          Sign out of your D6V account on this device.
        </p>

        <p v-if="errorMessage" class="mx-auto mt-4 max-w-xl border border-red-500/30 bg-red-950/40 p-3 text-sm text-red-200">
          {{ errorMessage }}
        </p>

        <button
          class="mt-6 cursor-pointer rounded-full border border-amber-400/25 bg-white/[0.025] px-5 py-2.5 text-sm font-medium text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:border-amber-300/60 hover:bg-amber-300/10 hover:text-yellow-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="isSubmitting"
          type="button"
          @click="handleSignOut"
        >
          {{ isSubmitting ? 'Logging out...' : 'Log out' }}
        </button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { signOut } from '../services/auth'

const router = useRouter()
const isSubmitting = ref(false)
const errorMessage = ref('')

async function handleSignOut() {
  isSubmitting.value = true
  errorMessage.value = ''

  const { error } = await signOut()

  if (error) {
    errorMessage.value = error.message
    isSubmitting.value = false
    return
  }

  await router.replace('/login')
}
</script>
