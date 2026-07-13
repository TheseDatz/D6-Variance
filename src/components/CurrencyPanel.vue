<script setup>
import { ref } from 'vue'

defineProps({
  currencies: { type: Array, required: true },
  disabled: { type: Boolean, default: false },
})

const editingIndex = ref(null)
</script>

<template>
  <section class="currency-panel">
    <header class="currency-header">
      <h3>Currency</h3>
    </header>

    <div class="currency-grid">
      <label v-for="(currency, index) in currencies" :key="index" class="currency-field">
        <input
          v-if="editingIndex === index && !disabled"
          v-model="currency.name"
          :aria-label="`Currency ${index + 1} name`"
          autofocus
          class="currency-name-input"
          type="text"
          @blur="editingIndex = null"
          @keyup.enter="editingIndex = null"
          @keyup.esc="editingIndex = null"
        />
        <button
          v-else-if="!disabled"
          class="currency-name-button"
          type="button"
          @click.prevent="editingIndex = index"
        >
          {{ currency.name || 'Unnamed currency' }}
        </button>
        <span v-else class="currency-name-label">{{ currency.name || 'Unnamed currency' }}</span>

        <input
          v-model="currency.amount"
          :aria-label="`${currency.name || `Currency ${index + 1}`} amount`"
          class="currency-amount"
          :disabled="disabled"
          inputmode="decimal"
          type="text"
        />
      </label>
    </div>
  </section>
</template>

<style scoped>
.currency-panel {
  position: relative;
  min-width: 0;
  padding: 1rem;
  border: 1px solid rgb(252 211 77 / 0.24);
  background: rgb(255 255 255 / 0.012);
  box-shadow: inset 0 0 22px rgb(251 191 36 / 0.018);
}

.currency-panel::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 1px;
  background: linear-gradient(transparent, rgb(252 211 77 / 0.65), transparent);
  content: '';
}

.currency-header {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgb(252 211 77 / 0.18);
}

.currency-header h3 {
  color: rgb(253 230 138 / 0.9);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.currency-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 0.85rem;
}

.currency-field {
  display: block;
  min-width: 0;
}

.currency-name-button,
.currency-name-label,
.currency-name-input {
  display: block;
  width: 100%;
  min-height: 1.4rem;
  margin-bottom: 0.3rem;
  border: 0;
  padding: 0;
  background: transparent;
  color: rgb(253 230 138 / 0.68);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-align: left;
  text-transform: uppercase;
}

.currency-name-button {
  cursor: text;
}

.currency-name-button:hover,
.currency-name-button:focus-visible {
  color: rgb(254 243 199);
  text-decoration: underline;
  text-underline-offset: 0.2rem;
  outline: none;
}

.currency-name-input {
  border-bottom: 1px solid rgb(252 211 77 / 0.6);
  outline: none;
}

.currency-amount {
  width: 100%;
  height: 2.3rem;
  border: 1px solid rgb(161 161 170 / 0.25);
  padding: 0.45rem 0.6rem;
  background: rgb(0 0 0 / 0.26);
  color: rgb(244 244 245);
  outline: none;
}

.currency-amount:hover:not(:disabled),
.currency-amount:focus {
  border-color: rgb(252 211 77 / 0.55);
  background: rgb(252 211 77 / 0.035);
  box-shadow: 0 0 12px rgb(251 191 36 / 0.08);
}

.currency-amount:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

@media (max-width: 480px) {
  .currency-grid {
    grid-template-columns: 1fr;
  }
}
</style>
