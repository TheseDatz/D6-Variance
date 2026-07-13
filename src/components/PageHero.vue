<script setup>
defineProps({
  title: { type: String, required: true },
  titleId: { type: String, default: '' },
  description: { type: String, default: '' },
  returnTo: { type: [String, Object], default: '/' },
  returnLabel: { type: String, default: 'Return to Base' },
})
</script>

<template>
  <header class="text-right">
    <RouterLink
      class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/65 transition hover:text-amber-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
      :to="returnTo"
    >
      <svg aria-hidden="true" class="size-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24">
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
      </svg>
      {{ returnLabel }}
    </RouterLink>

    <h1 :id="titleId || undefined" :data-toc="titleId ? title : undefined" class="mt-3 scroll-mt-24 text-4xl font-semibold tracking-wide sm:text-5xl">
      <span class="inline-block bg-gradient-to-r from-red-600 via-orange-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(251,191,36,0.16)]">
        {{ title }}
      </span>
    </h1>
    <p v-if="description" class="mt-2 ml-auto max-w-2xl text-sm leading-6 text-zinc-100">{{ description }}</p>
    <div aria-hidden="true" class="mt-3 ml-auto h-px w-2/3 bg-gradient-to-r from-transparent via-amber-300/55 to-amber-200/85 shadow-[0_0_10px_rgba(251,191,36,0.3)]"></div>
  </header>
</template>
