<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getSession, onAuthStateChange } from '../services/auth'
import { getLatestDiceRolls, logDiceRoll, subscribeToDiceRolls } from '../services/diceRollLog'

const isOpen = ref(false)
const diceCount = ref(3)
const modifier = ref(0)
const result = ref(null)
const standardDice = ref([])
const wildDie = ref([])
const errorMessage = ref('')
const isMuted = ref(false)
const session = ref(null)
const isLogOpen = ref(false)
const rolls = ref([])
const isLogLoading = ref(false)
const logError = ref('')
const rollLogLimit = 25
let unsubscribeAuth = null
let unsubscribeRolls = null

const total = computed(() => result.value?.total ?? '')

function playDiceSound() {
  if (isMuted.value) return

  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return

  const context = new AudioContext()
  const master = context.createGain()
  master.gain.setValueAtTime(0.45, context.currentTime)
  master.connect(context.destination)

  for (let index = 0; index < 16; index += 1) {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const start = context.currentTime + index * 0.03
    const duration = 0.04 + Math.random() * 0.04

    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(140 + Math.random() * 520, start)
    gain.gain.setValueAtTime(0.001, start)
    gain.gain.exponentialRampToValueAtTime(0.34, start + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
    oscillator.connect(gain)
    gain.connect(master)
    oscillator.start(start)
    oscillator.stop(start + duration)
  }

  window.setTimeout(() => context.close(), 800)
}

function addRoll(roll) {
  rolls.value = [roll, ...rolls.value.filter((existing) => existing.id !== roll.id)].slice(0, rollLogLimit)
}

async function loadRolls() {
  isLogLoading.value = true
  logError.value = ''
  const { data, error } = await getLatestDiceRolls(rollLogLimit)
  if (error) logError.value = error.message
  else rolls.value = data || []
  isLogLoading.value = false
}

function connectRollLog() {
  if (unsubscribeRolls) unsubscribeRolls()
  unsubscribeRolls = subscribeToDiceRolls(addRoll)
}

async function rollDice(source = 'manual', rollLabel = null, characterName = null) {
  const dice = Number(diceCount.value)
  const mod = Number(modifier.value)
  if (source !== 'sheet') {
    rollLabel = null
    characterName = null
  }

  if (!Number.isInteger(dice) || dice < 1 || dice > 30) {
    errorMessage.value = 'Enter 1 to 30 dice.'
    result.value = null
    return
  }

  if (!Number.isInteger(mod) || mod < -99 || mod > 99) {
    errorMessage.value = 'Modifier must be between -99 and 99.'
    result.value = null
    return
  }

  playDiceSound()
  errorMessage.value = ''
  wildDie.value = [Math.floor(Math.random() * 6) + 1]

  while (wildDie.value.at(-1) === 6) {
    wildDie.value.push(Math.floor(Math.random() * 6) + 1)
  }

  standardDice.value = Array.from({ length: dice - 1 }, () => Math.floor(Math.random() * 6) + 1)
  const wildTotal = wildDie.value.reduce((sum, value) => sum + value, 0)
  const subtotal = wildTotal + standardDice.value.reduce((sum, value) => sum + value, 0)

  result.value = {
    subtotal,
    total: subtotal + mod,
    modifier: mod,
    wildTotal,
    wildStatus: wildDie.value[0] === 1 ? 'critical' : wildDie.value.length > 1 ? 'exploded' : 'normal',
  }

  const { data, error } = await logDiceRoll({
    sourceCode: source === 'sheet' ? 1 : 0,
    diceCount: dice,
    modifier: mod,
    subtotal,
    total: result.value.total,
    wildTotal,
    wildStatusCode: result.value.wildStatus === 'critical' ? 1 : result.value.wildStatus === 'exploded' ? 2 : 0,
    rollLabel,
    characterName,
  })
  if (data) addRoll(data)
  if (error) logError.value = `Roll was not logged: ${error.message}`
}

function rollRequestedDice(event) {
  const nextDiceCount = Number(event.detail?.diceCount)
  const nextModifier = Number(event.detail?.modifier ?? 0)
  const rollLabel = typeof event.detail?.rollLabel === 'string' ? event.detail.rollLabel.trim().slice(0, 80) : null
  const characterName = typeof event.detail?.characterName === 'string' ? event.detail.characterName.trim().slice(0, 80) : null

  if (!Number.isInteger(nextDiceCount) || nextDiceCount < 1 || nextDiceCount > 30) return
  if (!Number.isInteger(nextModifier) || nextModifier < -99 || nextModifier > 99) return

  diceCount.value = nextDiceCount
  modifier.value = nextModifier
  isOpen.value = true
  rollDice('sheet', rollLabel, characterName)
}

function handleKeydown(event) {
  if (event.key === 'Escape') isOpen.value = false
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value))
}

function formatModifier(value) {
  return value >= 0 ? `+${value}` : `${value}`
}

function wildStatus(code) {
  return code === 1 ? 'critical' : code === 2 ? 'exploded' : 'normal'
}

onMounted(async () => {
  window.addEventListener('d6v-roll-dice', rollRequestedDice)
  window.addEventListener('keydown', handleKeydown)
  const { session: currentSession } = await getSession()
  session.value = currentSession
  if (session.value) {
    await loadRolls()
    connectRollLog()
  }
  unsubscribeAuth = onAuthStateChange(async (nextSession) => {
    session.value = nextSession
    if (nextSession) {
      await loadRolls()
      connectRollLog()
    } else {
      isOpen.value = false
      isLogOpen.value = false
      rolls.value = []
      if (unsubscribeRolls) unsubscribeRolls()
      unsubscribeRolls = null
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('d6v-roll-dice', rollRequestedDice)
  window.removeEventListener('keydown', handleKeydown)
  if (unsubscribeAuth) unsubscribeAuth()
  if (unsubscribeRolls) unsubscribeRolls()
})
</script>

<template>
  <div v-if="session" class="dice-tools">
    <aside class="roll-log-drawer" :class="{ 'roll-log-drawer-open': isLogOpen }" aria-label="Roll log">
      <button class="roll-log-tab" type="button" :aria-expanded="isLogOpen" aria-controls="roll-log-panel" @click="isLogOpen = !isLogOpen">
        <span aria-hidden="true">☷</span><span>Roll Log</span>
      </button>
      <section id="roll-log-panel" class="roll-log-panel">
        <header class="roll-log-panel-header">
          <div><p>Dice History</p><h2>Roll Log</h2></div>
          <button type="button" aria-label="Close roll log" @click="isLogOpen = false">×</button>
        </header>
        <p v-if="logError" class="roll-log-state roll-log-error">{{ logError }}</p>
        <p v-else-if="isLogLoading" class="roll-log-state">Loading rolls...</p>
        <p v-else-if="!rolls.length" class="roll-log-state">No logged rolls yet.</p>
        <div v-else class="roll-log-list">
          <article v-for="roll in rolls" :key="roll.id" class="roll-log-entry" :class="`roll-log-entry-${wildStatus(roll.wild_status_code)}`">
            <div class="roll-log-entry-top">
              <div><strong>{{ roll.roller_username }}<template v-if="roll.character_name"> - {{ roll.character_name }}</template></strong><time :datetime="roll.created_at">{{ formatDate(roll.created_at) }}</time></div>
              <b>{{ roll.total }}</b>
            </div>
            <p v-if="roll.roll_label" class="roll-log-entry-label">{{ roll.roll_label }}</p>
            <div class="roll-log-entry-details">
              <span>{{ roll.dice_count }}D{{ formatModifier(roll.modifier) }}</span>
              <span>Wild {{ roll.wild_total }}</span>
              <span>{{ wildStatus(roll.wild_status_code) }}</span>
            </div>
          </article>
        </div>
      </section>
    </aside>

    <div class="dice-roller">
    <button class="dice-fab" type="button" aria-label="Open dice roller" @click="isOpen = true">
      <span class="dice-face" aria-hidden="true"><span v-for="pip in 6" :key="pip" /></span>
    </button>

    <div v-if="isOpen" class="dice-overlay" role="dialog" aria-modal="true" aria-labelledby="dice-roller-title">
      <button class="dice-overlay-backdrop" type="button" aria-label="Close dice roller" @click="isOpen = false" />

      <section class="dice-panel">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.26em] text-amber-100/60">D6 Variance</p>
            <h2 id="dice-roller-title" class="mt-1 text-3xl font-black text-amber-300">Dice Roller</h2>
          </div>
          <div class="dice-panel-actions">
            <button class="dice-sound-button" type="button" :aria-label="isMuted ? 'Unmute dice sound' : 'Mute dice sound'" @click="isMuted = !isMuted">
              {{ isMuted ? 'Sound Off' : 'Sound On' }}
            </button>
            <button class="dice-close-button" type="button" aria-label="Close dice roller" @click="isOpen = false">×</button>
          </div>
        </div>

        <div class="dice-form mt-6">
          <label><span>Dice</span><input v-model.number="diceCount" type="number" min="1" max="30" /></label>
          <strong>D+</strong>
          <label><span>Modifier</span><input v-model.number="modifier" type="number" min="-99" max="99" /></label>
        </div>

        <button class="dice-roll-button mt-6" type="button" @click="rollDice()">Roll</button>
        <p v-if="errorMessage" class="mt-4 text-sm font-semibold text-red-300">{{ errorMessage }}</p>

        <div v-if="result" class="dice-result mt-6" :class="`dice-result-${result.wildStatus}`" aria-live="polite">
          <p class="text-sm uppercase tracking-[0.18em] text-amber-100/60">Result</p>
          <p v-if="result.wildStatus === 'exploded'" class="dice-result-callout">Crit!</p>
          <p v-else-if="result.wildStatus === 'critical'" class="dice-result-callout">Complication!</p>
          <p class="mt-2 text-5xl font-black text-white">{{ total }}</p>
          <p class="mt-3 text-sm text-zinc-300">
            Wild: {{ wildDie.join(' + ') }} | Dice: {{ standardDice.length ? standardDice.join(', ') : 'None' }} |
            Modifier: {{ result.modifier >= 0 ? '+' : '' }}{{ result.modifier }}
          </p>
        </div>
      </section>
    </div>
    </div>
  </div>
</template>
