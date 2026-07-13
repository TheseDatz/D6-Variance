<script setup>
import { onMounted, ref } from 'vue'
import CharacterCard from '../components/CharacterCard.vue'
import PageHero from '../components/PageHero.vue'
import { loadCharacters } from '../services/characters'

const characters = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    characters.value = await loadCharacters()
  } catch (error) {
    errorMessage.value = error?.message || 'The character roster could not be loaded.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <PageHero
      title="Characters"
      description="Meet the characters currently active in official D6V campaigns."
    />

    <section class="mt-12" aria-labelledby="character-roster-title" aria-live="polite">
      <div class="mb-6 flex items-end justify-between gap-4 border-b border-amber-300/25 pb-3">
        <h2 id="character-roster-title" class="text-xl font-semibold tracking-wide text-amber-100 sm:text-2xl">Player Characters</h2>
        <span v-if="!isLoading && !errorMessage" class="text-xs uppercase tracking-[0.2em] text-zinc-500">
          {{ characters.length }} {{ characters.length === 1 ? 'character' : 'characters' }}
        </span>
      </div>

      <div v-if="isLoading" class="grid gap-4 md:grid-cols-2" aria-label="Loading characters">
        <div v-for="index in 4" :key="index" class="h-42 animate-pulse border border-amber-300/15 bg-white/[0.025]"></div>
      </div>

      <div v-else-if="errorMessage" class="border border-red-500/30 bg-red-950/35 p-5 text-sm text-red-200" role="alert">
        <p class="font-semibold">Unable to load characters</p>
        <p class="mt-1 text-red-200/75">{{ errorMessage }}</p>
      </div>

      <p v-else-if="characters.length === 0" class="border border-amber-300/20 bg-white/[0.02] p-8 text-center text-sm text-zinc-400">
        No active player characters have been added yet.
      </p>

      <div v-else class="grid gap-4 md:grid-cols-2">
        <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
      </div>
    </section>
  </main>
</template>
