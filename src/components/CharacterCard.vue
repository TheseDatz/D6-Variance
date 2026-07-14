<script setup>
import { ref } from 'vue'

defineProps({
  character: { type: Object, required: true },
})

const imageFailed = ref(false)
</script>

<template>
  <RouterLink
    :aria-label="`View ${character.name || 'character'} sheet`"
    class="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
    :to="{ name: 'character-sheet', params: { id: character.id } }"
  >
  <article class="relative overflow-hidden border border-amber-300/30 bg-[#050807]/80 p-4 shadow-[inset_0_0_24px_rgba(251,191,36,0.025)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-amber-200/60 group-hover:shadow-[0_14px_38px_rgba(0,0,0,0.35),0_0_24px_rgba(251,191,36,0.08)] sm:p-5">
    <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/55 to-transparent opacity-60 transition group-hover:opacity-100"></div>

    <div class="flex gap-4 sm:gap-5">
      <div class="relative size-28 shrink-0 overflow-hidden border border-amber-300/25 bg-[#0b100d] sm:size-32">
        <img
          v-if="character.imageUrl && !imageFailed"
          :alt="`${character.name} portrait`"
          class="h-full w-full object-cover grayscale-[15%] transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          referrerpolicy="no-referrer"
          :src="character.imageUrl"
          @error="imageFailed = true"
        />
        <div v-else class="grid h-full place-items-center text-4xl font-semibold text-amber-100/25" aria-hidden="true">?</div>
        <div aria-hidden="true" class="absolute inset-0 ring-1 ring-inset ring-white/5"></div>
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="truncate text-xl font-semibold tracking-wide text-zinc-50 sm:text-2xl">{{ character.name }}</h2>
            <p class="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-amber-200/70">
              Played by {{ character.playerName }}
            </p>
          </div>
          <span class="shrink-0 border border-amber-300/35 bg-amber-300/[0.06] px-2.5 py-1 text-xs font-semibold tracking-wide text-amber-100">
            {{ character.experiencePoints }} XP
          </span>
        </div>

        <p class="mt-5 text-sm leading-6 text-zinc-300">&ldquo;{{ character.tagline }}&rdquo;</p>
      </div>
    </div>
  </article>
  </RouterLink>
</template>
