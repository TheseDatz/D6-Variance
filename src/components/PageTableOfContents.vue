<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  rootSelector: { type: String, default: 'main' },
  headingSelector: { type: String, default: '[data-toc][id]' },
  label: { type: String, default: 'On this page' },
})

const sections = ref([])
const activeId = ref('')
let observer
let mutationObserver

function setActiveSection() {
  const offset = 112
  const visibleSection = sections.value
    .map((section) => document.getElementById(section.id))
    .filter(Boolean)
    .reduce((closest, element) => {
      if (!closest || Math.abs(element.getBoundingClientRect().top - offset) < Math.abs(closest.getBoundingClientRect().top - offset)) {
        return element
      }
      return closest
    }, null)

  if (visibleSection) activeId.value = visibleSection.id
}

function collectSections() {
  const root = document.querySelector(props.rootSelector)
  if (!root) return

  sections.value = [...root.querySelectorAll(props.headingSelector)].map((element) => ({
    id: element.id,
    label: element.dataset.toc || element.textContent.trim(),
  }))

  setActiveSection()
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(async () => {
  await nextTick()
  collectSections()

  observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting)
      if (visibleEntries.length) {
        activeId.value = visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id
      }
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
  )

  sections.value.forEach(({ id }) => {
    const section = document.getElementById(id)
    if (section) observer.observe(section)
  })

  mutationObserver = new MutationObserver(collectSections)
  const root = document.querySelector(props.rootSelector)
  if (root) mutationObserver.observe(root, { childList: true, subtree: true })
  window.addEventListener('scroll', setActiveSection, { passive: true })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  mutationObserver?.disconnect()
  window.removeEventListener('scroll', setActiveSection)
})
</script>

<template>
  <nav v-if="sections.length" :aria-label="label" class="border-l border-amber-300/45 pl-4 shadow-[-5px_0_16px_rgba(251,191,36,0.12)]">
    <p class="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-amber-200/80">{{ label }}</p>
    <ol class="space-y-1">
      <li v-for="section in sections" :key="section.id">
        <button
          class="-ml-[17px] block w-full border-l-2 py-1 pl-4 text-left text-xs leading-5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          :class="activeId === section.id ? 'border-amber-200 text-amber-50 drop-shadow-[0_0_8px_rgba(251,191,36,0.32)]' : 'border-transparent text-zinc-100 hover:border-amber-300/70 hover:text-amber-100'"
          :aria-current="activeId === section.id ? 'location' : undefined"
          type="button"
          @click="scrollToSection(section.id)"
        >
          {{ section.label }}
        </button>
      </li>
    </ol>
  </nav>
</template>
