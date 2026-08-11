<script setup>
import { computed, ref } from 'vue'

const systems = [
  {
    id: 'core',
    label: 'Core',
    categories: ['Getting Started', 'Fundamentals', 'Character', 'Character Advancement', 'Exploration', 'Combat', 'Damage & Healing', 'Equipment', 'Paranormal Powers', 'Vehicles & Mounts', 'Storyteller', 'Quick Glance'],
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
          { type: 'p', text: 'Dice ratings and checks are explained further in Determining Outcomes. When you are ready to build a player character, continue to the Character category.' },
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
            { label: 'Spend 1 Meta Die', text: 'Add +1D to the roll. Only one Meta Die option can be used on a roll.' },
            { label: 'Spend 2 Meta Dice', text: 'Double the final result of the roll. A healing roll cannot be doubled. Only one Meta Die option can be used on a roll.' },
          ] },
          { type: 'p', text: 'Spend Meta Dice after all dice, pips, advantage, disadvantage, and other modifiers have been applied. Meta Dice can affect attacks, damage, resistance, initiative, healing, vehicle checks, and other rolls. Spending 1 Meta Die may add +1D to healing, but spending 2 Meta Dice cannot double Health restored. When doubling any permitted roll, double its final modified result.' },
          { type: 'p', text: 'Every player character begins with two Meta Dice and may hold a maximum of five. The Storyteller decides when to award them. A character doing something especially impressive, impactful, or true to the spirit of the story is a good reason for an award. NPCs and companions may receive Meta Dice at the Storyteller\'s discretion.' },
        ],
      },
      {
        title: 'Determining Outcomes',
        category: 'Getting Started',
        description: 'How rolls, difficulties, and circumstances determine what happens next.',
        content: [
          { type: 'p', text: 'Whenever a character attempts something with a meaningful chance of failure, the Storyteller calls for an attribute or skill check. The Storyteller names the trait that best fits the action, though a player may suggest a different skill when it makes sense. The Storyteller has the final say. If the character does not possess the requested skill, they roll its corresponding attribute instead.' },
          { type: 'p', text: 'To make a check, roll the dice shown in the trait’s rating and add any pips to the total. One die in every roll must be visibly designated as the Wild Die before it is rolled. For example, a character with a rating of 6D+2 rolls five ordinary dice and one Wild Die, totals their results, and adds two. The player announces the final result, and the Storyteller compares it with a difficulty number to determine whether the action succeeds. Difficulty numbers are described in the Fundamentals rules.' },
          { type: 'p', text: 'When one character acts directly against another, the Storyteller may call for an opposed check instead of setting a fixed difficulty. Both characters roll the appropriate trait, and the higher result prevails. The Storyteller determines how to resolve a tie based on the circumstances.' },
          { type: 'subheading', text: 'Criticals and Complications' },
          { type: 'list', items: [
            { label: 'Criticals', text: 'Only the Wild Die can produce a critical. When the Wild Die naturally rolls a 6, roll it again and add the new result to the total. If it rolls another 6, continue rolling and adding. A 6 on any ordinary die is counted normally and is not rerolled.' },
            { label: 'Complications', text: 'Only the Wild Die can cause a complication. When the Wild Die naturally rolls a 1, the Storyteller may introduce a cost, danger, or unexpected twist appropriate to the scene. A 1 on an ordinary die is counted normally. A complication does not automatically mean the action fails.' },
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
          { type: 'quote', speaker: 'Storyteller', text: 'The decks are pitching and the gap is widening. Make a Dexterity check.' },
          { type: 'quote', speaker: 'Mara’s player', text: 'Could I use my Acrobatics skill instead? Mara has spent years moving through ship rigging.' },
          { type: 'quote', speaker: 'Storyteller', text: 'That fits. Roll Acrobatics against a difficulty of 15.' },
          { type: 'p', text: 'Mara has Acrobatics 4D+1. Her player rolls three ordinary dice and one visually distinct Wild Die. The results are 2, 3, 4, and a 6 on the Wild Die. Because the Wild Die produced the 6, it is a critical; she rolls it again and gets another 4. After adding the dice and her +1 pip, the final result is 20. If an ordinary die had rolled the 6 instead, it would not have been rerolled.' },
          { type: 'quote', speaker: 'Storyteller', text: 'Mara swings through the rain and lands hard on the frigate’s rail. An officer turns in surprise—you made it across, but now you are face-to-face with the enemy crew.' },
          { type: 'p', text: 'The roll determined whether Mara crossed the gap. The Storyteller then used the successful result to move the scene forward and present the party with a new situation.' },
        ],
      },
      {
        title: 'Creating a Character',
        category: 'Character',
        description: 'The complete process for creating a D6V player character.',
        content: [
          { type: 'p', text: 'Create a character with the Storyteller’s setting and party premise in mind. The character creator guides players through the following steps and records the result on a character sheet.' },
          { type: 'list', items: [
            { label: '1. Basic Information', text: 'Choose a name, tagline, species, and optional portrait.' },
            { label: '2. Attributes', text: 'A standard Human has 18D in total: each of the six attributes begins at 2D, accounting for 12D, and the remaining 6D is distributed by the player. Apply any trait modifiers, then distribute the available dice and pips.' },
            { label: '3. Character Traits', text: 'Choose species features, advantages, disadvantages, languages, and other defining abilities allowed by the Storyteller.' },
            { label: '4. Skills', text: 'Distribute 7D of improvements among the skills that represent the character’s training. Each skill begins from its linked attribute.' },
            { label: '5. Starting Equipment', text: 'Record weapons, armour, and other equipment approved for the campaign.' },
            { label: '6. Additional Information', text: 'Determine starting Health, then add appearance, personality, background, and other personal details.' },
          ] },
          { type: 'p', text: 'The creator requires every necessary section to be complete before saving the character. The Storyteller may adjust starting dice, available traits, equipment, or other limits to suit the setting.' },
        ],
      },
      {
        title: 'Species',
        category: 'Character',
        description: 'A character’s physical nature, heritage, and setting-specific capabilities.',
        content: [
          { type: 'p', text: 'Species identifies the kind of person or creature the character is. Human is the standard option, but each setting may offer others. A species can establish attribute minimums or maximums, movement, traits, or other capabilities.' },
          { type: 'p', text: 'Species should support the setting rather than determine personality. Players still decide their character’s history, beliefs, appearance, and goals. Any nonstandard species must be approved by the Storyteller before its modifiers are applied.' },
        ],
      },
      {
        title: 'Traits',
        category: 'Character',
        description: 'Advantages, disadvantages, and species features that distinguish a character.',
        content: [
          { type: 'p', text: 'Traits represent exceptional benefits, meaningful drawbacks, and species-specific features. Each trait has a name and description explaining when it matters. Advantages cost Attribute Dice and therefore use a negative allocation modifier. Disadvantages grant additional Attribute Dice and use a positive allocation modifier. Costs and grants may be expressed in full dice or pips.' },
          { type: 'p', text: 'A trait should create recognizable opportunities or complications during play. The Storyteller approves its scope, cost, and effect and may require a narrative explanation. Languages are selected alongside traits in the character creator, with the available languages determined by the setting.' },
        ],
      },
      {
        title: 'Character Attributes',
        category: 'Character',
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
        category: 'Character',
        description: 'Training and practiced abilities that allow characters to excel at specific tasks.',
        content: [
          { type: 'p', text: 'Skills represent a character’s training, practice, and learned expertise. Every skill is associated with an attribute. When a skill applies to an action, the character rolls the skill’s dice rating instead of the broader attribute. If the character does not possess an appropriate skill, they normally make the check using the associated attribute.' },
          { type: 'p', text: 'The available skills may vary between settings, but the following examples illustrate the kinds of training associated with each attribute:' },
          { type: 'list', items: [
            { label: 'Strength Skills', text: 'Athletics, Axes, Blunt Weapons, Brawling, Climbing, Endurance, Heavy Polearms, Labor, Might, and Wrestling.' },
            { label: 'Dexterity Skills', text: 'Acrobatics, Archery, Dodge, Initiative, light Polearms, and precision weapon skills.' },
            { label: 'Social Skills', text: 'Command, Deception, Etiquette, Insight, Networking, Persuasion, Resolve, and Teaching.' },
            { label: 'Intelligence Skills', text: 'Perception, Streetwise, First-Aid, and Medicine.' },
            { label: 'Luck Skills', text: 'Gambling, Improvisation, Scrounging, Serendipity, and Survival.' },
            { label: 'Paranormal Skills', text: 'Occult and Channeling.' },
          ] },
          { type: 'p', text: 'These lists are examples rather than universal limits. A setting may add, remove, rename, or reassign skills to reflect its genre and assumptions. The Storyteller determines whether a skill is appropriate for a particular action.' },
          { type: 'p', text: 'The Skills view is the authoritative list of currently available skills and their governing attributes. Players and Storytellers may create additional skills when the campaign needs them, subject to Storyteller approval.' },
          { type: 'subheading', text: 'Specializations' },
          { type: 'p', text: 'A specialization narrows a skill to one specific subject, tool, technique, or circumstance. For example, a character might take Swords (Cutlass) instead of the broader Swords skill. The specialized rating applies when the character uses a cutlass, but it does not apply when using other types of swords.' },
          { type: 'p', text: 'Specializations improve more cheaply than general skills. Increasing a specialization by +1 pip costs half as many Experience Points as increasing the governing skill by +1 pip, rounded up. Because three pips equal one die, the specialization advances at the normal pip rate while requiring less experience.' },
          { type: 'p', text: 'This faster advancement comes at the cost of flexibility. A general skill can apply across a wide range of related actions, while a specialization provides its improved rating only within its clearly defined focus. The player and Storyteller should agree on the scope of a specialization when it is selected.' },
        ],
      },
      {
        title: 'Derived Statistics',
        category: 'Character',
        description: 'Values calculated from a character’s attributes and other choices.',
        content: [
          { type: 'p', text: 'Derived statistics are calculated after attributes, traits, and skills have been assigned. They summarize important values used during play and should be recalculated whenever their source changes.' },
          { type: 'list', items: [
            { label: 'Health', text: 'Roll the character’s Strength rating and add 20. The character creator permits one reroll; changing Strength restores that reroll. The accepted result becomes both current and maximum Health.' },
            { label: 'Defense Bonus', text: 'Derived from the number of dice in Dexterity. The character sheet calculates a +1 bonus for every two full Dexterity dice above 2D, rounded down. Add it whenever a rule calls for an active or full defense.' },
            { label: 'Move', text: 'A standard Human has a Move of 10 metres. A species may provide a different base Move, and traits or advancement may modify it.' },
            { label: 'Meta Dice', text: 'A new character begins with 2 available Meta Dice and can normally hold a maximum of 5.' },
            { label: 'Experience', text: 'A new character begins with 0 unspent and 0 total Experience Points unless the Storyteller is creating experienced characters.' },
          ] },
        ],
      },
      {
        title: 'Starting Equipment',
        category: 'Character',
        description: 'The weapons, armour, tools, and possessions a character has when play begins.',
        content: [
          { type: 'p', text: 'The Storyteller may provide a starting budget or allow any reasonable equipment that fits the character and campaign. Confirm expectations before finalizing the character.' },
          { type: 'p', text: 'Record weapons with their difficulty and damage, armour with its resistance and Dexterity penalty, and other equipment with its quantity. Starting wealth or currency is recorded separately. Items left blank can be added later from the character sheet.' },
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
      {
        title: 'Core Resolution',
        category: 'Fundamentals',
        description: 'The shared procedure for resolving uncertain actions.',
        content: [
          { type: 'p', text: 'When an action has a meaningful chance of failure, roll the appropriate skill or attribute and add any pips or situational modifiers. If the total meets or exceeds the difficulty—or exceeds an opponent’s result in an opposed check—the action succeeds.' },
          { type: 'p', text: 'If no listed skill applies, the character uses the governing attribute. The Storyteller may impose disadvantage when a character attempts a task without relevant training, particularly when the task is technical, obscure, or normally requires practice. The amount of disadvantage—and whether the task can be attempted untrained at all—is left to the Storyteller.' },
          { type: 'p', text: 'If dice penalties reduce a pool to 0D, roll only the Wild Die and apply any remaining pips and flat modifiers. A pool cannot be reduced below 0D; additional dice penalties have no further effect unless a rule converts them into a flat modifier.' },
        ],
      },
      {
        title: 'The Wild Die',
        category: 'Fundamentals',
        description: 'The single die in each pool that can produce criticals and complications.',
        content: [
          { type: 'p', text: 'Every attribute or skill check includes exactly one Wild Die. Before rolling, replace one ordinary die in the dice pool with a die that is visually distinct or otherwise easy to identify. The Wild Die is included in the total like every other die, but it is the only die capable of producing a critical or a complication.' },
          { type: 'list', items: [
            { label: 'Wild 6 - Critical', text: 'Reroll the Wild Die and add the new result. Continue rerolling and adding for as long as the Wild Die continues to roll a 6.' },
            { label: 'Wild 1 - Complication', text: 'The Storyteller may introduce a narrative cost, danger, or unexpected consequence. The 1 does not automatically turn a successful total into a failure.' },
            { label: 'Ordinary Dice', text: 'Results of 1 or 6 on any other die are counted normally. Ordinary dice never trigger criticals or complications.' },
          ] },
        ],
      },
      {
        title: 'Opposed Checks',
        category: 'Fundamentals',
        description: 'Checks in which two characters directly compete.',
        content: [
          { type: 'p', text: 'Use an opposed check when one character’s action is directly resisted by another character. Each participant rolls the attribute or skill that represents their approach. The higher total wins the contest instead of comparing either roll with a fixed difficulty.' },
          { type: 'p', text: 'The Storyteller decides which traits apply to each side; they do not need to be the same. Sneaking past a guard might oppose Dexterity (Stealth) with Intelligence (Perception), while an arm-wrestling contest might use Strength for both characters. Situational advantage and disadvantage are applied to each participant normally.' },
          { type: 'p', text: 'If the totals tie, the situation remains unresolved, the acting character fails to overcome the resistance, or the Storyteller calls for another check when continued uncertainty would be interesting. The Storyteller should state how ties work before the roll when the distinction matters.' },
        ],
      },
      {
        title: 'Result Points',
        category: 'Fundamentals',
        description: 'A narrative measure of how strongly a check succeeds or fails.',
        content: [
          { type: 'p', text: 'Result Points are the difference between a check’s final total and its difficulty. A roll of 19 against difficulty 15 produces 4 Result Points. On an opposed check, compare the winning total with the losing total in the same way.' },
          { type: 'p', text: 'Result Points have no automatic mechanical effect in D6V. The Storyteller may use them as a guide when describing how well the character completed the task. A narrow success might be messy or slow, while a large margin might be precise, impressive, or especially efficient. A large margin of failure can likewise help describe the severity of a setback without imposing an additional rule.' },
        ],
      },
      {
        title: 'Stealth, Perception, and Investigation',
        category: 'Fundamentals',
        description: 'Hiding, detecting concealed characters, and searching for hidden objects.',
        content: [
          { type: 'p', text: 'When a character actively hides from another character, resolve Dexterity (Stealth) against Intelligence (Perception) as an opposed check. Each member of a group attempting to remain hidden rolls separately, and each observer searches separately when their individual awareness matters.' },
          { type: 'p', text: 'Searching for a concealed object, clue, compartment, or other thing that is not actively hiding normally uses Intelligence (Investigation) against a difficulty chosen by the Storyteller. If a character actively concealed it, the search may instead oppose the check used to hide it.' },
          { type: 'p', text: 'A character normally receives only one search or detection roll for the same circumstances. Another check is appropriate only after the situation changes substantially, such as the hidden character making a long movement or taking a noticeable action, the searcher moving to a meaningfully different position, or new evidence becoming available.' },
        ],
      },
      {
        title: 'Social Checks',
        category: 'Fundamentals',
        description: 'Influencing others without replacing their agency.',
        content: [
          { type: 'p', text: 'Use a Social skill when a character attempts to persuade, deceive, intimidate, inspire, or understand another person and the outcome is uncertain. Resolve active resistance as an opposed check or use a fixed difficulty when the opposition is incidental.' },
          { type: 'p', text: 'A successful social check changes what the target believes, reveals, or is willing to consider only as far as the approach could reasonably influence them. It is not mind control and cannot force a character to knowingly kill themselves, abandon their defining loyalties, or perform an action they would never consider without extraordinary leverage or a specific supernatural effect.' },
          { type: 'p', text: 'Social checks against player characters provide information, pressure, or incentives, but the affected player normally retains final authority over their character’s decisions.' },
        ],
      },
      {
        title: 'Assisting a Party Member',
        category: 'Fundamentals',
        description: 'Giving up your own action to help another character succeed.',
        content: [
          { type: 'p', text: 'A character can use their action to assist a party member with a task when they can describe a practical way their effort helps. The assisting character must be close enough, have the necessary time and tools, and be capable of attempting the task themselves.' },
          { type: 'p', text: 'The helper makes an appropriate skill or attribute check against a difficulty chosen by the Storyteller, usually one step easier than the lead character’s task. On a success, the lead character gains +1D on their check. A critical on the helper’s Wild Die may increase this to +1D+1 at the Storyteller’s discretion. Failure grants no bonus, while a complication may introduce a cost or interfere with the attempt.' },
          { type: 'p', text: 'A character can normally benefit from only one assistant. The Storyteller may allow additional helpers when the task genuinely supports them, but should resolve large group efforts as a single coordinated check rather than stacking unlimited dice.' },
        ],
      },
      {
        title: 'Companions',
        category: 'Fundamentals',
        description: 'Letting players control allied NPCs and creatures during combat.',
        content: [
          { type: 'p', text: 'A companion is an NPC, pet, construct, hireling, or other allied character assigned to a player. During combat, that player controls the companion\'s movement and actions, rolls its checks, tracks its Health and resources, and makes routine tactical decisions on its behalf.' },
          { type: 'p', text: 'A companion remains an independent character rather than an extension of the player character. The Storyteller determines its personality, knowledge, loyalties, and behaviour outside combat. The Storyteller may temporarily resume control when the companion\'s motivations conflict with an instruction, information unknown to the player affects its behaviour, or doing so is necessary for the story.' },
          { type: 'p', text: 'Companions roll their own initiative and take their own turns unless a specific ability says otherwise. They do not share actions, Meta Dice, Health, or other resources with the controlling character. When directing a companion, a player should use only information the companion could reasonably possess.' },
          { type: 'p', text: 'The Storyteller assigns each companion to a player, normally the player most closely connected to it. Control may be reassigned whenever doing so makes combat easier to manage. Temporary allied NPCs may also be distributed among the players for the duration of an encounter.' },
          { type: 'p', text: 'A companion represented by a complete player-character-style sheet may earn Experience Points and advance. The Storyteller decides its awards, approves its improvements, and may make advancement choices on its behalf.' },
        ],
      },
      {
        title: 'Extended Tasks',
        category: 'Fundamentals',
        description: 'Resolving complex work that requires sustained effort over time.',
        content: [
          { type: 'p', text: 'Use an extended task when an uncertain activity requires more time and effort than a single check can reasonably represent. The Storyteller chooses the interval between checks and requires between two and five successes, depending on the task’s length and complexity.' },
          { type: 'list', items: [
            { label: 'Success', text: 'Each successful check adds one success toward completing the task.' },
            { label: 'Failure', text: 'The attempt adds no progress and introduces an appropriate delay, cost, or other consequence.' },
            { label: 'Complication', text: 'A complication causes a meaningful setback in addition to the check’s success or failure.' },
            { label: 'Completion', text: 'The task ends when the required successes are reached or when circumstances make continuing impossible.' },
          ] },
          { type: 'p', text: 'The interval might be one round during an urgent technical procedure, several minutes while picking a complex lock, hours while conducting research, or days during construction. The Storyteller should establish the interval, required successes, and likely costs before the first check.' },
        ],
      },
      {
        title: 'Awarding Experience',
        category: 'Character Advancement',
        description: 'How characters earn Experience Points through play.',
        content: [
          { type: 'p', text: 'The Storyteller normally awards Experience Points at the end of a session. Awards can recognize progress toward the party’s goals, discoveries, difficult choices, strong roleplaying, creative solutions, and contributions that made the session better for the group.' },
          { type: 'p', text: 'The Storyteller may also award a point during play for an exceptional narrative contribution. Awards should reflect meaningful participation rather than only victory; setbacks and failed plans can still produce experience when they move the story forward.' },
          { type: 'p', text: 'Until campaign testing establishes a different pace, a standard session awards approximately 5 Experience Points to each player character. The Storyteller may adjust this for unusually short, long, or significant sessions.' },
        ],
      },
      {
        title: 'Spending Experience',
        category: 'Character Advancement',
        description: 'Using Experience Points to improve a character.',
        content: [
          { type: 'p', text: 'Experience Points are normally spent between sessions. Increasing a skill by +1 pip costs Experience Points equal to the number before the D in its current rating before the improvement is applied. Raising a 6D+2 skill to 7D therefore costs 6 Experience Points. Three pips convert into +1D.' },
          { type: 'p', text: 'A specialization begins at the current rating of its governing skill. Increasing it by +1 pip costs half the normal cost of improving the governing skill, rounded up, and its improved rating applies only to its narrow focus. If the governing skill later exceeds the specialization, raise the specialization to match it at no additional cost.' },
          { type: 'p', text: 'Increasing an attribute by +1 pip costs 10 times the number before the D in its current rating. Raising a 6D attribute to 6D+1 costs 60 Experience Points.' },
          { type: 'p', text: 'Increasing Move by 1 metre costs 5 Experience Points. The Storyteller may require training or a narrative explanation and may set a campaign maximum appropriate to the character’s species.' },
          { type: 'p', text: 'Increasing maximum Health by 1 costs 5 Experience Points. There is no fixed limit to Health purchased this way, though every increase remains subject to Storyteller approval and the campaign’s fiction.' },
          { type: 'p', text: 'To improve a skill, the character must have a reasonable opportunity between sessions to work on it, have access to a teacher with a higher rating—such as a party member or NPC—or have attempted to use that skill during the session but been forced to roll its governing attribute because the character was untrained. The Storyteller decides whether the proposed improvement makes sense in the story.' },
          { type: 'p', text: 'The player should record both unspent and total earned experience on the character sheet. All advancement remains subject to Storyteller discretion.' },
        ],
      },
      {
        title: 'Advancing Traits and Special Abilities',
        category: 'Character Advancement',
        description: 'Adding or removing character traits and purchasing Special Abilities.',
        content: [
          { type: 'p', text: 'When it makes sense in the story and the Storyteller agrees, a character may purchase a new Advantage trait for Experience Points equal to 5 times the Advantage’s level. A character may take a new Disadvantage and receive Experience Points equal to 3 times its level.' },
          { type: 'p', text: 'Removing a Disadvantage costs Experience Points equal to 10 times its level and requires a plausible narrative change. A player generally cannot voluntarily remove an Advantage. An Advantage may nevertheless be lost through roleplaying, persistent neglect of associated obligations, or a tragic event in the game world, such as the destruction of a Patron’s city.' },
          { type: 'p', text: 'Unless the Storyteller awards a Special Ability directly, purchasing one costs Experience Points equal to 5 times the sum of its base cost. Enhancements, limitations, additional ranks, and setting-specific requirements may alter that total when their rules say so.' },
        ],
      },
      {
        title: 'Reallocating Experience',
        category: 'Character Advancement',
        description: 'Changing previously purchased improvements with Storyteller approval.',
        content: [
          { type: 'p', text: 'Once an Experience Point is allocated, it normally remains where it was spent. The Storyteller may allow points to be reallocated when a player misunderstood a rule, a character concept changed, a campaign removed an ability from use, or another adjustment would improve the game.' },
          { type: 'p', text: 'Reallocation is an exception rather than a routine way to rebuild a character. The player and Storyteller should agree on what changes in the fiction and confirm that the revised character remains appropriate for the party.' },
        ],
      },
      {
        title: 'Terrain',
        category: 'Exploration',
        description: 'The effect of difficult ground on movement and checks.',
        content: [
          { type: 'p', text: 'Terrain changes how safely and quickly characters can move. Mud, rubble, steep slopes, dense growth, ice, crowds, and similar obstacles may reduce effective movement or impose disadvantage on Dexterity, Strength, navigation, or vehicle checks.' },
          { type: 'p', text: 'The Storyteller should use a check only when the terrain creates meaningful uncertainty. Otherwise, describe the delay or reduced pace and continue play.' },
        ],
      },
      {
        title: 'Travel',
        category: 'Exploration',
        description: 'Resolving journeys across meaningful distances.',
        content: [
          { type: 'p', text: 'For long journeys, establish the route, expected pace, available supplies, and any known hazards. The Storyteller can divide travel into legs and call for checks when navigation, weather, fatigue, encounters, or limited resources could change the journey.' },
          { type: 'p', text: 'A successful travel check may preserve time or supplies; failure may cause delay, exposure, a wrong turn, or an encounter. Result Points can guide how efficient or costly the journey becomes.' },
        ],
      },
      {
        title: 'Climbing',
        category: 'Exploration',
        description: 'Ascending, descending, and crossing climbable surfaces.',
        content: [
          { type: 'p', text: 'Use Strength (Climbing) when a surface is dangerous, time matters, or failure has consequences. Choose difficulty from the surface, holds, angle, and distance, then apply advantage or disadvantage for ropes, tools, weather, injury, or assistance.' },
          { type: 'p', text: 'Failure may mean no progress, lost time, dropped equipment, or a fall. A complication can damage equipment, remove a secure hold, or place another character at risk.' },
        ],
      },
      {
        title: 'Swimming',
        category: 'Exploration',
        description: 'Moving through water and resisting aquatic hazards.',
        content: [
          { type: 'p', text: 'Use Strength (Swimming) in deep, rough, fast, or otherwise dangerous water. Distance, current, waves, clothing, carried equipment, and visibility affect the check. Calm water may require no roll.' },
          { type: 'p', text: 'A character who fails a Swimming check begins to drown and takes 1D damage. Each additional failed Swimming check during the same period in the water increases both the damage by +1D and the difficulty of the next check by +3. The failed checks do not need to be consecutive. Damage is resisted normally with Strength and any applicable armour.' },
          { type: 'p', text: 'Reaching breathable air, solid support, or receiving effective rescue ends the progression. The Storyteller may reset it once the character has had a meaningful chance to recover.' },
        ],
      },
      {
        title: 'Falling',
        category: 'Exploration',
        description: 'Consequences of uncontrolled drops and sudden impacts.',
        content: [
          { type: 'p', text: 'A fall of less than 3 metres normally causes no damage unless the landing surface is especially dangerous. A fall of 3 metres or more deals 1D damage for every 1.5 metres fallen. For example, a 4.5-metre fall deals 3D damage. The character resists this damage with Strength and any armour the Storyteller decides could reasonably protect against the impact.' },
          { type: 'p', text: 'A successful Dexterity or appropriate skill check may allow the character to catch a ledge, reduce the effective distance, or improve the landing when the fiction allows it. It does not erase a fall that cannot reasonably be avoided. Soft ground, safety equipment, spikes, debris, and other conditions may modify the damage.' },
        ],
      },
      {
        title: 'Environmental Hazards',
        category: 'Exploration',
        description: 'Threats such as fire, cold, poison, disease, and suffocation.',
        content: [
          { type: 'p', text: 'Environmental hazards threaten characters through exposure rather than a conventional attack. Establish the hazard’s severity, how often it requires a check, which attribute or skill resists it, and what happens on failure.' },
          { type: 'p', text: 'Protective equipment, shelter, preparation, and treatment can grant advantage or prevent a check. Increasing exposure can raise the difficulty or worsen consequences. Give players clear warning when their characters can perceive the danger.' },
        ],
      },
      {
        title: 'Environmental Hazard Reference',
        category: 'Exploration',
        description: 'Suggested difficulties, damage, and exposure intervals for common hazards.',
        content: [
          { type: 'table', label: 'Environmental hazard reference', columns: ['Hazard', 'Check and Interval', 'Failure'], rows: [
            ['Mild cold or heat', 'Easy Endurance each hour', 'Suffer 1D damage and −1 on further exposure checks until sheltered.'],
            ['Severe cold or heat', 'Moderate Endurance every 10 minutes', 'Suffer 2D damage; increase the TN by 3 after each consecutive failure.'],
            ['Open flame', 'No check after contact; Dodge or another appropriate action may prevent contact', 'Suffer 2D Fire damage each round until extinguished.'],
            ['Bonfire or burning room', 'Moderate Endurance each round spent in heavy smoke', 'Direct contact causes 4D Fire damage; a failed smoke check causes 2D Suffocation damage.'],
            ['Poison', 'Endurance against the poison’s listed TN when exposed', 'Suffer the listed Poison damage and condition; make one repeat check after its listed onset.'],
            ['Disease', 'Endurance against the disease’s listed TN each day', 'Suffer the listed damage or symptom; the disease may prevent natural healing for that day.'],
            ['Suffocation', 'Easy Endurance after a safe period determined by the fiction; repeat each round at +3 TN', 'Suffer 2D Suffocation damage, increasing by +1D after each failure.'],
            ['Corrosive exposure', 'Dodge or another appropriate check to avoid contact, followed by normal resistance if exposed', 'Suffer 3D Chemical damage and another 2D on the next round unless the substance is removed.'],
            ['Severe electrical shock', 'Endurance or an appropriate escape check to break continued contact', 'Suffer 4D Electrical damage; a complication may also cause Stunned or continued contact.'],
          ] },
          { type: 'p', text: 'Each named poison and disease should define its own onset, TN, damage, symptoms, and duration. Protective gear, shelter, preparation, or appropriate treatment should remove the check or grant advantage when it directly addresses the hazard.' },
          { type: 'p', text: 'Environmental damage uses the normal damage and resistance procedure. Armour applies only when it could reasonably protect against the listed damage type.' },
        ],
      },
      {
        title: 'Combat Overview',
        category: 'Combat',
        description: 'The sequence used to resolve fast-moving conflicts.',
        content: [
          { type: 'p', text: 'When violence or another fast-moving conflict begins, play is divided into rounds. A round represents a short period in which every participant has an opportunity to act.' },
          { type: 'list', items: [
            { label: '1. Determine Initiative', text: 'Everyone involved rolls initiative for the new round.' },
            { label: '2. Resolve Turns', text: 'Participants act from the highest initiative result to the lowest.' },
            { label: '3. Resolve Consequences', text: 'Damage and other effects are applied as they occur.' },
            { label: '4. Begin the Next Round', text: 'Roll initiative again if the conflict continues.' },
          ] },
          { type: 'p', text: 'Combat ends when one side retreats, surrenders, is defeated, or can no longer meaningfully oppose the other.' },
        ],
      },
      {
        title: 'Initiative',
        category: 'Combat',
        description: 'Determining the order in which combatants act each round.',
        content: [
          { type: 'p', text: 'At the beginning of every round, each participant makes a Dexterity (Initiative) check. Characters without the Initiative skill roll Dexterity instead. Resolve turns from the highest total to the lowest.' },
          { type: 'p', text: 'If two participants tie, the one with the higher Initiative rating acts first, followed by the one with the higher Dexterity rating. If they are still tied, the participants may agree on an order or roll again.' },
          { type: 'p', text: 'The Storyteller may roll once for a group of similar minor NPCs. Surprise, preparation, visibility, and other circumstances can grant advantage or impose disadvantage on initiative.' },
        ],
      },
      {
        title: 'Actions and Multiple Actions',
        category: 'Combat',
        description: 'Moving, acting, and performing several actions in one round.',
        content: [
          { type: 'p', text: 'On their turn, a character may move up to their Move value for free and perform one action. Moving farther by running—up to twice the character’s Move value—counts as an action.' },
          { type: 'p', text: 'A character may perform more than one action during a round. Each action beyond the first subtracts 1D from every action roll made during that round. The player declares how many actions the character intends to use before making the first roll.' },
          { type: 'p', text: 'If a reaction adds an undeclared action later in the round, recalculate the penalty for that reaction and all subsequent action rolls. Rolls that have already been resolved are never recalculated.' },
          { type: 'table', label: 'Multiple action penalties', columns: ['Total Actions', 'Penalty to Every Action'], rows: [['1', 'None'], ['2', '-1D'], ['3', '-2D'], ['4', '-3D'], ['5', '-4D']] },
          { type: 'subheading', text: 'Waiting' },
          { type: 'p', text: 'A character may use an action to wait. The player identifies the event they are waiting for or chooses to resume later in the initiative order. When that moment arrives, the character may spend any remaining declared actions. Waiting still counts when calculating the round’s multiple-action penalty.' },
          { type: 'p', text: 'A waiting character may interrupt after another participant declares an action but before its result is resolved, when the Storyteller agrees that the character could reasonably react in time.' },
        ],
      },
      {
        title: 'Common Combat Actions',
        category: 'Combat',
        description: 'The action costs of frequently attempted activities.',
        content: [
          { type: 'table', label: 'Common combat actions', columns: ['Activity', 'Cost'], rows: [['Draw or put away a weapon', 'Free'], ['Use a consumable', 'Free'], ['Pick up an accessible object', 'Free'], ['Interact with the environment', 'Free or one action, as determined by the Storyteller'], ['Reload a weapon', 'Free, or another cost determined by the weapon'], ['Throw an explosive', 'One action'], ['Attack an object', 'One action'], ['Use an improvised weapon', 'One attack action']] },
          { type: 'p', text: 'An improvised weapon uses an appropriate skill chosen by the Storyteller and normally deals the attacker’s Strength Damage. Particularly dangerous, heavy, fragile, or unsuitable objects may modify the attack or damage.' },
          { type: 'subheading', text: 'Leaving Close Combat' },
          { type: 'p', text: 'When a character willingly flees or moves away from an enemy who can reach them in close combat, that enemy may immediately make one attack against the departing character. This attack counts as an action for the enemy’s current round and increases their multiple-action penalty normally. An enemy unable or unwilling to accept the added action makes no attack.' },
        ],
      },
      {
        title: 'Making an Attack',
        category: 'Combat',
        description: 'Using a combat skill against the difficulty recorded for a weapon.',
        content: [
          { type: 'p', text: 'To attack, roll the skill associated with the weapon or technique. For a melee weapon, use the single difficulty recorded in its Difficulty field. For a ranged weapon, that field records its Short, Medium, and Long distances; use the difficulty assigned to the target’s current range band. The attack succeeds when its result meets or exceeds that difficulty.' },
          { type: 'p', text: 'If the target actively defends, the defender rolls a relevant defensive skill and adds their Defense Bonus. That total becomes the new difficulty for the attack, replacing the weapon’s normal difficulty even when the new number is lower. The same result applies to every relevant attack against that defender for the remainder of the round.' },
          { type: 'p', text: 'Every attack includes one Wild Die. On a hit, continue to Resolving a Hit. On a miss, the attack causes no damage unless a rule or complication says otherwise.' },
        ],
      },
      {
        title: 'Active Defense',
        category: 'Combat',
        description: 'Reacting to an attack with a defensive skill.',
        content: [
          { type: 'p', text: 'When first targeted by an attack during a round, a character may use a reaction to actively defend. Roll a relevant skill such as Dodge, Brawling, or an appropriate melee weapon skill, then add the character’s Defense Bonus. The result becomes the difficulty for every relevant attack against that character for the remainder of the round and must be used even if it is lower than the weapon’s normal difficulty.' },
          { type: 'p', text: 'Active defense counts as an action during that round and is affected by the normal multiple-action penalty. A character may spend an unused declared action to defend. If no action was reserved, the defense adds another action to the character’s round; apply the resulting penalty to the defense and to any action rolls the character makes afterward.' },
          { type: 'p', text: 'A character normally makes only one active-defense roll per round. A character who has spent an action to wait may use that waiting action to reroll their active defense after an attacker declares an attack but before the attack is resolved. The new result replaces the previous result for the remainder of the round, even if it is lower.' },
        ],
      },
      {
        title: 'Full Defense',
        category: 'Combat',
        description: 'Devoting an entire turn to avoiding harm.',
        content: [
          { type: 'p', text: 'A character may forgo their entire turn to concentrate on defense. Roll the most relevant active-defense skill, add the character’s Defense Bonus, and add +10. Use that result as the difficulty for relevant attacks against the character until the beginning of their next turn.' },
          { type: 'p', text: 'A character using Full Defense may still take their free movement up to their Move value, but cannot run, attack, assist, activate another ability, or perform any other action. Full Defense must be declared on the character’s turn.' },
        ],
      },
      {
        title: 'Ranged Attacks, Cover, and Environment',
        category: 'Combat',
        description: 'Resolving attacks made at a distance.',
        content: [
          { type: 'p', text: 'Ranged weapons list Short, Medium, and Long distances in metres. Determine the attack’s base difficulty from the target’s distance, then apply advantage or disadvantage for cover, visibility, weather, movement, and other circumstances.' },
          { type: 'p', text: 'When a range band uses Strength instead of a number, first convert the character’s full Strength die code to a static value: multiply the number before the D by four, then add or subtract its pips. Treat that value as metres and apply each listed modifier. For example, Strength 3D+1 gives a base range value of 13 metres.' },
          { type: 'p', text: 'A weapon with Blast followed by a distance applies its damage to every target within that radius of the impact point. Make the attack normally against the intended point; each affected target rolls resistance separately.' },
          { type: 'table', label: 'Ranged attack difficulties', columns: ['Range', 'Difficulty'], rows: [['Point Blank', 'Very Easy'], ['Short', 'Easy'], ['Medium', 'Moderate'], ['Long', 'Difficult'], ['Beyond Long', 'Very Difficult']] },
          { type: 'table', label: 'Cover modifiers', columns: ['Cover', 'Attacker Modifier'], rows: [['Light cover', '-1 to -2'], ['Half cover', '-3 to -5'], ['Substantial cover', '-6 to -10'], ['Near-total cover', '-11 to -15'], ['Complete cover', 'The target cannot be directly attacked']] },
          { type: 'table', label: 'Weather and environmental modifiers', columns: ['Condition', 'Suggested Attack Modifier'], rows: [['Light rain, mild wind, dim light, or light smoke', '-1 to -2'], ['Heavy rain, strong wind, fog, darkness, or unstable footing', '-3 to -5'], ['Severe storm, dense smoke, violent motion, or very poor visibility', '-6 to -10'], ['Near-zero visibility or overwhelming environmental interference', '-11 to -15']] },
          { type: 'p', text: 'Cover always imposes disadvantage on the attacker’s roll. It never adds to Defense Bonus or an Active Defense roll, regardless of whether the target chooses to defend.' },
        ],
      },
      {
        title: 'Melee and Unarmed Attacks',
        category: 'Combat',
        description: 'Attacking at close range with weapons or the body.',
        content: [
          { type: 'p', text: 'Melee weapons use the attack difficulty listed in their equipment entry. An unarmed attack is generally Easy. Reach states the weapon’s practical striking distance; long weapons may gain an advantage while controlling an approach but suffer a disadvantage in restricted space or once an opponent gets inside that reach.' },
          { type: 'p', text: 'A Strength Requirement is the minimum Strength rating needed to use a weapon normally. A character below it has disadvantage on attacks with that weapon; the Storyteller may rule that a character more than 1D below the requirement cannot use it effectively at all.' },
          { type: 'p', text: 'To determine Strength Damage for an unarmed attack, take the number before the D in Strength, divide it by two, round up, and ignore Strength pips. A character with Strength 3D has Strength Damage 2D; Strength 6D+2 produces Strength Damage 3D.' },
          { type: 'p', text: 'Some melee and thrown weapons add their listed damage to Strength Damage. Weapons with a self-contained damage rating do not add Strength unless their description says otherwise.' },
        ],
      },
      {
        title: 'Grappling and Escaping',
        category: 'Combat',
        description: 'Seizing, restraining, and escaping from an opponent.',
        content: [
          { type: 'p', text: 'A character may attempt to grapple an opponent with an unarmed attack. Roll Dexterity (Brawling) against the normal Easy difficulty for an unarmed attack. The target may actively defend. On a success, the target is Grappled and the initial attack causes no damage.' },
          { type: 'list', items: [
            { label: 'Movement', text: 'A Grappled character cannot move away from the grappler.' },
            { label: 'Restricted Actions', text: 'The Grappled character has disadvantage on Dexterity checks and attacks against anyone other than the grappler.' },
            { label: 'Maintaining the Grapple', text: 'The grappler must spend one action during each of their turns to maintain the grapple.' },
            { label: 'Close Weapons', text: 'Either character may use only weapons that can reasonably be operated at extremely close range.' },
            { label: 'Release', text: 'The grappler may release the target freely at any time.' },
          ] },
          { type: 'subheading', text: 'Escaping' },
          { type: 'p', text: 'Escaping requires an action. The restrained character makes an opposed Strength check to overpower the grappler or an opposed Dexterity (Acrobatics) check against the grappler’s Strength to slip free. The grappler may use Brawling instead of Strength when appropriate training applies. On a success, the grapple ends.' },
          { type: 'subheading', text: 'Tackle' },
          { type: 'p', text: 'A tackle combines running, grappling, and knocking the target down. The attacker must move toward the target and make a Brawling attack with slight disadvantage. Running and tackling count as two actions, so the normal multiple-action penalty also applies. On a success, the target becomes Grappled and both characters become Prone. On a failure, the Storyteller may leave the attacker Prone when their momentum carries them past the target or into an obstacle.' },
          { type: 'p', text: 'The Storyteller may apply advantage, disadvantage, or prevent a grapple when relative size, anatomy, additional limbs, footing, or other circumstances make the attempt unusually easy, difficult, or impossible.' },
        ],
      },
      {
        title: 'Choking',
        category: 'Combat',
        description: 'Rendering a Grappled opponent unconscious by preventing them from breathing.',
        content: [
          { type: 'p', text: 'A character must already have the target Grappled before beginning a choke. Starting or maintaining the choke requires one action and an opposed Strength or Brawling check. That same action also maintains the underlying grapple; the attacker does not spend a second action. A successful check marks one consecutive round of choking, and the choke causes no direct Health damage.' },
          { type: 'table', label: 'Choke progression', columns: ['Consecutive Successful Rounds', 'Effect'], rows: [['1', 'The target cannot speak clearly or perform actions that require speech.'], ['2', 'The target also suffers significant disadvantage on all actions.'], ['3', 'The target falls unconscious for 10D minutes and the choke ends.']] },
          { type: 'p', text: 'The target may attempt to escape the grapple normally on each turn. Escaping ends the choke. If the attacker fails a check to maintain the choke, the consecutive-round count resets to zero, though the underlying grapple remains unless the target escaped.' },
          { type: 'p', text: 'A creature that does not breathe, has protected anatomy, or is too large or differently shaped to choke may be resistant or immune.' },
          { type: 'p', text: 'If the attacker continues choking after the target becomes unconscious, each further successful round deals the attacker’s Strength Damage directly to the target’s Health. The target makes no resistance roll. This is a deliberate lethal action.' },
        ],
      },
      {
        title: 'Trip',
        category: 'Combat',
        description: 'Knocking an opponent to the ground instead of dealing damage.',
        content: [
          { type: 'p', text: 'Make an unarmed attack or an attack with an appropriate melee weapon with significant disadvantage, normally -6. The target may actively defend.' },
          { type: 'p', text: 'On a success, the attack causes no damage and the target becomes Prone. A creature that cannot reasonably be tripped is immune. The Storyteller may reduce the disadvantage when the attacker has superior leverage, uses a suitable weapon, or is substantially larger than the target.' },
        ],
      },
      {
        title: 'Prone',
        category: 'Combat',
        description: 'The effects of being knocked or forced to the ground.',
        content: [
          { type: 'list', items: [
            { label: 'Standing', text: 'Standing from Prone requires an action.' },
            { label: 'Attacking', text: 'A Prone character cannot make attacks.' },
            { label: 'Close Attacks', text: 'Point Blank and Short attacks against a Prone character gain significant advantage, normally +6.' },
            { label: 'Distant Attacks', text: 'Medium and Long ranged attacks against a Prone character suffer significant disadvantage, normally -6.' },
            { label: 'Movement', text: 'A Prone character may crawl using free movement but covers only half their normal Move value.' },
            { label: 'Other Actions', text: 'The Storyteller may impose disadvantage on physical actions made from the ground.' },
          ] },
          { type: 'p', text: 'The Storyteller may ignore or adjust these effects when the character’s position does not meaningfully affect the action or attack.' },
        ],
      },
      {
        title: 'Push',
        category: 'Combat',
        description: 'Forcing an opponent away instead of causing damage.',
        content: [
          { type: 'p', text: 'Make a Brawling or suitable melee attack with slight disadvantage, normally -3. The target may actively defend. On a success, the attack causes no damage and moves the target approximately two metres away from the attacker.' },
          { type: 'p', text: 'The Storyteller may adjust the distance for relative size, Strength, footing, and circumstances. If the target is pushed from a ledge, into a hazard, or against an object, resolve that consequence normally.' },
        ],
      },
      {
        title: 'Disarm',
        category: 'Combat',
        description: 'Forcing an opponent to drop a held item.',
        content: [
          { type: 'p', text: 'Make an appropriate attack against the held item with significant disadvantage, normally -6. The target may actively defend. On a success, the target drops the chosen item nearby and the attack causes no damage.' },
          { type: 'p', text: 'Two-handed grips, secured equipment, unusual anatomy, relative Strength, or a weapon designed for disarming may change the modifier. An item that cannot reasonably be knocked or pulled free cannot be disarmed this way.' },
        ],
      },
      {
        title: 'Entangling Attacks',
        category: 'Combat',
        description: 'Restraining a target with nets, ropes, webs, and similar weapons.',
        content: [
          { type: 'p', text: 'Make the entangling weapon’s normal attack. On a success, the target becomes Entangled and cannot move freely. Unless the weapon is barbed or has another harmful property, the attack causes no damage.' },
          { type: 'p', text: 'Escaping requires an action and either a Strength check to break the restraint or a Dexterity (Acrobatics) check to slip free. Every entangling weapon lists a numeric Escape TN. If an improvised restraint has no listed TN, the Storyteller chooses one from its material, construction, and how securely it was applied.' },
          { type: 'p', text: 'An Entangled character cannot attack with a limb or item caught by the restraint and has disadvantage on other physical actions. The exact restrictions depend on what was entangled and how the weapon functions.' },
        ],
      },
      {
        title: 'Resolving a Hit',
        category: 'Combat',
        description: 'Turning a successful attack into damage and consequences.',
        content: [
          { type: 'list', items: [
            { label: '1. Roll Damage', text: 'Roll the weapon, ability, or hazard’s damage rating, including Strength Damage when applicable.' },
            { label: '2. Roll Resistance', text: 'The defender rolls Strength and adds applicable armour, traits, powers, and modifiers.' },
            { label: '3. Calculate Health Loss', text: 'Subtract resistance from damage. Any positive remainder is removed from current Health.' },
            { label: '4. Apply the Condition', text: 'Determine the character’s new Health condition and its effects.' },
          ] },
          { type: 'p', text: 'If resistance equals or exceeds damage, the attack causes no Health loss. It may still leave a bruise, damaged surface, or other harmless narrative mark.' },
        ],
      },
      {
        title: 'Optional Rule: Stealth Takedowns',
        category: 'Combat',
        description: 'Cinematic rules for silently killing or incapacitating an unaware target.',
        content: [
          { type: 'p', text: 'A stealth takedown can be attempted only when the target is unaware of the attacker, the attacker can reach an appropriate position unseen, and the chosen weapon or technique could reasonably produce the intended result. The Storyteller decides whether a target is vulnerable to a takedown. Player characters and major opponents should normally be protected unless they are helpless or completely vulnerable.' },
          { type: 'subheading', text: 'Stealth Kill or Stealth Knockout' },
          { type: 'p', text: 'Before attacking, declare whether the takedown is intended to kill the target or knock them unconscious. Make a relevant attack with +1D. If the attack hits:' },
          { type: 'list', items: [
            { label: '1. Roll Damage', text: 'Roll damage normally.' },
            { label: '2. Roll Resistance', text: 'The target rolls Strength and applicable armour.' },
            { label: '3. Calculate Health Loss', text: 'Subtract resistance from damage to determine the resulting Health loss.' },
            { label: '4. Resolve the Takedown', text: 'If the attack would remove at least 25% of the target’s maximum Health, the target is killed immediately or becomes unconscious for 10D minutes, according to the attacker’s declared intent.' },
          ] },
          { type: 'p', text: 'If the attack would remove less than 25% of the target’s maximum Health, apply the Health loss normally and the takedown fails. An unconscious target immediately awakens if they take damage.' },
          { type: 'subheading', text: 'Helpless Targets' },
          { type: 'p', text: 'A sleeping, bound, paralyzed, or completely helpless target does not require an attack roll.' },
          { type: 'list', items: [
            { label: 'Automatic Success', text: 'The attack succeeds automatically when no meaningful uncertainty exists.' },
            { label: 'Resistance', text: 'The target still rolls resistance if armour, supernatural protection, or unusual durability could matter.' },
            { label: 'Major Characters', text: 'Major characters receive whatever final protection the Storyteller considers appropriate.' },
          ] },
        ],
      },
      {
        title: 'Damage',
        category: 'Damage & Healing',
        description: 'Comparing incoming harm with a character’s resistance.',
        content: [
          { type: 'p', text: 'Every damaging weapon, hazard, or ability has a damage rating. Roll that rating to determine the damage total. The target rolls Strength and adds applicable armour, traits, powers, and situational modifiers to determine the damage-resistance total.' },
          { type: 'p', text: 'Subtract resistance from damage. Remove any positive remainder from the target’s current Health; Health loss can never be less than zero. Damage and resistance rolls each include exactly one Wild Die.' },
          { type: 'p', text: 'If a single instance of damage would reduce a target below zero Health, the target is killed or destroyed instantly. Record current Health as zero; negative Health is not tracked.' },
        ],
      },
      {
        title: 'Strength Damage',
        category: 'Damage & Healing',
        description: 'The damage contributed by physical power.',
        content: [
          { type: 'p', text: 'Unarmed attacks and some melee, thrown, or muscle-powered weapons add Strength Damage. Take the number before the D in Strength, divide it by two, round up, and ignore Strength pips.' },
          { type: 'table', label: 'Strength Damage examples', columns: ['Strength', 'Strength Damage'], rows: [['2D', '1D'], ['3D', '2D'], ['4D+2', '2D'], ['5D', '3D'], ['6D+2', '3D']] },
          { type: 'p', text: 'A weapon written as Strength Damage +1D adds +1D to this rating. A weapon with a self-contained damage rating does not add Strength unless its description says otherwise.' },
        ],
      },
      {
        title: 'Armour and Resistance',
        category: 'Damage & Healing',
        description: 'Using Strength and protection to resist harm.',
        content: [
          { type: 'p', text: 'When resisting applicable damage, roll Strength plus the armour’s resistance dice or pips. A character with Strength 3D and armour resistance +1D rolls 4D.' },
          { type: 'p', text: 'Some armour only protects against particular damage types. An energy shield may apply to energy damage but not a fall, while insulated gear may resist electricity without stopping a blade. This distinction is narrative and may be ignored when the Storyteller prefers a simpler game.' },
          { type: 'table', label: 'Example damage types', columns: ['Type', 'Examples'], rows: [['Physical', 'Blades, clubs, claws, arrows, thrown weapons, crushing, and ordinary impacts'], ['Ballistic', 'Bullets, firearm projectiles, explosive fragments, shrapnel, and comparable high-velocity penetrators'], ['Energy', 'Lasers, plasma, force beams, and magical bolts'], ['Fire and Heat', 'Flames, molten material, steam, and extreme heat'], ['Cold', 'Freezing weather, ice, and supernatural cold'], ['Electrical', 'Lightning, exposed power, and electrical weapons'], ['Chemical', 'Acid, corrosives, and harmful substances'], ['Poison and Disease', 'Toxins, venom, infection, and illness'], ['Psychic', 'Mental attacks, terror, and invasive telepathy'], ['Paranormal', 'Magic, miracles, curses, and supernatural forces'], ['Suffocation', 'Drowning, smoke inhalation, and lack of air'], ['Falling and Impact', 'Falls, collisions, and sudden deceleration']] },
        ],
      },
      {
        title: 'Health Conditions',
        category: 'Damage & Healing',
        description: 'The effects of losing portions of maximum Health.',
        content: [
          { type: 'table', label: 'Health conditions', columns: ['Health Remaining', 'Condition', 'Effect'], rows: [['100%', 'Healthy', 'No penalty'], ['81-99%', 'Bruised', 'No penalty'], ['60-80%', 'Stunned', '-1D to remaining actions in the current round'], ['40-59%', 'Wounded', '-1D to all actions'], ['20-39%', 'Severely Wounded', '-2D to all actions'], ['10-19%', 'Incapacitated', 'Unconscious until stabilized; after waking, -2D to all actions'], ['1-9%', 'Mortally Wounded', 'Unconscious and at risk of death'], ['0%', 'Dead', 'The character has died']] },
          { type: 'p', text: 'Condition penalties are not cumulative. Apply only the effect of the character’s current condition.' },
        ],
      },
      {
        title: 'Incapacitation and Mortal Wounds',
        category: 'Damage & Healing',
        description: 'What happens when Health becomes critically low.',
        content: [
          { type: 'p', text: 'An Incapacitated character falls unconscious for 10D minutes unless stabilized or revived by healing, a paranormal power, or another appropriate effect. Successful stabilization wakes the character, but they suffer −2D on all actions while their Health remains in the Incapacitated range.' },
          { type: 'p', text: 'A Mortally Wounded character is unconscious and dying. At the end of each round, roll Strength against difficulty 5. Increase this difficulty by +1 after every three completed rounds the character remains Mortally Wounded. Success keeps the character alive; failure causes death. Successful stabilization moves the character to Incapacitated at 10% of maximum Health.' },
          { type: 'p', text: 'A character at zero Health is dead unless the setting provides an extraordinary means of revival.' },
        ],
      },
      {
        title: 'Stabilizing a Character',
        category: 'Damage & Healing',
        description: 'Preventing an unconscious character from deteriorating.',
        content: [
          { type: 'p', text: 'A nearby character may use an action to stabilize an Incapacitated or Mortally Wounded character by making an Intelligence (First-Aid) check. Stabilizing an Incapacitated character is Moderate; stabilizing a Mortally Wounded character is Difficult.' },
          { type: 'p', text: 'A suitable first-aid kit or medpack grants advantage. The Medicine skill, clean conditions, assistance, or specialized equipment may provide further advantage. Poor conditions, active danger, or missing supplies may impose disadvantage.' },
          { type: 'p', text: 'Success wakes an Incapacitated character immediately and prevents further deterioration. A successfully stabilized Mortally Wounded character moves to Incapacitated at 10% of maximum Health and also wakes. Stabilization does not otherwise restore Health unless another rule or treatment says it does.' },
        ],
      },
      {
        title: 'First Aid',
        category: 'Damage & Healing',
        description: 'Immediate treatment following injury.',
        content: [
          { type: 'p', text: 'A character may receive First Aid once after each distinct injury or damaging scene. Roll Intelligence (First-Aid), applying advantage for a suitable first-aid kit or medpack and disadvantage for poor conditions or missing supplies.' },
          { type: 'table', label: 'First Aid recovery', columns: ['First-Aid Total', 'Health Restored'], rows: [['0', '0'], ['1-5', '2'], ['6-10', '1D'], ['11-15', '2D'], ['16-20', '3D'], ['21-25', '4D'], ['26-30', '5D'], ['31+', '6D']] },
          { type: 'p', text: 'Health cannot exceed maximum Health. A complication may consume supplies, require additional time, or leave an injury that needs proper medical treatment.' },
          { type: 'p', text: 'The First-Aid roll is the patient’s single attempt for that distinct injury or damaging scene, whether the result restores Health or not. Another character may assist that roll but cannot make a separate attempt. Receiving First Aid does not prevent the patient from later receiving a Medicine treatment.' },
        ],
      },
      {
        title: 'Natural Healing',
        category: 'Damage & Healing',
        description: 'Recovering Health through rest.',
        content: [
          { type: 'list', items: [
            { label: 'Full Rest', text: 'At the end of a full day of rest, roll Strength and restore that much Health.' },
            { label: 'Light Activity', text: 'Roll Strength with slight disadvantage.' },
            { label: 'Strenuous Activity', text: 'The character normally receives no natural healing that day.' },
          ] },
          { type: 'p', text: 'Proper shelter, food, medical care, or paranormal assistance may grant advantage. A Mortally Wounded character cannot recover through ordinary rest until stabilized. Natural healing cannot raise Health above its maximum.' },
        ],
      },
      {
        title: 'Medical and Paranormal Healing',
        category: 'Damage & Healing',
        description: 'Treatment beyond immediate First Aid.',
        content: [
          { type: 'p', text: 'Outside combat, a character trained in Intelligence (Medicine) may treat an injured character even if that patient has already received First Aid. Medicine is a trained skill for this purpose and cannot be replaced by an untrained Intelligence attribute roll.' },
          { type: 'p', text: 'Roll Medicine using the First Aid recovery table unless a medical procedure, item, or setting rule provides a different result. A patient may normally benefit from one Medicine treatment per day. Proper facilities, assistants, and equipment can grant advantage; inadequate time or supplies can impose disadvantage.' },
          { type: 'p', text: 'A failed Medicine attempt may be retried when the character still has the time and resources to provide treatment. Several healers cannot each provide separate Medicine recovery for the same injury or treatment period, though they may assist the lead healer.' },
          { type: 'p', text: 'Paranormal powers may restore Health or remove conditions according to their individual descriptions. No treatment can raise current Health above maximum Health.' },
        ],
      },
      {
        title: 'Environmental Damage',
        category: 'Damage & Healing',
        description: 'Applying the damage rules to hazards and exposure.',
        content: [
          { type: 'p', text: 'Fire, poison, disease, drowning, falling, and other hazards use the normal damage and resistance procedure unless their rules say otherwise. Armour applies only when it could reasonably protect against that damage type.' },
          { type: 'p', text: 'Some hazards deal damage once, while continued exposure deals damage each round or at another stated interval. The Exploration rules provide the specific progressions for drowning and falling.' },
        ],
      },
      {
        title: 'Equipment',
        category: 'Equipment',
        description: 'The possessions a character carries and uses.',
        content: [
          { type: 'p', text: 'Equipment includes ordinary possessions, consumables, kits, and adventuring gear. Record an item’s name and quantity on the character sheet. An item enables actions that require it and may provide advantage when it is particularly suited to a task.' },
        ],
      },
      {
        title: 'Weapons',
        category: 'Equipment',
        description: 'Recording weapon difficulty, range, and damage.',
        content: [
          { type: 'p', text: 'Weapons are recorded with a name, Difficulty field, and damage. For a melee weapon, Difficulty records one difficulty such as Easy or Moderate. For a ranged weapon, Difficulty records its Short, Medium, and Long distances; the corresponding range band determines the attack difficulty. A setting defines the skill used and any special properties.' },
          { type: 'table', label: 'Ranged weapon difficulties', columns: ['Range', 'Distance', 'Difficulty'], rows: [
            ['Point Blank', 'Closer than Short range', 'Very Easy'],
            ['Short', 'Weapon’s listed Short range', 'Easy'],
            ['Medium', 'Weapon’s listed Medium range', 'Moderate'],
            ['Long', 'Weapon’s listed Long range', 'Difficult'],
            ['Beyond Long', 'Past the listed Long range', 'Very Difficult'],
          ] },
          { type: 'p', text: 'Each ranged weapon lists its Short, Medium, and Long distances in metres in its Difficulty field. The Storyteller may apply additional advantage or disadvantage for target size, visibility, cover, movement, or aiming.' },
          { type: 'subheading', text: 'Optional Ammunition Tracking' },
          { type: 'p', text: 'The Storyteller decides whether the campaign tracks individual ammunition. When ammunition is not tracked, a character with access to ordinary supplies is assumed to replenish arrows, bolts, shot, powder, and cartridges between scenes; reload times and weapon capacities still apply. When ammunition is tracked, expend one piece or charge for each attack. After a scene, the Storyteller may allow half of ordinary arrows and bolts to be recovered when the characters have time to search; powder, shot, and cartridges are normally expended.' },
        ],
      },
      {
        title: 'Armour',
        category: 'Equipment',
        description: 'Protection that resists damage at a cost to mobility.',
        content: [
          { type: 'p', text: 'Armour is recorded with a resistance value and any Dexterity penalty. When resisting damage, add the armour’s resistance dice or pips to the player’s Strength roll. Compare that combined resistance total with the incoming damage according to the Damage & Healing rules.' },
          { type: 'p', text: 'A Dexterity penalty applies while the armour is worn and represents weight, restriction, or bulk. The Storyteller may rule that armour provides reduced or no resistance against a hazard it could not reasonably stop.' },
        ],
      },
      {
        title: 'Tools',
        category: 'Equipment',
        description: 'Equipment designed to support specific skills and tasks.',
        content: [
          { type: 'p', text: 'Tools range from a simple rope or repair kit to specialized medical or technical equipment. Proper tools may grant advantage; improvised, damaged, or missing tools may impose disadvantage or make a task impossible. The Storyteller judges the modifier from the tool’s suitability and condition.' },
        ],
      },
      {
        title: 'Wealth',
        category: 'Equipment',
        description: 'Money, currency, and a character’s available resources.',
        content: [
          { type: 'p', text: 'The character sheet records currencies and their current amounts. Each setting determines which currencies exist and their relative value. Wealth can also include credit, status, property, or access to an organization when the setting uses those concepts.' },
        ],
      },
      {
        title: 'Availability',
        category: 'Equipment',
        description: 'Whether an item can be found and legally obtained.',
        content: [
          { type: 'p', text: 'Availability describes how difficult an item is to locate, not merely whether the character can afford it. Location, legality, scarcity, contacts, time, and demand can determine availability. The Storyteller may call for an Intelligence, Social, Streetwise, or other appropriate check to find restricted or unusual goods.' },
        ],
      },
      {
        title: 'Purchasing',
        category: 'Equipment',
        description: 'Acquiring goods and recording their cost.',
        content: [
          { type: 'p', text: 'Equipment and other items list an approximate standard cost in copper coins. The Storyteller is free to adjust that cost for the setting, location, quality, scarcity, legality, demand, negotiation, or circumstances of the campaign. One platinum coin equals 10 gold, 100 silver, or 1,000 copper coins.' },
          { type: 'p', text: 'Some Storytellers may allow characters to purchase ordinary available items during breaks in a session. Others may require the characters to visit a settlement, merchant, market, contact, or other location where those items are actually offered for sale. Establish the campaign’s purchasing procedure before it becomes important.' },
        ],
      },
      {
        title: 'Paranormal Framework',
        category: 'Paranormal Powers',
        description: 'The shared procedure for magic, miracles, psychic abilities, and other powers.',
        content: [
          { type: 'p', text: 'Paranormal powers are setting-defined abilities that reach beyond ordinary action. To use a power, the player rolls the Paranormal skill or other trait named by that power and attempts to meet or exceed its difficulty. Success activates the listed effect; Result Points may help the Storyteller describe its quality when the power does not specify another use.' },
          { type: 'p', text: 'Known spells and similar powers are recorded in the character sheet’s Special Abilities section with their difficulty, effect, and any limits. Some powers have additional costs such as Meta Dice, Health, materials, preparation, extended time, or a required condition.' },
          { type: 'p', text: 'With Storyteller approval, a character may begin with Paranormal at 0D in a setting where access to supernatural forces is absent, rare, sealed, or expected to awaken later. The Storyteller decides whether those unallocated dice are available elsewhere, reserved for a later awakening, or simply reflect the setting’s species limits.' },
          { type: 'p', text: 'Improving a paranormal skill costs twice as many Experience Points as improving a regular skill. First calculate the normal skill cost from the number before the D, then double it.' },
          { type: 'p', text: 'Learning a new paranormal power normally requires a source of instruction, such as a spellbook, teacher, scroll, ancient cave drawing, or another party member who already knows the power. Each power also has its own Experience Point cost for learning it. The Storyteller decides whether the source, study time, and circumstances are sufficient.' },
          { type: 'p', text: 'The Core rules provide only this common procedure. Fantasy, Space Opera, Modern, and other genres may define different paranormal traditions, skills, costs, consequences, and methods for learning powers.' },
        ],
      },
      {
        title: 'Vehicles & Mounts Overview',
        category: 'Vehicles & Mounts',
        description: 'Using vehicles, vessels, and riding animals during play.',
        content: [
          { type: 'p', text: 'Vehicles and mounts extend the normal rules for movement, checks, combat, and damage. Routine travel usually requires no roll. Use these rules when speed, difficult terrain, pursuit, dangerous maneuvers, attacks, or damage make controlling a vehicle or mount uncertain.' },
          { type: 'p', text: 'Vehicles and mounts both have current and maximum Health and use the same percentage-based Health structure as characters. Mounts remain creatures with Attributes and actions of their own, while vehicles use Toughness in place of Strength. A setting may add specialized vehicles, control skills, weapons, fuel, or travel procedures while retaining this common framework.' },
        ],
      },
      {
        title: 'Vehicle Profiles',
        category: 'Vehicles & Mounts',
        description: 'The statistics used to describe a vehicle.',
        content: [
          { type: 'list', items: [
            { label: 'Scale', text: 'The vehicle\'s size relative to a person and its effect on attacks, damage, and resistance.' },
            { label: 'Move', text: 'The distance the vehicle travels at Cruising speed during one round.' },
            { label: 'Maneuverability', text: 'Dice or pips added to checks made to control the vehicle. Awkward or damaged vehicles may instead impose a penalty.' },
            { label: 'Toughness', text: 'The vehicle\'s base resistance to damage.' },
            { label: 'Health', text: 'The vehicle\'s current and maximum structural integrity. Its percentage of remaining Health determines its condition.' },
            { label: 'Armour', text: 'Additional resistance that may apply only against particular damage types, directions, or protected sections.' },
            { label: 'Crew', text: 'The number of operators needed to use the vehicle without disadvantage.' },
            { label: 'Capacity', text: 'The passengers and cargo the vehicle can carry under normal conditions.' },
            { label: 'Weapons and Traits', text: 'Installed weapons, firing arcs, and special qualities such as Open-Topped, Unstable, Flying, or Armoured Front.' },
          ] },
          { type: 'p', text: 'A vehicle resists damage by rolling its Toughness and applicable armour. Its vehicle card provides its current and maximum Health rather than generating them during play. Vehicle cards and their setting-specific statistics are maintained in the Vehicles view. Equipment, cargo, excessive passengers, missing crew, or damage may modify the profile when the Storyteller considers it relevant.' },
        ],
      },
      {
        title: 'Operating Vehicles',
        category: 'Vehicles & Mounts',
        description: 'Making checks to drive, pilot, sail, or otherwise control a vehicle.',
        content: [
          { type: 'p', text: 'An operator uses the Dexterity skill appropriate to the vehicle, such as Driving, Piloting, Sailing, or Charioteering. If the character lacks the skill, they roll Dexterity and the Storyteller may apply disadvantage or rule that specialized operation cannot be attempted untrained.' },
          { type: 'p', text: 'Ordinary travel under safe conditions does not require a check. Roll when the operator attempts a dangerous maneuver or when speed, terrain, weather, visibility, damage, traffic, or hostile action creates meaningful uncertainty. Apply the vehicle\'s Maneuverability and all relevant advantage, disadvantage, and multiple-action penalties.' },
          { type: 'p', text: 'A failed check prevents the intended maneuver and generally leaves the vehicle moving at its current speed and direction. A complication may cause a stall, skid, thrown passenger, damaged component, collision, or loss of control appropriate to the vehicle and scene.' },
        ],
      },
      {
        title: 'Speed and Maneuvers',
        category: 'Vehicles & Mounts',
        description: 'Choosing speed and resolving difficult movement.',
        content: [
          { type: 'table', label: 'Vehicle speeds', columns: ['Speed', 'Distance', 'Action', 'Base difficulty'], rows: [['Stopped', 'None', 'None', 'Automatic'], ['Cautious', 'Half Move', 'Free', 'Automatic'], ['Cruising', 'Move', 'Free', 'Roll only when threatened'], ['High', 'Twice Move', 'One action', 'Easy'], ['All-Out', 'Four times Move', 'One action', 'Moderate']] },
          { type: 'p', text: 'The base difficulty covers maintaining that speed in ordinary conditions. Turns, jumps, docking, landing, narrow passages, obstacles, poor surfaces, and other maneuvers can raise the difficulty or impose disadvantage. A vehicle cannot exceed a speed its profile, damage, terrain, or circumstances permit.' },
          { type: 'list', items: [
            { label: 'Easy', text: 'A controlled turn, lane change, or similar maneuver with ample room.' },
            { label: 'Moderate', text: 'A sharp turn, hurried docking, rough landing, or passage through a confined space.' },
            { label: 'Difficult', text: 'A sideswipe, jump, sudden reversal, or maneuver through severe hazards.' },
            { label: 'Very Difficult', text: 'Regaining control during a crash, completing an extreme stunt, or maneuvering where there is almost no margin for error.' },
          ] },
        ],
      },
      {
        title: 'Chases',
        category: 'Vehicles & Mounts',
        description: 'Resolving pursuits without measuring every metre.',
        content: [
          { type: 'p', text: 'Track a chase using four relative ranges: Engaged, Near, Far, and Escaped. Each round, the participants make opposed control checks. A participant with a meaningfully higher available speed receives advantage. The winner shifts the range one step in their favour; a pursuer moves closer, while the quarry moves farther away.' },
          { type: 'p', text: 'Instead of simply gaining distance, a participant may attempt a shortcut, force an opponent toward an obstacle, hide, board another vehicle, or take another chase action. The Storyteller sets its difficulty and consequence. Attacks and other actions during a chase use the normal multiple-action penalties.' },
          { type: 'p', text: 'A chase ends when the quarry Escapes, the pursuer reaches the position needed to stop or board them, someone abandons the chase, or damage and terrain bring it to another natural conclusion.' },
        ],
      },
      {
        title: 'Attacking Vehicles',
        category: 'Vehicles & Mounts',
        description: 'Making attacks from, against, and between moving vehicles.',
        content: [
          { type: 'p', text: 'Attacks involving vehicles follow the normal combat rules. Use the weapon\'s difficulty unless the target actively defends. The operator may make an active defense with the relevant control skill, adding any listed Defense Bonus and Maneuverability. This counts as an action and is affected by multiple-action penalties. As with a character’s active defense, the result applies for the remainder of the round.' },
          { type: 'p', text: 'Speed, unstable footing, restricted firing arcs, poor visibility, and violent maneuvers may impose disadvantage. Cover always applies disadvantage to the attacker and is never added to an active defense roll. An attacker may target the vehicle, an exposed occupant, a mount, or a visible component when the shot is reasonably possible.' },
          { type: 'p', text: 'Installed weapons use their own damage, range, crew, and firing-arc rules. Apply Scale after determining whether the attack is aimed at the vehicle or an occupant.' },
        ],
      },
      {
        title: 'Scale',
        category: 'Vehicles & Mounts',
        description: 'Handling attacks between creatures and objects of different sizes.',
        content: [
          { type: 'table', label: 'Scale examples', columns: ['Scale', 'Examples'], rows: [['-2 Tiny', 'Rat or small familiar'], ['-1 Small', 'Dog or child'], ['0 Standard', 'Human'], ['+1 Large', 'Horse or ogre'], ['+2 Huge', 'Elephant or carriage'], ['+3 Massive', 'Longship or small building'], ['+4 Colossal', 'War galley or castle section']] },
          { type: 'p', text: 'Find the difference between the attacker\'s scale and the target\'s scale, then multiply that difference by 3 to find the scale modifier. Use the scale of the weapon or platform when it differs from its wielder.' },
          { type: 'list', items: [
            { label: 'Attacking a larger target', text: 'Add the scale modifier to the attack roll because the target is easier to hit. Add the same modifier to the target\'s resistance because it is harder to damage.' },
            { label: 'Attacking a smaller target', text: 'Subtract the scale modifier from the attack roll because the target is harder to hit. Add the same modifier to the attack\'s damage if it hits.' },
          ] },
          { type: 'p', text: 'For example, a Standard human attacking a Huge carriage gains +6 to hit, but the carriage gains +6 resistance. If the carriage strikes the human, it suffers -6 to hit and gains +6 damage. The Storyteller may reduce or ignore the resistance benefit for unusually large but fragile objects.' },
        ],
      },
      {
        title: 'Vehicle Damage',
        category: 'Vehicles & Mounts',
        description: 'Determining how badly a vehicle has been damaged.',
        content: [
          { type: 'p', text: 'Roll the attack\'s damage and the vehicle\'s Toughness plus applicable armour, applying Scale. Subtract resistance from damage and remove any positive remainder from the vehicle\'s current Health. This is the same damage procedure used for characters and mounts.' },
          { type: 'table', label: 'Vehicle Health conditions', columns: ['Health Remaining', 'Condition', 'Effect'], rows: [['100%', 'Operational', 'No penalty'], ['81-99%', 'Scratched', 'No penalty'], ['60-80%', 'Shaken', '-1D to control checks and vehicle actions for the rest of the current round'], ['40-59%', 'Damaged', '-1D to control checks and vehicle actions'], ['20-39%', 'Severely Damaged', '-2D to control checks and vehicle actions'], ['10-19%', 'Disabled', 'The vehicle cannot operate under its own power'], ['1-9%', 'Critical', 'The vehicle is disabled and at risk of complete failure'], ['0%', 'Destroyed', 'The vehicle is unusable']] },
          { type: 'p', text: 'Condition penalties are not cumulative. Apply only the effect of the vehicle\'s current condition. A vehicle that becomes Disabled or Critical loses control if it was moving. A Critical vehicle loses 1% of its maximum Health at the end of each round until an operator makes a successful Moderate repair check to stabilize it.' },
          { type: 'p', text: 'Damage may also disable a component when the attack and fiction clearly support it, but component loss should not replace the normal Health loss. A vehicle at zero Health is Destroyed but does not automatically explode unless its construction, cargo, or damage makes that outcome reasonable.' },
        ],
      },
      {
        title: 'Collisions and Ramming',
        category: 'Vehicles & Mounts',
        description: 'Resolving crashes, impacts, and deliberate rams.',
        content: [
          { type: 'p', text: 'A deliberate ram requires an appropriate control check or attack roll. On a collision, determine damage from the moving vehicle\'s speed, apply the circumstances below, and have each affected vehicle or creature resist separately. Apply Scale normally.' },
          { type: 'table', label: 'Collision damage by speed', columns: ['Speed', 'Damage'], rows: [['Stopped', '2D'], ['Cautious', '4D'], ['Cruising', '6D'], ['High', '8D'], ['All-Out', '10D']] },
          { type: 'table', label: 'Collision modifiers', columns: ['Circumstance', 'Modifier'], rows: [['Head-on collision', '+3D'], ['Rear-end collision or sideswipe', '-3D'], ['Yielding or easily broken obstacle', '-1D or more'], ['Solid obstacle', 'No modifier']] },
          { type: 'p', text: 'When two moving vehicles collide, use the speed and direction that best represent the impact rather than automatically adding both full damage values. The Storyteller may also move the vehicles, throw occupants, or create environmental consequences after resolving damage.' },
        ],
      },
      {
        title: 'Passengers',
        category: 'Vehicles & Mounts',
        description: 'Protecting occupants and determining crash injuries.',
        content: [
          { type: 'p', text: 'When a collision or similar impact reduces a vehicle\'s Health, its occupants may also be injured. Use the vehicle\'s Health condition immediately after the impact to determine what portion of the collision damage reaches them. Round up, then each affected passenger resists that amount with Strength and applicable personal armour.' },
          { type: 'table', label: 'Passenger impact damage', columns: ['Vehicle Health Remaining', 'Passenger Damage'], rows: [['81-100%', 'None'], ['60-80%', 'One-quarter'], ['40-59%', 'One-half'], ['20-39%', 'Three-quarters'], ['0-19%', 'Full damage']] },
          { type: 'p', text: 'Open-topped vehicles, exposed positions, motorcycles, and mounts may increase passenger damage by one row. Enclosed compartments, restraints, or dedicated safety systems may reduce it by one row. Ordinary attacks against a vehicle do not automatically harm its passengers, and occupants directly struck by an attack resolve that attack normally.' },
        ],
      },
      {
        title: 'Repairs',
        category: 'Vehicles & Mounts',
        description: 'Removing vehicle damage and restoring failed components.',
        content: [
          { type: 'p', text: 'Repairing a vehicle requires an appropriate Intelligence skill, suitable parts, tools, and enough time. A vehicle may receive one field repair after each distinct damaging scene. Roll the relevant repair skill against a difficulty chosen by the Storyteller. On a success, use the final repair total to restore Health using the table below. A field repair can also restore one failed component when doing so makes sense.' },
          { type: 'table', label: 'Vehicle repair', columns: ['Repair Total', 'Health Restored'], rows: [['0', '0'], ['1-5', '2'], ['6-10', '1D'], ['11-15', '2D'], ['16-20', '3D'], ['21-25', '4D'], ['26-30', '5D'], ['31+', '6D']] },
          { type: 'p', text: 'A Critical vehicle must first be stabilized before a repair restores Health. A complete repair normally requires a workshop or equivalent facilities and may be attempted once per day, even if the vehicle already received a field repair. A Destroyed vehicle cannot usually regain Health without extensive reconstruction.' },
          { type: 'p', text: 'Missing parts, unfamiliar technology, rushed work, bad conditions, or damage sustained during use impose disadvantage. Superior facilities, schematics, assistance, and high-quality replacement parts may grant advantage.' },
        ],
      },
      {
        title: 'Mounts and Mounted Combat',
        category: 'Vehicles & Mounts',
        description: 'Riding creatures during travel, chases, and combat.',
        content: [
          { type: 'p', text: 'A mount is a creature with its own Attributes, Health, Move, Scale, attacks, armour, and traits. Unless its profile provides fixed Health, determine maximum Health by rolling its Strength and adding 20, just as for a character. Ordinary travel on a calm, trained mount requires no roll. Dangerous movement uses Dexterity (Riding). Controlling an unfamiliar, frightened, injured, or unwilling mount requires a Riding check against the mount\'s listed Control difficulty.' },
          { type: 'p', text: 'The rider uses the mount\'s Move and follows the vehicle speed rules. The rider or mount may attack on the rider\'s turn. If both attack, treat them as multiple actions and apply the normal penalty. An attacker declares whether they are targeting the rider or mount, and Scale and cover apply to the chosen target.' },
          { type: 'p', text: 'Mounted melee attacks may gain advantage when height, reach, or momentum is genuinely helpful. Tight spaces, unsuitable terrain, an untrained mount, or trying to use a weapon that requires stable footing may impose disadvantage. A thrown rider resolves the resulting fall using the Exploration rules.' },
        ],
      },
      {
        title: 'Animal-Drawn Vehicles',
        category: 'Vehicles & Mounts',
        description: 'Operating carts, carriages, sleds, and similar conveyances.',
        content: [
          { type: 'p', text: 'Treat the animals and the vehicle as separate targets. The animals provide movement, while the vehicle provides capacity, Toughness, armour, and protection for its passengers. The driver normally uses Dexterity (Charioteering or Driving).' },
          { type: 'p', text: 'Injured, frightened, exhausted, or poorly trained animals may reduce speed or impose disadvantage on control checks. Overloading the vehicle, losing part of a team, damaging a wheel or harness, or traveling over unsuitable terrain can have similar effects.' },
          { type: 'p', text: 'Destroying the vehicle does not automatically injure or immobilize the animals, and harming an animal does not automatically destroy the vehicle. Resolve damage and consequences separately, then determine whether the remaining team, harness, and vehicle can continue moving safely.' },
        ],
      },
      {
        title: 'Setting Difficulty',
        category: 'Storyteller',
        description: 'Choosing fair target numbers and modifiers.',
        content: [
          { type: 'p', text: 'Set difficulty from the task under ordinary conditions, then apply advantage or disadvantage to the character’s roll for external circumstances. Avoid calling for a roll when success is automatic, failure has no meaningful consequence, or repeated attempts would eventually succeed without cost.' },
          { type: 'p', text: 'Tell players what their characters understand about the risk. Exact numbers may remain hidden, but the apparent difficulty and likely consequences should usually be clear enough to support an informed choice.' },
        ],
      },
      {
        title: 'Creating Species',
        category: 'Storyteller',
        description: 'A baseline for designing new species while leaving room for setting-specific judgment.',
        content: [
          { type: 'p', text: 'Begin with the Human baseline: 12D of species allocation, Move 10, and attribute limits of 1D minimum and 4D maximum. The character creator adds the universal 6D used by the normal allocation procedure, producing the standard Human total of 18D.' },
          { type: 'p', text: 'Subtract the allocation cost of every Advantage granted automatically by the species. Add the allocation grant of any true Disadvantage that is inseparable from the species. Use the same pip values as character traits.' },
          { type: 'table', label: 'Species trait values', columns: ['Trait Level', 'Allocation Value'], rows: [['Minor', '1 pip'], ['Medium', '2 pips'], ['Major', '1D'], ['Critical', '1D+1']] },
          { type: 'table', label: 'Current species arithmetic', columns: ['Species', 'Calculation', 'Listed Allocation'], rows: [['Human', '12D; no priced Advantage', '12D'], ['Dwarf', '12D − Hardy (Medium), worth 2 pips', '11D+1'], ['Elf', '12D − Acute Sense (Minor), worth 1 pip', '11D+2'], ['Halfling', '12D − Fortunate (Medium), worth 2 pips', '11D+1']] },
          { type: 'p', text: 'Species features, altered attribute limits, Move, anatomy, environmental adaptations, and setting utility require judgment rather than a fully objective formula. A narrow or mostly narrative feature may need no allocation change, while flight, broad immunity, an unusually high maximum, or another consistently powerful feature may justify reducing allocation. A meaningful limitation may justify increasing it. Compare the finished species with the existing options, consider how often every feature will matter in the campaign, and adjust any number or ability that produces a fairer result.' },
        ],
      },
      {
        title: 'Equipment Budgets and Availability',
        category: 'Storyteller',
        description: 'Optional starting budgets and target numbers for locating equipment.',
        content: [
          { type: 'p', text: 'The Storyteller may approve starting equipment directly or give each character a budget. For a fantasy campaign using the listed copper-coin prices, 5,000 copper coins—50 gold—is a useful standard budget. Use roughly 2,500 copper for a low-resource campaign or 10,000 copper for a well-funded campaign. Signature Equipment and story-granted items may sit outside this budget.' },
          { type: 'p', text: 'Rarity provides a suggested starting point for availability checks. The Storyteller selects the exact target within the named range and may change the category for location, legality, demand, contacts, or time spent searching.' },
          { type: 'table', label: 'Suggested availability', columns: ['Rarity', 'Suggested Availability'], rows: [['Common', 'Automatic in an appropriate settlement; Very Easy when supplies are strained'], ['Uncommon', 'Easy'], ['Rare', 'Difficult']] },
        ],
      },
      {
        title: 'Awarding Experience and Meta Dice',
        category: 'Storyteller',
        description: 'Rewarding progress and dramatic contributions.',
        content: [
          { type: 'p', text: 'Award Experience Points primarily at the end of sessions for participation, progress, discovery, and meaningful character choices. Keep awards consistent enough that players understand the expected pace of advancement.' },
          { type: 'p', text: 'A standard session currently awards approximately 5 Experience Points to each player character. This is a provisional pace for playtesting, and the Storyteller may adjust it for the length and significance of the session.' },
          { type: 'p', text: 'Award Meta Dice during play for impressive, impactful, creative, or story-serving moments. Characters begin with two and can hold five, so award them freely enough that players are encouraged to spend them rather than save them indefinitely.' },
        ],
      },
      {
        title: 'Designing Challenges',
        category: 'Storyteller',
        description: 'Creating situations with meaningful choices and consequences.',
        content: [
          { type: 'p', text: 'A strong challenge has a clear situation, something at stake, more than one plausible approach, and consequences that move the story forward. Use difficulties to represent uncertainty, not to force a predetermined solution.' },
          { type: 'p', text: 'Consider what success changes, what failure changes, and what complications could reveal. Mix obstacles that reward different attributes, skills, equipment, relationships, and player ideas.' },
        ],
      },
      {
        title: 'Handling Complications',
        category: 'Storyteller',
        description: 'Using a Wild Die result of 1 to create interesting trouble.',
        content: [
          { type: 'p', text: 'A complication introduces a cost, danger, delay, hard choice, loss of position, damaged resource, or unexpected development. It does not automatically cause failure and should follow naturally from the action and current scene.' },
          { type: 'p', text: 'Scale complications to the stakes. Avoid consequences that invalidate a successful roll or remove a character from play without warning. The best complications create a new decision rather than simply applying punishment.' },
        ],
      },
      {
        title: 'Creating NPCs',
        category: 'Storyteller',
        description: 'Building supporting characters efficiently.',
        content: [
          { type: 'p', text: 'Most non-player characters need only a name, purpose, disposition, a few relevant attributes or skills, Health if they can be harmed, and any equipment or special abilities likely to matter. Assign detail in proportion to their importance.' },
          { type: 'table', label: 'NPC attribute and skill benchmarks', columns: ['Rating', 'Benchmark'], rows: [['1D', 'Below human average for an attribute'], ['2D', 'Human average for an attribute and many skills'], ['3D', 'Average level of training for a human'], ['4D', 'Professional level of training for a human'], ['5D', 'Above-average expertise'], ['6D', 'Best in a city or geographic area; about 1 in 100,000'], ['7D', 'Among the best in a region; about 1 in 10,000,000'], ['8D', 'Among the best in a country; about 1 in 100,000,000'], ['9D', 'One of the best on a continent; about 1 in a billion'], ['10D', 'One of the best in a hemisphere'], ['11D', 'One of the best to ever live'], ['12D+', 'Among the most legendary']] },
          { type: 'p', text: 'Use standard difficulties for incidental opposition and full opposed rolls for important rivals. Reuse simple profiles for groups of similar NPCs, then add one memorable trait or specialty when an individual needs distinction.' },
        ],
      },
      {
        title: 'Running Sessions',
        category: 'Storyteller',
        description: 'Maintaining a clear, collaborative flow of play.',
        content: [
          { type: 'p', text: 'Establish the situation, ask what the characters do, resolve only the uncertainty that matters, and describe how the world changes. Move between players regularly and summarize the scene whenever choices or stakes become unclear.' },
          { type: 'p', text: 'Prepare people, places, pressures, and possible developments rather than a single required sequence. Listen to player goals, let consequences persist, take breaks when needed, and end with enough time to award experience and record important changes.' },
        ],
      },
      {
        title: 'Difficulty Reference',
        category: 'Quick Glance',
        description: 'Standard target numbers at a glance.',
        content: [
          { type: 'table', label: 'Difficulty summary', columns: ['Level', 'Target'], rows: [['Automatic', '0'], ['Very Easy', '1-5'], ['Easy', '6-10'], ['Moderate', '11-15'], ['Difficult', '16-20'], ['Very Difficult', '21-25'], ['Heroic', '26-30'], ['Legendary', '31+']] },
        ],
      },
      {
        title: 'Modifier Reference',
        category: 'Quick Glance',
        description: 'Advantage and disadvantage at a glance.',
        content: [
          { type: 'table', label: 'Modifier summary', columns: ['Degree', 'Advantage', 'Disadvantage'], rows: [['Slight', '+1 to +5', '-1 to -5'], ['Significant', '+6 to +10', '-6 to -10'], ['Decisive', '+11 to +15', '-11 to -15'], ['Overwhelming', '+16 or more', '-16 or more']] },
        ],
      },
      {
        title: 'Common Actions',
        category: 'Quick Glance',
        description: 'The basic sequence for common checks.',
        content: [
          { type: 'list', items: [
            { label: 'Standard Check', text: 'Choose a skill or attribute, include one Wild Die, roll, add pips and modifiers, and meet or exceed the difficulty.' },
            { label: 'Opposed Check', text: 'Both sides roll appropriate traits; the higher total prevails.' },
            { label: 'Untrained Check', text: 'Roll the governing attribute. The Storyteller may apply disadvantage or prohibit the attempt.' },
            { label: 'Spend Meta Dice', text: 'Spend 1 to add +1D or 2 to double the final roll result. Healing rolls cannot be doubled.' },
          ] },
        ],
      },
      {
        title: 'Conditions',
        category: 'Quick Glance',
        description: 'Common conditions and their principal effects.',
        content: [
          { type: 'table', label: 'Condition reference', columns: ['Condition', 'Summary'], rows: [['Bruised', '81-99% Health; no penalty'], ['Stunned', '60-80% Health; -1D to remaining actions in the current round'], ['Wounded', '40-59% Health; -1D to all actions'], ['Severely Wounded', '20-39% Health; -2D to all actions'], ['Incapacitated', '10-19% Health; unconscious until stabilized, then awake at -2D'], ['Mortally Wounded', '1-9% Health; unconscious and dying'], ['Grappled', 'Cannot move away; disadvantage on Dexterity checks and attacks against others'], ['Entangled', 'Cannot move freely; caught limbs or items cannot attack'], ['Prone', 'Cannot attack, crawls at half Move, and requires an action to stand'], ['Unconscious', 'Cannot act or actively defend'], ['Companion', 'An allied character assigned to a player during combat']] },
          { type: 'p', text: 'Apply the full rule that caused a condition when more detail is needed. Health-condition penalties are not cumulative; use only the current condition’s penalty.' },
        ],
      },
      {
        title: 'Glossary',
        category: 'Quick Glance',
        description: 'Essential D6V terminology.',
        content: [
          { type: 'list', items: [
            { label: 'D', text: 'A standard six-sided die.' },
            { label: 'Pip', text: 'A +1 bonus; three pips equal one die.' },
            { label: 'Wild Die', text: 'The one die in a pool that can cause a critical or complication.' },
            { label: 'Difficulty', text: 'The target number a check must meet or exceed.' },
            { label: 'Result Points', text: 'The difference between a roll and its difficulty, used only as a narrative guide.' },
            { label: 'Storyteller', text: 'The participant who presents the world, portrays NPCs, and adjudicates the rules.' },
          ] },
        ],
      },
      {
        title: 'Other Quick References',
        category: 'Quick Glance',
        description: 'Frequently needed limits and conversions.',
        content: [
          { type: 'list', items: [
            { label: 'Pip Conversion', text: '+3 pips becomes +1D.' },
            { label: 'Starting Meta Dice', text: '2 available, with a normal maximum of 5.' },
            { label: 'Skill Advancement', text: '+1 pip costs Experience Points equal to the number before the D.' },
            { label: 'Specialization Advancement', text: '+1 pip costs half the governing skill’s normal cost, rounded up.' },
            { label: 'Attribute Advancement', text: '+1 pip costs 10 times the number before the D.' },
            { label: 'Health Advancement', text: '+1 maximum Health costs 5 Experience Points, with no fixed limit.' },
            { label: 'Paranormal Skill Advancement', text: 'Calculate the normal skill cost, then double it.' },
            { label: 'Starting Health', text: 'Roll Strength and add 20.' },
          ] },
        ],
      },
    ],
  },
  {
    id: 'examples',
    label: 'Examples',
    rules: [
      {
        title: 'Complete Combat Round',
        category: 'Combat',
        description: 'Multiple actions, Active Defense, armour, damage resistance, and a Health threshold in one example.',
        content: [
          { type: 'p', text: 'Mira faces two raiders in a ruined gatehouse. Mira has Swords 4D+1, Dexterity 4D, Strength 3D, 30 maximum Health, and padded armour that grants +1D resistance. Her Dexterity gives her a +1 Defense Bonus. Each raider has Axes 4D, Dodge 3D, Strength 3D, 30 maximum Health, and hide armour that grants +2 resistance. Their Defense Bonus is +0.' },
          { type: 'p', text: 'Mira’s longsword deals Strength Damage +2D+2. Her Strength Damage is 2D, so she rolls 4D+2 damage. A raider’s battle axe deals Strength Damage +3D, so each raider rolls 5D damage.' },
          { type: 'subheading', text: '1. Initiative and Declarations' },
          { type: 'p', text: 'Everyone rolls Initiative for the round. Mira acts first. She declares two actions: one attack and one wait action that she can use later in the round. Two actions impose −1D on both actions, so her sword attack is reduced from 4D+1 to 3D+1.' },
          { type: 'subheading', text: '2. Attack and Active Defense' },
          { type: 'p', text: 'Mira attacks the first raider. The longsword has Moderate difficulty, and the Storyteller chooses 13 from the Moderate range for this exchange.' },
          { type: 'p', text: 'The raider reacts with Active Defense. He had planned one attack, so adding the defense gives him two actions and imposes −1D on the defense and his later attack. He rolls Dodge at 2D and gets 12. Adding his +0 Defense Bonus leaves the result at 12. Active Defense replaces the weapon difficulty even though it is lower, and 12 becomes the difficulty for every relevant attack against that raider for the rest of the round.' },
          { type: 'p', text: 'Mira rolls 3D+1. Her Wild Die rolls 6 and then 3, producing a final attack total of 19. The attack exceeds difficulty 12 and hits.' },
          { type: 'subheading', text: '3. Damage, Armour, and Health' },
          { type: 'p', text: 'Mira rolls 4D+2 damage and gets 17. The raider rolls Strength 3D plus +2 from hide armour and gets 12. He loses 5 Health, falling from 30 to 25. He has about 83% of his maximum Health remaining and is Bruised, which causes no penalty.' },
          { type: 'subheading', text: '4. Waiting to Defend' },
          { type: 'p', text: 'The wounded raider takes his turn and attacks Mira. Because his earlier reaction gave him two actions, his Axes pool is reduced from 4D to 3D. Mira spends her waiting action to actively defend before the attack is resolved. She rolls Swords at 3D+1 because of her own two-action penalty, then adds her +1 Defense Bonus for a final defense result of 15.' },
          { type: 'p', text: 'The raider rolls 14 and misses. Mira’s defense result of 15 now applies against every relevant attack targeting her for the remainder of the round; she does not roll again when the second raider attacks.' },
          { type: 'subheading', text: '5. A Health Threshold' },
          { type: 'p', text: 'The second raider attacks and rolls 16, beating Mira’s active-defense difficulty of 15. He rolls 5D damage for a total of 20. Mira rolls Strength 3D plus +1D from padded armour and gets 13, so she loses 7 Health and falls from 30 to 23.' },
          { type: 'p', text: 'Mira has about 77% of her maximum Health remaining and becomes Stunned. She suffers −1D on any actions she still has during the round. Her declared attack and wait action have both been spent, so the round ends without another roll from her.' },
        ],
      },
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
const categories = computed(() => activeSystem.value.categories || [...new Set(activeSystem.value.rules.map((rule) => rule.category))])
const isSearchMode = computed(() => activeCategory.value === '')

function ruleSearchText(rule) {
  const contentText = rule.content?.flatMap((block) => [
    block.text,
    block.speaker,
    ...(block.items?.flatMap((item) => [item.label, item.text]) || []),
    ...(block.columns || []),
    ...(block.rows?.flat() || []),
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

    <aside class="mt-5 border border-amber-300/30 bg-amber-300/[0.06] px-4 py-3 text-sm leading-6 text-amber-50/90 shadow-[inset_3px_0_0_rgba(252,211,77,0.65)]" aria-label="Rules playtest notice">
      <strong class="font-semibold text-amber-100">Active playtest:</strong>
      D6V is still being refined. Experience awards, advancement costs, and other numerical rates are actively being tested and may change as playtesting continues.
    </aside>

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
          {{ isSearchMode ? 'No rules match the current search and category.' : 'Rules for this category have not been added yet.' }}
        </p>
      </div>
    </div>
  </section>
</template>
