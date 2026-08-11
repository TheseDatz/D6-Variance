<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <PageHero
      title="Traits"
      description="Adjustments that make your characters exceptional, distinctive, and complicated."
    />

    <TraitsCatalog class="mt-12" />
  </main>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import TraitsCatalog from '../components/TraitsCatalog.vue'
</script>
