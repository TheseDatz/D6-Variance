<script setup>
defineProps({
  title: { type: String, required: true },
  sectionId: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <section class="relative scroll-mt-24" :aria-labelledby="sectionId">
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-amber-200/75 shadow-[0_0_10px_rgba(251,191,36,0.36)]"></div>
    <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-amber-200/75 shadow-[0_0_10px_rgba(251,191,36,0.36)]"></div>
    <div aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 w-px bg-[linear-gradient(to_bottom,rgba(253,230,138,0.75),rgba(252,211,77,0.16)_28%,transparent_48%,transparent_52%,rgba(252,211,77,0.16)_72%,rgba(253,230,138,0.75))] shadow-[0_0_8px_rgba(251,191,36,0.28)]"></div>
    <div aria-hidden="true" class="pointer-events-none absolute inset-y-0 right-0 w-px bg-[linear-gradient(to_bottom,rgba(253,230,138,0.75),rgba(252,211,77,0.16)_28%,transparent_48%,transparent_52%,rgba(252,211,77,0.16)_72%,rgba(253,230,138,0.75))] shadow-[0_0_8px_rgba(251,191,36,0.28)]"></div>

    <div class="relative px-6 py-10 sm:px-10 sm:py-12">
      <header>
        <h2 :id="sectionId" :data-toc="title" class="text-2xl font-semibold tracking-wide sm:text-3xl">
          <span class="inline-block bg-gradient-to-r from-red-600 via-orange-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(251,191,36,0.14)]">
            {{ title }}
          </span>
        </h2>
        <p v-if="subtitle" class="mt-2 max-w-2xl text-sm leading-6 text-zinc-100">{{ subtitle }}</p>
      </header>

      <div class="mt-7 text-zinc-100">
        <slot />
      </div>
    </div>
  </section>
</template>
