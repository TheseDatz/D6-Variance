<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <aside class="fixed top-40 left-8 z-10 hidden max-h-[calc(100vh-10rem)] w-48 overflow-y-auto lg:block">
      <PageTableOfContents />
    </aside>

    <PageHero
      title="Rules"
      description="The basis for understanding the D6V system."
    />

    <MainTextContent
      class="mt-8"
      section-id="d6-variance"
      title="D6: Variance"
      subtitle="A tabletop roleplaying system designed for intuitive online play."
    >
      <div class="max-w-3xl space-y-4 leading-7">
        <p>
          These core rules explain how to play D6: Variance, a flexible tabletop roleplaying game. The system is built around familiar six-sided dice, straightforward resolution, and procedures that remain quick to understand and easy to use at a physical or virtual table.
        </p>
        <p>
          D6V separates its universal mechanics from the worlds that use them. The core rules establish a shared foundation for characters, challenges, conflict, and advancement that can be adapted to any genre. Individual settings can then introduce their own abilities, equipment, creatures, and optional subsystems without changing how the game fundamentally works.
        </p>
        <p class="rounded-lg border border-amber-300/25 bg-amber-300/[0.055] px-4 py-3 text-amber-50/90">
          The supporting Heritage, Descriptor, Equipment, and Resonance lists elsewhere on this website are required for play alongside these core rules.
        </p>
      </div>
    </MainTextContent>

    <RulesSystems class="mt-16" />
  </main>
</template>

<script setup>
import MainTextContent from '../components/MainTextContent.vue'
import PageHero from '../components/PageHero.vue'
import PageTableOfContents from '../components/PageTableOfContents.vue'
import RulesSystems from '../components/RulesSystems.vue'
</script>
