<script setup>
import { computed, ref } from 'vue'
import PageHero from '../components/PageHero.vue'

const searchQuery = ref('')
const selectedType = ref('all')

// Owned vehicles will eventually be populated from party and character records.
// Keeping the list separate allows owned cards to track mutable state while the
// reference catalog remains a collection of reusable profiles.
const ownedVehicles = ref([])

const vehicleCatalog = [
  {
    name: 'Draft Cart',
    type: 'Animal-Drawn',
    pack: 'Core',
    description: 'A sturdy two-wheeled cart for passengers, supplies, and trade goods.',
    scale: '+2 Huge',
    move: '8',
    maneuverability: '−1D',
    toughness: '3D',
    health: '32',
    armour: 'None',
    crew: '1 driver',
    capacity: '4 passengers or 500 kg cargo',
    control: 'Driving',
    weapons: 'None',
    traits: 'Animal-Drawn, Open-Topped',
  },
  {
    name: 'Rowboat',
    type: 'Watercraft',
    pack: 'Core',
    description: 'A small open boat propelled by oars and suited to rivers, lakes, and sheltered coastal water.',
    scale: '+1 Large',
    move: '6',
    maneuverability: '+1D',
    toughness: '2D+2',
    health: '24',
    armour: 'None',
    crew: '1 rower',
    capacity: '4 passengers or 250 kg cargo',
    control: 'Sailing',
    weapons: 'None',
    traits: 'Human-Powered, Open-Topped, Watercraft',
  },
  {
    name: 'Sailing Sloop',
    type: 'Watercraft',
    pack: 'Core',
    description: 'A nimble single-masted vessel used for coastal travel, fishing, scouting, and light cargo.',
    scale: '+3 Massive',
    move: '12',
    maneuverability: '+1',
    toughness: '4D',
    health: '45',
    armour: '+1D physical to the hull',
    crew: '4',
    capacity: '12 passengers or 2 tonnes cargo',
    control: 'Sailing',
    weapons: 'One optional light deck weapon',
    traits: 'Open Deck, Sails, Watercraft',
  },
  {
    name: 'War Wagon',
    type: 'Animal-Drawn',
    pack: 'Fantasy',
    description: 'A reinforced wagon with firing positions and protected sides for dangerous roads and battlefield support.',
    scale: '+2 Huge',
    move: '8',
    maneuverability: '−1D',
    toughness: '3D+2',
    health: '38',
    armour: '+1D physical to occupants behind the sides',
    crew: '2',
    capacity: '6 passengers or 750 kg cargo',
    control: 'Driving',
    weapons: 'One optional mounted crossbow',
    traits: 'Animal-Drawn, Armoured Sides, Open-Topped',
  },
]

const vehicleTypes = computed(() => [...new Set(vehicleCatalog.map((vehicle) => vehicle.type))])
const filteredVehicles = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return vehicleCatalog.filter((vehicle) => {
    const matchesType = selectedType.value === 'all' || vehicle.type === selectedType.value
    const searchable = Object.values(vehicle).join(' ').toLowerCase()
    return matchesType && (!query || searchable.includes(query))
  })
})

function conditionFor(currentHealth, maximumHealth) {
  const current = Number(currentHealth)
  const maximum = Number(maximumHealth)
  if (!Number.isFinite(current) || !Number.isFinite(maximum) || maximum <= 0) return 'Unknown'

  const percent = (current / maximum) * 100
  if (percent <= 0) return 'Destroyed'
  if (percent < 10) return 'Critical'
  if (percent < 20) return 'Disabled'
  if (percent < 40) return 'Severely Damaged'
  if (percent < 60) return 'Damaged'
  if (percent < 81) return 'Shaken'
  if (percent < 100) return 'Scratched'
  return 'Operational'
}
</script>

<template>
  <main class="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 text-zinc-100 sm:px-5">
    <PageHero
      title="Vehicles & Mounts"
      description="Track the party’s rides, vessels, and conveyances, or choose a reference profile to bring into the game."
    />

    <section class="mt-12" aria-labelledby="owned-vehicles">
      <div class="flex flex-col gap-3 border-b border-amber-300/30 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/75">Live cards</p>
          <h2 id="owned-vehicles" class="mt-1 text-2xl font-semibold tracking-wide text-amber-100">Owned Vehicles</h2>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">Owned cards are stateful records: they add an owner, current Health, condition, current crew, cargo, damage, and campaign notes to the complete vehicle profile.</p>
        </div>
        <span class="w-fit rounded-full border border-amber-300/25 bg-amber-300/5 px-3 py-1 text-xs font-semibold text-amber-100">
          {{ ownedVehicles.length }} recorded
        </span>
      </div>

      <div v-if="ownedVehicles.length" class="mt-6 grid gap-5 lg:grid-cols-2">
        <article v-for="vehicle in ownedVehicles" :key="vehicle.id" class="border border-amber-300/45 bg-[#07140c]/45 p-5 shadow-[0_0_26px_rgba(251,191,36,0.09)]">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200/75">{{ vehicle.owner }}</p>
              <h3 class="mt-1 text-lg font-bold text-amber-100">{{ vehicle.name }}</h3>
            </div>
            <span class="rounded-full border border-amber-300/25 px-3 py-1 text-xs text-zinc-200">
              {{ conditionFor(vehicle.currentHealth, vehicle.maximumHealth) }}
            </span>
          </div>
          <div class="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div class="bg-black/20 p-3"><span class="block text-xs uppercase tracking-wider text-zinc-500">Health</span>{{ vehicle.currentHealth }} / {{ vehicle.maximumHealth }}</div>
            <div class="bg-black/20 p-3"><span class="block text-xs uppercase tracking-wider text-zinc-500">Scale</span>{{ vehicle.scale }}</div>
            <div class="bg-black/20 p-3"><span class="block text-xs uppercase tracking-wider text-zinc-500">Move</span>{{ vehicle.move }}</div>
            <div class="bg-black/20 p-3"><span class="block text-xs uppercase tracking-wider text-zinc-500">Crew</span>{{ vehicle.currentCrew }}</div>
          </div>
        </article>
      </div>

      <div v-else class="mt-6 border border-dashed border-amber-300/30 bg-white/[0.015] px-6 py-9 text-center">
        <h3 class="text-sm font-bold uppercase tracking-[0.14em] text-amber-100">No owned vehicles recorded</h3>
        <p class="mx-auto mt-2 max-w-2xl text-sm leading-6 text-zinc-400">When party ownership is connected, this section is designed for full tracking cards. The general profiles below remain read-only reference cards.</p>
      </div>
    </section>

    <section class="mt-14" aria-labelledby="vehicle-catalog">
      <div class="flex flex-col gap-5 border-b border-amber-300/30 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/75">Reference cards</p>
          <h2 id="vehicle-catalog" class="mt-1 text-2xl font-semibold tracking-wide text-amber-100">General Vehicles</h2>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">Reference cards contain the reusable profile required by the vehicle rules without campaign-specific state.</p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
          <label class="flex-1">
            <span class="sr-only">Search vehicles</span>
            <input v-model="searchQuery" class="w-full border border-amber-300/25 bg-black/25 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-300/60" placeholder="Search vehicles" type="search" />
          </label>
          <label>
            <span class="sr-only">Filter vehicle type</span>
            <select v-model="selectedType" class="w-full border border-amber-300/25 bg-[#07100b] px-4 py-2.5 text-sm text-zinc-100 outline-none focus:border-amber-300/60">
              <option value="all">All types</option>
              <option v-for="type in vehicleTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </label>
        </div>
      </div>

      <div class="mt-6 grid gap-5 lg:grid-cols-2">
        <article v-for="vehicle in filteredVehicles" :key="vehicle.name" class="relative overflow-hidden border border-amber-300/40 bg-[#07140c]/35 p-5 shadow-[0_0_28px_rgba(251,191,36,0.08)]">
          <div aria-hidden="true" class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"></div>

          <header class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div class="flex flex-wrap gap-2 text-[0.65rem] font-bold uppercase tracking-[0.14em]">
                <span class="text-sky-200/75">{{ vehicle.type }}</span>
                <span class="text-zinc-600">•</span>
                <span class="text-zinc-400">{{ vehicle.pack }}</span>
              </div>
              <h3 class="mt-1 text-lg font-bold text-amber-100">{{ vehicle.name }}</h3>
            </div>
            <span class="rounded-full border border-amber-300/20 bg-amber-300/5 px-3 py-1 text-xs text-zinc-300">{{ vehicle.control }}</span>
          </header>

          <p class="mt-3 text-sm leading-6 text-zinc-300">{{ vehicle.description }}</p>

          <dl class="mt-5 grid grid-cols-2 gap-px bg-amber-300/10 text-sm sm:grid-cols-4">
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">Scale</dt><dd class="mt-1 text-zinc-100">{{ vehicle.scale }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">Move</dt><dd class="mt-1 text-zinc-100">{{ vehicle.move }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">Maneuver</dt><dd class="mt-1 text-zinc-100">{{ vehicle.maneuverability }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">Toughness</dt><dd class="mt-1 text-zinc-100">{{ vehicle.toughness }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">Health</dt><dd class="mt-1 text-zinc-100">{{ vehicle.health }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">Armour</dt><dd class="mt-1 text-zinc-100">{{ vehicle.armour }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">Crew</dt><dd class="mt-1 text-zinc-100">{{ vehicle.crew }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-wider text-zinc-500">Capacity</dt><dd class="mt-1 text-zinc-100">{{ vehicle.capacity }}</dd></div>
          </dl>

          <div class="mt-5 grid gap-4 border-t border-amber-300/15 pt-4 text-sm sm:grid-cols-2">
            <div><h4 class="text-xs font-bold uppercase tracking-[0.14em] text-sky-200/75">Weapons</h4><p class="mt-1 leading-6 text-zinc-300">{{ vehicle.weapons }}</p></div>
            <div><h4 class="text-xs font-bold uppercase tracking-[0.14em] text-sky-200/75">Traits</h4><p class="mt-1 leading-6 text-zinc-300">{{ vehicle.traits }}</p></div>
          </div>
        </article>
      </div>

      <p v-if="!filteredVehicles.length" class="mt-6 border border-dashed border-amber-300/25 px-6 py-8 text-center text-sm text-zinc-400">No vehicles match those filters.</p>
    </section>
  </main>
</template>
