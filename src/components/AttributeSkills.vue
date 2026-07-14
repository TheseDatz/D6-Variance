<script setup>
const props = defineProps({
  attribute: { type: Object, required: true },
  characterName: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  name: { type: String, required: true },
})

function addSkill() {
  if (props.disabled) return
  props.attribute.skills.push({ name: '', dice: '' })
}

function removeSkill(index) {
  if (props.disabled || index < 3) return

  const skillName = props.attribute.skills[index]?.name?.trim()
  const confirmed = window.confirm(
    `Remove ${skillName ? `the skill “${skillName}”` : 'this blank skill row'} from ${props.name}?`,
  )

  if (confirmed) props.attribute.skills.splice(index, 1)
}

function parseDiceRating(value) {
  const match = String(value ?? '').trim().match(/^(\d+)\s*d(?:\s*([+-])\s*(\d+))?$/i)
  if (!match) return null

  const diceCount = Number(match[1])
  const modifier = Number(match[3] || 0) * (match[2] === '-' ? -1 : 1)
  if (diceCount < 1 || diceCount > 30 || modifier < -99 || modifier > 99) return null
  return { diceCount, modifier }
}

function roll(value, label) {
  const rating = parseDiceRating(value)
  if (!rating) return

  window.dispatchEvent(new CustomEvent('d6v-roll-dice', {
    detail: { ...rating, rollLabel: label, characterName: props.characterName },
  }))
}
</script>

<template>
  <section class="attribute-card">
    <header class="attribute-header">
      <div>
        <h3>{{ name }}</h3>
        <button
          v-if="!disabled"
          class="add-skill-button"
          type="button"
          @click="addSkill"
        >
          <span aria-hidden="true">+</span> Add skill
        </button>
      </div>
      <div class="attribute-roll-group">
        <label class="attribute-dice">
          <span class="sr-only">{{ name }} dice</span>
          <input v-model="attribute.dice" :aria-label="`${name} attribute dice`" :disabled="disabled" type="text" />
        </label>
        <button class="trait-roll-button" type="button" :disabled="!parseDiceRating(attribute.dice)" :aria-label="`Roll ${name}`" :title="`Roll ${name}`" @click="roll(attribute.dice, name)">
          <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/></svg>
        </button>
      </div>
    </header>

    <div class="skill-list">
      <div
        v-for="(skill, index) in attribute.skills"
        :key="index"
        :class="{ 'skill-row--removable': index >= 3 }"
        class="skill-row"
      >
        <button
          v-if="index >= 3 && !disabled"
          :aria-label="`Remove ${name} skill row ${index + 1}`"
          class="remove-skill-button"
          title="Remove skill"
          type="button"
          @click="removeSkill(index)"
        >
          &minus;
        </button>
        <label class="skill-name">
          <span class="sr-only">{{ name }} skill {{ index + 1 }} name</span>
          <input
            v-model="skill.name"
            :aria-label="`${name} skill ${index + 1} name`"
            :disabled="disabled"
            type="text"
          />
        </label>
        <label class="skill-dice">
          <span class="sr-only">{{ name }} skill {{ index + 1 }} dice</span>
          <input
            v-model="skill.dice"
            :aria-label="`${name} skill ${index + 1} dice`"
            :disabled="disabled"
            type="text"
          />
        </label>
        <button class="trait-roll-button skill-roll-button" type="button" :disabled="!parseDiceRating(skill.dice)" :aria-label="`Roll ${skill.name || `${name} skill ${index + 1}`}`" :title="`Roll ${skill.name || 'skill'}`" @click="roll(skill.dice, skill.name.trim() || `${name} Skill`)" >
          <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.attribute-card {
  position: relative;
  padding: 1rem;
  border: 1px solid rgb(252 211 77 / 0.24);
  background: rgb(255 255 255 / 0.012);
  box-shadow: inset 0 0 22px rgb(251 191 36 / 0.018);
}

.attribute-card::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 1px;
  background: linear-gradient(transparent, rgb(252 211 77 / 0.65), transparent);
  content: '';
}

.attribute-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgb(252 211 77 / 0.18);
}

.attribute-header h3 {
  color: rgb(253 230 138 / 0.82);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.add-skill-button {
  margin-top: 0.35rem;
  border: 0;
  padding: 0;
  background: transparent;
  color: rgb(125 211 252 / 0.65);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
}

.add-skill-button:hover,
.add-skill-button:focus-visible {
  color: rgb(186 230 253);
  outline: none;
}

.attribute-dice {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  color: rgb(161 161 170);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.attribute-roll-group { display: flex; align-items: center; gap: 0.45rem; }

.trait-roll-button { display: grid; flex: 0 0 auto; width: 2rem; height: 2rem; place-items: center; border: 1px solid rgb(252 211 77 / 0.42); border-radius: 999px; background: rgb(252 211 77 / 0.06); color: rgb(253 230 138); cursor: pointer; transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease; }
.trait-roll-button svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 1.5; }
.trait-roll-button:hover:not(:disabled), .trait-roll-button:focus-visible:not(:disabled) { border-color: rgb(253 230 138); background: rgb(252 211 77 / 0.14); box-shadow: 0 0 12px rgb(251 191 36 / 0.25); outline: none; transform: translateY(-1px); }
.trait-roll-button:disabled { cursor: not-allowed; opacity: 0.24; }

.attribute-dice input {
  width: 3.25rem;
  height: 2rem;
  border: 1px solid rgb(252 211 77 / 0.45);
  background: rgb(252 211 77 / 0.05);
  color: rgb(254 243 199);
  text-align: center;
}

.skill-list {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.skill-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 4.25rem 2rem;
  gap: 0.5rem;
}

.skill-row--removable {
  grid-template-columns: 1.5rem minmax(0, 1fr) 4.25rem 2rem;
}

.skill-roll-button { align-self: center; }

.remove-skill-button {
  align-self: center;
  width: 1.4rem;
  height: 1.4rem;
  border: 1px solid rgb(248 113 113 / 0.45);
  border-radius: 999px;
  background: rgb(127 29 29 / 0.12);
  color: rgb(252 165 165);
  font-size: 0.9rem;
  line-height: 1;
  cursor: pointer;
}

.remove-skill-button:hover,
.remove-skill-button:focus-visible {
  border-color: rgb(252 165 165 / 0.85);
  background: rgb(127 29 29 / 0.35);
  outline: none;
}

.skill-row input {
  width: 100%;
  height: 2.25rem;
  border: 1px solid rgb(161 161 170 / 0.25);
  background: rgb(0 0 0 / 0.24);
  color: rgb(244 244 245);
  outline: none;
  transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
}

.skill-name input {
  padding: 0.45rem 0.65rem;
}

.skill-dice input {
  padding: 0.35rem;
  color: rgb(186 230 253);
  text-align: center;
}

input:hover:not(:disabled) {
  border-color: rgb(252 211 77 / 0.48);
}

input:focus {
  border-color: rgb(125 211 252 / 0.72);
  background: rgb(14 165 233 / 0.035);
  box-shadow: 0 0 12px rgb(14 165 233 / 0.1);
  outline: none;
}

input:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
