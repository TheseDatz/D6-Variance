<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { deleteCharacter, loadCharacter, saveCharacter } from '../services/characters'
import { getSession, isAdminSession } from '../services/auth'
import AttributeSkills from '../components/AttributeSkills.vue'
import EquipmentList from '../components/EquipmentList.vue'
import CurrencyPanel from '../components/CurrencyPanel.vue'
import AdditionalDetailsPanel from '../components/AdditionalDetailsPanel.vue'

const ATTRIBUTE_NAMES = ['Strength', 'Dexterity', 'Social', 'Intelligence', 'Luck', 'Paranormal']

const route = useRoute()
const router = useRouter()
const character = ref(null)
const session = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const imageFailed = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const saveMessage = ref('')
const saveError = ref('')
const editingName = ref(false)
const editingPlayerName = ref(false)
const editingImage = ref(false)
const imageUrlDraft = ref('')
const nameInput = ref(null)
const playerNameInput = ref(null)

const display = computed(() => character.value || {})
const passiveDefense = computed(() => {
  const dexterityDice = character.value?.attributes?.dexterity?.dice
  if (dexterityDice === null || dexterityDice === undefined || String(dexterityDice).trim() === '') return ''

  const match = String(dexterityDice).trim().match(/^(\d+)\s*d?/i)
  if (!match) return ''

  const bonus = Math.max(0, Math.floor((Number(match[1]) - 2) / 2))
  return `+${bonus}`
})
const canManageCharacter = computed(() => {
  if (!session.value || !character.value) return false
  return isAdminSession(session.value) || character.value._ownerId === session.value.user.id
})

const healthSummary = computed(() => {
  const current = Number(character.value?.currentHealth)
  const total = Number(character.value?.totalHealth)

  if (!Number.isFinite(current) || !Number.isFinite(total) || total <= 0) {
    return null
  }

  const percentage = Math.max(0, Math.min(100, Math.round((current / total) * 100)))

  if (percentage === 100) {
    return {
      percentage,
      status: 'Healthy',
      effect: 'The character is in peak condition and suffers no health penalties.',
      tone: 'healthy',
      mood: 'happy',
    }
  }
  if (percentage >= 81) {
    return {
      percentage,
      status: 'Bruised',
      effect: 'The character has taken minor damage but suffers no action penalties.',
      tone: 'bruised',
      mood: 'neutral',
    }
  }
  if (percentage >= 60) {
    return {
      percentage,
      status: 'Stunned',
      effect: '-1D to all remaining actions in the round when the character becomes stunned.',
      tone: 'stunned',
      mood: 'dazed',
    }
  }
  if (percentage >= 40) {
    return {
      percentage,
      status: 'Wounded',
      effect: 'The character is at -1D to all actions until healed.',
      tone: 'wounded',
      mood: 'sad',
    }
  }
  if (percentage >= 20) {
    return {
      percentage,
      status: 'Severely Wounded',
      effect: 'The character is at -2D to all actions until healed.',
      tone: 'severely-wounded',
      mood: 'sad',
    }
  }
  if (percentage >= 10) {
    return {
      percentage,
      status: 'Incapacitated',
      effect: 'Knocked out for 10d minutes.',
      tone: 'incapacitated',
      mood: 'unconscious',
    }
  }
  if (percentage >= 1) {
    return {
      percentage,
      status: 'Mortally Wounded',
      effect: "Roll the character's Physique each round. The character dies if the roll is less than the number of minutes they have been at this level.",
      tone: 'mortal',
      mood: 'critical',
    }
  }

  return { percentage, status: 'Dead', effect: 'This character has perished.', tone: 'dead', mood: 'dead' }
})

function valueOrBlank(value) {
  return value ?? ''
}

function inputFontSize(value) {
  const length = String(value ?? '').length

  if (length <= 3) return '1.25rem'
  if (length === 4) return '1rem'
  if (length === 5) return '0.8rem'
  return '0.65rem'
}

function ensureAttributes(target) {
  if (!target.attributes || typeof target.attributes !== 'object') {
    target.attributes = {}
  }

  for (const name of ATTRIBUTE_NAMES) {
    const key = name.toLowerCase()
    const existing = target.attributes[key]
    const skills = Array.isArray(existing?.skills) ? existing.skills.slice() : []

    while (skills.length < 3) {
      skills.push({ name: '', dice: '' })
    }

    target.attributes[key] = {
      dice: existing?.dice ?? '',
      skills: skills.map((skill) => ({
        name: skill?.name ?? '',
        dice: skill?.dice ?? '',
      })),
    }
  }
}

function ensureEquipment(target) {
  if (!Array.isArray(target.weapons) || target.weapons.length === 0) {
    target.weapons = [{ name: '', difficulty: '', damage: '' }]
  }
  if (!Array.isArray(target.armour) || target.armour.length === 0) {
    target.armour = [{ name: '', resistance: '', dexPenalty: '' }]
  }
  if (!Array.isArray(target.equipment) || target.equipment.length === 0) {
    target.equipment = [{ name: '', quantity: '' }]
  }
  const currencyDefaults = ['Platinum', 'Gold', 'Silver', 'Copper']
  const existingCurrencies = Array.isArray(target.currencies) ? target.currencies : []
  target.currencies = currencyDefaults.map((name, index) => ({
    name: existingCurrencies[index]?.name ?? name,
    amount: existingCurrencies[index]?.amount ?? '',
  }))
}

function ensureAdditionalDetails(target) {
  if (!Array.isArray(target.specialAbilities)) target.specialAbilities = []
  if (!Array.isArray(target.paranormalDetails)) target.paranormalDetails = []
}

async function beginNameEdit() {
  if (!canManageCharacter.value) return
  editingName.value = true
  await nextTick()
  nameInput.value?.select()
}

async function beginPlayerNameEdit() {
  if (!canManageCharacter.value) return
  editingPlayerName.value = true
  await nextTick()
  playerNameInput.value?.select()
}

function beginImageEdit() {
  if (!canManageCharacter.value) return
  imageUrlDraft.value = character.value?.imageUrl || ''
  editingImage.value = true
}

function applyImageUrl() {
  if (!character.value) return
  character.value.imageUrl = imageUrlDraft.value.trim()
  imageFailed.value = false
  editingImage.value = false
}

function cancelImageEdit() {
  editingImage.value = false
  imageUrlDraft.value = ''
}

async function fetchCharacter(slug) {
  isLoading.value = true
  errorMessage.value = ''
  imageFailed.value = false

  try {
    character.value = await loadCharacter(slug)
    if (character.value) {
      ensureAttributes(character.value)
      ensureEquipment(character.value)
      ensureAdditionalDetails(character.value)
    }
  } catch (error) {
    character.value = null
    errorMessage.value = error?.message || 'The character sheet could not be loaded.'
  } finally {
    isLoading.value = false
  }
}

async function handleSave() {
  if (!character.value || !canManageCharacter.value || isSaving.value || isDeleting.value) return

  const confirmed = window.confirm(
    `Overwrite the saved character sheet for ${character.value.name || character.value.id}?`,
  )

  if (!confirmed) return

  isSaving.value = true
  saveMessage.value = ''
  saveError.value = ''

  try {
    character.value = await saveCharacter(character.value)
    saveMessage.value = 'Character saved.'
  } catch (error) {
    saveError.value = error?.message || 'The character could not be saved.'
  } finally {
    isSaving.value = false
  }
}

async function handleDelete() {
  if (!character.value || !canManageCharacter.value || isSaving.value || isDeleting.value) return

  const confirmed = window.confirm(
    `Permanently delete ${character.value.name || character.value.id}? This cannot be undone.`,
  )

  if (!confirmed) return

  isDeleting.value = true
  saveMessage.value = ''
  saveError.value = ''

  try {
    await deleteCharacter(character.value.id)
    await router.replace('/characters')
  } catch (error) {
    saveError.value = error?.message || 'The character could not be deleted.'
    isDeleting.value = false
  }
}

onMounted(async () => {
  const result = await getSession()
  session.value = result.session
})

watch(() => route.params.slug, fetchCharacter, { immediate: true })
</script>

<template>
  <main class="min-h-screen px-4 py-5 text-zinc-100 sm:px-6 sm:py-8">
    <div class="mx-auto w-full max-w-7xl">
      <RouterLink
        class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/65 transition hover:text-amber-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
        to="/characters"
      >
        <svg aria-hidden="true" class="size-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24">
          <path d="M19 12H5" />
          <path d="m11 18-6-6 6-6" />
        </svg>
        Character roster
      </RouterLink>

      <div v-if="isLoading" class="mt-6 h-64 animate-pulse border border-amber-300/15 bg-white/[0.025]" aria-label="Loading character sheet"></div>

      <section v-else-if="errorMessage" class="mt-6 border border-red-500/30 bg-red-950/35 p-6 text-red-200" role="alert">
        <h1 class="text-lg font-semibold">Unable to load character sheet</h1>
        <p class="mt-2 text-sm text-red-200/75">{{ errorMessage }}</p>
      </section>

      <section v-else-if="!character" class="mt-6 border border-amber-300/20 bg-white/[0.02] p-8 text-center">
        <h1 class="text-xl font-semibold text-amber-100">Character not found</h1>
        <p class="mt-2 text-sm text-zinc-400">No character exists with the slug “{{ route.params.slug }}”.</p>
      </section>

      <article v-else class="relative mt-6 overflow-hidden border border-amber-300/40 bg-[#050807]/90 p-5 shadow-[0_0_36px_rgba(251,191,36,0.1),inset_0_0_30px_rgba(251,191,36,0.025)] sm:p-8">
        <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/80 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.45)]"></div>

        <header class="character-sheet-header">
          <div class="character-portrait relative overflow-hidden border border-amber-300/35 bg-[#0b100d]">
            <img
              v-if="display.imageUrl && !imageFailed"
              :alt="display.name ? `${display.name} portrait` : 'Character portrait'"
              class="h-full w-full object-cover"
              referrerpolicy="no-referrer"
              :src="display.imageUrl"
              @error="imageFailed = true"
            />
            <div v-else class="grid h-full place-items-center text-6xl font-semibold text-amber-100/20" aria-hidden="true">?</div>
            <div aria-hidden="true" class="absolute inset-0 ring-1 ring-inset ring-white/5"></div>
            <button
              v-if="canManageCharacter && !editingImage"
              aria-label="Edit character image URL"
              class="portrait-edit-button"
              type="button"
              @click="beginImageEdit"
            >
              <svg aria-hidden="true" class="size-8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" viewBox="0 0 24 24">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
              </svg>
              <span>Edit image</span>
            </button>
            <form v-if="editingImage" class="image-url-editor" @submit.prevent="applyImageUrl">
              <label class="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-amber-100" for="character-image-url">Image URL</label>
              <input
                id="character-image-url"
                v-model="imageUrlDraft"
                class="mt-1 w-full border border-amber-300/40 bg-black/80 px-2 py-1.5 text-xs text-zinc-100 outline-none focus:border-amber-200"
                placeholder="https://..."
                type="url"
              />
              <div class="mt-2 flex gap-2">
                <button class="image-editor-action" type="submit">Apply</button>
                <button class="image-editor-action image-editor-cancel" type="button" @click="cancelImageEdit">Cancel</button>
              </div>
            </form>
          </div>

          <div class="character-identity min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/55">Character</p>
            <input
              v-if="editingName"
              ref="nameInput"
              v-model="character.name"
              aria-label="Character name"
              class="editable-name mt-2 w-full"
              type="text"
              @blur="editingName = false"
              @keyup.enter="editingName = false"
              @keyup.esc="editingName = false"
            />
            <button
              v-else-if="canManageCharacter"
              class="editable-text editable-character-name mt-2"
              type="button"
              @click="beginNameEdit"
            >
              {{ valueOrBlank(display.name) || 'Unnamed character' }}
            </button>
            <h1 v-else class="mt-2 break-words text-3xl font-semibold tracking-wide text-zinc-50 sm:text-5xl">
              {{ valueOrBlank(display.name) }}
            </h1>
            <p class="mt-2 text-sm uppercase tracking-[0.2em] text-zinc-400">
              <span v-if="editingPlayerName" class="inline-flex items-center gap-2">
                Played by
                <input
                  ref="playerNameInput"
                  v-model="character.playerName"
                  aria-label="Player name"
                  class="editable-player-name"
                  type="text"
                  @blur="editingPlayerName = false"
                  @keyup.enter="editingPlayerName = false"
                  @keyup.esc="editingPlayerName = false"
                />
              </span>
              <button
                v-else-if="canManageCharacter"
                class="editable-text editable-player"
                type="button"
                @click="beginPlayerNameEdit"
              >
                Played by {{ display.playerName || 'Unknown player' }}
              </button>
              <span v-else-if="display.playerName">Played by {{ display.playerName }}</span>
            </p>

            <div class="resource-stats mt-7">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/55">Experience</p>
                <div class="stat-pair mt-3 flex items-center" aria-label="Current and total experience points">
                  <div class="stat-item text-center">
                    <input v-model.number="character.experiencePoints" aria-label="Current experience points" class="xp-box stat-input border border-amber-300/45 bg-amber-300/[0.045] font-semibold text-amber-100" min="0" :disabled="!canManageCharacter" :style="{ fontSize: inputFontSize(character.experiencePoints) }" type="number" />
                  </div>
                  <span class="stat-slash text-2xl text-amber-200/55" aria-hidden="true">/</span>
                  <div class="stat-item text-center">
                    <input v-model.number="character.totalExperiencePoints" aria-label="Total experience points" class="xp-box stat-input border border-amber-300/45 bg-amber-300/[0.045] font-semibold text-amber-100" min="0" :disabled="!canManageCharacter" :style="{ fontSize: inputFontSize(character.totalExperiencePoints) }" type="number" />
                  </div>
                </div>
              </div>

              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/70">Meta Dice</p>
                <div class="stat-pair mt-3 flex items-center" aria-label="Current and total Meta Dice">
                  <div class="stat-item text-center">
                    <input v-model.number="character.currentMetaDice" aria-label="Current Meta Dice" class="xp-box stat-input meta-dice-input border font-semibold" :disabled="!canManageCharacter" min="0" :style="{ fontSize: inputFontSize(character.currentMetaDice) }" type="number" />
                  </div>
                  <span class="stat-slash text-2xl text-sky-300/65" aria-hidden="true">/</span>
                  <div class="stat-item text-center">
                    <input v-model.number="character.totalMetaDice" aria-label="Total Meta Dice" class="xp-box stat-input meta-dice-input border font-semibold" :disabled="!canManageCharacter" min="0" :style="{ fontSize: inputFontSize(character.totalMetaDice) }" type="number" />
                  </div>
                </div>
              </div>

              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Passive Defense</p>
                <div class="mt-3">
                  <output
                    aria-label="Passive Defense calculated from Dexterity"
                    class="passive-defense-box"
                  >{{ passiveDefense }}</output>
                </div>
              </div>
            </div>
          </div>

          <div class="character-health border-t border-amber-300/20 pt-6">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/55">Health</p>
            <div class="stat-pair mt-4 flex items-center" aria-label="Current and total health points">
              <div class="stat-item text-center">
                <input
                  v-model.number="character.currentHealth"
                  aria-label="Current health"
                  class="health-box stat-input border border-red-400/40 bg-red-950/20 text-2xl font-semibold text-red-100"
                  min="0"
                  :disabled="!canManageCharacter"
                  :style="{ fontSize: inputFontSize(character.currentHealth) }"
                  type="number"
                />
              </div>
              <span class="stat-slash text-2xl text-red-300/55" aria-hidden="true">/</span>
              <div class="stat-item text-center">
                <input
                  v-model.number="character.totalHealth"
                  aria-label="Total health"
                  class="health-box stat-input border border-red-400/40 bg-red-950/20 text-2xl font-semibold text-red-100"
                  min="0"
                  :disabled="!canManageCharacter"
                  :style="{ fontSize: inputFontSize(character.totalHealth) }"
                  type="number"
                />
              </div>
            </div>

            <div
              v-if="healthSummary"
              :class="`health-status--${healthSummary.tone}`"
              class="health-summary mt-4"
              aria-live="polite"
            >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold tracking-wide text-zinc-100">
                  {{ healthSummary.percentage }}% <span class="opacity-55">&mdash;</span> {{ healthSummary.status }}
                </p>
                <p v-if="healthSummary.effect" class="mt-1 text-xs leading-5 text-zinc-300">
                  {{ healthSummary.effect }}
                </p>
              </div>

              <svg class="health-face" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" stroke-width="2" />
                <template v-if="healthSummary.mood === 'dead'">
                  <path d="m12 13 4 4m0-4-4 4m12-4 4 4m0-4-4 4M13 28h14" stroke-width="2" />
                </template>
                <template v-else-if="healthSummary.mood === 'unconscious'">
                  <path d="M12 16h6m4 0h6M13 27h14" stroke-width="2" />
                </template>
                <template v-else>
                  <circle cx="14.5" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="25.5" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
                  <path v-if="healthSummary.mood === 'happy'" d="M13 24c2 4 12 4 14 0" stroke-width="2" />
                  <path v-else-if="healthSummary.mood === 'neutral'" d="M14 26h12" stroke-width="2" />
                  <path v-else-if="healthSummary.mood === 'dazed'" d="M13 26c2-3 4 3 7 0s5 2 7-1" stroke-width="2" />
                  <path v-else d="M13 28c2-5 12-5 14 0" stroke-width="2" />
                </template>
              </svg>
            </div>
            <div v-else class="health-summary-placeholder mt-4" aria-hidden="true"></div>
          </div>
        </header>

        <div class="sheet-section-separator" aria-hidden="true"></div>

        <section class="character-details" aria-labelledby="character-details-title">
          <div>
            <h2 id="character-details-title" class="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/55">Details</h2>
            <div class="details-fields mt-3">
              <label class="detail-field">
                <span>Species</span>
                <input v-model="character.species" :disabled="!canManageCharacter" type="text" />
              </label>
              <label class="detail-field">
                <span>Gender</span>
                <input v-model="character.gender" :disabled="!canManageCharacter" type="text" />
              </label>
              <label class="detail-field">
                <span>Age</span>
                <input v-model="character.age" :disabled="!canManageCharacter" inputmode="numeric" type="text" />
              </label>
              <label class="detail-field">
                <span>Height</span>
                <input v-model="character.height" :disabled="!canManageCharacter" type="text" />
              </label>
              <label class="detail-field">
                <span>Weight</span>
                <input v-model="character.weight" :disabled="!canManageCharacter" type="text" />
              </label>
            </div>

          </div>

          <div class="narrative-fields">
            <label class="appearance-field">
              <span>Appearance</span>
              <textarea
                v-model="character.appearance"
                :disabled="!canManageCharacter"
                placeholder="Describe the character's appearance..."
                rows="3"
              ></textarea>
            </label>
            <label class="appearance-field">
              <span>Personality</span>
              <textarea
                v-model="character.personality"
                :disabled="!canManageCharacter"
                placeholder="Describe the character's personality..."
                rows="3"
              ></textarea>
            </label>
          </div>
        </section>

        <div class="sheet-section-separator" aria-hidden="true"></div>

        <section aria-labelledby="attributes-title">
          <div class="attributes-heading">
            <div>
              <p class="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-zinc-500">Character capabilities</p>
              <h2 id="attributes-title" class="mt-1 text-xl font-semibold tracking-wide text-amber-100">Attributes &amp; Skills</h2>
            </div>
          </div>

          <div class="attributes-grid mt-5">
            <AttributeSkills
              v-for="name in ATTRIBUTE_NAMES"
              :key="name"
              :attribute="character.attributes[name.toLowerCase()]"
              :disabled="!canManageCharacter"
              :name="name"
            />
          </div>
        </section>

        <div class="sheet-section-separator" aria-hidden="true"></div>

        <section aria-labelledby="equipment-title">
          <div>
            <p class="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-zinc-500">Loadout</p>
            <h2 id="equipment-title" class="mt-1 text-xl font-semibold tracking-wide text-amber-100">Weapons &amp; Armour</h2>
          </div>

          <div class="equipment-grid mt-5">
            <EquipmentList :disabled="!canManageCharacter" :items="character.weapons" type="weapons" />
            <EquipmentList :disabled="!canManageCharacter" :items="character.armour" type="armour" />
            <EquipmentList :disabled="!canManageCharacter" :items="character.equipment" type="equipment" />
            <CurrencyPanel :currencies="character.currencies" :disabled="!canManageCharacter" />
          </div>
        </section>

        <div class="sheet-section-separator" aria-hidden="true"></div>

        <section aria-labelledby="additional-details-title">
          <div>
            <p class="text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-zinc-500">Character features</p>
            <h2 id="additional-details-title" class="mt-1 text-xl font-semibold tracking-wide text-amber-100">Additional Details</h2>
          </div>

          <div class="additional-details-grid mt-5">
            <AdditionalDetailsPanel :disabled="!canManageCharacter" :items="character.specialAbilities" title="Special Abilities" />
            <AdditionalDetailsPanel :disabled="!canManageCharacter" :items="character.paranormalDetails" title="Paranormal" />
          </div>

          <label v-if="canManageCharacter" class="background-field mt-4">
            <span class="background-title">
              Background
              <small>(Limited visibility)</small>
            </span>
            <textarea
              v-model="character.background"
              placeholder="Record the character's history and background..."
              rows="7"
            ></textarea>
          </label>
        </section>
      </article>

      <div v-if="character && canManageCharacter" class="save-dock">
        <button
          class="save-button"
          :disabled="isSaving || isDeleting"
          type="button"
          @click="handleSave"
        >
          <svg aria-hidden="true" class="size-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24">
            <path d="M5 3h11l3 3v15H5z" />
            <path d="M8 3v6h8V3M8 21v-7h8v7" />
          </svg>
          {{ isSaving ? 'Saving...' : 'Save' }}
        </button>
        <button
          class="delete-button"
          :disabled="isSaving || isDeleting"
          type="button"
          @click="handleDelete"
        >
          <svg aria-hidden="true" class="size-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24">
            <path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" />
          </svg>
          {{ isDeleting ? 'Deleting...' : 'Delete' }}
        </button>
        <p v-if="saveMessage" class="save-feedback text-emerald-200" role="status">{{ saveMessage }}</p>
        <p v-else-if="saveError" class="save-feedback text-red-200" role="alert">{{ saveError }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.character-sheet-header {
  display: grid;
  gap: 1.5rem;
}

.character-portrait {
  width: min(100%, 14rem);
  aspect-ratio: 1;
}

.portrait-edit-button {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border: 0;
  background: rgb(9 9 11 / 0.08);
  color: transparent;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease, backdrop-filter 180ms ease;
}

.portrait-edit-button:hover,
.portrait-edit-button:focus-visible {
  background: rgb(9 9 11 / 0.62);
  color: rgb(254 243 199);
  backdrop-filter: grayscale(1);
  outline: none;
}

.image-url-editor {
  position: absolute;
  inset: auto 0 0;
  padding: 0.75rem;
  background: rgb(3 5 4 / 0.94);
  box-shadow: 0 -12px 28px rgb(0 0 0 / 0.55);
}

.image-editor-action {
  flex: 1;
  border: 1px solid rgb(252 211 77 / 0.45);
  padding: 0.35rem;
  color: rgb(254 243 199);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
}

.image-editor-cancel {
  border-color: rgb(161 161 170 / 0.35);
  color: rgb(212 212 216);
}

.editable-text {
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: text;
}

.editable-text:hover,
.editable-text:focus-visible {
  text-decoration: underline;
  text-decoration-color: rgb(252 211 77 / 0.45);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.25rem;
  outline: none;
}

.editable-character-name,
.editable-name {
  font-size: clamp(1.875rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: 0.025em;
  color: rgb(250 250 250);
}

.editable-name,
.editable-player-name {
  border: 0;
  border-bottom: 1px solid rgb(252 211 77 / 0.6);
  background: rgb(252 211 77 / 0.035);
  outline: none;
}

.editable-player {
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.editable-player-name {
  width: 12rem;
  padding: 0.2rem 0.35rem;
  color: rgb(228 228 231);
  letter-spacing: 0.12em;
  text-transform: none;
}

.xp-box {
  width: 3rem;
  height: 3rem;
  margin-inline: auto;
}

.health-box {
  width: 3rem;
  height: 3rem;
  margin-inline: auto;
}

.stat-input {
  display: block;
  padding: 0.2rem;
  text-align: center;
  outline: none;
  appearance: textfield;
  transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
}

.stat-input::-webkit-inner-spin-button,
.stat-input::-webkit-outer-spin-button {
  margin: 0;
  appearance: none;
}

.stat-input:hover {
  background-color: rgb(252 211 77 / 0.08);
}

.stat-input:focus {
  border-color: rgb(252 211 77 / 0.85);
  box-shadow: 0 0 0 2px rgb(252 211 77 / 0.12), 0 0 14px rgb(251 191 36 / 0.12);
}

.stat-input:disabled {
  cursor: not-allowed;
  opacity: 0.72;
}

.stat-item {
  width: 3rem;
}

.stat-slash {
  margin-inline: 0.55rem;
}

.resource-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 2rem;
}

.meta-dice-input {
  border-color: rgb(125 211 252 / 0.5);
  background: rgb(14 165 233 / 0.08);
  color: rgb(186 230 253);
}

.meta-dice-input:hover:not(:disabled) {
  background: rgb(14 165 233 / 0.14);
}

.meta-dice-input:focus {
  border-color: rgb(125 211 252 / 0.9);
  box-shadow: 0 0 0 2px rgb(56 189 248 / 0.12), 0 0 14px rgb(14 165 233 / 0.18);
}

.passive-defense-box {
  display: grid;
  width: 3rem;
  height: 3rem;
  margin-inline: auto;
  place-items: center;
  border: 1px solid rgb(161 161 170 / 0.5);
  background: rgb(161 161 170 / 0.07);
  color: rgb(212 212 216);
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: inset 0 0 12px rgb(161 161 170 / 0.035);
}

.health-summary,
.health-summary-placeholder {
  min-height: 7.25rem;
}

.health-summary {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid currentColor;
  background: rgb(0 0 0 / 0.32);
  box-shadow: 0 0 14px color-mix(in srgb, currentColor 28%, transparent), inset 0 0 14px color-mix(in srgb, currentColor 8%, transparent);
}

.health-face {
  width: 2.5rem;
  height: 2.5rem;
  flex: 0 0 auto;
}

.health-status--healthy { color: rgb(134 239 172); }
.health-status--bruised { color: rgb(253 224 71); }
.health-status--stunned { color: rgb(96 165 250); }
.health-status--wounded { color: rgb(248 113 113); }
.health-status--severely-wounded { color: rgb(185 28 28); }
.health-status--incapacitated { color: rgb(244 244 245); }
.health-status--mortal,
.health-status--dead { color: rgb(161 161 170); }

.sheet-section-separator {
  height: 1px;
  margin: 2.5rem 0;
  background: linear-gradient(90deg, transparent, rgb(252 211 77 / 0.35) 12%, rgb(252 211 77 / 0.35) 88%, transparent);
  box-shadow: 0 0 10px rgb(251 191 36 / 0.12);
}

.attributes-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem;
}

.attributes-grid {
  display: grid;
  gap: 1rem;
}

.equipment-grid {
  display: grid;
  gap: 1rem;
}

.additional-details-grid {
  display: grid;
  gap: 1rem;
}

.background-field {
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid rgb(252 211 77 / 0.24);
  background: rgb(255 255 255 / 0.012);
  box-shadow: inset 0 0 22px rgb(251 191 36 / 0.018);
}

.background-title {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  color: rgb(253 230 138 / 0.9);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.background-title small {
  color: rgb(161 161 170);
  font-size: 0.56rem;
  font-weight: 600;
  letter-spacing: 0.12em;
}

.background-field textarea {
  width: 100%;
  margin-top: 0.7rem;
  border: 1px solid rgb(161 161 170 / 0.25);
  padding: 0.75rem 0.85rem;
  resize: vertical;
  background: rgb(0 0 0 / 0.26);
  color: rgb(244 244 245);
  font-size: 0.88rem;
  line-height: 1.65;
  outline: none;
}

.background-field textarea:hover,
.background-field textarea:focus {
  border-color: rgb(252 211 77 / 0.55);
  background: rgb(252 211 77 / 0.025);
  box-shadow: 0 0 14px rgb(251 191 36 / 0.08);
}

.character-details {
  display: grid;
  gap: 2rem;
  align-items: stretch;
}

.details-fields {
  display: grid;
  gap: 0.75rem;
}

.detail-field,
.appearance-field {
  display: block;
}

.detail-field > span,
.appearance-field > span {
  display: block;
  margin-bottom: 0.3rem;
  color: rgb(253 230 138 / 0.62);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.detail-field input,
.appearance-field textarea {
  width: 100%;
  border: 1px solid rgb(252 211 77 / 0.28);
  background: rgb(255 255 255 / 0.018);
  color: rgb(244 244 245);
  outline: none;
  transition: border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
}

.detail-field input {
  min-height: 2.25rem;
  padding: 0.4rem 0.65rem;
  font-size: 0.9rem;
}

.appearance-field {
  display: flex;
  min-height: 0;
  flex-direction: column;
}

.narrative-fields {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.appearance-field textarea {
  min-height: 4.5rem;
  flex: 1;
  padding: 0.65rem 0.8rem;
  resize: vertical;
  font-size: 0.9rem;
  line-height: 1.65;
}

.detail-field input:hover:not(:disabled),
.appearance-field textarea:hover:not(:disabled) {
  border-color: rgb(252 211 77 / 0.48);
}

.detail-field input:focus,
.appearance-field textarea:focus {
  border-color: rgb(252 211 77 / 0.78);
  background: rgb(252 211 77 / 0.035);
  box-shadow: 0 0 14px rgb(251 191 36 / 0.08);
}

.detail-field input:disabled,
.appearance-field textarea:disabled {
  cursor: not-allowed;
  opacity: 0.72;
}

.save-dock {
  position: fixed;
  z-index: 20;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.save-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 7rem;
  padding: 0.8rem 1.25rem;
  border-top: 1px solid rgb(252 211 77 / 0.55);
  border-right: 1px solid rgb(252 211 77 / 0.55);
  background: rgb(5 8 7 / 0.96);
  color: rgb(254 243 199);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 20px rgb(251 191 36 / 0.12);
  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.save-button:hover:not(:disabled),
.save-button:focus-visible {
  border-color: rgb(253 230 138 / 0.9);
  background: rgb(252 211 77 / 0.1);
  box-shadow: 0 0 24px rgb(251 191 36 / 0.2);
  outline: none;
}

.save-button:disabled {
  cursor: wait;
  opacity: 0.55;
}

.delete-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 7.5rem;
  padding: 0.8rem 1.25rem;
  border: 1px solid rgb(248 113 113 / 0.5);
  border-bottom: 0;
  background: rgb(30 5 8 / 0.96);
  color: rgb(254 202 202);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 20px rgb(239 68 68 / 0.1);
  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.delete-button:hover:not(:disabled),
.delete-button:focus-visible {
  border-color: rgb(252 165 165 / 0.9);
  background: rgb(127 29 29 / 0.35);
  box-shadow: 0 0 24px rgb(239 68 68 / 0.18);
  outline: none;
}

.delete-button:disabled {
  cursor: wait;
  opacity: 0.55;
}

.save-feedback {
  max-width: min(24rem, calc(100vw - 9rem));
  padding: 0.45rem 0.65rem;
  background: rgb(5 8 7 / 0.92);
  font-size: 0.72rem;
}

@media (min-width: 768px) {
  .character-sheet-header {
    grid-template-columns: 12rem minmax(0, 1fr) 17rem;
    align-items: center;
  }

  .character-portrait {
    width: 12rem;
  }

  .character-health {
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top: 0;
    padding-top: 0;
    padding-left: 1rem;
  }

  .character-details {
    grid-template-columns: minmax(14rem, 0.7fr) minmax(0, 1.3fr);
  }

  .details-fields {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .attributes-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .equipment-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .additional-details-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .character-sheet-header {
    grid-template-columns: 14rem minmax(0, 1fr) 20rem;
    gap: 2rem;
  }

  .character-portrait {
    width: 14rem;
  }
}

@media (max-width: 767px) {
  .character-portrait {
    justify-self: center;
  }

  .character-identity {
    text-align: center;
  }

  .stat-pair {
    justify-content: center;
  }

  .character-health > p {
    text-align: center;
  }

  .attributes-heading {
    display: block;
  }

  .attributes-heading > p {
    margin-top: 0.5rem;
    text-align: left;
  }
}
</style>
