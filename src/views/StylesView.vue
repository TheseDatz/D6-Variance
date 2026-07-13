<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <aside class="fixed top-40 left-8 z-10 hidden max-h-[calc(100vh-10rem)] w-48 overflow-y-auto lg:block">
      <PageTableOfContents />
    </aside>
    <PageHero title-id="styles" title="Styles" description="A workspace for reusable components and visual patterns." />
    <UsefulLinks
      title="Useful links"
      description="Quick routes to the core areas of D6V."
      :show-top-spacer="false"
      :links="usefulLinks"
    />
    <MainTextContent
      class="mt-16"
      section-id="main-text-content"
      title="Main text content"
      subtitle="A flexible, framed space for page copy, lists, media, and other content."
    >
      <p class="max-w-3xl leading-7">
        Place any page content in this area using the component slot. The frame stays deliberately light, keeping the focus on the information within it.
      </p>
    </MainTextContent>
  </main>
</template>

<script setup>
import PageHero from '../components/PageHero.vue'
import PageTableOfContents from '../components/PageTableOfContents.vue'
import MainTextContent from '../components/MainTextContent.vue'
import UsefulLinks from '../components/UsefulLinks.vue'

const usefulLinks = [
  { label: 'Return to Base', to: '/' },
  { label: 'Profile', to: '/profile' },
  { label: 'Admin', to: '/admin' },
]
</script>
