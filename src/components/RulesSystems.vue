<script setup>
import { computed, ref } from 'vue'

const systems = [
  {
    id: 'core',
    label: 'Core',
    rules: [
      {
        title: 'System Overview',
        category: 'Getting Started',
        description: 'An introduction to the structure, terminology, and core ideas of D6: Variance.',
        content: [
          { type: 'p', text: 'D6: Variance is a collaborative tabletop roleplaying game. Most participants are players, each portraying a character who lives in the game world. One participant serves as the Storyteller, describing the world, presenting challenges, portraying its inhabitants, and making rulings when the outcome of an action is uncertain.' },
          { type: 'p', text: 'Together, the player characters form a party. The party gives the characters a reason to act together: they may share a mission, confront a common threat, pursue the same mystery, or simply depend on one another to survive. Whatever its purpose, the party is the center of play and its decisions move the story forward.' },
          { type: 'p', text: 'Play unfolds as a conversation. The Storyteller establishes a situation, the players describe what their characters do, and the rules determine the outcome whenever success is uncertain or failure would be meaningful. The dice introduce variance, but the choices made by the players and Storyteller determine what those results mean for the story.' },
        ],
      },
      {
        title: 'Characters',
        category: 'Getting Started',
        description: 'The common framework used to describe player characters and their capabilities.',
        content: [
          { type: 'p', text: 'Each player in D6V takes control of a player character—or, in some games, more than one. These characters are individuals living within the game world and the protagonists of the shared story. Their histories, personalities, relationships, and goals give them detail, while two types of game traits describe what they are capable of doing:' },
          { type: 'list', items: [
            { label: 'Attributes', text: 'Represent a character’s innate physical, mental, and social capabilities.' },
            { label: 'Skills', text: 'Represent a character’s training and ability to apply those capabilities to specific tasks.' },
          ] },
          { type: 'p', text: 'Attributes and skills use dice ratings written as XD+Y. X is the number of standard six-sided dice rolled, while Y is a number of pips added to the final total. For example, 5D means five six-sided dice, and 5D+2 means five dice plus two. Each pip adds +1 to a roll; three pips are equivalent to one full die.' },
          { type: 'p', text: 'Dice ratings and checks are explained further in Determining Outcomes. When you are ready to build a player character, continue to the Character Creation category.' },
        ],
      },
      {
        title: 'Experience',
        category: 'Getting Started',
        description: 'How characters learn, advance, and change through play.',
        content: [
          { type: 'p', text: 'Characters in D6V earn Experience Points through play. The Storyteller generally awards experience at the end of each session, reflecting the party’s accomplishments, discoveries, setbacks, and progress. The Storyteller may also award experience during a session for an especially creative decision, a memorable contribution, or a choice that meaningfully serves the narrative.' },
          { type: 'p', text: 'Players may allocate earned Experience Points between sessions to improve their characters. Once an Experience Point has been allocated, it normally cannot be reassigned. Any exception requires the Storyteller’s approval.' },
        ],
      },
      {
        title: 'Meta Dice',
        category: 'Getting Started',
        description: 'Special dice that allow players to influence important moments beyond an ordinary roll.',
        content: [
          { type: 'p', text: 'D6V uses a metacurrency called Meta Dice. A player may spend Meta Dice when a roll is especially important, giving their character a chance to push beyond their normal limits.' },
          { type: 'list', items: [
            { label: 'Spend 1 Meta Die', text: 'Add +1D to the roll.' },
            { label: 'Spend 2 Meta Dice', text: 'Double the final result of the roll.' },
          ] },
          { type: 'p', text: 'Every character begins with two Meta Dice and may hold a maximum of five. The Storyteller decides when to award them. A character doing something especially impressive, impactful, or true to the spirit of the story is a good reason for an award. Storytellers are encouraged to award Meta Dice liberally enough that players feel free to use them during dramatic moments.' },
        ],
      },
      {
        title: 'Determining Outcomes',
        category: 'Getting Started',
        description: 'How rolls, difficulties, and circumstances determine what happens next.',
        content: [
          { type: 'p', text: 'Whenever a character attempts something with a meaningful chance of failure, the Storyteller calls for an attribute or skill check. The Storyteller names the trait that best fits the action, though a player may suggest a different skill when it makes sense. The Storyteller has the final say. If the character does not possess the requested skill, they roll its corresponding attribute instead.' },
          { type: 'p', text: 'To make a check, roll the dice shown in the trait’s rating and add any pips to the total. For example, a character with a rating of 6D+2 rolls six six-sided dice, totals their results, and adds two. The player announces the final result, and the Storyteller compares it with a difficulty number to determine whether the action succeeds. Difficulty numbers are described in the Fundamentals rules.' },
          { type: 'p', text: 'When one character acts directly against another, the Storyteller may call for an opposed check instead of setting a fixed difficulty. Both characters roll the appropriate trait, and the higher result prevails. The Storyteller determines how to resolve a tie based on the circumstances.' },
          { type: 'subheading', text: 'Criticals and Complications' },
          { type: 'list', items: [
            { label: 'Criticals', text: 'Whenever a die naturally rolls a 6, roll that die again and add the new result to the total. If it rolls another 6, continue rolling and adding. This allows even a character with a modest rating to accomplish something extraordinary.' },
            { label: 'Complications', text: 'Whenever any die naturally rolls a 1, a complication occurs. The Storyteller may introduce a cost, danger, or unexpected twist appropriate to the scene. A complication does not automatically mean the action fails, and it can occur on the same roll as a critical. Optional fumble tables are available for Storytellers who want inspiration.' },
          ] },
        ],
      },
      {
        title: 'Example of Play',
        category: 'Getting Started',
        description: 'A practical example showing how the rules and conversation work together at the table.',
        content: [
          { type: 'p', text: 'The party’s ship has pulled alongside an imperial frigate during a storm. Mara, a pirate captain, wants to seize a hanging rope and swing across the gap before the ships drift apart.' },
          { type: 'quote', speaker: 'Mara’s player', text: 'I grab the loose rigging, run along the rail, and swing onto the frigate’s deck.' },
          { type: 'quote', speaker: 'Storyteller', text: 'The decks are pitching and the gap is widening. Make an Agility check.' },
          { type: 'quote', speaker: 'Mara’s player', text: 'Could I use my Acrobatics skill instead? Mara has spent years moving through ship rigging.' },
          { type: 'quote', speaker: 'Storyteller', text: 'That fits. Roll Acrobatics against a difficulty of 15.' },
          { type: 'p', text: 'Mara has Acrobatics 4D+1. Her player rolls 2, 3, 4, and 6. The 6 is a critical, so she rolls it again and gets another 4. After adding the dice and her +1 pip, the final result is 20.' },
          { type: 'quote', speaker: 'Storyteller', text: 'Mara swings through the rain and lands hard on the frigate’s rail. An officer turns in surprise—you made it across, but now you are face-to-face with the enemy crew.' },
          { type: 'p', text: 'The roll determined whether Mara crossed the gap. The Storyteller then used the successful result to move the scene forward and present the party with a new situation.' },
        ],
      },
      {
        title: 'Character Attributes',
        category: 'Fundamentals',
        description: 'The six innate capabilities shared by characters in D6V.',
        content: [
          { type: 'p', text: 'Attributes describe a character’s broad, innate capabilities. When a character attempts something uncertain and no specialized skill applies, the player rolls the most relevant attribute. Attributes also provide the foundation for the skills associated with them.' },
          { type: 'list', items: [
            { label: 'Strength', text: 'Measures physical power, endurance, and durability. Strength applies when a character lifts or breaks something, resists fatigue or injury, or relies on raw physical force.' },
            { label: 'Dexterity', text: 'Measures agility, coordination, reflexes, and hand-eye control. Dexterity applies when a character moves with precision, reacts quickly, balances, aims, or performs delicate physical actions.' },
            { label: 'Social', text: 'Measures presence, empathy, judgment, and the ability to understand or influence others. Social applies when a character persuades, inspires, deceives, reads a situation, or draws upon practical wisdom.' },
            { label: 'Intelligence', text: 'Measures memory, reasoning, education, and accumulated knowledge. Intelligence applies when a character recalls information, solves a problem, conducts research, or understands a complex subject.' },
            { label: 'Luck', text: 'Measures fortune when an outcome depends more on chance than ability. Luck applies to gambling, fortunate coincidences, blind guesses, and other situations in which preparation or skill offers little control.' },
            { label: 'Paranormal', text: 'Measures a character’s connection to forces beyond the ordinary world. Paranormal governs magic, miracles, psychic phenomena, supernatural perception, and similar powers when they exist in the setting.' },
          ] },
          { type: 'p', text: 'The Storyteller determines which attribute best matches an action. Some settings may emphasize, reinterpret, or place limits on an attribute—especially Paranormal—but the six attributes retain the same general purpose across D6V.' },
        ],
      },
      {
        title: 'Character Skills',
        category: 'Fundamentals',
        description: 'Training and practiced abilities that allow characters to excel at specific tasks.',
        content: [
          { type: 'p', text: 'Skills represent a character’s training, practice, and learned expertise. Every skill is associated with an attribute. When a skill applies to an action, the character rolls the skill’s dice rating instead of the broader attribute. If the character does not possess an appropriate skill, they normally make the check using the associated attribute.' },
          { type: 'p', text: 'The available skills may vary between settings, but the following examples illustrate the kinds of training associated with each attribute:' },
          { type: 'list', items: [
            { label: 'Strength Skills', text: 'Athletics, Brawling, Climbing, Endurance, Heavy Weapons, and Swimming.' },
            { label: 'Dexterity Skills', text: 'Acrobatics, Archery, Driving, Firearms, Lockpicking, Sleight of Hand, Stealth, and Swords.' },
            { label: 'Social Skills', text: 'Deception, Empathy, Intimidation, Leadership, Performance, Persuasion, and Streetwise.' },
            { label: 'Intelligence Skills', text: 'Academics, Engineering, Investigation, Medicine, Navigation, Science, and Technology.' },
            { label: 'Luck Skills', text: 'Games of Chance, Scavenging, Serendipity, Treasure Hunting, and Wagering.' },
            { label: 'Paranormal Skills', text: 'Channeling, Divination, Enchantment, Miracles, Rituals, Sorcery, and Spirit Lore.' },
          ] },
          { type: 'p', text: 'These lists are examples rather than universal limits. A setting may add, remove, rename, or reassign skills to reflect its genre and assumptions. The Storyteller determines whether a skill is appropriate for a particular action.' },
          { type: 'subheading', text: 'Specializations' },
          { type: 'p', text: 'A specialization narrows a skill to one specific subject, tool, technique, or circumstance. For example, a character might take Swords (Cutlass) instead of the broader Swords skill. The specialized rating applies when the character uses a cutlass, but it does not apply when using other types of swords.' },
          { type: 'p', text: 'Specializations improve more quickly than general skills. When a player allocates an Experience Point to a normal skill, its rating increases by +1 pip. When that point is allocated to a specialization, its rating increases by +2 pips instead. Because three pips equal one die, specialization ratings can advance rapidly.' },
          { type: 'p', text: 'This faster advancement comes at the cost of flexibility. A general skill can apply across a wide range of related actions, while a specialization provides its improved rating only within its clearly defined focus. The player and Storyteller should agree on the scope of a specialization when it is selected.' },
        ],
      },
      {
        title: 'Difficulties and Advantage',
        category: 'Fundamentals',
        description: 'Difficulty numbers and situational modifiers used to resolve checks.',
        content: [
          { type: 'p', text: 'A difficulty is the number a character must meet or exceed for an action to succeed. The Storyteller chooses a difficulty by considering the task itself under ordinary circumstances. Routine actions may succeed automatically, while uncertain or demanding actions require a check. Difficulties above 30 are reserved for extraordinary feats.' },
          { type: 'table', label: 'Standard difficulties', columns: ['Difficulty', 'Target Number'], rows: [
            ['Automatic', '0'],
            ['Very Easy', '1–5'],
            ['Easy', '6–10'],
            ['Moderate', '11–15'],
            ['Difficult', '16–20'],
            ['Very Difficult', '21–25'],
            ['Heroic', '26–30'],
            ['Legendary', '31 or more'],
          ] },
          { type: 'p', text: 'Advantage and disadvantage account for circumstances surrounding the action rather than the task’s base difficulty. Advantage adds a modifier to the player’s roll, while disadvantage subtracts one. The Storyteller chooses a modifier appropriate to how strongly the circumstances help or hinder the character.' },
          { type: 'p', text: 'Multiple advantages and disadvantages may cancel one another before the final modifier is applied. These modifiers change the result of the player’s roll; they do not change the underlying difficulty number.' },
          { type: 'table', label: 'Advantage and disadvantage modifiers', columns: ['Condition', 'Roll Modifier', 'Situational Example'], rows: [
            ['Overwhelming Disadvantage', '−16 or more', 'The action is almost crippled by circumstances, such as repairing armor without any proper tools.'],
            ['Decisive Disadvantage', '−11 to −15', 'The character’s ability is severely limited, such as finding someone in complete darkness.'],
            ['Significant Disadvantage', '−6 to −10', 'A serious obstacle interferes with the action, such as tracking someone through driving rain.'],
            ['Slight Disadvantage', '−1 to −5', 'An irritating problem makes the task harder, such as picking a lock by candlelight.'],
            ['Slight Advantage', '+1 to +5', 'A helpful tool or circumstance makes the action somewhat easier, such as jumping from a springy surface.'],
            ['Significant Advantage', '+6 to +10', 'Useful preparation makes the action much easier, such as climbing with a knotted rope.'],
            ['Decisive Advantage', '+11 to +15', 'Purpose-built tools strongly support the action, such as treating wounds with a well-stocked medical kit.'],
            ['Overwhelming Advantage', '+16 or more', 'Exceptional equipment or preparation is ideally suited to the action, such as surviving with a complete wilderness kit.'],
          ] },
        ],
      },
      { title: 'Core Resolution', category: 'Fundamentals', description: 'The shared procedure for resolving uncertain actions.' },
      { title: 'Conflict', category: 'Encounters', description: 'The basic structure for handling opposition and consequences.' },
    ],
  },
  {
    id: 'fantasy',
    label: 'Fantasy',
    rules: [
      { title: 'Magic', category: 'Powers', description: 'Setting rules for supernatural abilities and spellcraft.' },
      { title: 'Fantasy Equipment', category: 'Equipment', description: 'Weapons, armor, and adventuring gear for fantasy settings.' },
    ],
  },
  {
    id: 'space-opera',
    label: 'Space Opera',
    rules: [
      { title: 'Starships', category: 'Vehicles', description: 'Setting rules for spacecraft, crews, and space travel.' },
      { title: 'Advanced Technology', category: 'Equipment', description: 'Equipment and devices suited to far-future adventures.' },
    ],
  },
  {
    id: 'modern',
    label: 'Modern',
    rules: [
      { title: 'Modern Equipment', category: 'Equipment', description: 'Contemporary tools, weapons, armor, and vehicles.' },
      { title: 'Organizations', category: 'Characters', description: 'A framework for contacts, agencies, and other modern groups.' },
    ],
  },
]

const activeSystemId = ref(systems[0].id)
const searchQuery = ref('')
const filterCategory = ref('all')
const activeCategory = ref(systems[0].rules[0].category)

const activeSystem = computed(() => systems.find((system) => system.id === activeSystemId.value))
const categories = computed(() => [...new Set(activeSystem.value.rules.map((rule) => rule.category))])
const isSearchMode = computed(() => activeCategory.value === '')

function ruleSearchText(rule) {
  const contentText = rule.content?.flatMap((block) => [
    block.text,
    block.speaker,
    ...(block.items?.flatMap((item) => [item.label, item.text]) || []),
  ]).filter(Boolean).join(' ') || ''

  return `${rule.title} ${rule.category} ${rule.description} ${contentText}`.toLowerCase()
}

const filteredRules = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return activeSystem.value.rules.filter((rule) => {
    const matchesCategory = isSearchMode.value
      ? filterCategory.value === 'all' || rule.category === filterCategory.value
      : rule.category === activeCategory.value
    const matchesSearch = !query || ruleSearchText(rule).includes(query)
    return matchesCategory && matchesSearch
  })
})

function selectSystem(id) {
  activeSystemId.value = id
  searchQuery.value = ''
  filterCategory.value = 'all'
  activeCategory.value = systems.find((system) => system.id === id).rules[0]?.category || ''
}

function selectCategory(category) {
  searchQuery.value = ''
  filterCategory.value = 'all'
  activeCategory.value = category
}
</script>

<template>
  <section class="scroll-mt-24" aria-labelledby="systems">
    <h2 id="systems" data-toc="Systems" class="text-2xl font-semibold tracking-wide sm:text-3xl">
      <span class="inline-block bg-gradient-to-r from-red-600 via-orange-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(251,191,36,0.14)]">
        Systems
      </span>
    </h2>

    <div class="mt-7">
      <div class="flex items-end overflow-hidden px-2" role="tablist" aria-label="Rules systems">
        <button
          v-for="system in systems"
          :id="`${system.id}-tab`"
          :key="system.id"
          class="relative min-w-32 cursor-pointer rounded-t-xl border border-b-0 px-5 py-3 text-sm font-semibold tracking-wide transition focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          :class="activeSystemId === system.id
            ? 'z-[1] -mb-px bg-[#07140c] text-amber-100 border-amber-300/60 shadow-[0_-8px_24px_rgba(251,191,36,0.10)] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-[#07140c]'
            : 'bg-black/35 text-zinc-400 border-white/10 hover:border-amber-300/35 hover:text-amber-100'"
          :aria-selected="activeSystemId === system.id"
          :tabindex="activeSystemId === system.id ? 0 : -1"
          role="tab"
          type="button"
          @click="selectSystem(system.id)"
        >
          {{ system.label }}
        </button>

        <button
          v-for="index in 3"
          :key="`empty-${index}`"
          aria-label="Unused system slot"
          class="h-10 min-w-24 cursor-not-allowed rounded-t-xl border border-b-0 border-white/[0.06] bg-black/20"
          disabled
          type="button"
        ></button>
      </div>

      <div
        class="relative border border-amber-300/50 bg-[#07140c]/25 p-5 shadow-[0_0_32px_rgba(251,191,36,0.12),inset_0_0_24px_rgba(251,191,36,0.04)] sm:p-7"
        :aria-labelledby="`${activeSystem.id}-tab`"
        role="tabpanel"
      >
        <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"></div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <label class="relative flex-1">
            <span class="sr-only">Search {{ activeSystem.label }} rules</span>
            <svg aria-hidden="true" class="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-amber-200/60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              v-model="searchQuery"
              class="w-full rounded-full border border-amber-400/25 bg-black/30 py-2.5 pr-4 pl-11 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15"
              :placeholder="`Search ${activeSystem.label} rules`"
              type="search"
              @input="activeCategory = ''"
            />
          </label>

          <label>
            <span class="sr-only">Filter by category</span>
            <select
              v-model="filterCategory"
              class="w-full cursor-pointer rounded-full border border-amber-400/25 bg-[#07100b] px-5 py-2.5 text-sm text-amber-100 outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15 sm:w-52"
              @change="activeCategory = ''"
            >
              <option value="all">All categories</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </label>
        </div>

        <div class="mt-5 overflow-x-auto bg-black/20 p-2 [scrollbar-color:rgba(252,211,77,0.35)_transparent] [scrollbar-width:thin]">
          <div class="flex min-w-max gap-2" role="group" :aria-label="`${activeSystem.label} rule categories`">
            <button
              v-for="category in categories"
              :key="category"
              class="cursor-pointer border px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              :class="!isSearchMode && activeCategory === category
                ? 'border-amber-200 bg-amber-200/10 text-amber-50 shadow-[0_0_22px_rgba(251,191,36,0.14),inset_0_0_16px_rgba(251,191,36,0.05)]'
                : 'border-amber-400/25 bg-black/20 text-zinc-300 hover:border-amber-300/60 hover:text-amber-100'"
              :aria-pressed="!isSearchMode && activeCategory === category"
              type="button"
              @click="selectCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div aria-hidden="true" class="my-8 h-px w-full bg-gradient-to-r from-transparent via-amber-300/45 to-transparent shadow-[0_0_10px_rgba(251,191,36,0.2)]"></div>

        <div class="space-y-4">
          <article v-for="rule in filteredRules" :key="rule.title" class="w-full border border-white/15 bg-black/20 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:px-6">
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 class="text-sm font-bold uppercase tracking-[0.12em] text-zinc-50">{{ rule.title }}</h3>
              <p class="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-amber-300/65">{{ rule.category }}</p>
            </div>
            <p v-if="!rule.content" class="mt-2 max-w-5xl text-sm leading-7 text-zinc-200">{{ rule.description }}</p>

            <div v-else class="mt-3 max-w-6xl space-y-3 text-sm leading-7 text-zinc-200">
              <template v-for="(block, index) in rule.content" :key="index">
                <p v-if="block.type === 'p'">{{ block.text }}</p>
                <h4 v-else-if="block.type === 'subheading'" class="pt-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-100">
                  {{ block.text }}
                </h4>
                <ul v-else-if="block.type === 'list'" class="space-y-1.5 pl-5">
                  <li v-for="item in block.items" :key="item.label" class="list-disc marker:text-amber-300/70">
                    <strong class="font-semibold text-zinc-50">{{ item.label }}:</strong> {{ item.text }}
                  </li>
                </ul>
                <blockquote v-else-if="block.type === 'quote'" class="border-l-2 border-amber-300/40 pl-4 text-zinc-300">
                  <strong class="font-semibold text-amber-100">{{ block.speaker }}:</strong> “{{ block.text }}”
                </blockquote>
                <div v-else-if="block.type === 'table'" class="my-5 overflow-x-auto border border-amber-400/20">
                  <table class="w-full min-w-[36rem] border-collapse text-left text-sm">
                    <caption class="border-b border-amber-400/20 bg-amber-300/[0.06] px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-amber-100">
                      {{ block.label }}
                    </caption>
                    <thead class="bg-black/30 text-[0.65rem] uppercase tracking-[0.14em] text-amber-300/75">
                      <tr>
                        <th v-for="column in block.columns" :key="column" class="border-b border-white/10 px-4 py-2.5 font-semibold">{{ column }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex" class="border-b border-white/[0.07] last:border-b-0 even:bg-white/[0.015]">
                        <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-4 py-2.5 align-top" :class="cellIndex === 0 ? 'font-semibold text-zinc-50' : 'text-zinc-300'">
                          {{ cell }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </article>
        </div>

        <p v-if="!filteredRules.length" class="py-12 text-center text-sm text-zinc-400">
          No rules match the current search and category.
        </p>
      </div>
    </div>
  </section>
</template>
