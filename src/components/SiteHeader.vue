<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSession, onAuthStateChange } from '../services/auth'

const route = useRoute()
const session = ref(null)
let unsubscribe = null

onMounted(async () => {
  const { session: currentSession } = await getSession()
  session.value = currentSession
  unsubscribe = onAuthStateChange((nextSession) => {
    session.value = nextSession
  })
})

onBeforeUnmount(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-amber-500/10 bg-[#050609]/55 shadow-[0_1px_0_rgba(255,255,255,0.025)] backdrop-blur-md">
    <nav class="mx-auto flex h-16 w-full max-w-7xl items-center gap-10 px-4 sm:px-5">
      <RouterLink
        :class="[
          'relative bg-gradient-to-r from-red-600 via-orange-400 to-yellow-200 bg-clip-text pb-2 text-2xl font-black tracking-[0.12em] text-transparent drop-shadow-[0_0_18px_rgba(251,191,36,0.22)]',
          route.name === 'home'
            ? 'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:-skew-x-12 after:bg-gradient-to-r after:from-red-600 after:via-orange-400 after:to-yellow-200 after:shadow-[0_0_12px_rgba(251,191,36,0.35)]'
            : '',
        ]"
        to="/"
      >
        D6V
      </RouterLink>

      <div class="hidden items-center gap-7 text-xs font-medium text-zinc-300 sm:flex">
        <RouterLink
          class="px-1 py-2 transition hover:text-amber-100"
          active-class="rounded-full border border-white/10 bg-white/[0.045] px-4 text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          to="/characters"
        >
          Characters
        </RouterLink>
        <RouterLink
          class="px-1 py-2 transition hover:text-amber-100"
          active-class="rounded-full border border-white/10 bg-white/[0.045] px-4 text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          to="/rules"
        >
          Rules
        </RouterLink>
        <RouterLink
          class="px-1 py-2 transition hover:text-amber-100"
          active-class="rounded-full border border-white/10 bg-white/[0.045] px-4 text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          to="/styles"
        >
          Styles
        </RouterLink>
        <RouterLink
          class="px-1 py-2 transition hover:text-amber-100"
          active-class="rounded-full border border-white/10 bg-white/[0.045] px-4 text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          to="/admin"
        >
          Admin
        </RouterLink>
      </div>

      <RouterLink
        :aria-label="session ? 'View profile' : 'Log in'"
        class="ml-auto grid size-10 place-items-center rounded-full border border-amber-400/20 bg-zinc-950/35 text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-amber-300/50 hover:text-yellow-200"
        :to="session ? '/profile' : '/login'"
      >
        <svg aria-hidden="true" class="size-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </RouterLink>
    </nav>
  </header>
</template>
