<script setup>
import { computed } from 'vue'

const props = defineProps({
  creatorLimits: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  languages: { type: Array, required: true },
})

const additionalProficientCount = computed(() => props.languages.filter(
  (language) => language.proficiency === 'proficient',
).length)
const noviceCount = computed(() => props.languages.filter(
  (language) => language.proficiency === 'novice',
).length)

function addLanguage(proficiency = 'novice') {
  if (props.disabled) return
  if (props.creatorLimits) {
    if (proficiency === 'proficient' && additionalProficientCount.value >= 1) return
    if (proficiency === 'novice' && noviceCount.value >= 1) return
  }
  props.languages.push({ name: '', proficiency })
}

function removeLanguage(index) {
  if (props.disabled) return
  const language = props.languages[index]
  const confirmed = window.confirm(`Remove ${language?.name?.trim() || 'this blank language'}?`)
  if (confirmed) props.languages.splice(index, 1)
}
</script>

<template>
  <section class="languages-panel">
    <header class="languages-header">
      <h3>Languages</h3>
      <button v-if="!disabled && !creatorLimits" class="language-add" type="button" @click="addLanguage('novice')">+ Add</button>
    </header>

    <div class="language-rows">
      <div v-for="(language, index) in languages" :key="index" class="language-row">
        <button
          v-if="!disabled"
          :aria-label="`Remove ${language.name || 'language'}`"
          class="language-remove"
          type="button"
          @click="removeLanguage(index)"
        >&minus;</button>
        <span v-else class="language-control-spacer" aria-hidden="true"></span>
        <input
          v-model="language.name"
          :aria-label="`Language ${index + 1} name`"
          :disabled="disabled"
          type="text"
        />
        <select v-model="language.proficiency" :aria-label="`${language.name || `Language ${index + 1}`} proficiency`" :disabled="disabled || creatorLimits">
          <option value="proficient">Proficient</option>
          <option value="novice">Novice</option>
        </select>
      </div>
    </div>

    <div v-if="creatorLimits && !disabled" class="creator-language-actions">
      <button :disabled="additionalProficientCount >= 1" type="button" @click="addLanguage('proficient')">+ Proficient</button>
      <button :disabled="noviceCount >= 1" type="button" @click="addLanguage('novice')">+ Novice</button>
    </div>
  </section>
</template>

<style scoped>
.languages-panel {
  position: relative;
  min-width: 0;
  height: 100%;
  padding: 1rem;
  border: 1px solid rgb(252 211 77 / 0.24);
  background: rgb(255 255 255 / 0.012);
  box-shadow: inset 0 0 22px rgb(251 191 36 / 0.018);
}

.languages-panel::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 1px;
  background: linear-gradient(transparent, rgb(252 211 77 / 0.65), transparent);
  content: '';
}

.languages-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgb(252 211 77 / 0.18);
}

.languages-header h3 {
  color: rgb(253 230 138 / 0.9);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.language-add,
.creator-language-actions button {
  border: 1px solid rgb(252 211 77 / 0.4);
  padding: 0.3rem 0.5rem;
  background: rgb(252 211 77 / 0.05);
  color: rgb(254 243 199);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
}

.language-rows {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.language-row {
  display: grid;
  grid-template-columns: 1.4rem minmax(0, 1fr) 6.5rem;
  align-items: center;
  gap: 0.4rem;
}

.language-row input,
.language-row select {
  width: 100%;
  height: 2.25rem;
  border: 1px solid rgb(161 161 170 / 0.25);
  padding: 0.4rem 0.5rem;
  background: rgb(0 0 0 / 0.28);
  color: rgb(244 244 245);
  font-size: 0.72rem;
  outline: none;
}

.language-row input:focus,
.language-row select:focus {
  border-color: rgb(252 211 77 / 0.6);
}

.language-row input:disabled,
.language-row select:disabled {
  opacity: 0.75;
}

.language-remove {
  width: 1.35rem;
  height: 1.35rem;
  border: 1px solid rgb(248 113 113 / 0.45);
  border-radius: 999px;
  background: rgb(127 29 29 / 0.12);
  color: rgb(252 165 165);
  cursor: pointer;
}

.creator-language-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.75rem;
  padding-left: 1.8rem;
}

.creator-language-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}
</style>
