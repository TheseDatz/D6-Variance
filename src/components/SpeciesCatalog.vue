<script setup>
import { computed, ref } from 'vue'

const attributes = ['Strength', 'Dexterity', 'Social', 'Intelligence', 'Luck', 'Paranormal']

const species = [
  {
    name: 'Human',
    pack: 'Core',
    description: 'Adaptable, ambitious, and found almost anywhere, humans are defined less by a single gift than by the extraordinary variety of paths they pursue.',
    allocationDice: '12D',
    movement: '10',
    size: '1.5–2 m tall',
    lifespan: '70–100 years',
    attributeDice: Object.fromEntries(attributes.map((attribute) => [attribute, { min: '1D', max: '4D' }])),
    abilities: [
      { name: 'Adaptable', group: 'species', description: 'You have no mandatory species traits. When creating your character, spend your starting allocation dice freely within your species attribute limits.' },
    ],
  },
  {
    name: 'Dwarf',
    pack: 'Fantasy',
    description: 'Dwarves are compact, enduring people whose communities prize craft, memory, and steadfast loyalty.',
    allocationDice: '11D+1',
    movement: '8',
    size: '1.2–1.5 m tall',
    lifespan: '200–350 years',
    attributeDice: {
      Strength: { min: '2D', max: '5D' }, Dexterity: { min: '1D', max: '3D+2' }, Social: { min: '1D', max: '4D' },
      Intelligence: { min: '1D', max: '4D+1' }, Luck: { min: '1D', max: '4D' }, Paranormal: { min: '0D', max: '4D' },
    },
    abilities: [
      { name: 'Hardy (Medium)', search: 'Hardy', group: 'advantages', description: 'Gain +1D on Strength checks to resist disease, poison, stunning, and incapacitation.' },
      { name: 'Stonewise', group: 'species', description: 'Gain +1D on checks to notice unusual stonework, structural weaknesses, underground construction, or hazards involving worked stone.' },
    ],
  },
  {
    name: 'Elf',
    pack: 'Fantasy',
    description: 'Elves are graceful, long-lived people with keen senses and an instinctive affinity for the uncanny places of the world.',
    allocationDice: '11D+2',
    movement: '10',
    size: '1.6–2 m tall',
    lifespan: '500–1,000 years',
    attributeDice: {
      Strength: { min: '1D', max: '3D+2' }, Dexterity: { min: '2D', max: '5D' }, Social: { min: '1D', max: '4D+1' },
      Intelligence: { min: '1D', max: '4D+1' }, Luck: { min: '1D', max: '4D' }, Paranormal: { min: '1D', max: '5D' },
    },
    abilities: [
      { name: 'Acute Sense (Minor)', search: 'Acute Sense', group: 'advantages', description: 'Choose sight, hearing, smell, taste, or touch. Gain +1D on checks where detecting fine details through that sense is the primary challenge.' },
      { name: 'Ageless', group: 'species', description: 'After reaching adulthood, you do not suffer ordinary physical decline from age and are immune to effects that cause mundane premature aging.' },
    ],
  },
  {
    name: 'Halfling',
    pack: 'Fantasy',
    description: 'Halflings are small, sociable, and remarkably resilient travelers who often survive dangers that overlook them entirely.',
    allocationDice: '11D+1',
    movement: '8',
    size: '0.8–1.2 m tall',
    lifespan: '90–150 years',
    attributeDice: {
      Strength: { min: '1D', max: '3D' }, Dexterity: { min: '2D', max: '4D+2' }, Social: { min: '1D', max: '4D+1' },
      Intelligence: { min: '1D', max: '4D' }, Luck: { min: '2D', max: '5D' }, Paranormal: { min: '0D', max: '4D' },
    },
    abilities: [
      { name: 'Small Stature', group: 'species', description: 'You can pass through spaces sized for a Small creature and gain +2 on checks to hide behind cover. Equipment made for larger creatures may require alteration, and you cannot comfortably use oversized equipment.' },
      { name: 'Fortunate (Medium)', search: 'Fortunate', group: 'advantages', description: 'Once per session, reroll an entire check and keep the better final result.' },
    ],
  },
]

const searchQuery = ref('')
const selectedPack = ref('all')
const packs = computed(() => [...new Set(species.map((entry) => entry.pack))])
const filteredSpecies = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return species.filter((entry) => {
    const matchesPack = selectedPack.value === 'all' || entry.pack === selectedPack.value
    const searchableText = [
      entry.name,
      entry.pack,
      entry.description,
      entry.allocationDice,
      entry.movement,
      entry.size,
      entry.lifespan,
      ...entry.abilities.flatMap((ability) => [ability.name, ability.description]),
    ].join(' ').toLowerCase()
    return matchesPack && (!query || searchableText.includes(query))
  })
})
</script>

<template>
  <section aria-labelledby="species-catalog" class="scroll-mt-24">
    <h2 id="species-catalog" class="sr-only">Species catalog</h2>

    <div class="flex items-end overflow-hidden px-2" role="tablist" aria-label="Species catalog">
      <button id="species-tab" class="relative z-[1] -mb-px min-w-36 rounded-t-xl border border-b-0 border-amber-300/60 bg-[#07140c] px-5 py-3 text-sm font-semibold tracking-wide text-amber-100 shadow-[0_-8px_24px_rgba(251,191,36,0.10)] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-[#07140c]" aria-controls="species-panel" aria-selected="true" role="tab" type="button">
        Species
      </button>
    </div>

    <div id="species-panel" class="relative border border-amber-300/50 bg-[#07140c]/25 p-5 shadow-[0_0_32px_rgba(251,191,36,0.12),inset_0_0_24px_rgba(251,191,36,0.04)] sm:p-7" aria-labelledby="species-tab" role="tabpanel">
      <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"></div>

      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 class="text-xl font-semibold tracking-wide text-amber-100">Species</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-zinc-300">Starting limits, physical benchmarks, and innate abilities for the people of each setting.</p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
          <label class="relative flex-1">
            <span class="sr-only">Search species</span>
            <svg aria-hidden="true" class="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-amber-200/60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <input v-model="searchQuery" class="w-full rounded-full border border-amber-400/25 bg-black/30 py-2.5 pr-4 pl-11 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15" placeholder="Search species" type="search" />
          </label>

          <label>
            <span class="sr-only">Filter by pack</span>
            <select v-model="selectedPack" class="w-full cursor-pointer rounded-full border border-amber-400/25 bg-[#07100b] px-5 py-2.5 text-sm text-amber-100 outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15 sm:w-44">
              <option value="all">All packs</option>
              <option v-for="pack in packs" :key="pack" :value="pack">{{ pack }}</option>
            </select>
          </label>
        </div>
      </div>

      <div aria-hidden="true" class="my-7 h-px w-full bg-gradient-to-r from-transparent via-amber-300/45 to-transparent"></div>

      <div class="grid gap-4 lg:grid-cols-2">
        <article v-for="entry in filteredSpecies" :key="entry.name" class="flex flex-col border border-white/15 bg-black/20 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div class="flex items-start justify-between gap-4">
            <h4 class="text-sm font-bold uppercase tracking-[0.12em] text-zinc-50">{{ entry.name }}</h4>
            <span class="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-amber-300/70">{{ entry.pack }} pack</span>
          </div>
          <p class="mt-3 text-sm leading-7 text-zinc-300">{{ entry.description }}</p>

          <dl class="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 text-sm sm:grid-cols-4">
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-500">Allocation</dt><dd class="mt-1 font-semibold text-amber-100">{{ entry.allocationDice }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-500">Movement</dt><dd class="mt-1 font-semibold text-amber-100">{{ entry.movement }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-500">Size</dt><dd class="mt-1 font-semibold text-amber-100">{{ entry.size }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-500">Lifespan</dt><dd class="mt-1 font-semibold text-amber-100">{{ entry.lifespan }}</dd></div>
          </dl>

          <div class="mt-5">
            <h5 class="text-xs font-bold uppercase tracking-[0.12em] text-sky-200/80">Starting attribute dice</h5>
            <dl class="mt-2 grid grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3">
              <div v-for="attribute in attributes" :key="attribute" class="flex items-baseline justify-between gap-2 border-b border-white/10 py-1.5">
                <dt class="text-xs text-zinc-400">{{ attribute }}</dt>
                <dd class="text-xs font-semibold text-zinc-100">{{ entry.attributeDice[attribute].min }}–{{ entry.attributeDice[attribute].max }}</dd>
              </div>
            </dl>
          </div>

          <div class="mt-5 border-t border-white/10 pt-4">
            <h5 class="text-xs font-bold uppercase tracking-[0.12em] text-sky-200/80">Special abilities</h5>
            <ul class="mt-2 space-y-2">
              <li v-for="ability in entry.abilities" :key="ability.name" class="text-xs leading-5 text-zinc-400">
                <RouterLink
                  class="font-semibold text-zinc-200 underline decoration-amber-300/40 underline-offset-4 transition hover:text-amber-100 hover:decoration-amber-300"
                  :to="{ path: '/traits', query: { group: ability.group, search: ability.search || ability.name } }"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`View ${ability.name} in the traits catalog (opens in a new tab)`"
                >{{ ability.name }}</RouterLink>: {{ ability.description }}
              </li>
            </ul>
          </div>
        </article>
      </div>

      <p v-if="!filteredSpecies.length" class="py-12 text-center text-sm text-zinc-400">No species match “{{ searchQuery }}”.</p>
    </div>
  </section>
</template>
