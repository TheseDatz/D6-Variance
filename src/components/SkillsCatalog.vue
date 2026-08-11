<script setup>
import { computed, ref } from 'vue'

const skills = [
  { name: 'Athletics', attribute: 'Strength', pack: 'Core', description: 'Running, jumping, swimming, and performing other strenuous physical movement that relies on power and endurance.', specializations: 'Running, Jumping, Swimming' },
  { name: 'Axes', attribute: 'Strength', pack: 'Core', description: 'Using concentrated chopping weapons through committed cuts, leverage, and control of their weighted heads.', specializations: 'Hatchets, Battle Axes, Great Axes' },
  { name: 'Blunt Weapons', attribute: 'Strength', pack: 'Core', description: 'Using rigid impact weapons to strike, crush, stun, or parry through force and leverage.', specializations: 'Maces, War Hammers, Quarterstaff' },
  { name: 'Brawling', attribute: 'Strength', pack: 'Core', description: 'Fighting at close range with fists, feet, natural weapons, grapples, and other unarmed techniques.', specializations: 'Boxing, Grappling, Natural Weapons' },
  { name: 'Climbing', attribute: 'Strength', pack: 'Core', description: 'Scaling walls, cliffs, ropes, and other difficult surfaces through strength, endurance, and technique.', specializations: 'Rock Climbing, Ropes, Urban Structures' },
  { name: 'Endurance', attribute: 'Strength', pack: 'Core', description: 'Resisting fatigue, pain, disease, poison, sleep deprivation, hunger, thirst, and prolonged physical strain.', specializations: 'Fatigue, Disease, Poison' },
  { name: 'Heavy Polearms', attribute: 'Strength', pack: 'Core', description: 'Using long, heavy, or braced pole weapons whose reach and striking power depend on leverage and committed force.', specializations: 'Halberds, Lances, Pikes' },
  { name: 'Labor', attribute: 'Strength', pack: 'Core', description: 'Performing sustained hauling, digging, rowing, marching under load, and other prolonged physical work.', specializations: 'Hauling, Digging, Rowing' },
  { name: 'Might', attribute: 'Strength', pack: 'Core', description: 'Lifting, forcing, bending, breaking, dragging, or holding something through short bursts of physical power.', specializations: 'Lifting, Breaking, Holding' },
  { name: 'Wrestling', attribute: 'Strength', pack: 'Core', description: 'Using trained clinches, pins, holds, takedowns, and positional control in close combat.', specializations: 'Clinches, Pins, Takedowns' },
  { name: 'Acrobatics', attribute: 'Dexterity', pack: 'Core', description: 'Performing controlled leaps, rolls, flips, tumbles, balancing maneuvers, safe falls, and other gymnastic movement.', specializations: 'Balance, Tumbling, Breaking Falls' },
  { name: 'Archery', attribute: 'Dexterity', pack: 'Core', description: 'Using bows and similar muscle-powered ranged weapons accurately under pressure.', specializations: 'Longbow, Crossbow, Mounted Archery' },
  { name: 'Dodge', attribute: 'Dexterity', pack: 'Core', description: 'Avoiding attacks, hazards, and sudden danger through quick movement and positioning.', specializations: 'Melee Attacks, Ranged Attacks, Hazards' },
  { name: 'Driving', attribute: 'Dexterity', pack: 'Core', description: 'Operating wheeled, tracked, sled, cart, carriage, or comparable surface vehicles under dangerous conditions.', specializations: 'Wheeled Vehicles, Tracked Vehicles, Animal-Drawn Vehicles' },
  { name: 'Flexible Weapons', attribute: 'Dexterity', pack: 'Core', description: 'Using weapons that wrap, entangle, swing around defenses, or deliver force through a chain, cord, or flexible joint.', specializations: 'Whips, Flails, Chains' },
  { name: 'Gunnery', attribute: 'Dexterity', pack: 'Core', description: 'Operating weapons mounted on vehicles, fortifications, ships, or other platforms.', specializations: 'Turrets, Artillery, Vehicle Weapons' },
  { name: 'Handguns', attribute: 'Dexterity', pack: 'Core', description: 'Using compact firearms designed primarily for one-handed or close-range operation.', specializations: 'Revolvers, Semi-Automatic Pistols, Machine Pistols' },
  { name: 'Heavy Weapons', attribute: 'Dexterity', pack: 'Core', description: 'Operating portable or crew-deployed launchers, artillery, flame weapons, and other weapons too large or complex to qualify as ordinary firearms.', specializations: 'Artillery, Launchers, Flame Weapons' },
  { name: 'Initiative', attribute: 'Dexterity', pack: 'Core', description: 'Reacting quickly when timing matters and acting decisively at the start of a conflict.', specializations: 'Ambushes, Duels, Vehicle Combat' },
  { name: 'Machine Guns', attribute: 'Dexterity', pack: 'Core', description: 'Using portable automatic support weapons designed for sustained or suppressive fire.', specializations: 'Light Machine Guns, General-Purpose Machine Guns, Heavy Machine Guns' },
  { name: 'Piloting', attribute: 'Dexterity', pack: 'Core', description: 'Operating vehicles that move freely through the air, space, or another three-dimensional environment.', specializations: 'Aircraft, Spacecraft, Submersibles' },
  { name: 'Polearms', attribute: 'Dexterity', pack: 'Core', description: 'Using light and versatile shafted weapons to thrust, sweep, control distance, or attack with extended reach.', specializations: 'Spears, Tridents, Staff Spears' },
  { name: 'Rifles', attribute: 'Dexterity', pack: 'Core', description: 'Using shoulder-fired firearms designed for accuracy, range, or controlled fire.', specializations: 'Carbines, Assault Rifles, Precision Rifles' },
  { name: 'Riding', attribute: 'Dexterity', pack: 'Core', description: 'Controlling a mount, remaining mounted during dangerous movement, and directing a trained riding creature under pressure.', specializations: 'Horses, Aerial Mounts, Exotic Mounts' },
  { name: 'Sailing', attribute: 'Dexterity', pack: 'Core', description: 'Operating and maneuvering watercraft through steering, sails, oars, currents, and coordinated crew activity.', specializations: 'Sailing Ships, Rowed Vessels, Powered Watercraft' },
  { name: 'Shotguns', attribute: 'Dexterity', pack: 'Core', description: 'Using firearms designed around shot, slugs, or other multiple-projectile and specialized shells.', specializations: 'Pump-Action, Double-Barrel, Automatic' },
  { name: 'Short Blades', attribute: 'Dexterity', pack: 'Core', description: 'Using compact bladed weapons in close quarters, grapples, concealment, and rapid attacks.', specializations: 'Daggers, Knives, Short Swords' },
  { name: 'Sleight of Hand', attribute: 'Dexterity', pack: 'Core', description: 'Palming objects, picking pockets, concealing small items, and performing close-up tricks through precise misdirection.', specializations: 'Pickpocketing, Palming, Stage Tricks' },
  { name: 'Stealth', attribute: 'Dexterity', pack: 'Core', description: 'Moving quietly, avoiding observation, using concealment, and blending into surroundings or crowds.', specializations: 'Shadows, Crowds, Wilderness' },
  { name: 'Swords', attribute: 'Dexterity', pack: 'Core', description: 'Using balanced, primarily bladed weapons for cutting, thrusting, parrying, and controlled close combat.', specializations: 'Longsword, Rapier, Greatsword' },
  { name: 'Submachine Guns', attribute: 'Dexterity', pack: 'Core', description: 'Using compact shoulder-fired automatic weapons designed around handgun-class ammunition.', specializations: 'Compact, Full-Size, Suppressed' },
  { name: 'Thievery', attribute: 'Dexterity', pack: 'Core', description: 'Opening locks, bypassing mundane security, manipulating simple mechanisms, and recognizing the practical operation of traps.', specializations: 'Locks, Traps, Security Devices' },
  { name: 'Throwing', attribute: 'Dexterity', pack: 'Core', description: 'Accurately throwing weapons, explosives, tools, or other objects and catching objects thrown toward the character.', specializations: 'Knives, Spears, Explosives' },
  { name: 'Animal Handling', attribute: 'Social', pack: 'Core', description: 'Calming, training, directing, and understanding ordinary animals and domesticated creatures.', specializations: 'Training, Calming, Specific Species' },
  { name: 'Command', attribute: 'Social', pack: 'Core', description: 'Organizing, directing, and coordinating willing people during stressful, dangerous, or time-sensitive situations.', specializations: 'Battle, Emergencies, Large Groups' },
  { name: 'Deception', attribute: 'Social', pack: 'Core', description: 'Misleading others through lies, misdirection, disguise, performance, or concealed intent.', specializations: 'Bluffing, Disguise, Misdirection' },
  { name: 'Etiquette', attribute: 'Social', pack: 'Core', description: 'Following and interpreting formal, cultural, courtly, military, or professional expectations.', specializations: 'Courtly, Military, Professional' },
  { name: 'Insight', attribute: 'Social', pack: 'Core', description: 'Reading emotions, motives, sincerity, tension, and the dynamics between people.', specializations: 'Motives, Emotions, Sincerity' },
  { name: 'Intimidation', attribute: 'Social', pack: 'Core', description: 'Influencing others through threats, physical presence, fear, or displays of power.', specializations: 'Interrogation, Physical Threats, Authority' },
  { name: 'Networking', attribute: 'Social', pack: 'Core', description: 'Building and maintaining useful relationships or locating an appropriate person through social connections.', specializations: 'Professional, Political, Community' },
  { name: 'Performance', attribute: 'Social', pack: 'Core', description: 'Entertaining or moving an audience through acting, dance, music, storytelling, comedy, or another practiced performance.', specializations: 'Acting, Music, Dance' },
  { name: 'Persuasion', attribute: 'Social', pack: 'Core', description: 'Changing minds through reason, charm, negotiation, reassurance, or a compelling appeal.', specializations: 'Bargaining, Diplomacy, Inspiration' },
  { name: 'Resolve', attribute: 'Social', pack: 'Core', description: 'Resisting fear, coercion, temptation, emotional manipulation, mental influence, and overwhelming stress.', specializations: 'Fear, Coercion, Mental Influence' },
  { name: 'Teaching', attribute: 'Social', pack: 'Core', description: 'Communicating a technique or idea so another character can understand, remember, or practice it.', specializations: 'Instruction, Coaching, Demonstration' },
  { name: 'Bureaucracy', attribute: 'Intelligence', pack: 'Core', description: 'Understanding institutions, official procedures, permits, records, administrative hierarchies, and how to make formal organizations act.', specializations: 'Government, Corporate, Academic' },
  { name: 'Commerce', attribute: 'Intelligence', pack: 'Core', description: 'Evaluating goods, understanding markets and business practices, negotiating commercial exchanges, and identifying profitable opportunities.', specializations: 'Appraisal, Business, Trade' },
  { name: 'Communications', attribute: 'Intelligence', pack: 'Core', description: 'Operating, configuring, intercepting, and diagnosing communication equipment and networks when range, interference, secrecy, or encryption matters.', specializations: 'Radio, Encryption, Signal Interception' },
  { name: 'Computers', attribute: 'Intelligence', pack: 'Core', description: 'Operating, programming, diagnosing, and repairing general-purpose computer systems.', specializations: 'Programming, Data Retrieval, Hardware' },
  { name: 'Crafting', attribute: 'Intelligence', pack: 'Core', description: 'Creating, repairing, modifying, and evaluating practical objects or structures using appropriate tools and materials.', specializations: 'Carpentry, Metalwork, Tailoring' },
  { name: 'Demolitions', attribute: 'Intelligence', pack: 'Core', description: 'Placing charges, deliberately collapsing structures, safely handling explosives, and identifying structural weaknesses for controlled destruction.', specializations: 'Explosives, Structural Collapse, Disarming Charges' },
  { name: 'Electronic Security', attribute: 'Intelligence', pack: 'Core', description: 'Bypassing, disabling, diagnosing, or reinforcing electronic and computerized security systems.', specializations: 'Access Control, Alarms, Surveillance' },
  { name: 'Engineering', attribute: 'Intelligence', pack: 'Core', description: 'Understanding, designing, diagnosing, and repairing complex machines, systems, structures, and technical devices.', specializations: 'Mechanical Systems, Structures, Vehicles' },
  { name: 'Forgery', attribute: 'Intelligence', pack: 'Core', description: 'Creating, altering, and identifying false documents, credentials, signatures, seals, records, currency, or comparable proof of authenticity.', specializations: 'Documents, Signatures, Currency' },
  { name: 'Perception', attribute: 'Intelligence', pack: 'Core', description: 'Noticing significant details, hidden threats, subtle changes, and clues in the environment.', specializations: 'Search, Tracking, Spotting Ambushes' },
  { name: 'Streetwise', attribute: 'Intelligence', pack: 'Core', description: 'Navigating local communities, informal networks, criminal circles, rumors, and urban dangers.', specializations: 'Black Markets, Criminal Groups, Rumors' },
  { name: 'First-Aid', attribute: 'Intelligence', pack: 'Core', description: 'Providing immediate treatment to stabilize injuries and address common medical emergencies.', specializations: 'Bleeding, Burns, Field Triage' },
  { name: 'Investigation', attribute: 'Intelligence', pack: 'Core', description: 'Gathering information, researching a subject, examining evidence, analyzing data, and connecting clues.', specializations: 'Crime Scenes, Research, Interviews' },
  { name: 'Medicine', attribute: 'Intelligence', pack: 'Core', description: 'Diagnosing and treating illness or injury through sustained professional medical care.', specializations: 'Diagnosis, Surgery, Toxicology' },
  { name: 'Navigation', attribute: 'Intelligence', pack: 'Core', description: 'Planning routes, reading maps, using landmarks or instruments, maintaining a course, and creating useful maps.', specializations: 'Wilderness, Maritime, Urban' },
  { name: 'Scholarship', attribute: 'Intelligence', pack: 'Core', description: 'Recalling and applying formal education, academic knowledge, theories, history, and specialized fields not covered by another skill.', specializations: 'History, Law, Natural Sciences' },
  { name: 'Sensors', attribute: 'Intelligence', pack: 'Core', description: 'Operating and interpreting devices that detect objects, movement, energy, weather, terrain, or other environmental information.', specializations: 'Radar, Sonar, Scientific Sensors' },
  { name: 'Tactics', attribute: 'Intelligence', pack: 'Core', description: 'Planning and evaluating coordinated action during combat, pursuits, sieges, ambushes, and other organized conflicts.', specializations: 'Ambushes, Defensive Positions, Small Units' },
  { name: 'Gambling', attribute: 'Luck', pack: 'Core', description: 'Playing games of chance, reading a table, managing risk, and recognizing when the odds are wrong.', specializations: 'Cards, Dice, Sports Betting' },
  { name: 'Improvisation', attribute: 'Luck', pack: 'Core', description: 'Making a temporary solution work through timing, opportunism, and fortunate circumstances.', specializations: 'Repairs, Distractions, Makeshift Tools' },
  { name: 'Scrounging', attribute: 'Luck', pack: 'Core', description: 'Finding a plausible useful item, supply, shelter, contact, or route when the exact answer is uncertain.', specializations: 'Supplies, Shelter, Routes' },
  { name: 'Serendipity', attribute: 'Luck', pack: 'Core', description: 'Benefiting from fortunate coincidences, blind choices, and outcomes for which no learned approach offers meaningful control.', specializations: 'Coincidences, Blind Choices, Fortunate Timing' },
  { name: 'Survival', attribute: 'Luck', pack: 'Core', description: 'Finding food, shelter, direction, and safety while enduring wilderness or hostile environments.', specializations: 'Desert, Forest, Urban' },
  { name: 'Occult', attribute: 'Paranormal', pack: 'Core', description: 'Understanding supernatural traditions, entities, symbols, phenomena, and forbidden knowledge.', specializations: 'Entities, Rituals, Relics' },
  { name: 'Channeling', attribute: 'Paranormal', pack: 'Core', description: 'Focusing and directing paranormal forces through practiced control, ritual, or force of will.', specializations: 'Binding, Divination, Warding' },
]

const searchQuery = ref('')
const selectedPack = ref('all')
const selectedAttribute = ref('all')
const packs = computed(() => [...new Set(skills.map((skill) => skill.pack))])
const attributes = computed(() => [...new Set(skills.map((skill) => skill.attribute))])
const filteredSkills = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return skills.filter((skill) => {
    const matchesPack = selectedPack.value === 'all' || skill.pack === selectedPack.value
    const matchesAttribute = selectedAttribute.value === 'all' || skill.attribute === selectedAttribute.value
    const matchesSearch = !query || `${skill.name} ${skill.attribute} ${skill.pack} ${skill.description} ${skill.specializations}`.toLowerCase().includes(query)
    return matchesPack && matchesAttribute && matchesSearch
  })
})
</script>

<template>
  <section aria-labelledby="skills-catalog" class="scroll-mt-24">
    <h2 id="skills-catalog" class="sr-only">Skills catalog</h2>

    <div class="flex items-end overflow-hidden px-2" role="tablist" aria-label="Skill catalog">
      <button id="skills-tab" class="relative z-[1] -mb-px min-w-36 rounded-t-xl border border-b-0 border-amber-300/60 bg-[#07140c] px-5 py-3 text-sm font-semibold tracking-wide text-amber-100 shadow-[0_-8px_24px_rgba(251,191,36,0.10)] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-[#07140c]" aria-controls="skills-panel" aria-selected="true" role="tab" type="button">
        Skills
      </button>
    </div>

    <div id="skills-panel" class="relative border border-amber-300/50 bg-[#07140c]/25 p-5 shadow-[0_0_32px_rgba(251,191,36,0.12),inset_0_0_24px_rgba(251,191,36,0.04)] sm:p-7" aria-labelledby="skills-tab" role="tabpanel">
      <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"></div>

      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 class="text-xl font-semibold tracking-wide text-amber-100">Skills</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-zinc-300">Training and learned expertise, each connected to the attribute that provides its starting value.</p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:max-w-3xl">
          <label class="relative flex-1">
            <span class="sr-only">Search skills</span>
            <svg aria-hidden="true" class="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-amber-200/60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <input v-model="searchQuery" class="w-full rounded-full border border-amber-400/25 bg-black/30 py-2.5 pr-4 pl-11 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15" placeholder="Search skills" type="search" />
          </label>

          <label>
            <span class="sr-only">Filter by attribute</span>
            <select v-model="selectedAttribute" class="w-full cursor-pointer rounded-full border border-amber-400/25 bg-[#07100b] px-5 py-2.5 text-sm text-amber-100 outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15 sm:w-44">
              <option value="all">All attributes</option>
              <option v-for="attribute in attributes" :key="attribute" :value="attribute">{{ attribute }}</option>
            </select>
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

      <div class="grid gap-4 md:grid-cols-2">
        <article v-for="skill in filteredSkills" :key="skill.name" class="border border-white/15 bg-black/20 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div class="flex items-start justify-between gap-4">
            <h4 class="text-sm font-bold uppercase tracking-[0.12em] text-zinc-50">{{ skill.name }}</h4>
            <span class="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-sky-200/80">{{ skill.attribute }}</span>
          </div>
          <p class="mt-2 text-sm leading-7 text-zinc-300">{{ skill.description }}</p>
          <p class="mt-3 text-xs leading-5 text-zinc-500">
            <span class="font-semibold text-zinc-400">Suggested specializations:</span> {{ skill.specializations }}
          </p>
          <p class="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-amber-300/70">{{ skill.pack }} pack</p>
        </article>
      </div>

      <p v-if="!filteredSkills.length" class="py-12 text-center text-sm text-zinc-400">No skills match “{{ searchQuery }}”.</p>
    </div>
  </section>
</template>
