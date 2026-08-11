<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
  items: { type: Array, required: true },
  title: { type: String, required: true },
  withDiceModifier: { type: Boolean, default: false },
})

const modalMode = ref('')
const selectedIndex = ref(null)
const draft = reactive({ name: '', description: '', diceModifier: '' })

function openAdd() {
  if (props.disabled) return
  selectedIndex.value = null
  draft.name = ''
  draft.description = ''
  draft.diceModifier = ''
  modalMode.value = 'edit'
}

function openInfo(index) {
  selectedIndex.value = index
  modalMode.value = 'view'
}

function openEdit() {
  if (props.disabled || selectedIndex.value === null) return
  const item = props.items[selectedIndex.value]
  draft.name = item?.name || ''
  draft.description = item?.description || ''
  draft.diceModifier = item?.diceModifier || ''
  modalMode.value = 'edit'
}

function saveDraft() {
  if (props.disabled || !draft.name.trim()) return
  const entry = {
    name: draft.name.trim(),
    description: draft.description.trim(),
    ...(props.withDiceModifier ? { diceModifier: draft.diceModifier.trim() } : {}),
  }

  if (selectedIndex.value === null) {
    props.items.push(entry)
    selectedIndex.value = props.items.length - 1
  } else {
    props.items[selectedIndex.value] = entry
  }

  modalMode.value = 'view'
}

function deleteEntry() {
  if (props.disabled || selectedIndex.value === null) return
  const item = props.items[selectedIndex.value]
  const confirmed = window.confirm(
    `Permanently remove “${item?.name || 'this detail'}” from ${props.title}?`,
  )

  if (!confirmed) return
  props.items.splice(selectedIndex.value, 1)
  closeModal()
}

function closeModal() {
  modalMode.value = ''
  selectedIndex.value = null
}
</script>

<template>
  <section class="details-panel">
    <header class="details-panel-header">
      <h3>{{ title }}</h3>
      <button v-if="!disabled" class="add-detail" type="button" @click="openAdd">
        <span aria-hidden="true">+</span> Add
      </button>
    </header>

    <div v-if="items.length" class="detail-rows">
      <div v-for="(item, index) in items" :key="index" class="detail-row">
        <span>{{ item.name || 'Unnamed detail' }}</span>
        <span v-if="withDiceModifier && item.diceModifier" class="dice-modifier">{{ item.diceModifier }}</span>
        <button :aria-label="`View ${item.name || title} information`" class="info-button" type="button" @click="openInfo(index)">
          i
        </button>
      </div>
    </div>
    <p v-else class="empty-details">No {{ title.toLowerCase() }} added.</p>

    <Teleport to="body">
      <div v-if="modalMode" class="detail-modal-backdrop" @mousedown.self="closeModal">
        <section class="detail-modal" role="dialog" aria-modal="true" :aria-label="`${title} detail`">
          <div aria-hidden="true" class="modal-glow"></div>

          <template v-if="modalMode === 'view'">
            <p class="modal-kicker">{{ title }}</p>
            <h2>{{ items[selectedIndex]?.name || 'Unnamed detail' }}</h2>
            <p v-if="withDiceModifier && items[selectedIndex]?.diceModifier" class="modifier-display">
              Attribute allocation modifier: <strong>{{ items[selectedIndex].diceModifier }}</strong>
            </p>
            <p class="detail-description">{{ items[selectedIndex]?.description || 'No description provided.' }}</p>

            <div class="modal-actions">
              <button v-if="!disabled" class="modal-primary" type="button" @click="openEdit">Edit</button>
              <button class="modal-secondary" type="button" @click="closeModal">Close</button>
            </div>
          </template>

          <form v-else @submit.prevent="saveDraft">
            <p class="modal-kicker">{{ selectedIndex === null ? `Add ${title}` : `Edit ${title}` }}</p>
            <label class="modal-field">
              <span>Name</span>
              <input v-model="draft.name" autofocus required type="text" />
            </label>
            <label class="modal-field mt-4">
              <span>Description</span>
              <textarea v-model="draft.description" rows="7"></textarea>
            </label>
            <label v-if="withDiceModifier" class="modal-field mt-4">
              <span>Attribute Allocation Modifier</span>
              <input v-model="draft.diceModifier" placeholder="e.g. −1 pip, −1D, or +2 pips" type="text" />
            </label>

            <div class="modal-actions">
              <button
                v-if="selectedIndex !== null"
                class="modal-delete"
                type="button"
                @click="deleteEntry"
              >
                Delete
              </button>
              <button class="modal-primary" :disabled="!draft.name.trim()" type="submit">Save</button>
              <button class="modal-secondary" type="button" @click="closeModal">Discard</button>
            </div>
          </form>
        </section>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.details-panel {
  position: relative;
  min-width: 0;
  padding: 1rem;
  border: 1px solid rgb(252 211 77 / 0.24);
  background: rgb(255 255 255 / 0.012);
  box-shadow: inset 0 0 22px rgb(251 191 36 / 0.018);
}

.details-panel::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 1px;
  background: linear-gradient(transparent, rgb(252 211 77 / 0.65), transparent);
  content: '';
}

.details-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgb(252 211 77 / 0.18);
}

.details-panel-header h3 {
  color: rgb(253 230 138 / 0.9);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.add-detail {
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

.add-detail:hover,
.add-detail:focus-visible {
  border-color: rgb(253 230 138 / 0.85);
  background: rgb(252 211 77 / 0.11);
  outline: none;
}

.detail-rows {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.detail-row {
  display: flex;
  min-height: 2.3rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border: 1px solid rgb(161 161 170 / 0.25);
  padding: 0.35rem 0.45rem 0.35rem 0.7rem;
  background: rgb(0 0 0 / 0.26);
  color: rgb(244 244 245);
  font-size: 0.85rem;
}

.detail-row > span:first-child {
  min-width: 0;
  flex: 1;
}

.dice-modifier {
  flex: 0 0 auto;
  color: rgb(186 230 253);
  font-size: 0.7rem;
  font-weight: 700;
}

.info-button {
  display: grid;
  width: 1.55rem;
  height: 1.55rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgb(125 211 252 / 0.5);
  border-radius: 999px;
  background: rgb(14 165 233 / 0.08);
  color: rgb(186 230 253);
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
}

.info-button:hover,
.info-button:focus-visible {
  border-color: rgb(186 230 253 / 0.9);
  box-shadow: 0 0 12px rgb(14 165 233 / 0.18);
  outline: none;
}

.empty-details {
  padding: 1.5rem 0.5rem 0.75rem;
  color: rgb(113 113 122);
  font-size: 0.72rem;
  text-align: center;
}

.detail-modal-backdrop {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgb(0 0 0 / 0.78);
  backdrop-filter: blur(4px);
}

.detail-modal {
  position: relative;
  width: min(100%, 34rem);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  border: 1px solid rgb(252 211 77 / 0.48);
  padding: 1.5rem;
  background: rgb(5 8 7 / 0.98);
  color: rgb(244 244 245);
  box-shadow: 0 0 40px rgb(251 191 36 / 0.14);
}

.modal-glow {
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgb(253 230 138), transparent);
  box-shadow: 0 0 12px rgb(251 191 36 / 0.55);
}

.modal-kicker,
.modal-field > span {
  color: rgb(253 230 138 / 0.65);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.detail-modal h2 {
  margin-top: 0.5rem;
  color: rgb(254 243 199);
  font-size: 1.5rem;
  font-weight: 600;
}

.detail-description {
  margin-top: 1rem;
  color: rgb(212 212 216);
  font-size: 0.9rem;
  line-height: 1.7;
  white-space: pre-wrap;
}

.modifier-display {
  margin-top: 0.75rem;
  color: rgb(161 161 170);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.modifier-display strong {
  color: rgb(186 230 253);
}

.modal-field {
  display: block;
  margin-top: 1rem;
}

.modal-field > span {
  display: block;
  margin-bottom: 0.4rem;
}

.modal-field input,
.modal-field textarea {
  width: 100%;
  border: 1px solid rgb(252 211 77 / 0.3);
  padding: 0.65rem 0.75rem;
  background: rgb(0 0 0 / 0.35);
  color: rgb(244 244 245);
  outline: none;
}

.modal-field textarea {
  resize: vertical;
  line-height: 1.6;
}

.modal-field input:focus,
.modal-field textarea:focus {
  border-color: rgb(252 211 77 / 0.75);
  box-shadow: 0 0 14px rgb(251 191 36 / 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.65rem;
  margin-top: 1.5rem;
}

.modal-primary,
.modal-secondary,
.modal-delete {
  border: 1px solid rgb(252 211 77 / 0.45);
  padding: 0.55rem 0.9rem;
  background: rgb(252 211 77 / 0.07);
  color: rgb(254 243 199);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
}

.modal-delete {
  margin-right: auto;
  border-color: rgb(248 113 113 / 0.5);
  background: rgb(127 29 29 / 0.16);
  color: rgb(254 202 202);
}

.modal-delete:hover,
.modal-delete:focus-visible {
  border-color: rgb(252 165 165 / 0.9);
  background: rgb(127 29 29 / 0.38);
  outline: none;
}

.modal-secondary {
  border-color: rgb(161 161 170 / 0.35);
  background: transparent;
  color: rgb(212 212 216);
}

.modal-primary:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}
</style>
