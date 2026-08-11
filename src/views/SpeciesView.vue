<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <PageHero
      title="Species"
      description="Perhaps you should just play a human? Then again, stranger bloodlines may offer stranger possibilities."
    />

    <SpeciesCatalog class="mt-12" />
  </main>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import SpeciesCatalog from '../components/SpeciesCatalog.vue'
</script>
