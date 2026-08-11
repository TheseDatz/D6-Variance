<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <PageHero
      title="Equipment"
      description="The right tool can turn a desperate gamble into a fighting chance. Choose what you carry carefully."
    />

    <EquipmentCatalog class="mt-12" />
  </main>
</template>

<script setup>
import EquipmentCatalog from '../components/EquipmentCatalog.vue'
import PageHero from '../components/PageHero.vue'
</script>
