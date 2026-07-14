<script setup>
const props = defineProps({
  characterName: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  items: { type: Array, required: true },
  type: { type: String, required: true },
})

const isWeapon = props.type === 'weapons'
const isEquipment = props.type === 'equipment'
const title = isWeapon ? 'Weapons' : isEquipment ? 'Equipment' : 'Armour'
const fields = isWeapon
  ? [
      { key: 'name', label: 'Weapon' },
      { key: 'difficulty', label: 'Difficulty' },
      { key: 'damage', label: 'Damage' },
    ]
  : isEquipment
    ? [
        { key: 'name', label: 'Item' },
        { key: 'quantity', label: 'Quantity' },
      ]
    : [
      { key: 'name', label: 'Armour' },
      { key: 'resistance', label: 'Resistance' },
      { key: 'dexPenalty', label: 'Dex Penalty' },
    ]

function addItem() {
  if (props.disabled) return
  props.items.push(Object.fromEntries(fields.map((field) => [field.key, ''])))
}

function removeItem(index) {
  if (props.disabled || index < 1) return
  const itemName = props.items[index]?.name?.trim()
  const itemType = isWeapon ? 'weapon' : isEquipment ? 'equipment' : 'armour'
  const confirmed = window.confirm(
    `Remove ${itemName ? `“${itemName}”` : `this blank ${itemType} row`}?`,
  )

  if (confirmed) props.items.splice(index, 1)
}

function parseDiceRating(value) {
  const match = String(value ?? '').trim().match(/^(\d+)\s*d(?:\s*([+-])\s*(\d+))?$/i)
  if (!match) return null

  const diceCount = Number(match[1])
  const modifier = Number(match[3] || 0) * (match[2] === '-' ? -1 : 1)
  if (diceCount < 1 || diceCount > 30 || modifier < -99 || modifier > 99) return null
  return { diceCount, modifier }
}

function rollDamage(value) {
  const rating = parseDiceRating(value)
  if (!rating) return

  window.dispatchEvent(new CustomEvent('d6v-roll-dice', {
    detail: { ...rating, rollLabel: 'Damage', characterName: props.characterName },
  }))
}
</script>

<template>
  <section :class="{ 'equipment-panel--compact': isEquipment, 'equipment-panel--weapons': isWeapon }" class="equipment-panel">
    <header class="equipment-header">
      <h3>{{ title }}</h3>
      <button v-if="!disabled" class="add-equipment" type="button" @click="addItem">
        <span aria-hidden="true">+</span> Add
      </button>
    </header>

    <div class="equipment-labels" aria-hidden="true">
      <span v-for="field in fields" :key="field.key">{{ field.label }}</span>
      <span v-if="isWeapon"></span>
    </div>

    <div v-if="items.length" class="equipment-rows">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'equipment-row--removable': !disabled && index >= 1 }"
        class="equipment-row"
      >
        <button
          v-if="!disabled && index >= 1"
          :aria-label="`Remove ${title.toLowerCase()} row ${index + 1}`"
          class="remove-equipment"
          type="button"
          @click="removeItem(index)"
        >
          &minus;
        </button>
        <label v-for="field in fields" :key="field.key">
          <span class="sr-only">{{ field.label }} {{ index + 1 }}</span>
          <input
            v-model="item[field.key]"
            :aria-label="`${field.label} ${index + 1}`"
            :disabled="disabled || (item._isUnarmed && ['name', 'difficulty', 'damage'].includes(field.key))"
            :title="item._isUnarmed && field.key === 'damage' ? 'Calculated automatically from Strength' : undefined"
            type="text"
          />
        </label>
        <button
          v-if="isWeapon"
          class="damage-roll-button"
          type="button"
          :disabled="!parseDiceRating(item.damage)"
          aria-label="Roll weapon damage"
          title="Roll damage"
          @click="rollDamage(item.damage)"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/></svg>
        </button>
      </div>
    </div>

    <p v-else class="empty-equipment">No {{ title.toLowerCase() }} added.</p>
  </section>
</template>

<style scoped>
.equipment-panel {
  position: relative;
  min-width: 0;
  padding: 1rem;
  border: 1px solid rgb(252 211 77 / 0.24);
  background: rgb(255 255 255 / 0.012);
  box-shadow: inset 0 0 22px rgb(251 191 36 / 0.018);
}

.equipment-panel::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 1px;
  background: linear-gradient(transparent, rgb(252 211 77 / 0.65), transparent);
  content: '';
}

.equipment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgb(252 211 77 / 0.18);
}

.equipment-header h3 {
  color: rgb(253 230 138 / 0.9);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.add-equipment {
  border: 1px solid rgb(252 211 77 / 0.45);
  padding: 0.35rem 0.65rem;
  background: rgb(252 211 77 / 0.05);
  color: rgb(254 243 199);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
}

.add-equipment:hover,
.add-equipment:focus-visible {
  border-color: rgb(253 230 138 / 0.85);
  background: rgb(252 211 77 / 0.11);
  outline: none;
}

.equipment-labels,
.equipment-row {
  display: grid;
  grid-template-columns: minmax(7rem, 1fr) 6rem 5rem;
  gap: 0.45rem;
}

.equipment-row--removable {
  grid-template-columns: 1.5rem minmax(7rem, 1fr) 6rem 5rem;
}

.equipment-panel--weapons .equipment-labels,
.equipment-panel--weapons .equipment-row {
  grid-template-columns: minmax(7rem, 1fr) 6rem 5rem 2rem;
}

.equipment-panel--weapons .equipment-row--removable {
  grid-template-columns: 1.5rem minmax(7rem, 1fr) 6rem 5rem 2rem;
}

.equipment-panel--compact .equipment-labels,
.equipment-panel--compact .equipment-row {
  grid-template-columns: minmax(7rem, 1fr) 6rem;
}

.equipment-panel--compact .equipment-row--removable {
  grid-template-columns: 1.5rem minmax(7rem, 1fr) 6rem;
}

.equipment-labels {
  margin-top: 0.75rem;
  color: rgb(161 161 170);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.equipment-rows {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.4rem;
}

.equipment-row {
  align-items: center;
}

.equipment-row input {
  width: 100%;
  height: 2.3rem;
  border: 1px solid rgb(161 161 170 / 0.25);
  padding: 0.45rem 0.6rem;
  background: rgb(0 0 0 / 0.26);
  color: rgb(244 244 245);
  outline: none;
}

.equipment-row input:hover:not(:disabled),
.equipment-row input:focus {
  border-color: rgb(252 211 77 / 0.55);
  background: rgb(252 211 77 / 0.035);
  box-shadow: 0 0 12px rgb(251 191 36 / 0.08);
}

.equipment-row input:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.remove-equipment {
  width: 1.4rem;
  height: 1.4rem;
  border: 1px solid rgb(248 113 113 / 0.45);
  border-radius: 999px;
  background: rgb(127 29 29 / 0.12);
  color: rgb(252 165 165);
  line-height: 1;
  cursor: pointer;
}

.remove-equipment:hover,
.remove-equipment:focus-visible {
  border-color: rgb(252 165 165 / 0.85);
  background: rgb(127 29 29 / 0.35);
  outline: none;
}

.damage-roll-button { display: grid; width: 2rem; height: 2rem; place-items: center; border: 1px solid rgb(252 211 77 / 0.42); border-radius: 999px; background: rgb(252 211 77 / 0.06); color: rgb(253 230 138); cursor: pointer; transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease; }
.damage-roll-button svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 1.5; }
.damage-roll-button:hover:not(:disabled), .damage-roll-button:focus-visible:not(:disabled) { border-color: rgb(253 230 138); background: rgb(252 211 77 / 0.14); box-shadow: 0 0 12px rgb(251 191 36 / 0.25); outline: none; transform: translateY(-1px); }
.damage-roll-button:disabled { cursor: not-allowed; opacity: 0.24; }

.empty-equipment {
  padding: 1.5rem 0.5rem 0.75rem;
  color: rgb(113 113 122);
  font-size: 0.72rem;
  text-align: center;
}

@media (max-width: 560px) {
  .equipment-panel {
    overflow-x: auto;
  }

  .equipment-labels,
  .equipment-row {
    min-width: 29rem;
  }

  .equipment-panel--weapons .equipment-labels,
  .equipment-panel--weapons .equipment-row {
    min-width: 31.5rem;
  }

  .equipment-panel--compact .equipment-labels,
  .equipment-panel--compact .equipment-row {
    min-width: 20rem;
  }
}
</style>
