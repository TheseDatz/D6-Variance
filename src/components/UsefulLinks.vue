<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: { type: String, default: 'Useful links' },
  sectionId: { type: String, default: 'useful-links' },
  description: { type: String, default: '' },
  showTopSpacer: { type: Boolean, default: true },
  showBottomSpacer: { type: Boolean, default: true },
  links: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="scroll-mt-24" :aria-labelledby="sectionId">
    <div v-if="showTopSpacer" aria-hidden="true" class="h-px w-full bg-gradient-to-r from-transparent via-amber-300/75 to-transparent shadow-[0_0_10px_rgba(251,191,36,0.32)]"></div>

    <div class="relative overflow-hidden border border-amber-300/50 bg-[#07140c]/25 shadow-[0_0_32px_rgba(251,191,36,0.15),inset_0_0_24px_rgba(251,191,36,0.04)]">
      <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/75 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.5)]"></div>
      <div class="relative mx-auto max-w-2xl px-6 py-10 text-center sm:px-10 sm:py-12">
        <h2 :id="sectionId" :data-toc="title" class="text-2xl font-semibold tracking-wide sm:text-3xl">
          <span class="inline-block bg-gradient-to-r from-red-600 via-orange-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(251,191,36,0.14)]">
            {{ title }}
          </span>
        </h2>
        <p v-if="description" class="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-100">{{ description }}</p>

        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <component
            :is="link.to ? RouterLink : 'a'"
            v-for="link in links"
            :key="link.label"
            class="cursor-pointer rounded-full border border-amber-400/25 bg-white/[0.025] px-5 py-2.5 text-sm font-medium text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:border-amber-300/60 hover:bg-amber-300/10 hover:text-yellow-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            :to="link.to"
            :href="link.href"
            :target="link.target"
            :rel="link.target === '_blank' ? 'noreferrer' : undefined"
          >
            {{ link.label }}
          </component>
        </div>
      </div>
    </div>

    <div v-if="showBottomSpacer" aria-hidden="true" class="h-px w-full bg-gradient-to-r from-transparent via-amber-300/75 to-transparent shadow-[0_0_10px_rgba(251,191,36,0.32)]"></div>
  </section>
</template>
