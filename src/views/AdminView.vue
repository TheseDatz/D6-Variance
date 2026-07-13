<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <PageHero
      title="Admin"
      description="This route is restricted to Supabase sessions with an admin app metadata role."
    />
  </main>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
</script>
