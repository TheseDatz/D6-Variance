<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CreatorAccordion from '../components/CreatorAccordion.vue'
import AdditionalDetailsPanel from '../components/AdditionalDetailsPanel.vue'
import LanguagesPanel from '../components/LanguagesPanel.vue'
import CreatorSkills from '../components/CreatorSkills.vue'
import EquipmentList from '../components/EquipmentList.vue'
import { getSession } from '../services/auth'
import { createCharacter } from '../services/characters'

const ATTRIBUTE_NAMES = ['Strength', 'Dexterity', 'Social', 'Intelligence', 'Luck', 'Paranormal']

const openSection = ref('basic')
const router = useRouter()
const session = ref(null)
const isSaving = ref(false)
const saveError = ref('')
const rolledHealth = ref(null)
const healthRollDice = ref([])
const healthRerollsUsed = ref(0)
const character = reactive({
  name: '',
  playerName: '',
  tagline: '',
  imageUrl: '',
  species: 'Human',
  attributeDice: '12D',
  attributes: Object.fromEntries(
    ATTRIBUTE_NAMES.map((name) => [name.toLowerCase(), { dice: 2, pips: 0 }]),
  ),
  specialAbilities: [],
  paranormalDetails: [],
  languages: [],
  skills: [],
  weapons: [{ _isUnarmed: true, name: 'Unarmed', difficulty: 'Easy', damage: '1D' }],
  armour: [{ name: '', resistance: '', dexPenalty: '' }],
  equipment: [{ name: '', quantity: '' }],
  gender: '',
  age: '',
  height: '',
  weight: '',
  movement: 10,
  appearance: '',
  personality: '',
  background: '',
})

const basicInformationComplete = computed(() =>
  Boolean(
    character.name.trim()
    && character.tagline.trim()
    && character.species.trim()
  ),
)

const attributesComplete = computed(() => {
  const startingPips = parseStartingAttributeDice(character.attributeDice)
  const validAllocations = ATTRIBUTE_NAMES.every((name) => {
    const attribute = character.attributes[name.toLowerCase()]
    const dice = Number(attribute.dice)
    const pips = Number(attribute.pips)
    return Number.isInteger(dice) && dice >= 0 && Number.isInteger(pips) && pips >= 0 && pips <= 2
  })

  return startingPips !== null && startingPips > 0 && validAllocations && remainingAttributePips.value === 0
})

function parseStartingAttributeDice(value) {
  const normalized = String(value ?? '').trim()
  const match = normalized.match(/^(\d+)\s*[dD]?(?:\s*\+\s*([12]))?$/)
  if (!match) return null
  return Number.parseInt(match[1], 10) * 3 + Number.parseInt(match[2] || '0', 10)
}

function parseDiceModifier(value) {
  const normalized = String(value ?? '').trim().replace(/[−–—]/g, '-').replace(/\s+/g, '')
  if (!normalized) return 0

  const parenthesized = normalized.match(/^([+-])\((\d+)d(?:\+([12]))?\)$/i)
  if (parenthesized) {
    const sign = parenthesized[1] === '-' ? -1 : 1
    return sign * (Number(parenthesized[2]) * 3 + Number(parenthesized[3] || 0))
  }

  const pipsOnly = normalized.match(/^([+-]?)(\d+)(?:pips?)$/i)
  if (pipsOnly) {
    return (pipsOnly[1] === '-' ? -1 : 1) * Number(pipsOnly[2])
  }

  const diceCode = normalized.match(/^([+-]?)(\d+)d(?:([+-])([12]))?$/i)
  if (!diceCode) return null

  const dicePips = Number(diceCode[2]) * 3 * (diceCode[1] === '-' ? -1 : 1)
  const extraPips = Number(diceCode[4] || 0) * (diceCode[3] === '-' ? -1 : 1)
  return dicePips + extraPips
}

const traitPipModifier = computed(() => character.specialAbilities.reduce((total, trait) => {
  const modifier = parseDiceModifier(trait?.diceModifier)
  return total + (modifier ?? 0)
}, 0))

const traitModifiersValid = computed(() => character.specialAbilities.every(
  (trait) => parseDiceModifier(trait?.diceModifier) !== null,
))

const startingAttributePips = computed(() => parseStartingAttributeDice(character.attributeDice))
const attributeLimitPips = computed(() => (startingAttributePips.value ?? 0) + 18 + traitPipModifier.value)
const attributeDiceLimit = computed(() => formatDiceFromPips(attributeLimitPips.value))

const characterTraitsComplete = computed(() =>
  character.specialAbilities.every((trait) => Boolean(trait?.name?.trim()))
  && traitModifiersValid.value
  && character.languages.every((language) => Boolean(language?.name?.trim())),
)

const paranormalPowersComplete = computed(() =>
  character.paranormalDetails.every((power) => Boolean(power?.name?.trim())),
)

const traitModifierCalculation = computed(() => {
  if (traitPipModifier.value === 0) return ''
  const operator = traitPipModifier.value > 0 ? '+' : '-'
  return ` ${operator} ${formatDiceFromPips(Math.abs(traitPipModifier.value))}`
})

const assignedSkillPips = computed(() => character.skills.reduce(
  (total, skill) => total + (Number(skill.upgradeDice) || 0) * 3 + (Number(skill.upgradePips) || 0),
  0,
))

const skillsComplete = computed(() => character.skills.length > 0
  && assignedSkillPips.value === 21
  && character.skills.every((skill) => {
    const dice = Number(skill.upgradeDice)
    const pips = Number(skill.upgradePips)
    return Boolean(skill.name.trim())
      && ATTRIBUTE_NAMES.map((name) => name.toLowerCase()).includes(skill.attribute)
      && Number.isInteger(dice) && dice >= 0
      && Number.isInteger(pips) && pips >= 0 && pips <= 2
  }))

function equipmentRowsComplete(rows, fields) {
  return rows.every((row, index) => {
    const values = fields.map((field) => String(row?.[field] ?? '').trim())
    const isBlank = values.every((value) => !value)
    if (isBlank) return index === 0
    return values.every(Boolean)
  })
}

const startingEquipmentComplete = computed(() =>
  equipmentRowsComplete(character.weapons, ['name', 'difficulty', 'damage'])
  && equipmentRowsComplete(character.armour, ['name', 'resistance', 'dexPenalty'])
  && equipmentRowsComplete(character.equipment, ['name', 'quantity']),
)

const additionalInfoComplete = computed(() => {
  const movement = Number(character.movement)
  return rolledHealth.value !== null && Number.isFinite(movement) && movement >= 0
})
const allSectionsComplete = computed(() =>
  basicInformationComplete.value
  && attributesComplete.value
  && characterTraitsComplete.value
  && skillsComplete.value
  && startingEquipmentComplete.value
  && paranormalPowersComplete.value
  && additionalInfoComplete.value,
)

const assignedAttributePips = computed(() => ATTRIBUTE_NAMES.reduce((total, name) => {
  const attribute = character.attributes[name.toLowerCase()]
  return total + (Number(attribute.dice) || 0) * 3 + (Number(attribute.pips) || 0)
}, 0))

const remainingAttributePips = computed(() => attributeLimitPips.value - assignedAttributePips.value)

function formatDiceFromPips(pips) {
  const sign = pips < 0 ? '-' : ''
  const absolutePips = Math.abs(pips)
  if (absolutePips < 3) return `${sign}${absolutePips} pip${absolutePips === 1 ? '' : 's'}`
  const dice = Math.floor(absolutePips / 3)
  const remainder = absolutePips % 3
  return `${sign}${dice}D${remainder ? `+${remainder}` : ''}`
}

function formatDiceValue(dice, pips = 0) {
  const normalizedDice = Number(dice) || 0
  const normalizedPips = Number(pips) || 0
  return `${normalizedDice}D${normalizedPips ? `+${normalizedPips}` : ''}`
}

const strengthSignature = computed(() => {
  const strength = character.attributes.strength
  return `${strength.dice}:${strength.pips}`
})

const strengthDamage = computed(() => `${Math.ceil((Number(character.attributes.strength.dice) || 0) / 2)}D`)

const canRollHealth = computed(() => {
  const strength = character.attributes.strength
  return Number.isInteger(Number(strength.dice))
    && Number(strength.dice) >= 0
    && Number.isInteger(Number(strength.pips))
    && Number(strength.pips) >= 0
    && Number(strength.pips) <= 2
})

function rollHealth() {
  if (!canRollHealth.value) return
  const isReroll = rolledHealth.value !== null
  if (isReroll && healthRerollsUsed.value >= 1) return

  const strength = character.attributes.strength
  const diceCount = Number(strength.dice)
  healthRollDice.value = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)
  rolledHealth.value = 20
    + healthRollDice.value.reduce((total, roll) => total + roll, 0)
    + Number(strength.pips)

  if (isReroll) healthRerollsUsed.value += 1
}

watch(strengthSignature, (_next, previous) => {
  if (previous !== undefined && rolledHealth.value !== null) healthRerollsUsed.value = 0
})

watch(strengthDamage, (damage) => {
  const unarmed = character.weapons.find((weapon) => weapon?._isUnarmed)
  if (unarmed) unarmed.damage = damage
}, { immediate: true })

function buildCharacterData() {
  const attributes = Object.fromEntries(ATTRIBUTE_NAMES.map((name) => {
    const key = name.toLowerCase()
    const attribute = character.attributes[key]
    const skills = character.skills
      .filter((skill) => skill.attribute === key)
      .map((skill) => {
        const totalPips = (Number(attribute.dice) || 0) * 3
          + (Number(attribute.pips) || 0)
          + (Number(skill.upgradeDice) || 0) * 3
          + (Number(skill.upgradePips) || 0)
        return { name: skill.name.trim(), dice: formatDiceFromPips(totalPips) }
      })

    return [key, { dice: formatDiceValue(attribute.dice, attribute.pips), skills }]
  }))

  const usedRows = (rows) => rows.filter((row) => Object.values(row).some((value) => String(value ?? '').trim()))

  return {
    name: character.name.trim(),
    playerName: character.playerName,
    tagline: character.tagline.trim(),
    imageUrl: character.imageUrl.trim(),
    species: character.species.trim(),
    gender: character.gender.trim(),
    age: character.age.trim(),
    height: character.height.trim(),
    weight: character.weight.trim(),
    movement: Number(character.movement),
    appearance: character.appearance.trim(),
    personality: character.personality.trim(),
    background: character.background.trim(),
    experiencePoints: 0,
    totalExperiencePoints: 0,
    currentHealth: rolledHealth.value,
    totalHealth: rolledHealth.value,
    currentMetaDice: 2,
    totalMetaDice: 5,
    attributes,
    specialAbilities: character.specialAbilities.map(({ name, description }) => ({
      name: name.trim(),
      description: description?.trim() || '',
    })),
    paranormalDetails: character.paranormalDetails.map(({ name, description }) => ({
      name: name.trim(),
      description: description?.trim() || '',
    })),
    languages: character.languages.map((language) => ({
      name: language.name.trim(),
      proficiency: language.proficiency,
    })),
    weapons: usedRows(character.weapons),
    armour: usedRows(character.armour),
    equipment: usedRows(character.equipment),
    currencies: [
      { name: 'Platinum', amount: '' },
      { name: 'Gold', amount: '' },
      { name: 'Silver', amount: '' },
      { name: 'Copper', amount: '' },
    ],
  }
}

async function handleCreateCharacter() {
  if (!allSectionsComplete.value || !session.value || isSaving.value) return
  if (!window.confirm(`Create ${character.name.trim()} and save this character sheet?`)) return

  isSaving.value = true
  saveError.value = ''
  try {
    const created = await createCharacter(buildCharacterData(), session.value.user.id)
    await router.push({ name: 'character-sheet', params: { id: created.id } })
  } catch (error) {
    saveError.value = error?.message || 'The character could not be created.'
    isSaving.value = false
  }
}

function toggleSection(section) {
  openSection.value = openSection.value === section ? '' : section
}

onMounted(async () => {
  const result = await getSession()
  session.value = result.session
  character.playerName = result.session?.user?.email?.split('@')[0] || ''
})
</script>

<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-5xl px-4 py-8 text-zinc-100 sm:px-5 sm:py-12">
    <header class="mb-8">
      <p class="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/55">D6V Character Forge</p>
      <h1 class="mt-2 text-3xl font-semibold tracking-wide text-amber-100 sm:text-4xl">Create a Character</h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
        Complete each section to build a new character. Your progress is marked as each step becomes ready.
      </p>
    </header>

    <div class="space-y-3">
      <CreatorAccordion
        :complete="basicInformationComplete"
        :open="openSection === 'basic'"
        title="Basic Information"
        @toggle="toggleSection('basic')"
      >
        <p class="text-sm leading-6 text-zinc-100">
          Welcome to the D6V Character Creator, a guided system for building new characters quickly and easily. Fields marked with an asterisk are required, but you can use placeholder information if you have not settled on an answer yet. Each accordion displays a red X while incomplete and a green checkmark when ready. Your character can only be finalized once every section has a green checkmark.
        </p>

        <div class="creator-fields mt-6">
          <label class="creator-field creator-field--wide">
            <span>Character Name <b aria-hidden="true">*</b></span>
            <input v-model="character.name" autocomplete="off" type="text" />
            <small>Choose wisely—your name may one day be feared, loved, or both.</small>
          </label>

          <label class="creator-field creator-field--wide">
            <span>Tagline <b aria-hidden="true">*</b></span>
            <input v-model="character.tagline" autocomplete="off" type="text" />
            <small>A short saying that captures your character, such as “Never tell me the odds”—or anything else that feels right.</small>
          </label>

          <label class="creator-field creator-field--wide">
            <span>Species <b aria-hidden="true">*</b></span>
            <input v-model="character.species" autocomplete="off" type="text" />
            <small>
              Choose the species your character belongs to. Human is the standard option, though your Storyteller may allow others depending on the game. Browse the
              <RouterLink class="helper-link" to="/species">curated species list</RouterLink>
              for inspiration.
            </small>
          </label>

          <label class="creator-field creator-field--wide">
            <span>Portrait Image URL</span>
            <input v-model="character.imageUrl" autocomplete="off" placeholder="https://..." type="url" />
            <small>Optional. Right-click an image and choose “Copy image address” or “Copy image URL,” then paste it here. Leave this blank to use the default ? portrait.</small>
          </label>
        </div>

        <div class="slug-preview mt-5">
          <span>Character URL</span>
          <code>/characters/[assigned after creation]</code>
        </div>
      </CreatorAccordion>

      <CreatorAccordion
        :complete="attributesComplete"
        :open="openSection === 'attributes'"
        title="Attributes"
        @toggle="toggleSection('attributes')"
      >
        <p class="text-sm leading-6 text-zinc-100">
          Every species begins with a pool of attribute dice used to define the character’s natural capabilities. A standard Human begins with 12D, though another species or your Storyteller may provide a different amount.
        </p>

        <label class="creator-field mt-6 max-w-xs">
          <span>Starting Attribute Dice <b aria-hidden="true">*</b></span>
          <div class="dice-input-wrap">
            <input v-model="character.attributeDice" autocomplete="off" inputmode="text" placeholder="12D or 11D+2" type="text" />
          </div>
          <small>Enter whole dice or dice with pips, such as 12D, 11D+1, or 11D+2.</small>
        </label>

        <div class="attribute-calculation mt-5" aria-live="polite">
          <span>Total attribute dice:</span>
          <strong>{{ startingAttributePips === null ? 'Invalid' : formatDiceFromPips(startingAttributePips) }} + 6D{{ traitModifierCalculation }} = {{ attributeDiceLimit }}</strong>
        </div>

        <div class="assigning-dice mt-8">
          <h2>Assigning Dice</h2>
          <p class="mt-2 text-sm leading-6 text-zinc-100">
            Divide your available dice among Strength, Dexterity, Social, Intelligence, Luck, and Paranormal. A standard Human begins with 2D in each attribute before distributing the remaining dice. Other species may use different minimums or maximums, so confirm any limits with your Storyteller.
          </p>
          <p class="mt-3 text-sm leading-6 text-zinc-300">
            <strong class="text-amber-100">Pips</strong> are one-third-die improvements written as +1 or +2. Three pips convert into one full die: for example, 2D plus three pips becomes 3D.
          </p>

          <div :class="{ 'allocation-summary--complete': remainingAttributePips === 0, 'allocation-summary--over': remainingAttributePips < 0 }" class="allocation-summary mt-5" aria-live="polite">
            <strong>Assigned {{ formatDiceFromPips(assignedAttributePips) }} / {{ attributeDiceLimit }}</strong>
            <span v-if="remainingAttributePips >= 0">{{ formatDiceFromPips(remainingAttributePips) }} remaining</span>
            <span v-else>{{ formatDiceFromPips(remainingAttributePips) }} over limit</span>
          </div>

          <div class="attribute-allocation-grid mt-4">
            <fieldset v-for="name in ATTRIBUTE_NAMES" :key="name" class="attribute-allocation">
              <legend>{{ name }}</legend>
              <label>
                <span>Dice</span>
                <input v-model.number="character.attributes[name.toLowerCase()].dice" min="0" step="1" type="number" />
              </label>
              <label>
                <span>Pips</span>
                <input v-model.number="character.attributes[name.toLowerCase()].pips" max="2" min="0" step="1" type="number" />
              </label>
            </fieldset>
          </div>
        </div>
      </CreatorAccordion>

      <CreatorAccordion
        :complete="characterTraitsComplete"
        :open="openSection === 'traits'"
        title="Character Traits"
        @toggle="toggleSection('traits')"
      >
        <p class="text-sm leading-6 text-zinc-100">
          Character traits represent species-specific abilities as well as personal advantages and disadvantages. These features help define what makes your character exceptional—or what makes their life more complicated. Browse the
          <RouterLink class="helper-link" to="/traits">curated traits page</RouterLink>
          for available options and guidance.
        </p>
        <p class="mt-3 text-sm leading-6 text-zinc-300">
          Add each trait with a name, description, and its attribute-allocation modifier. Advantages reduce available Attribute Dice, while Disadvantages grant additional Attribute Dice. Pips are supported: examples include −1 pip, −1D, +2 pips, and +(1D+1). These modifiers are used during creation and are not displayed on the finished character sheet.
        </p>

        <div class="mt-6">
          <AdditionalDetailsPanel
            :items="character.specialAbilities"
            title="Character Traits"
            with-dice-modifier
          />
        </div>

        <div class="mt-6">
          <p class="text-sm leading-6 text-zinc-100">
            Languages are determined by the Storyteller for each game. You may select up to one Proficient language and one Novice language, but neither is required.
          </p>
          <div class="mt-4">
            <LanguagesPanel :languages="character.languages" creator-limits />
          </div>
        </div>
      </CreatorAccordion>

      <CreatorAccordion
        :complete="skillsComplete"
        :open="openSection === 'skills'"
        title="Skills"
        @toggle="toggleSection('skills')"
      >
        <p class="text-sm leading-6 text-zinc-100">
          Skills begin at the value of their linked attribute and can be improved by spending skill dice. You have 7D to distribute among the skills that define your character’s training and experience. Browse the
          <RouterLink class="helper-link" to="/skills">curated skills list</RouterLink>
          for more options.
        </p>
        <p class="mt-3 text-sm leading-6 text-zinc-300">
          Quick-add a suggested skill or create your own. Each new skill begins with a 1D upgrade, which you can adjust using whole dice and pips.
        </p>

        <div class="mt-6">
          <CreatorSkills :attributes="character.attributes" :skills="character.skills" />
        </div>
      </CreatorAccordion>

      <CreatorAccordion
        :complete="startingEquipmentComplete"
        :open="openSection === 'equipment'"
        title="Starting Equipment"
        @toggle="toggleSection('equipment')"
      >
        <p class="text-sm leading-6 text-zinc-100">
          Your Storyteller may give you a budget to spend on starting equipment, or they may allow any reasonable items that fit your character and the game. Expectations vary between campaigns, so it is always best to confirm your starting loadout with the Storyteller.
        </p>
        <p class="mt-3 text-sm leading-6 text-zinc-300">
          Leave the permanent first rows blank if you are not choosing starting equipment yet. Any row you fill in should be completed in full.
        </p>

        <div class="starting-equipment-grid mt-6">
          <EquipmentList :items="character.weapons" type="weapons" />
          <EquipmentList :items="character.armour" type="armour" />
          <EquipmentList :items="character.equipment" type="equipment" />
        </div>
      </CreatorAccordion>

      <CreatorAccordion
        :complete="paranormalPowersComplete"
        :open="openSection === 'paranormal-powers'"
        title="Paranormal Powers"
        @toggle="toggleSection('paranormal-powers')"
      >
        <p class="text-sm leading-6 text-zinc-100">
          Add any paranormal powers your character possesses, including a name and description for each power. This section is completely optional and can be updated later from the character sheet.
        </p>

        <div class="mt-6">
          <AdditionalDetailsPanel
            :items="character.paranormalDetails"
            title="Paranormal Powers"
          />
        </div>
      </CreatorAccordion>

      <CreatorAccordion
        :complete="additionalInfoComplete"
        :open="openSection === 'additional'"
        title="Additional Information"
        @toggle="toggleSection('additional')"
      >
        <p class="text-sm leading-6 text-zinc-100">
          Add the personal details that bring your character to life. These fields are optional and can be completed or revised later from the character sheet.
        </p>

        <section class="health-roll-panel mt-6">
          <div>
            <p class="health-roll-kicker">Starting Health <b aria-hidden="true">*</b></p>
            <h2>Roll Strength + 20</h2>
            <p class="mt-2 text-sm leading-6 text-zinc-300">
              Roll your current Strength dice and add 20 to determine starting health. You may reroll once; changing your Strength attribute grants a new reroll.
            </p>
          </div>
          <div class="health-roll-action">
            <button :disabled="!canRollHealth || (rolledHealth !== null && healthRerollsUsed >= 1)" type="button" @click="rollHealth">
              {{ rolledHealth === null ? 'Roll Health' : healthRerollsUsed >= 1 ? 'Reroll Used' : 'Reroll Health' }}
            </button>
            <div v-if="rolledHealth !== null" class="health-roll-result" aria-live="polite">
              <strong>{{ rolledHealth }} Health</strong>
              <span>
                Rolls: {{ healthRollDice.join(' + ') || '0' }}
                <template v-if="Number(character.attributes.strength.pips)"> + {{ character.attributes.strength.pips }} pips</template>
                + 20
              </span>
            </div>
          </div>
        </section>

        <div class="additional-info-grid mt-6">
          <label class="creator-field"><span>Gender</span><input v-model="character.gender" type="text" /></label>
          <label class="creator-field"><span>Age</span><input v-model="character.age" type="text" /></label>
          <label class="creator-field"><span>Height</span><input v-model="character.height" type="text" /></label>
          <label class="creator-field"><span>Weight</span><input v-model="character.weight" type="text" /></label>
          <label class="creator-field creator-field--wide">
            <span>Movement <b aria-hidden="true">*</b></span>
            <input v-model.number="character.movement" min="0" step="1" type="number" />
            <small>Movement is determined by species. Most Humans begin with 10, though character traits or campaign rules may modify this value.</small>
          </label>
          <label class="creator-field additional-info-textarea"><span>Appearance</span><textarea v-model="character.appearance" rows="5"></textarea></label>
          <label class="creator-field additional-info-textarea"><span>Personality</span><textarea v-model="character.personality" rows="5"></textarea></label>
          <label class="creator-field additional-info-textarea additional-info-background"><span>Background <small>(Limited visibility)</small></span><textarea v-model="character.background" rows="7"></textarea></label>
        </div>
      </CreatorAccordion>
    </div>

    <section class="creator-save-section mt-8">
      <div>
        <p class="text-sm font-semibold text-zinc-100">Ready to finalize?</p>
        <p class="mt-1 text-xs text-zinc-500">Every accordion must show a green checkmark before the character can be saved.</p>
        <p v-if="saveError" class="mt-2 text-sm text-red-200" role="alert">{{ saveError }}</p>
      </div>
      <button :disabled="!allSectionsComplete || isSaving || !session" type="button" @click="handleCreateCharacter">
        {{ isSaving ? 'Creating Character...' : 'Create Character' }}
      </button>
    </section>
  </main>
</template>

<style scoped>
.creator-fields {
  display: grid;
  gap: 1rem;
}

.creator-field {
  display: block;
}

.creator-field > span {
  display: block;
  margin-bottom: 0.4rem;
  color: rgb(253 230 138 / 0.65);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.creator-field b {
  color: rgb(248 113 113);
}

.creator-field small {
  display: block;
  margin-top: 0.4rem;
  color: rgb(161 161 170);
  font-size: 0.72rem;
  line-height: 1.45;
}

.helper-link {
  color: rgb(186 230 253);
  text-decoration: underline;
  text-decoration-color: rgb(125 211 252 / 0.45);
  text-underline-offset: 0.15rem;
}

.helper-link:hover,
.helper-link:focus-visible {
  color: rgb(224 242 254);
  outline: none;
}

.creator-field input {
  width: 100%;
  min-height: 2.75rem;
  border: 1px solid rgb(252 211 77 / 0.28);
  padding: 0.6rem 0.75rem;
  background: rgb(0 0 0 / 0.28);
  color: rgb(244 244 245);
  font-size: 0.9rem;
  outline: none;
}

.creator-field textarea {
  width: 100%;
  border: 1px solid rgb(252 211 77 / 0.28);
  padding: 0.65rem 0.75rem;
  resize: vertical;
  background: rgb(0 0 0 / 0.28);
  color: rgb(244 244 245);
  font-size: 0.9rem;
  line-height: 1.6;
  outline: none;
}

.creator-field textarea:hover,
.creator-field textarea:focus {
  border-color: rgb(252 211 77 / 0.68);
  box-shadow: 0 0 14px rgb(251 191 36 / 0.08);
}

.creator-field input:hover,
.creator-field input:focus {
  border-color: rgb(252 211 77 / 0.68);
  background: rgb(252 211 77 / 0.03);
  box-shadow: 0 0 14px rgb(251 191 36 / 0.08);
}

.slug-preview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1rem;
  border-top: 1px solid rgb(252 211 77 / 0.14);
  padding-top: 1rem;
}

.slug-preview span {
  color: rgb(161 161 170);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.slug-preview code {
  color: rgb(186 230 253);
  font-size: 0.78rem;
}

.dice-input-wrap {
  position: relative;
}

.dice-input-wrap input {
  padding-right: 2.5rem;
}

.dice-input-wrap > span {
  position: absolute;
  top: 50%;
  right: 0.85rem;
  color: rgb(253 230 138 / 0.7);
  font-size: 0.75rem;
  font-weight: 700;
  transform: translateY(-50%);
}

.attribute-calculation {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.6rem;
  border: 1px solid rgb(252 211 77 / 0.35);
  padding: 0.85rem 1rem;
  background: rgb(252 211 77 / 0.045);
  color: rgb(254 243 199);
  box-shadow: inset 0 0 18px rgb(251 191 36 / 0.025);
}

.attribute-calculation span {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.attribute-calculation strong {
  color: rgb(253 230 138);
  font-size: 0.9rem;
  font-weight: 750;
}

.assigning-dice {
  border-top: 1px solid rgb(252 211 77 / 0.16);
  padding-top: 1.5rem;
}

.assigning-dice h2 {
  color: rgb(254 243 199);
  font-size: 1.25rem;
  font-weight: 650;
  letter-spacing: 0.03em;
}

.allocation-summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem 1rem;
  border: 1px solid rgb(252 211 77 / 0.35);
  padding: 0.8rem 0.9rem;
  background: rgb(252 211 77 / 0.04);
  color: rgb(253 230 138);
  font-size: 0.8rem;
}

.allocation-summary span {
  color: rgb(212 212 216);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.allocation-summary--complete {
  border-color: rgb(74 222 128 / 0.5);
  background: rgb(34 197 94 / 0.045);
  color: rgb(134 239 172);
}

.allocation-summary--over {
  border-color: rgb(248 113 113 / 0.55);
  background: rgb(127 29 29 / 0.12);
  color: rgb(252 165 165);
}

.attribute-allocation-grid {
  display: grid;
  gap: 0.75rem;
}

.attribute-allocation {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  border: 1px solid rgb(252 211 77 / 0.24);
  padding: 0.85rem;
  background: rgb(255 255 255 / 0.012);
}

.attribute-allocation legend {
  padding: 0 0.35rem;
  color: rgb(253 230 138 / 0.78);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.attribute-allocation label > span {
  display: block;
  margin-bottom: 0.35rem;
  color: rgb(161 161 170);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.attribute-allocation input {
  width: 100%;
  min-height: 2.5rem;
  border: 1px solid rgb(161 161 170 / 0.28);
  padding: 0.45rem 0.6rem;
  background: rgb(0 0 0 / 0.28);
  color: rgb(244 244 245);
  outline: none;
}

.attribute-allocation input:hover,
.attribute-allocation input:focus {
  border-color: rgb(252 211 77 / 0.6);
  background: rgb(252 211 77 / 0.03);
  box-shadow: 0 0 12px rgb(251 191 36 / 0.07);
}

.starting-equipment-grid {
  display: grid;
  gap: 1rem;
}

.additional-info-grid {
  display: grid;
  gap: 1rem;
}

.health-roll-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  border: 1px solid rgb(252 211 77 / 0.32);
  padding: 1rem;
  background: rgb(252 211 77 / 0.035);
}

.health-roll-panel > div:first-child {
  min-width: min(100%, 22rem);
  flex: 1;
}

.health-roll-kicker {
  color: rgb(253 230 138 / 0.7);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.health-roll-kicker b {
  color: rgb(248 113 113);
}

.health-roll-panel h2 {
  margin-top: 0.3rem;
  color: rgb(254 243 199);
  font-size: 1.1rem;
  font-weight: 650;
}

.health-roll-action {
  display: flex;
  min-width: min(100%, 15rem);
  flex-direction: column;
  align-items: stretch;
  gap: 0.65rem;
}

.health-roll-action > button {
  border: 1px solid rgb(252 211 77 / 0.55);
  padding: 0.65rem 0.85rem;
  background: rgb(252 211 77 / 0.08);
  color: rgb(254 243 199);
  font-size: 0.65rem;
  font-weight: 750;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
}

.health-roll-action > button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.health-roll-result {
  border: 1px solid rgb(74 222 128 / 0.4);
  padding: 0.6rem 0.75rem;
  background: rgb(34 197 94 / 0.045);
}

.health-roll-result strong,
.health-roll-result span {
  display: block;
}

.health-roll-result strong {
  color: rgb(134 239 172);
  font-size: 0.9rem;
}

.health-roll-result span {
  margin-top: 0.25rem;
  color: rgb(161 161 170);
  font-size: 0.65rem;
}

.additional-info-textarea,
.additional-info-background {
  grid-column: 1 / -1;
}

.creator-save-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  border: 1px solid rgb(252 211 77 / 0.35);
  padding: 1.25rem;
  background: rgb(5 8 7 / 0.78);
  box-shadow: 0 0 26px rgb(251 191 36 / 0.08);
}

.creator-save-section button {
  border: 1px solid rgb(252 211 77 / 0.6);
  padding: 0.75rem 1.2rem;
  background: rgb(252 211 77 / 0.09);
  color: rgb(254 243 199);
  font-size: 0.7rem;
  font-weight: 750;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
}

.creator-save-section button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

@media (min-width: 640px) {
  .creator-fields {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .creator-field--wide {
    grid-column: 1 / -1;
  }

  .attribute-allocation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .additional-info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .attribute-allocation-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .starting-equipment-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .starting-equipment-grid > :last-child {
    grid-column: 1 / -1;
  }
}
</style>
