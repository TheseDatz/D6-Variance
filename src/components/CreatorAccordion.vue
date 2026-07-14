<script setup>
defineProps({
  complete: { type: Boolean, default: false },
  open: { type: Boolean, default: false },
  title: { type: String, required: true },
})

defineEmits(['toggle'])
</script>

<template>
  <section :class="{ 'creator-accordion--complete': complete }" class="creator-accordion">
    <button
      :aria-expanded="open"
      class="accordion-trigger"
      type="button"
      @click="$emit('toggle')"
    >
      <span class="accordion-title">{{ title }}</span>
      <svg aria-hidden="true" :class="{ 'rotate-180': open }" class="accordion-chevron" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
        <path d="m6 9 6 6 6-6" />
      </svg>
      <span :aria-label="complete ? `${title} complete` : `${title} incomplete`" class="completion-icon" role="img">
        <svg v-if="complete" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25" viewBox="0 0 24 24">
          <path d="m5 12 4 4L19 6" />
        </svg>
        <svg v-else aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2.25" viewBox="0 0 24 24">
          <path d="m7 7 10 10M17 7 7 17" />
        </svg>
      </span>
    </button>

    <div v-show="open" class="accordion-content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.creator-accordion {
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(252 211 77 / 0.28);
  background: rgb(5 8 7 / 0.72);
  box-shadow: inset 0 0 28px rgb(251 191 36 / 0.018);
}

.creator-accordion::before {
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgb(252 211 77 / 0.55), transparent);
  content: '';
}

.accordion-trigger {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 1rem;
  border: 0;
  padding: 1rem 1.15rem;
  background: rgb(252 211 77 / 0.025);
  color: rgb(254 243 199);
  text-align: left;
  cursor: pointer;
}

.accordion-trigger:hover,
.accordion-trigger:focus-visible {
  background: rgb(252 211 77 / 0.06);
  outline: none;
}

.accordion-title {
  font-size: 1.1rem;
  font-weight: 650;
  letter-spacing: 0.035em;
}

.accordion-chevron {
  width: 1.2rem;
  height: 1.2rem;
  color: rgb(253 230 138 / 0.65);
  transition: transform 180ms ease;
}

.completion-icon {
  display: grid;
  width: 1.8rem;
  height: 1.8rem;
  justify-self: end;
  place-items: center;
  border: 1px solid rgb(248 113 113 / 0.65);
  border-radius: 999px;
  color: rgb(248 113 113);
  box-shadow: 0 0 12px rgb(239 68 68 / 0.1);
}

.completion-icon svg {
  width: 1rem;
  height: 1rem;
}

.creator-accordion--complete .completion-icon {
  border-color: rgb(74 222 128 / 0.7);
  color: rgb(74 222 128);
  box-shadow: 0 0 14px rgb(34 197 94 / 0.16);
}

.accordion-content {
  border-top: 1px solid rgb(252 211 77 / 0.18);
  padding: 1.25rem;
}

@media (min-width: 640px) {
  .accordion-trigger {
    padding: 1.1rem 1.4rem;
  }

  .accordion-title {
    font-size: 1.3rem;
  }

  .accordion-content {
    padding: 1.5rem;
  }
}
</style>
