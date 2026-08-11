<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <PageHero
      title="Skills"
      description="A curated collection of training and expertise for your character. Feel free to work with the Storyteller to create your own."
    />

    <SkillsCatalog class="mt-12" />
  </main>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import SkillsCatalog from '../components/SkillsCatalog.vue'
</script>
