<script setup>
import { computed, ref } from 'vue'

const metaDiceRule = {
  title: 'Meta Dice',
  introduction: [
    {
      segments: [
        { text: 'D6V uses a metacurrency called ' },
        { text: 'Meta Dice', strong: true },
        { text: '. A player may spend one Meta Die after seeing the result of a roll, allowing anyone in the scene to push beyond their normal limits.' },
      ],
    },
  ],
  conceptsTitle: 'Spending Meta Dice',
  concepts: [
    {
      name: 'Boost the Result',
      description: 'Spend one Meta Die to roll one additional ordinary die and add it to the existing result. This additional die is not a Wild Die.',
    },
    {
      name: 'Reroll the Pool',
      description: 'Spend one Meta Die to reroll the entire original pool, including its Wild Die, with the same modifiers. The new result must be accepted.',
    },
  ],
  relationship: [
    {
      callout: true,
      segments: [
        { text: 'Only one Meta Die may be spent on a roll. Decide whether to spend it after the original roll has been completely resolved and its result is known.' },
      ],
    },
    {
      segments: [
        { text: 'Meta Dice belong to the player rather than any one character. Every player begins with two and may hold a maximum of five. A player may spend a Meta Die on their own roll or on another player character, Companion, or NPC’s roll. The Storyteller decides when to award them; an impressive, impactful, creative, or story-serving action is a good reason for an award.' },
      ],
    },
  ],
}

const systems = [
  {
    id: 'core',
    label: 'CORE',
    categories: [
      'Getting Started',
      'Fundamentals',
      'Character',
      'Equipment',
      'Combat',
      'Vehicles & Mounts',
      'Resonance',
      'Storytelling',
      'Examples',
    ],
    rules: [
      {
        id: 'system-overview',
        category: 'Getting Started',
        title: 'System Overview',
        introduction: [
          {
            segments: [
              { text: 'D6: Variance is a collaborative tabletop roleplaying game. Most participants are players, each portraying a character who lives in the game world. One participant serves as the ' },
              { text: 'Storyteller', strong: true },
              { text: ', describing the world, presenting challenges, portraying its inhabitants, and making rulings when the outcome of an action is uncertain.' },
            ],
          },
          {
            segments: [
              { text: 'Together, the player characters form a ' },
              { text: 'Party', strong: true },
              { text: '. The Party gives the characters a reason to act together: they may share a mission, confront a common threat, pursue the same mystery, or simply depend on one another to survive. Whatever its purpose, the Party is the center of play, and its decisions move the story forward.' },
            ],
          },
          {
            segments: [
              { text: 'Play unfolds as a conversation. The Storyteller establishes a situation, the players describe what their characters do, and the rules determine the outcome whenever success is uncertain or failure would be meaningful. The Dice introduce variance, but the choices made by the players and Storyteller determine what those results mean for the story.' },
            ],
          },
        ],
      },
      {
        id: 'roll-procedure',
        category: 'Getting Started',
        title: 'Roll Procedure',
        introduction: [
          {
            segments: [
              { text: 'Use the following procedure whenever the rules call for a check. The ' },
              { text: 'Storyteller', strong: true },
              { text: ' makes the final decision about which Attribute and Descriptor apply, though players are encouraged to explain why one of their Descriptors is relevant.' },
            ],
          },
        ],
        steps: [
          { title: 'Choose the Attribute', description: 'Determine the Attribute that best represents the character’s approach.' },
          { title: 'Choose One Descriptor', description: 'If an Edge or Flaw applies, roll that Descriptor’s complete dice pool instead of the Attribute. An Edge records an improvement over its linked Attribute, while a Flaw records a degraded pool. If no Descriptor applies, roll the Attribute.' },
          { title: 'Apply Modifiers', description: 'Apply injury penalties, multiple-action penalties, assistance, and situational Advantage or Disadvantage.' },
          { title: 'Designate the Wild Die', description: 'Replace one ordinary die in the pool with the Wild Die. A pool can never be reduced below 1D, and that final die is the Wild Die.' },
          { title: 'Roll the Pool', description: 'Roll the dice, resolve the Wild Die, and add or subtract any Pips. After seeing the completed result, decide whether to spend one Meta Die.' },
          { title: 'Determine the Outcome', description: 'Compare the final result with the Difficulty or opposing total and determine the Degree of Outcome.' },
        ],
      },
      {
        id: 'getting-started-characters',
        category: 'Getting Started',
        title: 'Characters',
        introduction: [
          {
            segments: [
              { text: 'Each player in D6V takes control of a player character—or, in some games, more than one. These characters are individuals living within the game world and the protagonists of the shared story. Their histories, personalities, relationships, and goals give them detail, while two types of game traits describe what they are capable of doing.' },
            ],
          },
        ],
        conceptsTitle: 'Character Traits',
        concepts: [
          {
            name: 'Attributes',
            description: 'Represent a character’s innate physical, mental, and social capabilities.',
          },
          {
            name: 'Descriptors',
            description: 'Represent a character’s background, training, practiced expertise, or defining circumstances. Each Descriptor records a complete dice pool that is rolled instead of its linked Attribute when relevant.',
          },
        ],
      },
      {
        id: 'getting-started-experience',
        category: 'Getting Started',
        title: 'Experience',
        introduction: [
          {
            segments: [
              { text: 'Characters in D6V earn ' },
              { text: 'Experience Points', strong: true },
              { text: ' through play. The Storyteller generally awards Experience at the end of each session, reflecting the Party’s accomplishments, discoveries, setbacks, and progress. The Storyteller may also award Experience during a session for an especially creative decision, memorable contribution, or choice that meaningfully serves the narrative.' },
            ],
          },
          {
            segments: [
              { text: 'Players may allocate earned Experience Points between sessions to improve their characters. Once an Experience Point has been allocated, it normally cannot be reassigned. Any exception requires the Storyteller’s approval.' },
            ],
          },
        ],
      },
      {
        id: 'getting-started-meta-dice',
        category: 'Getting Started',
        ...metaDiceRule,
      },
      {
        id: 'example-of-play',
        category: 'Getting Started',
        title: 'Example of Play',
        introduction: [
          {
            segments: [
              { text: 'The Party’s ship has pulled alongside an imperial frigate during a storm. Mara, a pirate captain, wants to seize a hanging rope and swing across the gap before the ships drift apart.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'At the Table',
            quotes: [
              { speaker: 'Mara’s player', text: '“I grab the loose rigging, run along the rail, and swing onto the frigate’s deck.”' },
              { speaker: 'Storyteller', text: '“The decks are pitching and the gap is widening. Make a Dexterity check.”' },
              { speaker: 'Mara’s player', text: '“Could I use my Pirate Captain Descriptor? Mara has spent years moving through ship rigging.”' },
              { speaker: 'Storyteller', text: '“That fits. Roll Pirate Captain instead of your Dexterity against a Difficulty of 15.”' },
            ],
          },
          {
            title: 'Resolving the Check',
            paragraphs: [
              'Mara has Dexterity 3D and Pirate Captain 4D+1. Because Pirate Captain applies, its complete 4D+1 pool is rolled instead of Dexterity. Her player rolls three ordinary Dice and one visually distinct Wild Die. The results are 2, 3, 4, and a 6 on the Wild Die. Because the Wild Die produced the 6, it explodes; she rolls it again and gets another 4. After adding the Dice and her +1 Pip, the final result is 20. If an ordinary die had rolled the 6 instead, it would not have been rerolled.',
            ],
          },
          {
            title: 'Outcome',
            quotes: [
              { speaker: 'Storyteller', text: '“Mara swings through the rain and lands hard on the frigate’s rail. An officer turns in surprise—you made it across, but now you are face-to-face with the enemy crew.”' },
            ],
            paragraphs: [
              'The roll determined whether Mara crossed the gap. The Storyteller then used the successful result to move the scene forward and present the Party with a new situation.',
            ],
          },
        ],
      },
      {
        id: 'dice-and-pips',
        category: 'Fundamentals',
        title: 'Dice & Pips',
        introduction: [
          {
            segments: [
              { text: 'D6V measures capabilities with ratings made from ' },
              { text: 'Dice', strong: true },
              { text: ' and ' },
              { text: 'Pips', strong: true },
              { text: '. Dice create the variable portion of a roll, while Pips provide a small, consistent adjustment to its final result.' },
            ],
          },
          {
            segments: [
              { text: 'A rating is written as xD±y. The value before ' },
              { text: 'D', strong: true },
              { text: ' is the number of standard six-sided dice rolled. The value after the plus or minus sign is the number of Pips added to or subtracted from the total.' },
            ],
          },
        ],
        concepts: [
          {
            name: 'Dice',
            description: 'Dice are standard six-sided dice. Roll the number shown before D and add their results together. A rating of 3D, for example, rolls three dice.',
          },
          {
            name: 'Pips',
            description: 'Pips are fixed modifiers applied after the dice are totaled. Each positive Pip adds 1 to the result, and each negative Pip subtracts 1.',
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Example: ', strong: true },
              { text: 'For a 3D+2 roll, roll three six-sided dice, add their results, then add 2. If the dice total 12, the final result is 14. For a 4D−1 roll, roll four dice, total them, then subtract 1.' },
            ],
          },
          {
            segments: [
              { text: 'Dice and Pips modify different parts of the same rating. An effect that grants ' },
              { text: '+1D', strong: true },
              { text: ' adds another die before the roll; an effect that grants ' },
              { text: '+1', strong: true },
              { text: ' adds one Pip after the dice are totaled. Penalties work the same way in reverse.' },
            ],
          },
          {
            segments: [
              { text: 'When increasing or decreasing a rating, three Pips convert to one full die. Permanent ratings are therefore normally written with no more than +2 Pips. Increasing ' },
              { text: '2D+2', strong: true },
              { text: ' by one Pip therefore produces ' },
              { text: '3D', strong: true },
              { text: '.' },
            ],
          },
        ],
      },
      {
        id: 'core-resolution',
        category: 'Fundamentals',
        title: 'Core Resolution',
        introduction: [
          {
            segments: [
              { text: 'Whenever a character attempts a non-trivial action whose outcome is uncertain and narratively meaningful, the ' },
              { text: 'Storyteller', strong: true },
              { text: ' assigns the task a ' },
              { text: 'Difficulty', strong: true },
              { text: ' expressed as a target number (TN).' },
            ],
          },
          {
            segments: [
              { text: 'The player rolls one relevant ' },
              { text: 'Descriptor', strong: true },
              { text: ' as a complete dice pool, or the linked ' },
              { text: 'Attribute', strong: true },
              { text: ' when no Descriptor applies. Total the result and compare it with the Difficulty. Meeting or exceeding the target succeeds; rolling below it fails.' },
            ],
          },
          {
            segments: [
              { text: 'The result is not limited to simple success or failure. The amount by which the roll exceeds or misses the Difficulty determines the narrative outcome and whether the action introduces an added benefit, compromise, or complication.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Difficulty Benchmarks',
            headers: ['Difficulty', 'TN'],
            rows: [
              ['Very Easy', '5'],
              ['Easy', '8'],
              ['Standard', '11'],
              ['Challenging', '14'],
              ['Hard', '17'],
              ['Very Hard', '20'],
              ['Extreme', '23+'],
            ],
          },
          {
            title: 'Degree of Outcome',
            headers: ['Difference from Difficulty', 'Outcome'],
            rows: [
              ['6+ below', 'No, and…'],
              ['3–5 below', 'No'],
              ['1–2 below', 'No, but…'],
              ['0–2 above', 'Yes, but…'],
              ['3–5 above', 'Yes'],
              ['6+ above', 'Yes, and…'],
            ],
          },
        ],
      },
      {
        id: 'wild-die',
        category: 'Fundamentals',
        title: 'Wild Die',
        introduction: [
          {
            segments: [
              { text: 'One die in every dice pool is designated as the ' },
              { text: 'Wild Die', strong: true },
              { text: ' before the roll. It is rolled with the rest of the pool and can produce exceptional or reduced results. A pool can never be reduced below 1D; when only one die remains, it is the Wild Die.' },
            ],
          },
        ],
        steps: [
          {
            title: 'Exploding 6',
            description: 'When the Wild Die rolls a 6, add the 6 to the result and roll the Wild Die again. Each additional 6 is also added and causes another roll, so the die can continue exploding until it produces a different number.',
          },
          {
            title: 'Wild 1',
            description: 'When the Wild Die rolls a 1, remove that result and the highest other die from the total. If the Wild Die is the only die in the pool, its result is 0 before Pips are applied. Rolling a 1 removes dice only and does not automatically create a narrative complication.',
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'If the Wild Die rolls a 1 after one or more exploding 6s, remove the 1 and the highest other die result already in the roll, including an earlier exploding result when it is the highest. Initiative and random-duration rolls use the Wild Die and may explode normally.' },
            ],
          },
        ],
      },
      {
        id: 'situational-advantages',
        category: 'Fundamentals',
        title: 'Situational Advantages',
        introduction: [
          {
            segments: [
              { text: 'The Storyteller may adjust a dice pool when the immediate circumstances make an action meaningfully easier or harder. These adjustments reflect the situation surrounding the action rather than the character’s permanent capabilities.' },
            ],
          },
        ],
        concepts: [
          { name: 'Slight Advantage: +2', description: 'Add 2 Pips when circumstances provide a small but meaningful benefit.' },
          { name: 'Standard Advantage: +1D', description: 'Add one die when circumstances provide a clear and substantial benefit.' },
          { name: 'Significant Advantage: +2D', description: 'Add two dice when circumstances provide an exceptional benefit.' },
          { name: 'Slight Disadvantage: −2', description: 'Subtract 2 Pips when circumstances create a small but meaningful hindrance.' },
          { name: 'Standard Disadvantage: −1D', description: 'Remove one die when circumstances create a clear and substantial hindrance.' },
          { name: 'Significant Disadvantage: −2D', description: 'Remove two dice when circumstances create an exceptional hindrance.' },
        ],
        conceptsTitle: 'Levels of Advantage & Disadvantage',
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Advantage and Disadvantage may stack without a fixed limit, but the Storyteller should keep the combined modifier reasonable for the circumstances. Opposing modifiers cancel normally. No combination of penalties can reduce a pool below 1D, which is always the Wild Die.' },
            ],
          },
        ],
      },
      {
        category: 'Fundamentals',
        ...metaDiceRule,
        id: 'fundamentals-meta-dice',
      },
      {
        id: 'opposed-checks',
        category: 'Fundamentals',
        title: 'Opposed Checks',
        introduction: [
          {
            segments: [
              { text: 'Use an ' },
              { text: 'Opposed Check', strong: true },
              { text: ' when one character’s action is directly resisted by another character. Each participant rolls the complete pool of the Descriptor that best represents their approach, or the relevant Attribute when no Descriptor applies.' },
            ],
          },
          {
            segments: [
              { text: 'The higher total wins the contest. Neither participant compares their result with a fixed Difficulty.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Ties: ', strong: true },
              { text: 'If the totals are equal, the defender or the existing status quo wins. The acting character has not overcome the resistance.' },
            ],
          },
        ],
      },
      {
        id: 'stealth-perception-and-investigation',
        category: 'Fundamentals',
        title: 'Stealth, Perception & Investigation',
        introduction: [
          {
            segments: [
              { text: 'Hiding and searching use different forms of resolution depending on whether another character is actively opposing the attempt.' },
            ],
          },
        ],
        conceptsTitle: 'Resolving Concealment',
        concepts: [
          {
            name: 'Active Hiding',
            description: 'When a character actively hides from another character, roll a relevant stealth Descriptor instead of Dexterity against a relevant awareness Descriptor instead of Intelligence. If either character has no applicable Descriptor, that character rolls the corresponding Attribute.',
          },
          {
            name: 'Groups and Observers',
            description: 'Each member of a group attempting to remain hidden rolls separately. Each observer also searches separately when their individual awareness matters.',
          },
          {
            name: 'Searching for Objects',
            description: 'Searching for a concealed object, clue, compartment, or other thing that is not actively hiding normally uses one relevant Investigation Descriptor as a complete pool, or Intelligence when no Descriptor applies, against a Difficulty chosen by the Storyteller.',
          },
          {
            name: 'Actively Concealed Objects',
            description: 'If a character deliberately concealed the object, the search may instead oppose the check originally used to hide it.',
          },
        ],
      },
      {
        id: 'social-checks',
        category: 'Fundamentals',
        title: 'Social Checks',
        introduction: [
          {
            segments: [
              { text: 'When a character attempts to persuade, deceive, intimidate, inspire, or understand another person and the outcome is uncertain, roll one relevant social Descriptor as a complete pool, or ' },
              { text: 'Social', strong: true },
              { text: ' when no Descriptor applies. Resolve active resistance as an Opposed Check; use a fixed Difficulty when the opposition is incidental.' },
            ],
          },
          {
            segments: [
              { text: 'A successful Social Check changes only what the target believes, reveals, or is willing to consider within the reasonable limits of the approach and circumstances.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Social Checks are not mind control. ', strong: true },
              { text: 'They cannot force a character to knowingly kill themselves, abandon defining loyalties, or perform an action they would never consider without extraordinary leverage or a specific supernatural effect.' },
            ],
          },
          {
            segments: [
              { text: 'Social Checks against player characters provide information, pressure, or incentives, but the affected player normally retains final authority over their character’s decisions.' },
            ],
          },
        ],
      },
      {
        id: 'assisting-a-party-member',
        category: 'Fundamentals',
        title: 'Assisting a Party Member',
        introduction: [
          {
            segments: [
              { text: 'A character may spend an Action to assist a party member with a task when they can describe a practical way their effort helps. The assistant must be close enough, have the necessary time and tools, and be capable of attempting the task themselves.' },
            ],
          },
          {
            segments: [
              { text: 'The assistant makes an appropriate check against a Difficulty chosen by the Storyteller, usually one step easier than the lead character’s task.' },
            ],
          },
        ],
        conceptsTitle: 'Assistance Results',
        concepts: [
          {
            name: 'Success: +1D',
            description: 'On a successful assistance check, the lead character adds +1D to their check.',
          },
          {
            name: 'Yes, and…: Up to +1D+1',
            description: 'A Yes, and result on the assistant’s roll may increase the bonus to +1D+1 at the Storyteller’s discretion.',
          },
          {
            name: 'Failure',
            description: 'A failed assistance check grants no bonus and may introduce an unforeseen consequence.',
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'A character can normally benefit from only one assistant. ', strong: true },
              { text: 'The Storyteller may allow additional helpers when the task genuinely supports them, but should resolve large group efforts as a single coordinated check rather than stacking unlimited dice.' },
            ],
          },
        ],
      },
      {
        id: 'companions',
        category: 'Fundamentals',
        title: 'Companions',
        introduction: [
          {
            segments: [
              { text: 'A ' },
              { text: 'Companion', strong: true },
              { text: ' is an NPC, pet, construct, hireling, or other allied character assigned to a player. During combat, that player controls the Companion’s movement and Actions, rolls its checks, tracks its Health and resources, and makes routine tactical decisions on its behalf.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Independent Characters',
            paragraphs: [
              'A Companion remains an independent character rather than an extension of the player character. The Storyteller determines its personality, knowledge, loyalties, and behaviour outside combat.',
              'The Storyteller may temporarily resume control when the Companion’s motivations conflict with an instruction, information unknown to the player affects its behaviour, or doing so is necessary for the story.',
            ],
          },
          {
            title: 'Turns and Resources',
            paragraphs: [
              'Companions roll their own Initiative and take their own turns unless a specific ability states otherwise. They do not share Actions, Health, or other character resources with the controlling character, and they have no separate Meta Dice pool. A player may spend their own Meta Dice on a Companion’s rolls normally. When directing a Companion, a player should use only information the Companion could reasonably possess.',
            ],
          },
          {
            title: 'Assigning Control',
            paragraphs: [
              'The Storyteller assigns each Companion to a player, normally the player most closely connected to it. Control may be reassigned whenever doing so makes combat easier to manage. Temporary allied NPCs may also be distributed among the players for the duration of an encounter.',
            ],
          },
          {
            title: 'Experience and Advancement',
            paragraphs: [
              'A Companion represented by a complete player-character-style sheet may earn Experience Points and advance. The Storyteller decides its awards, approves its improvements, and may make advancement choices on its behalf.',
            ],
          },
        ],
      },
      {
        id: 'extended-tasks',
        category: 'Fundamentals',
        title: 'Extended Tasks',
        introduction: [
          {
            segments: [
              { text: 'Use an ' },
              { text: 'Extended Task', strong: true },
              { text: ' when an uncertain activity requires more time and effort than a single check can reasonably represent. The Storyteller chooses the interval between checks and requires between ' },
              { text: 'two and five successes', strong: true },
              { text: ', depending on the task’s length and complexity.' },
            ],
          },
        ],
        conceptsTitle: 'Tracking Progress',
        concepts: [
          {
            name: 'Success',
            description: 'Each successful check adds one success toward completing the task.',
          },
          {
            name: 'Failure',
            description: 'A failed check adds no progress and introduces an appropriate delay, cost, or other consequence.',
          },
          {
            name: 'Completion',
            description: 'The task ends when the required successes are reached or circumstances make continuing impossible.',
          },
        ],
        detailSections: [
          {
            title: 'Choosing an Interval',
            paragraphs: [
              'The interval might be one Round during an urgent technical procedure, several minutes while picking a complex lock, hours while conducting research, or days during construction.',
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Before the first check, the Storyteller should establish the interval, the required number of successes, and the likely costs of failure.' },
            ],
          },
        ],
      },
      {
        id: 'equipment-characteristics',
        category: 'Equipment',
        title: 'Equipment Characteristics',
        introduction: [
          {
            segments: [
              { text: 'Equipment ' },
              { text: 'Characteristics', strong: true },
              { text: ' are rules tags attached to individual pieces of equipment. They work similarly to character Descriptors, but describe how a particular item performs rather than something inherent to the character using it.' },
            ],
          },
          {
            segments: [
              { text: 'A Characteristic may grant a bonus, impose a penalty, provide situational Advantage or Disadvantage, or create another specific effect. Apply a Characteristic only when it is relevant to the item’s current use.' },
            ],
          },
          {
            segments: [
              { text: 'See the ' },
              { text: 'Equipment page', link: '/equipment' },
              { text: ' for the established Characteristics and their complete effects. Any additional Characteristic requires Storyteller approval and should remain similar in scope and power to an established option.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Example: ', strong: true },
              { text: 'Armour-Piercing may ignore some of the absorption normally provided by armour, while Concealable may grant a bonus when a character attempts to hide the item.' },
            ],
          },
        ],
        tags: ['Armour-Piercing', 'Accurate', 'Automatic', 'Concealable', 'Reliable', 'Rugged', 'Silent', 'Scoped', 'Lightweight', 'Unwieldy', 'Fragile', 'Incendiary', 'Damaged', 'Unreliable', 'Blunted'],
      },
      {
        id: 'economics',
        category: 'Equipment',
        title: 'Cost of Equipment',
        introduction: [
          {
            segments: [
              { text: 'D6V does not attempt to maintain individually balanced prices for hundreds of pieces of equipment. Instead, each equipment category has a ' },
              { text: 'base price range', strong: true },
              { text: ' appropriate to the setting.' },
            ],
          },
          {
            segments: [
              { text: 'Prices are expressed in dollars as a universal measurement. A setting may rename or convert this unit while keeping the relative values of equipment consistent.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Illustrative base range: ', strong: true },
              { text: 'Long Blade — $1,500–$2,000' },
            ],
          },
          {
            segments: [
              { text: 'The precise amount within a category’s range may reflect ordinary differences in manufacturer, materials, condition, location, availability, or appearance. These differences do not require separate mechanical effects.' },
            ],
          },
          {
            segments: [
              { text: 'Additional positive and negative ' },
              { text: 'Characteristics', strong: true },
              { text: ' modify an item’s base price proportionally rather than adding or subtracting a flat amount. Determine the net number of additional Characteristics by offsetting negative Characteristics against positive ones, then apply the corresponding multiplier.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Prototype Price Multipliers',
            headers: ['Net Additional Characteristics', 'Price Multiplier'],
            rows: [
              ['−2', '×0.50'],
              ['−1', '×0.75'],
              ['0', '×1.00'],
              ['+1', '×1.25'],
              ['+2', '×1.60'],
              ['+3', '×2.00'],
              ['+4', '×3.00'],
            ],
          },
        ],
        detailSections: [
          {
            title: 'Worked Pricing Examples',
            paragraphs: [
              'Using a $1,750 ordinary katana as the base item:',
            ],
            rules: [
              { name: 'Standard Katana — $1,750', description: 'Long Blade; Damage 6; no additional Characteristics. Base price ×1.00.' },
              { name: 'Fine Katana — ~$2,190', description: 'Long Blade; Damage 6; Balanced. Base price ×1.25.' },
              { name: 'Superior Katana — ~$2,800', description: 'Long Blade; Damage 6; Balanced and Armour-Piercing. Base price ×1.60.' },
            ],
          },
          {
            title: 'Negative Characteristics',
            paragraphs: [
              'A damaged or otherwise compromised item with an additional negative Characteristic may fall substantially below the standard price for its equipment category.',
            ],
          },
          {
            title: 'Reselling Equipment',
            paragraphs: [
              'Ordinary equipment in good condition normally sells for approximately 50% of its average price. A successful negotiation with a suitable buyer may raise the return to 75%. Damaged or illegal equipment, or equipment sold in urgent circumstances, may return only 25% of its average price.',
            ],
          },
        ],
      },
      {
        id: 'combat-overview',
        category: 'Combat',
        title: 'Combat Overview',
        introduction: [
          {
            segments: [
              { text: 'When violence or another fast-moving conflict begins, play is divided into ' },
              { text: 'Rounds', strong: true },
              { text: '. A Round represents a short period in which every participant has an opportunity to act.' },
            ],
          },
        ],
        steps: [
          { title: 'Determine Initiative', description: 'Everyone involved rolls Initiative using Dexterity once, at the beginning of the combat encounter.' },
          { title: 'Resolve Turns', description: 'Participants take their turns from the highest Initiative result to the lowest.' },
          { title: 'Resolve Consequences', description: 'Apply Damage, movement, conditions, and other effects as they occur.' },
          { title: 'Begin the Next Round', description: 'If the conflict continues, retain the existing Initiative order and repeat the sequence.' },
        ],
        detailSections: [
          {
            title: 'Initiative Ties',
            paragraphs: [
              'When a player character and an NPC tie, the player character acts first. When two player characters tie, the character with the higher Dexterity rating acts first. If they remain tied, the players decide their order.',
            ],
          },
          {
            title: 'Late Arrivals',
            paragraphs: [
              'A participant who enters an ongoing combat joins at the bottom of the Initiative order. Multiple late arrivals act in the order in which they entered the encounter.',
            ],
          },
          {
            title: 'Ambush & Surprise',
            paragraphs: [
              'A surprised or ambushed side does not act during the first Round. A surprised character may still choose Full Defense when they are targeted, but takes no other Actions that Round.',
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Combat ends when one side retreats, surrenders, is defeated, or can no longer meaningfully oppose the other.' },
            ],
          },
        ],
      },
      {
        id: 'actions-and-multiple-actions',
        category: 'Combat',
        title: 'Actions & Multiple Actions',
        introduction: [
          {
            segments: [
              { text: 'On their turn, a character may move up to their ' },
              { text: 'Move', strong: true },
              { text: ' value for free and perform one Action. Movement may be split before, between, or after Actions. Running counts as an Action and increases the character’s total movement allowance for the turn to twice their Move value.' },
            ],
          },
          {
            segments: [
              { text: 'A character may perform up to two ' },
              { text: 'Free Actions', strong: true },
              { text: ' during their turn. Free Actions do not increase the multiple-action penalty. Any additional activity that would normally be free requires an Action.' },
            ],
          },
          {
            segments: [
              { text: 'A character may perform more than one Action during a Round. Each Action beyond the first subtracts ' },
              { text: '−1D', strong: true },
              { text: ' from every Action roll made during that Round. Before taking their first Action or Reaction, the player declares how many Actions the character intends to use.' },
            ],
          },
          {
            segments: [
              { text: 'If a Reaction adds an undeclared Action later in the Round, recalculate the penalty for that Reaction and every subsequent Action roll. Rolls that have already been resolved are never recalculated.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Multiple-Action Penalties',
            headers: ['Total Actions', 'Penalty to Every Action'],
            rows: [['1', 'None'], ['2', '−1D'], ['3', '−2D'], ['4', '−3D'], ['5', '−4D']],
          },
        ],
        detailSections: [
          {
            title: 'Waiting',
            paragraphs: [
              'A character may use an Action to wait. The player identifies the event they are waiting for or chooses to resume later in the Initiative order. When that moment arrives, the character may spend any remaining declared Actions. Waiting still counts when calculating the Round’s multiple-action penalty.',
              'A waiting character may interrupt after another participant declares an Action but before its result is resolved, when the Storyteller agrees the character could reasonably react in time.',
            ],
          },
          {
            title: 'Common Combat Actions',
            table: {
              headers: ['Activity', 'Cost'],
              rows: [
                ['Draw or put away a weapon', 'Free'],
                ['Use a consumable', 'Free'],
                ['Pick up an accessible object', 'Free'],
                ['Interact with the environment', 'Free or one Action, as determined by the Storyteller'],
                ['Reload a weapon', 'Free, or another cost determined by the weapon'],
                ['Throw an explosive', 'One Action'],
                ['Attack an object', 'One Action'],
                ['Use an improvised weapon', 'One Attack Action'],
              ],
            },
          },
          {
            title: 'Improvised Weapons',
            paragraphs: [
              'An improvised weapon uses one relevant Descriptor as a complete pool, or an appropriate Attribute when no Descriptor applies, as chosen by the Storyteller. It normally deals the improvised Attack Damage. Particularly dangerous, heavy, fragile, or unsuitable objects may modify the Attack or Damage.',
            ],
          },
          {
            title: 'Attacking Objects',
            paragraphs: [
              'Objects do not track Health individually. The Storyteller decides whether an attack can realistically damage an object by comparing the material, construction, weapon, and intended result. Punching a steel door cannot damage it and requires no roll, while striking it with a pickaxe may damage it when the Storyteller determines the attempt is plausible.',
            ],
          },
          {
            title: 'Leaving Close Combat',
            paragraphs: [
              'When a character willingly flees or moves away from an enemy who can reach them in close combat, that enemy may immediately make one Attack against the departing character. This Attack counts as an Action for the enemy’s current Round and increases their multiple-action penalty normally. An enemy unable or unwilling to accept the added Action makes no Attack.',
            ],
          },
        ],
      },
      {
        id: 'actions-and-reactions-procedure',
        category: 'Combat',
        title: 'Actions & Reactions Procedure',
        introduction: [
          {
            segments: [
              { text: 'An ' },
              { text: 'Action', strong: true },
              { text: ' is a significant activity performed on a character’s turn. A ' },
              { text: 'Reaction', strong: true },
              { text: ' is an Action performed outside the character’s turn in response to a specific event the character can perceive. Actions and Reactions both count toward the character’s multiple-action penalty for the Round.' },
            ],
          },
        ],
        steps: [
          { title: 'Declare the Total', description: 'Before taking their first Action or Reaction in a Round, declare the total number of Actions the character expects to perform during that Round.' },
          { title: 'Calculate the Penalty', description: 'Each Action beyond the first applies −1D to every declared Action roll for the Round.' },
          { title: 'Resolve Actions', description: 'Take the declared Actions on the character’s turn or when an appropriate Reaction is triggered.' },
          { title: 'Add an Undeclared Reaction', description: 'An undeclared Reaction increases the character’s Action total. Recalculate the penalty for that Reaction and every later roll, but never recalculate a roll that has already been resolved.' },
          { title: 'Resolve Unused Actions', description: 'Taking fewer Actions than declared does not refund or reduce penalties already applied earlier in the Round.' },
        ],
        conceptsTitle: 'Reaction Limits & Special Cases',
        concepts: [
          { name: 'Active Defense', description: 'Active Defense is a Reaction and counts as one Action when determining the Round’s multiple-action penalty.' },
          { name: 'One Reaction per Trigger', description: 'A character may take only one Reaction in response to a single triggering event.' },
          { name: 'Awareness & Ability', description: 'A Reaction must be physically and narratively possible. A character who is unaware, unconscious, paralyzed, or otherwise incapable cannot react.' },
          { name: 'Free Actions', description: 'A character’s two Free Actions normally occur only during their turn and cannot be used as Reactions unless a specific rule permits it.' },
          { name: 'Full Defense', description: 'Full Defense replaces the character’s entire turn. Once chosen, the character cannot perform other Actions that Round, but may still use up to two Free Actions when the circumstances allow.' },
          { name: 'Waiting', description: 'Waiting costs one Action. State the trigger in advance; when it occurs, the waiting Action resolves after the triggering Action is declared but before its result is resolved.' },
        ],
      },
      {
        id: 'making-an-attack',
        category: 'Combat',
        title: 'Making an Attack',
        introduction: [
          {
            segments: [
              { text: 'To Attack, roll one relevant Descriptor associated with the weapon or technique as a complete pool. When no Descriptor applies, melee Attacks use ' },
              { text: 'Strength', strong: true },
              { text: ' and ranged Attacks use ' },
              { text: 'Dexterity', strong: true },
              { text: '.' },
            ],
          },
          {
            segments: [
              { text: 'A melee weapon records a single Difficulty. A ranged weapon records Short, Medium, and Long range bands; use the Difficulty assigned to the target’s current range. The Attack succeeds when its result meets or exceeds the applicable Difficulty.' },
            ],
          },
          {
            segments: [
              { text: 'If the target actively defends, the defender rolls one relevant defensive Descriptor as a complete pool, or Dexterity when no Descriptor applies, and adds their Defense Bonus. That result replaces the weapon’s normal Difficulty, even when the new value is lower, and applies to every relevant Attack against that defender for the remainder of the Round.' },
            ],
          },
          {
            segments: [
              { text: 'A normal unarmed Attack has Easy Difficulty when the opponent is unarmed and Standard Difficulty when the opponent holds a weapon they can use in close combat. Active Defense replaces this Difficulty normally.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Defense Bonus: ', strong: true },
              { text: 'A character gains +1 Defense Bonus for every two full Dexterity dice above 2D, rounded down. The character sheet calculates this value automatically. Add it whenever a rule calls for Active or Full Defense.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Firing into Close Combat',
            paragraphs: [
              'A ranged Attack made against a target engaged in close combat suffers no inherent penalty. On a “No, and…” result, a typical consequence is for the Attack’s Damage to strike an ally or another unintended nearby target chosen by the Storyteller.',
            ],
          },
        ],
      },
      {
        id: 'active-defense',
        category: 'Combat',
        title: 'Active Defense',
        introduction: [
          {
            segments: [
              { text: 'When first targeted by an Attack during a Round, a character may use a Reaction to actively defend. Roll one relevant defensive Descriptor as a complete pool, or the character’s ' },
              { text: 'Dexterity', strong: true },
              { text: ' when no Descriptor applies, then add the character’s Defense Bonus.' },
            ],
          },
        ],
        conceptsTitle: 'Defensive Options',
        concepts: [
          {
            name: 'Active Defense',
            description: 'The result becomes the Difficulty for every relevant Attack against the character for the remainder of the Round. Use it even when it is lower than the weapon’s normal Difficulty.',
          },
          {
            name: 'Full Defense',
            description: 'A character may forgo their entire turn to concentrate on defense. Roll one relevant defensive Descriptor as a complete pool, or Dexterity when no Descriptor applies, add the Defense Bonus, then add +10. This result applies until the beginning of the character’s next turn.',
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Active Defense is a gamble. ', strong: true },
              { text: 'Because the result replaces the normal Attack Difficulty even when it is lower, actively defending is not always the safest choice. Taking Cover is often more reliable when it is available.' },
            ],
          },
        ],
      },
      {
        id: 'cover',
        category: 'Combat',
        title: 'Cover',
        introduction: [
          {
            segments: [
              { text: 'When an obstacle provides meaningful protection between an attacker and a target, the target has ' },
              { text: 'Cover', strong: true },
              { text: '. Attacking a target in Cover raises the applicable Attack Difficulty by one Difficulty Band, or +3 TN.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'If the target also uses Active Defense, first replace the normal Difficulty with the Active Defense result, then add +3 TN for Cover.' },
            ],
          },
        ],
      },
      {
        id: 'weapons',
        category: 'Combat',
        title: 'Weapons',
        introduction: [
          {
            segments: [
              { text: 'Weapons use fixed ' },
              { text: 'Damage', strong: true },
              { text: ' rather than Damage rolls. The Attack roll already establishes whether the Attack succeeds, so a successful hit applies the weapon’s Damage without requiring another dice pool.' },
            ],
          },
          {
            segments: [
              { text: 'Weapon families establish baseline Damage values. See the ' },
              { text: 'Equipment page', link: '/equipment' },
              { text: ' for a broader selection of weapons and Damage options.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Basic Weapon Damage',
            headers: ['Weapon Type', 'Example Damage'],
            rows: [
              ['Unarmed', '2'],
              ['Improvised or light weapon', '3'],
              ['Short blade', '4'],
              ['One-handed weapon or long blade', '6'],
              ['Small-caliber firearm', '5–6'],
            ],
          },
          {
            title: 'Ranged Weapon Difficulties',
            headers: ['Range', 'Difficulty'],
            rows: [
              ['Point Blank', 'Very Easy'],
              ['Short', 'Easy'],
              ['Medium', 'Standard'],
              ['Long', 'Challenging'],
              ['Beyond Long', 'Hard'],
            ],
          },
        ],
        detailSections: [
          {
            title: 'Weapon Characteristics',
            paragraphs: [
              'Weapons, like other equipment, may have Characteristics that modify rolls or create positive and negative effects when relevant.',
              'Tracking ammunition is optional. When a group chooses to track it, the relevant weapon Characteristics and equipment descriptions determine capacity, reloads, and other effects.',
            ],
          },
          {
            title: 'Weapon Difficulty',
            paragraphs: [
              'Melee weapons use a fixed Difficulty. Ranged weapons list Short, Medium, and Long distances in metres. Determine the Attack’s base Difficulty from the target’s distance.',
            ],
          },
        ],
      },
      {
        id: 'armour',
        category: 'Combat',
        title: 'Armour',
        introduction: [
          {
            segments: [
              { text: 'Armour uses a fixed ' },
              { text: 'Damage Absorption', strong: true },
              { text: ' value. When a character takes a hit, subtract the armour’s Absorption from the weapon’s Damage to determine how much Health is lost.' },
            ],
          },
          {
            segments: [
              { text: 'A character can normally benefit from only one active piece of armour at a time. Multiple pieces apply only when a specific rule permits them or the Storyteller approves the combination.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Damage Taken = Weapon Damage − Armour Absorption', strong: true },
            ],
          },
        ],
        conceptsTitle: 'Example',
        concepts: [
          { name: '9mm Pistol', description: 'Damage 7' },
          { name: 'Ballistic Armour', description: 'Absorption 2' },
        ],
        detailSections: [
          {
            title: 'Result',
            paragraphs: ['7 Damage − 2 Absorption = 5 Health lost.'],
          },
        ],
      },
      {
        id: 'health-and-health-bands',
        category: 'Combat',
        title: 'Health & Health Bands',
        introduction: [
          {
            segments: [
              { text: 'Health', strong: true },
              { text: ' is expressed numerically and measures how much Damage a character can withstand. Starting Health equals ' },
              { text: '20 + one Strength roll', strong: true },
              { text: '. This Strength roll uses no Descriptor, Wild Die, or Meta Die.' },
            ],
          },
          {
            segments: [
              { text: 'A character’s current condition is determined by the percentage of their maximum Health that remains. Divide current Health by maximum Health, multiply by 100, and round down to the nearest whole percentage before consulting the Health Bands.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Health Bands',
            headers: ['Remaining Health', 'Condition'],
            rows: [['76–100%', 'Healthy'], ['51–75%', 'Shaken'], ['26–50%', 'Wounded'], ['1–25%', 'Critical'], ['0', 'Taken Out']],
          },
          {
            title: 'Health Band Consequences',
            headers: ['Band', 'Effect'],
            rows: [
              ['Healthy', 'No penalty'],
              ['Shaken', 'Narratively hurt or winded; no inherent mechanical penalty'],
              ['Wounded', '−1D on physical Actions'],
              ['Critical', '−1D broadly; severe injuries also create fictional limitations'],
              ['Taken Out', 'Removed from immediate Action; circumstances determine unconsciousness, capture, maiming, death, or another outcome'],
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Health indicates how much punishment remains; the Health Band determines what the injury means mechanically and narratively.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Taken Out player characters must be stabilized within three Rounds or risk death. ', strong: true },
              { text: 'After three Rounds, the character makes a Strength check during every subsequent Round, beginning at Very Easy Difficulty. Each successful check raises the next check by one Difficulty Band. The character dies when one of these checks fails.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Taken Out NPCs: ', strong: true },
              { text: 'The Storyteller decides whether a Taken Out NPC is dying and can be stabilized, is merely unconscious or otherwise incapacitated, or dies immediately.' },
            ],
          },
        ],
      },
      {
        id: 'stabilization-and-medicine',
        category: 'Combat',
        title: 'Stabilization & Medicine',
        introduction: [
          {
            segments: [
              { text: 'Stabilizing a ' },
              { text: 'Taken Out', strong: true },
              { text: ' character requires a relevant medical Descriptor rolled as a complete pool, or Intelligence when no Descriptor applies. A normal attempt expends a medical item and has ' },
              { text: 'Standard Difficulty', strong: true },
              { text: '. If no medical item is available, the attempt may still be made at Hard Difficulty.' },
            ],
          },
          {
            segments: [
              { text: 'Circumstances may change the Difficulty. Treating a patient in a clean hospital may make the check easier; attempting surgery in the back of a moving truck may make it harder.' },
            ],
          },
          {
            segments: [
              { text: 'On a success, the character is stabilized and stops making death checks, but their current Health does not change. On a failure, increase the Difficulty of that character’s next death check by one step.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'A Taken Out character must be stabilized before any treatment, rest, or Resonance can restore their Health.' },
            ],
          },
        ],
        tagsTitle: 'Example Medical Descriptors',
        tags: ['First Aid', 'Combat Medic', 'Surgeon', 'Veterinarian', 'Emergency Physician'],
        detailSections: [
          {
            title: 'Treatment Without an Item',
            paragraphs: [
              'A character may roll one medically relevant Descriptor as a complete pool, or Intelligence when no Descriptor applies, at Standard Difficulty to restore 3 Health to a patient without using an item. A patient can benefit from this treatment only once per day.',
            ],
          },
          {
            title: 'Using Medical Items',
            paragraphs: [
              'Any character may use a medical item on themselves or someone else by making a Standard check. Medical items have a fixed Treatment value listed in their description, which determines how much Health they can restore.',
              'The Degree of Success determines the result of treatment:',
            ],
            table: {
              headers: ['Outcome', 'Treatment Effect'],
              rows: [
                ['No, and…', 'Restore no Health. Expend the supplies and introduce an additional complication, such as worsening bleeding, contamination, additional pain, or damaged equipment.'],
                ['No', 'Restore no Health and expend the relevant medical supply.'],
                ['No, but…', 'Restore no Health, but stabilize the patient or resolve another immediate danger.'],
                ['Yes, but…', 'Restore half the item’s Treatment, rounded up, and introduce a complication. A Treatment 6 item restores 3 Health.'],
                ['Yes', 'Restore the item’s full Treatment. A Treatment 6 item restores 6 Health.'],
                ['Yes, and…', 'Restore the item’s full Treatment plus 2 additional Health.'],
              ],
            },
          },
          {
            title: 'Treatment Limits',
            paragraphs: [
              'A character can benefit from a medical item no more than twice per day. This limit is separate from the once-per-day treatment available from a medically relevant Descriptor without an item.',
            ],
          },
          {
            title: 'Rest & Recovery',
            rules: [
              { name: 'Proper Rest', description: 'Each full day of proper rest restores 25% of the character’s maximum Health.' },
              { name: 'Rest with Medical Care', description: 'A full day of proper rest outside the field with appropriate medical care restores 100% of the character’s maximum Health.' },
            ],
          },
        ],
      },
      {
        id: 'environmental-hazards',
        category: 'Combat',
        title: 'Environmental Hazards',
        introduction: [
          {
            segments: [
              { text: 'Environmental hazards use fixed Damage values based on their severity. Armour reduces this Damage only when the armour could reasonably protect against the hazard.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Hazard Severity',
            headers: ['Severity', 'Damage', 'Typical Examples'],
            rows: [
              ['Minor', '3', 'Short fall, small flame, or similar limited exposure'],
              ['Standard', '6', 'Serious fall, burning clothing, or another dangerous exposure'],
              ['Severe', '9', 'Long fall, engulfing fire, or a major hazard'],
              ['Extreme', '12', 'Inferno, major industrial accident, or devastating exposure'],
              ['Catastrophic', '15+', 'Terminal-velocity fall or similarly overwhelming force'],
            ],
          },
        ],
      },
      {
        id: 'falling',
        category: 'Combat',
        title: 'Falling',
        introduction: [
          {
            segments: [
              { text: 'A fall of three metres or less normally causes no Damage. Longer falls deal fixed Damage according to the distance fallen.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Falling Damage',
            headers: ['Distance', 'Severity', 'Damage'],
            rows: [
              ['0–3 m', 'None', '0'],
              ['4–6 m', 'Minor', '3'],
              ['7–12 m', 'Standard', '6'],
              ['13–18 m', 'Severe', '9'],
              ['19–30 m', 'Extreme', '12'],
              ['31+ m', 'Catastrophic', '15+'],
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'When a safe landing is possible, the Storyteller may allow a relevant Dexterity-based Descriptor, or Dexterity when none applies, against a Difficulty based on the landing conditions. A success reduces the fall by one severity level.' },
            ],
          },
        ],
      },
      {
        id: 'fire',
        category: 'Combat',
        title: 'Fire',
        introduction: [
          {
            segments: [
              { text: 'Fire deals Damage at the end of every Round in which the character remains exposed. A small flame deals 3 Damage, burning clothing or sustained exposure deals 6 Damage, and being engulfed by fire deals 9 Damage.' },
            ],
          },
        ],
        conceptsTitle: 'Escaping Fire',
        concepts: [
          { name: 'Ordinary Fire', description: 'Extinguishing burning clothing or escaping a small, accessible fire requires one Action when no meaningful uncertainty exists.' },
          { name: 'Difficult Fire', description: 'Controlling or escaping an intense, spreading, or inaccessible fire requires an Action and an appropriate check at a Difficulty chosen by the Storyteller.' },
          { name: 'Protection', description: 'Armour applies only when it is designed or fictionally suited to protect against fire or extreme heat.' },
        ],
      },
      {
        id: 'drowning',
        category: 'Combat',
        title: 'Drowning & Suffocation',
        introduction: [
          {
            segments: [
              { text: 'Under combat pressure, a character can function without air for a number of Rounds equal to 2 plus the number of full Dice shown in their Strength Attribute.' },
            ],
          },
          {
            segments: [
              { text: 'After this time, the character makes a Standard check during every subsequent Round using a relevant Strength-based Descriptor as a complete pool, or Strength when no Descriptor applies. Each success raises the next check by one Difficulty Band. Each failure deals 5 Damage that ignores Armour. The checks and Damage continue until the character can breathe.' },
            ],
          },
        ],
      },
      {
        id: 'poison',
        category: 'Combat',
        title: 'Poison',
        introduction: [
          {
            segments: [
              { text: 'Each poison lists a Resistance Difficulty, the interval between checks, its fixed Damage, and any additional effect. At each interval, the affected character rolls a relevant Strength-based Descriptor as a complete pool, or Strength when no Descriptor applies, against the poison’s Resistance Difficulty.' },
            ],
          },
          {
            segments: [
              { text: 'Resolve the Degree of Outcome according to the poison’s description. Damage from poison normally ignores Armour unless a specific protective effect states otherwise.' },
            ],
          },
        ],
      },
      {
        id: 'conditions',
        category: 'Combat',
        title: 'Conditions',
        introduction: [
          {
            segments: [
              { text: 'Conditions describe restrictions that apply until their cause ends or a rule removes them.' },
            ],
          },
        ],
        conceptsTitle: 'Defined Conditions',
        concepts: [
          { name: 'Unconscious', description: 'The character cannot act, move, perceive their surroundings, or actively defend. They fall Prone and awaken only when the causing effect says so, the Storyteller determines sufficient time has passed, or appropriate treatment succeeds.' },
          { name: 'Helpless', description: 'The character cannot meaningfully resist the immediate action. No Attack roll is required when the attacker has time and no uncertainty exists. A Helpless character is not necessarily unconscious.' },
          { name: 'Restrained', description: 'The character cannot move away from the restraint and suffers Significant Disadvantage on physical Actions impeded by it. Escaping requires an Action and an appropriate fixed or Opposed Check.' },
          { name: 'Paralyzed', description: 'The character cannot move, perform physical Actions, or take physical Reactions. Mental, social, or Resonance Actions remain possible only when they require no movement or speech. A paralyzed character is normally Helpless against physical Attacks.' },
        ],
      },
      {
        id: 'degrees-of-success-in-combat',
        category: 'Combat',
        title: 'Degrees of Success in Combat',
        introduction: [
          {
            segments: [
              { text: 'Combat uses the standard degrees of outcome to determine more than whether an Attack hits. The outcome may introduce an added setback, compromise, or benefit.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Combat Outcomes',
            headers: ['Outcome', 'Effect'],
            rows: [
              ['No, and…', 'The Attack fails and something significantly worsens.'],
              ['No', 'The Attack simply fails.'],
              ['No, but…', 'The Attack fails, but the attacker gains a lesser benefit.'],
              ['Yes, but…', 'The Attack deals normal Damage but generates a complication.'],
              ['Yes', 'The Attack deals normal Damage.'],
              ['Yes, and…', 'The Attack deals normal Damage and provides an additional benefit.'],
            ],
          },
        ],
        detailSections: [
          {
            title: 'Possible “Yes, and…” Benefits',
            paragraphs: [
              'The attacker normally chooses one additional benefit for a “Yes, and…” result unless a specific weapon Characteristic permits more.',
            ],
            rules: [
              { name: 'Bonus Damage', description: 'Add +2 Damage to the current hit.' },
              { name: 'Reduced Armour', description: 'Ignore 2 points of Armour Absorption for the current hit. If the target has no applicable Armour, choose another benefit.' },
            ],
            items: ['Knockdown', 'Suppression', 'Disarm', 'Improved position', 'Especially effective use of a relevant weapon Characteristic'],
          },
        ],
      },
      {
        id: 'grappling',
        category: 'Combat',
        title: 'Grappling',
        introduction: [
          {
            segments: [
              { text: 'A character may attempt to ' },
              { text: 'Grapple', strong: true },
              { text: ' an opponent with an unarmed Attack. On a success, the target becomes Grappled and the initial Attack causes no Damage.' },
            ],
          },
        ],
        conceptsTitle: 'While Grappled',
        concepts: [
          { name: 'Movement', description: 'A Grappled character cannot move away from the grappler.' },
          { name: 'Restricted Actions', description: 'The Grappled character has standard Disadvantage on Dexterity checks and on Attacks against anyone other than the grappler.' },
          { name: 'Maintaining the Grapple', description: 'The grappler must spend one Action during each of their turns to maintain the Grapple. If this Action is not spent, the target immediately breaks free and the Grapple ends.' },
          { name: 'Moving the Target', description: 'The grappler may spend one Action to move the Grappled target up to two metres.' },
          { name: 'Close Weapons', description: 'Either character may use only weapons that can reasonably be operated at extremely close range.' },
          { name: 'Release', description: 'The grappler may release the target freely at any time.' },
        ],
        detailSections: [
          {
            title: 'Escaping',
            paragraphs: [
              'Escaping requires an Action. To overpower the grappler, each participant rolls a relevant complete Descriptor pool or Strength when no Descriptor applies. To slip free, the Grappled character instead rolls a relevant Dexterity-based Descriptor or Dexterity against the grappler’s relevant Strength-based Descriptor or Strength. On a success, the Grapple ends.',
            ],
          },
          {
            title: 'Multiple Grapplers',
            paragraphs: [
              'When multiple characters Grapple the same target, designate one as the primary grappler. The primary makes all relevant Grapple rolls. Each additional participating grappler with Strength 2D or higher adds +1D to the primary grappler’s pool.',
            ],
          },
          {
            title: 'Tackle',
            paragraphs: [
              'A Tackle combines running, Grappling, and knocking the target down. The attacker must move toward the target and make an unarmed Attack with standard Disadvantage. Running and Tackling count as two Actions, so the normal multiple-action penalty also applies.',
              'On a success, the target becomes Grappled and both characters become Prone. On a failure, the Storyteller may leave the attacker Prone when their momentum carries them past the target or into an obstacle.',
            ],
          },
          {
            title: 'Special Circumstances',
            paragraphs: [
              'The Storyteller may apply Advantage, Disadvantage, or prevent a Grapple when relative size, anatomy, additional limbs, footing, or other circumstances make the attempt unusually easy, difficult, or impossible.',
            ],
          },
        ],
      },
      {
        id: 'choking',
        category: 'Combat',
        title: 'Choking',
        introduction: [
          {
            segments: [
              { text: 'A character must already have the target ' },
              { text: 'Grappled', strong: true },
              { text: ' before beginning a Choke. Starting or maintaining the Choke requires one Action and an Opposed Check using a relevant Strength-based Descriptor as a complete pool, or Strength when no Descriptor applies. That same Action also maintains the underlying Grapple; the attacker does not spend a second Action.' },
            ],
          },
          {
            segments: [
              { text: 'A successful check marks one consecutive Round of Choking. A Choke causes no direct Health Damage until after the target has fallen unconscious.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Choke Progression',
            headers: ['Consecutive Successful Rounds', 'Effect'],
            rows: [
              ['1', 'The target cannot speak clearly or perform Actions that require speech.'],
              ['2', 'The target also suffers significant Disadvantage on all Actions.'],
              ['3', 'The target falls unconscious for 10D minutes and the Choke ends.'],
            ],
          },
        ],
        detailSections: [
          {
            title: 'Escaping and Interruption',
            paragraphs: [
              'The target may attempt to escape the Grapple normally on each turn. Escaping ends the Choke. If the attacker fails a check to maintain the Choke, the consecutive-Round count resets to zero, though the underlying Grapple remains unless the target escaped.',
            ],
          },
          {
            title: 'Further Choking',
            paragraphs: [
              'If the attacker continues Choking after the target becomes unconscious, each further successful Round deals 5 Damage to the target.',
            ],
          },
          {
            title: 'Resistance and Immunity',
            paragraphs: [
              'A creature that does not breathe, has protected anatomy, or is too large or differently shaped to Choke may be resistant or immune.',
            ],
          },
        ],
      },
      {
        id: 'tripping',
        category: 'Combat',
        title: 'Tripping',
        introduction: [
          {
            segments: [
              { text: 'Make an unarmed Attack or an Attack with an appropriate melee weapon with significant ' },
              { text: 'Disadvantage', strong: true },
              { text: '. On a success, the Attack causes no Damage and the target becomes ' },
              { text: 'Prone', strong: true },
              { text: '. A creature that cannot reasonably be tripped is immune.' },
            ],
          },
        ],
      },
      {
        id: 'prone',
        category: 'Combat',
        title: 'Prone',
        introduction: [
          {
            segments: [
              { text: 'A Prone character is on the ground and subject to the following restrictions and modifiers until they stand.' },
            ],
          },
        ],
        conceptsTitle: 'Effects of Prone',
        concepts: [
          { name: 'Standing', description: 'Standing from Prone requires an Action.' },
          { name: 'Attacking', description: 'A Prone character cannot make melee Attacks but may make ranged Attacks subject to the normal modifiers for being Prone.' },
          { name: 'Close Attacks', description: 'Point Blank and Short Attacks against a Prone character gain significant Advantage.' },
          { name: 'Distant Attacks', description: 'Medium and Long ranged Attacks against a Prone character suffer significant Disadvantage.' },
          { name: 'Movement', description: 'A Prone character may crawl using free movement but covers only half their normal Move value.' },
          { name: 'Other Actions', description: 'The Storyteller may impose Disadvantage on physical Actions made from the ground.' },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'The Storyteller may ignore or adjust these effects when the character’s position does not meaningfully affect the Action or Attack.' },
            ],
          },
        ],
      },
      {
        id: 'push',
        category: 'Combat',
        title: 'Push',
        introduction: [
          {
            segments: [
              { text: 'Make a suitable melee Attack with slight ' },
              { text: 'Disadvantage', strong: true },
              { text: '. On a success, the Attack causes no Damage and moves the target approximately two metres away from the attacker.' },
            ],
          },
          {
            segments: [
              { text: 'The Storyteller may adjust the distance for relative size, Strength, footing, and circumstances. If the target is pushed from a ledge, into a hazard, or against an object, resolve that consequence normally.' },
            ],
          },
        ],
      },
      {
        id: 'disarm',
        category: 'Combat',
        title: 'Disarm',
        introduction: [
          {
            segments: [
              { text: 'Make an appropriate Attack against the held item with significant ' },
              { text: 'Disadvantage', strong: true },
              { text: '. On a success, the target drops the chosen item nearby and the Attack causes no Damage.' },
            ],
          },
          {
            segments: [
              { text: 'Two-handed grips, secured equipment, unusual anatomy, relative Strength, or a weapon designed for Disarming may change the modifier. An item that cannot reasonably be knocked or pulled free cannot be Disarmed this way.' },
            ],
          },
        ],
      },
      {
        id: 'stealth-takedowns',
        category: 'Combat',
        title: 'Stealth Takedowns (Optional Rule)',
        introduction: [
          {
            segments: [
              { text: 'A Stealth Takedown may be attempted only when the target is unaware of the attacker, the attacker can reach an appropriate position unseen, and the chosen weapon or technique could reasonably produce the intended result.' },
            ],
          },
          {
            segments: [
              { text: 'The Storyteller decides whether a target is vulnerable to a Takedown. Player characters and major opponents should normally be protected unless they are helpless or completely vulnerable.' },
            ],
          },
        ],
        steps: [
          {
            title: 'Declare the Intent',
            description: 'Before Attacking, declare whether the Takedown is intended to kill the target or knock them unconscious.',
          },
          {
            title: 'Make the Attack',
            description: 'Make a relevant Attack with standard Advantage. If the Attack hits, subtract Armour Absorption from Damage to determine the resulting Health loss.',
          },
          {
            title: 'Resolve the Takedown',
            description: 'If the Attack would remove at least 10% of the target’s maximum Health, the target is killed immediately or becomes unconscious for 10D minutes, according to the attacker’s declared intent.',
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'If the Attack would remove less than 10% of the target’s maximum Health, apply the Health loss normally and the Takedown fails. An unconscious target immediately awakens if they take Damage.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Helpless Targets',
            paragraphs: [
              'A sleeping, bound, paralyzed, or completely helpless target does not require an Attack roll.',
            ],
            rules: [
              { name: 'Automatic Success', description: 'The Attack succeeds automatically when no meaningful uncertainty exists.' },
              { name: 'Resistance', description: 'The target still uses Absorption if armour, supernatural protection, or unusual durability could matter.' },
            ],
          },
        ],
      },
      {
        id: 'vehicles-and-mounts',
        category: 'Vehicles & Mounts',
        title: 'Vehicles & Mounts',
        introduction: [
          {
            segments: [
              { text: 'Vehicles and mounts use short profiles rather than complete character sheets. A frequently used or especially complex vehicle may have its own sheet, but it needs only the statistics, weapons, crew positions, and Characteristics that matter during play.' },
            ],
          },
          {
            segments: [
              { text: 'Characters operate vehicles with their own Descriptors and Attributes. The vehicle supplies its capabilities and Handling modifier rather than a second pool of Attributes.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Routine travel requires no roll. ', strong: true },
              { text: 'Make an operation or Riding check only when the outcome is uncertain, meaningful, and affected by the operator’s control.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Vehicle and Mount Profiles',
            table: {
              headers: ['Statistic', 'Purpose'],
              rows: [
                ['Scale', 'Relative size, from a person or horse to a capital ship'],
                ['Handling', 'Agile grants +1D, Ordinary has no modifier, and Unwieldy imposes −1D'],
                ['Movement', 'Tactical Move plus any relevant travel speed or movement modes'],
                ['Structure or Health', 'Vehicles use Structure; living mounts use normal Health'],
                ['Armour', 'Fixed Damage Absorption'],
                ['Crew & Capacity', 'Required operators, passengers, cargo, or carried craft'],
                ['Weapons & Characteristics', 'Only the equipment and special rules likely to matter'],
              ],
            },
          },
          {
            title: 'Operating a Vehicle',
            paragraphs: [
              'When control is uncertain, roll a relevant complete Descriptor such as Midshipman, Cavalry Officer, or Yachter, or Dexterity when no Descriptor applies. Apply the vehicle or mount’s Handling modifier to that pool.',
              'Maintaining ordinary movement is free. A difficult manoeuvre, stunt, regaining control, or Active Defense requires one Action. Active Defense uses the operator’s modified control pool and replaces the normal Attack Difficulty as usual.',
              'A small vehicle’s operator may also fire its weapons, but an operation check and an Attack are separate Actions. If the same character does both during one turn, apply the normal multiple-action penalty.',
            ],
          },
          {
            title: 'Crewed Vehicles',
            paragraphs: [
              'Larger vehicles allow different characters to operate the helm, weapons, sensors, engineering, command, or other systems. Each crew member uses their own Actions and relevant pools, so a pilot steering the vehicle does not penalize a separate gunner’s Attack.',
              'When ordinary NPC crew operate a system, use the relevant crew pool recorded in the vehicle’s profile. If too few characters are available, one character may operate several systems by taking multiple Actions, while systems that cannot reasonably be reached or controlled remain unavailable.',
            ],
          },
          {
            title: 'Mounts',
            paragraphs: [
              'A mount remains a creature with its own Attributes, Descriptors, Health, attacks, and abilities. It provides movement while the rider uses their own Actions.',
              'Commanding a trained mount to Attack costs one of the rider’s Actions, but the mount rolls its own Attack pool. If the rider also attacks during that turn, apply the normal multiple-action penalty to both rolls.',
              'Riding checks are required only for difficult manoeuvres, frightened or unwilling mounts, remaining mounted after an impact, or similar uncertainty. An intelligent mount acting independently, such as a dragon ally, receives its own turn as an NPC or Companion.',
            ],
          },
          {
            title: 'Scale',
            table: {
              headers: ['Scale', 'Examples'],
              rows: [
                ['0 — Personal', 'Person, horse, motorcycle, small cart'],
                ['1 — Light', 'Car, wagon, large dragon, small boat, fighter craft'],
                ['2 — Heavy', 'Tank, sailing ship, airliner, small starship'],
                ['3 — Massive', 'Warship, large freighter, corvette'],
                ['4 — Capital', 'Aircraft carrier, fortress ship, capital warship, space station'],
                ['5 — Colossal', 'Artificial moon, city-sized vessel, worldship, planetary superstructure'],
              ],
            },
            paragraphs: [
              'Anything larger can remain Scale 5 because further distinctions rarely improve play. A vehicle or mount may also have an NPC Threat Tier and Role; its Threat represents its entire profile, including crew, weapons, Armour, and abilities.',
            ],
          },
          {
            title: 'Structure',
            paragraphs: [
              'Vehicles use the normal Health Band percentages, replacing Health with Structure and Taken Out with Disabled. Penalties from the Wounded and Critical Bands apply to operation and vehicle-system checks. A vehicle’s profile supplies its current and maximum Structure; it is not derived from Strength.',
              'At 0 Structure, the vehicle cannot move or operate its major systems. The circumstances determine whether it is disabled, wrecked, sinking, drifting, captured, or destroyed.',
            ],
          },
        ],
      },
      {
        id: 'vehicle-combat-collisions-and-repairs',
        category: 'Vehicles & Mounts',
        title: 'Vehicle Combat, Collisions & Repairs',
        introduction: [
          {
            segments: [
              { text: 'Vehicle Attacks use the normal combat rules. The gunner rolls a relevant complete Descriptor or Dexterity, range establishes the base Difficulty, Active Defense may replace that Difficulty, and Armour subtracts from Damage normally.' },
            ],
          },
          {
            segments: [
              { text: 'Every vehicle weapon lists fixed Damage and a ' },
              { text: 'Weapon Scale', strong: true },
              { text: '. Weapon Scale normally matches the vehicle carrying it, but specialized weapons such as Point Defense guns or anti-capital torpedoes may use another Scale.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Local targets: ', strong: true },
              { text: 'Characters inside or standing upon an enormous vehicle may attack accessible doors, consoles, engines, weapons, crew, or other components at their appropriate local Scale instead of attacking the entire vehicle.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Scale and Damage',
            paragraphs: [
              'For every Scale step the weapon is larger than its target, add 5 Damage. For every Scale step it is smaller, subtract 5 Damage. Adjusted Damage cannot fall below 0 before Armour is applied.',
            ],
            rules: [
              { name: 'Adjusted Damage', description: 'Listed Damage + 5 × (Weapon Scale − Target Scale), then subtract Armour.' },
              { name: 'Accuracy', description: 'Use ordinary Advantage or Disadvantage when relative size meaningfully affects accuracy. Large targets are generally easier to hit, while very small targets may be difficult for capital weapons to track.' },
            ],
            table: {
              headers: ['Attack', 'Adjusted Damage Before Armour'],
              rows: [
                ['Damage 7 personal weapon against a Scale 1 car', '7 − 5 = 2'],
                ['Damage 10 Scale 1 dragon breath against a Scale 0 person', '10 + 5 = 15'],
                ['Damage 12 Scale 3 torpedo against a Scale 4 capital ship', '12 − 5 = 7'],
                ['Damage 12 Scale 4 capital weapon against a Scale 1 fighter', '12 + 15 = 27'],
              ],
            },
          },
          {
            title: 'Vehicles and Occupants',
            paragraphs: [
              'Ordinary Attacks against a vehicle reduce its Structure and do not automatically Damage protected occupants. Exposed crew may be targeted normally. Occupants face direct danger when an Attack reaches them, the vehicle crashes, a compartment is breached, or another established consequence applies.',
              'Mounts take Damage against their normal Health. Damage to a mount does not automatically Damage its rider, though the rider may need to remain mounted or deal with the mount becoming Prone or Taken Out.',
            ],
          },
          {
            title: 'Collisions',
            paragraphs: [
              'A deliberate collision is an Attack using the operator’s modified control pool. The target may use Active Defense when able. On a hit, each participant takes Collision Damage based on the other object’s Scale, and Armour applies normally.',
              'If a collision disables a vehicle, its occupants face an appropriate environmental consequence. A rider may need a Riding or Dexterity check to avoid being thrown and becoming Prone.',
            ],
            rules: [
              { name: 'Collision Damage', description: '5 + 5 × the other object’s Scale.' },
              { name: 'Head-On or Exceptional Speed', description: 'Add 5 Damage to both participants.' },
              { name: 'Slow or Partially Avoided Impact', description: 'Subtract 5 Damage from both participants, to a minimum of 0 before Armour.' },
            ],
          },
          {
            title: 'Repairs',
            paragraphs: [
              'Mounts recover through the normal medicine, healing, and rest rules. Vehicles require appropriate tools, parts, time, and a relevant Mechanics Descriptor or Mechanics.',
              'Routine repairs outside pressure may not require a roll. Repairs made under pressure use a repair item with a fixed Repair value and the medical-item outcome table, replacing Treatment with Repair and Health with Structure. If an outcome would stabilize a patient, it instead prevents further failure or resolves one immediate vehicle danger. A repair attempt expends the item, but vehicles do not use the medical treatment-per-day limits.',
              'A successful repair may restore Structure or remove an appropriate temporary problem such as Damaged Engine or Jammed Controls. A vehicle at 0 Structure requires appropriate parts and a successful repair before it can operate again.',
            ],
          },
        ],
      },
      {
        id: 'what-is-resonance',
        category: 'Resonance',
        title: 'What Is Resonance?',
        introduction: [
          {
            segments: [
              { text: 'Resonance', strong: true },
              { text: ' is D6V’s framework for abilities that reach beyond the ordinary world. Depending on the setting, Resonance may represent magic, psychic phenomena, divine gifts, superpowers, supernatural techniques, alien forces, or otherworldly energies.' },
            ],
          },
          {
            segments: [
              { text: 'The Resonance rules describe how characters attempt extraordinary effects without requiring every setting to use the same explanation, power source, or list of abilities. The setting establishes what Resonance means in its world and which forms are available.' },
            ],
          },
        ],
      },
      {
        id: 'disciplines',
        category: 'Resonance',
        title: 'Disciplines',
        introduction: [
          {
            segments: [
              { text: 'A ' },
              { text: 'Discipline', strong: true },
              { text: ' defines the family or flavour of Resonance effects a character may attempt. Each setting may provide its own Disciplines and boundaries, with additional suggestions available on the ' },
              { text: 'Resonance page', link: '/resonance' },
              { text: '.' },
            ],
          },
          {
            segments: [
              { text: 'A Discipline answers what kinds of supernatural effects are possible and identifies its linked Attribute. A relevant Discipline Descriptor records a complete dice pool derived from that Attribute and is rolled instead of the Attribute. A super-soldier’s Discipline might use Strength-based Descriptors, while a wizard’s Discipline might use Resonance-based Descriptors.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Discipline and Competence',
            rules: [
              { name: 'Discipline: Pyromancy (Resonance)', description: 'Defines the permitted family of effects: creating, controlling, sensing, resisting, or extinguishing supernatural fire, and links those effects to the Resonance Attribute.' },
              { name: 'Resonance 2D', description: 'The linked base Attribute used when no Pyromancy Descriptor applies.' },
              { name: 'Fire Mage 4D+2', description: 'An ordinary practitioner rolls this complete Resonance-based Descriptor pool when using Pyromancy.' },
              { name: 'Great Flame Wizard 12D+2', description: 'A legendary practitioner rolls this complete Resonance-based Descriptor pool when using the same broad Discipline.' },
            ],
          },
          {
            title: 'Freeform, Modular Powers',
            paragraphs: [
              'Disciplines remain freeform and modular rather than becoming individual spell lists. They represent broad, agreed-upon families of supernatural ability, allowing a setting to define several meaningful options without requiring hundreds of separate powers.',
            ],
          },
          {
            title: 'Example Disciplines',
            rules: [
              { name: 'Pyromancy', description: 'Create and manipulate fire; extinguish flames; resist heat; sense supernatural flame.' },
              { name: 'Telepathy', description: 'Sense minds; communicate mentally; read surface thoughts; potentially influence minds at greater Difficulty.' },
              { name: 'Necromancy', description: 'Perceive spirits; communicate with the dead; animate corpses; manipulate life and death energies.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'The Storyteller determines whether a proposed effect falls within a particular Discipline.' },
            ],
          },
        ],
      },
      {
        id: 'using-resonance',
        category: 'Resonance',
        title: 'Using Resonance',
        introduction: [
          {
            segments: [
              { text: 'Using Resonance costs ' },
              { text: 'one Action', strong: true },
              { text: '. The base Difficulty is Standard (TN 11). When making an Attack against a target using Active Defense, that defense result replaces TN 11. Cover then raises the applicable Difficulty by one Band, or +3 TN.' },
            ],
          },
        ],
        steps: [
          { title: 'Declare the Effect', description: 'Describe exactly what the character wants the Resonance effect to accomplish.' },
          { title: 'Identify Discipline & Attribute', description: 'Confirm that the effect belongs to an available Discipline and identify its linked Attribute and relevant Descriptor.' },
          { title: 'Establish the Base TN', description: 'Begin at Standard Difficulty (TN 11), or replace it with the target’s Active Defense result when making an Attack. Apply Cover when relevant.' },
          { title: 'Apply Difficulty Bands', description: 'Apply the effect’s Damage, range, area, duration, precision, target, scale, and other modifiers. Each positive Difficulty Band adds exactly +3 TN, and each negative Band subtracts 3 TN.' },
          { title: 'Roll the Check', description: 'Roll one relevant Discipline Descriptor as a complete pool. If no Descriptor applies, roll the Discipline-linked Attribute.' },
          { title: 'Resolve the Outcome', description: 'Compare the final result with the completed TN or opposing total and resolve the Degree of Outcome.' },
        ],
      },
      {
        id: 'prepared-resonance-effects',
        category: 'Resonance',
        title: 'Prepared Effects',
        introduction: [
          {
            segments: [
              { text: 'A Resonance-attuned character begins with ' },
              { text: 'four Prepared Effect slots', strong: true },
              { text: '. During a rest, the player may fill these slots with commonly used effects whose complete Difficulty, range, Damage, duration, and other details have been calculated in advance and approved by the Storyteller.' },
            ],
          },
          {
            segments: [
              { text: 'Prepared Effects reduce interruptions during play but receive no reduction to their calculated Difficulty. A character may revise their prepared choices during a later rest.' },
            ],
          },
        ],
        conceptsTitle: 'Prepared & Unprepared Effects',
        concepts: [
          { name: 'Prepared Effect', description: 'Use the pre-approved effect and its precalculated Difficulty without rebuilding it during the scene.' },
          { name: 'Unprepared Effect: +2 Bands', description: 'An effect that is not currently prepared may still be attempted, but its final Difficulty increases by two Bands, or +6 TN.' },
          { name: 'Additional Slot: 5 XP', description: 'A character may purchase another Prepared Effect slot for 5 XP. There is currently no maximum number of slots.' },
        ],
      },
      {
        id: 'using-other-disciplines',
        category: 'Resonance',
        title: 'Using Other Disciplines',
        introduction: [
          {
            segments: [
              { text: 'Attempting a Resonance effect outside the character’s Discipline is normally ' },
              { text: 'impossible', strong: true },
              { text: '. A Discipline establishes the supernatural boundaries the character understands and can reliably access.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Exceptional Circumstances: ', strong: true },
              { text: 'The Storyteller may permit an out-of-Discipline attempt at −1D or −2D when the fiction strongly supports it. Failure should carry harsher consequences than an ordinary Resonance check.' },
            ],
          },
        ],
      },
      {
        id: 'magical-side-effects',
        category: 'Resonance',
        title: 'Magical Side Effects',
        introduction: [
          {
            segments: [
              { text: 'A Resonance effect does more than simply succeed or fail. Use the Degree of Success to determine whether supernatural power creates an added benefit, reduced effect, price, or dangerous consequence.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Resonance Outcomes',
            headers: ['Outcome', 'Effect'],
            rows: [
              ['No, and…', 'The effect fails and something seriously worsens. Resonance may lash back, ignite something unintended, harm the user, or create an unwanted supernatural consequence.'],
              ['No', 'Nothing happens.'],
              ['No, but…', 'The intended effect fails, but produces a lesser benefit. A flame might briefly sputter to life or force an enemy back.'],
              ['Yes, but…', 'The effect works at a price, such as Health loss, reduced strength or duration, collateral damage, a temporary negative Characteristic, or unwanted supernatural attention.'],
              ['Yes', 'The effect produces exactly the intended result.'],
              ['Yes, and…', 'The effect works exceptionally well, gaining greater area or duration, reduced collateral damage, a secondary effect, or another appropriate benefit.'],
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'This outcome structure replaces the need for separate critical-result tables for every individual supernatural effect.' },
            ],
          },
        ],
      },
      {
        id: 'resonance-effect-severity',
        category: 'Resonance',
        title: 'Resonance Effect Severity',
        introduction: [
          {
            segments: [
              { text: 'Non-damaging Resonance effects increase in Difficulty according to how profoundly they alter a target, reveal information, remove agency, or change the world. Effect Severity is cumulative with range, duration, scale, precision, and other modifiers.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Effect Severity',
            headers: ['Severity', 'Difficulty', 'Examples'],
            rows: [
              ['Minor', '−1 Band', 'Cosmetic effects, harmless sensations, or retrieving obvious information'],
              ['Standard', '—', 'Ordinary utility, simple movement, or effects on willing targets'],
              ['Potent', '+1 Band', 'Brief restraint, significant information, or a minor transformation'],
              ['Severe', '+2 Bands', 'Removing a specific memory, forced behaviour, teleporting through barriers, or a major transformation'],
              ['Major', '+3 Bands', 'Lesser summoning, extensive information extraction, major environmental alteration, or long-lasting incapacitation'],
              ['Extreme', '+4 Bands', 'Domination or mind control, identity replacement, powerful summoning, or a life-altering transformation'],
              ['Permanent', '+5 Bands and usually a ritual', 'Permanent memory alteration, lasting transformation, or permanent creation'],
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Example: ', strong: true },
              { text: 'Removing a specific memory is normally a Severe effect at +2 Bands. If the effect must isolate only that memory without disturbing anything else, Precision adds another +1 Band.' },
            ],
          },
        ],
      },
      {
        id: 'resisting-resonance',
        category: 'Resonance',
        title: 'Resisting Resonance',
        introduction: [
          {
            segments: [
              { text: 'When Resonance directly alters an unwilling target, the target may resist with the complete Descriptor pool that best represents their defense, or the relevant Attribute when no Descriptor applies.' },
            ],
          },
        ],
        steps: [
          { title: 'Choose the Resistance', description: 'The Storyteller chooses the Attribute and any relevant complete Descriptor pool that best represents resisting the effect.' },
          { title: 'Roll Resistance', description: 'The target rolls the chosen Descriptor, or the Attribute when no Descriptor applies. The resistance result replaces the effect’s base TN 11.' },
          { title: 'Apply Effect Modifiers', description: 'After replacing the base TN, apply Effect Severity and every other relevant Difficulty Band.' },
          { title: 'Resolve the Contest', description: 'The Resonance user rolls against the final TN. A tie favors the resisting target.' },
        ],
        detailSections: [
          {
            title: 'Ongoing Loss of Agency',
            paragraphs: [
              'An ongoing effect that removes or controls a target’s agency allows another resistance check at the end of each of that target’s turns. A successful resistance ends the effect unless its specific rules say otherwise.',
            ],
          },
          {
            title: 'Player Characters',
            paragraphs: [
              'Social or mental control against a player character still leaves final authority over that character’s decisions with the player unless the group has explicitly agreed to a different approach.',
            ],
          },
        ],
      },
      {
        id: 'resonance-damage-and-difficulty',
        category: 'Resonance',
        title: 'Resonance Damage & Difficulty',
        introduction: [
          {
            segments: [
              { text: 'Offensive Resonance follows the normal rules for melee or ranged Attacks and fixed Damage. Most Resonance Attacks default to ' },
              { text: 'Standard', strong: true },
              { text: ' power unless the player deliberately changes the effect’s Damage, range, area, duration, precision, targets, or scale.' },
            ],
          },
          {
            segments: [
              { text: 'Each major increase raises the effect’s Difficulty by one or more Difficulty Bands. Every Band changes the TN by exactly 3. Reductions may lower the Difficulty where noted.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Resonance Power Benchmarks',
            headers: ['Resonance Power', 'Damage', 'Mundane Equivalent'],
            rows: [
              ['Minor', '4', 'Short blade'],
              ['Standard', '7', 'Service handgun'],
              ['Potent', '10', 'Rifle'],
              ['Severe', '12', 'Full-power rifle'],
              ['Devastating', '14', 'Heavy weapon'],
              ['Catastrophic', '17+', 'Exceptional'],
            ],
          },
        ],
        detailSections: [
          {
            title: 'Damage Level',
            table: {
              headers: ['Damage Level', 'Damage', 'Difficulty'],
              rows: [
                ['Minor', '4', '−1 Band'],
                ['Standard', '7', '—'],
                ['Potent', '10', '+1 Band'],
                ['Severe', '12', '+2 Bands'],
                ['Devastating', '14', '+3 Bands'],
                ['Catastrophic', '17', '+4 Bands or more'],
              ],
            },
            paragraphs: [
              'The Storyteller may permit greater power because of compelling roleplay, a strong narrative purpose, or the expenditure of a setting-specific resource such as Resonance Crystals.',
            ],
          },
          {
            title: 'Range',
            paragraphs: [
              'Twenty metres is the standard range for a Resonance effect. Each additional 20 metres increases the Difficulty by one Band.',
            ],
            table: {
              headers: ['Maximum Range', 'Difficulty Increase'],
              rows: [['20 m', '—'], ['40 m', '+1 Band'], ['60 m', '+2 Bands'], ['80 m', '+3 Bands'], ['100 m', '+4 Bands'], ['Each additional 20 m', '+1 Band']],
            },
          },
          {
            title: 'Armour-Piercing',
            paragraphs: [
              'Armour-Piercing allows a Resonance Attack to ignore a fixed amount of Armour Absorption. Armour-Piercing 2 ignores 2 points of Absorption.',
            ],
            table: {
              headers: ['Effect', 'Difficulty Increase'],
              rows: [['Ignore 2 Armour', '+1 Band'], ['Ignore 4 Armour', '+2 Bands'], ['Ignore 6 Armour', '+3 Bands']],
            },
          },
          {
            title: 'Area',
            rules: [
              { name: 'Small Area — +1 Band', description: 'Approximately a 3-metre radius, or 6-metre diameter. Large enough to catch a tightly grouped cluster without consuming an entire battlefield.' },
              { name: 'Large Area — +2 Bands', description: 'Approximately an 8-metre radius, or 16-metre diameter. This area is legitimately dangerous to use around allies or civilians.' },
            ],
          },
          {
            title: 'Duration',
            table: {
              headers: ['Duration', 'Difficulty Increase'],
              rows: [
                ['Instantaneous', '— for naturally instant effects'],
                ['Up to 2 minutes', 'Standard duration'],
                ['Up to 10 minutes', '+1 Band'],
                ['Up to 30 minutes', '+2 Bands'],
                ['Up to 1 hour', '+3 Bands'],
                ['Several hours', '+4 Bands'],
                ['One day', '+5 Bands or Storyteller discretion'],
                ['Permanent', 'Usually requires a special ritual'],
              ],
            },
          },
          {
            title: 'Precision & Subtlety — +1 Band',
            paragraphs: [
              'Apply +1 Difficulty Band when an effect must be particularly precise, selective in its immediate application, or difficult to recognize as supernatural.',
            ],
            items: [
              'Burn a rope without burning the prisoner',
              'Remove one specific memory',
              'Levitate a key unseen from someone’s pocket',
              'Freeze a lock without freezing the door',
              'Manipulate a tiny internal mechanism',
              'Hide obvious visual manifestations',
              'Disguise the supernatural origin of an effect',
            ],
          },
          {
            title: 'Selective Targets',
            paragraphs: [
              'A selective multi-target effect affects several chosen creatures while excluding others in the area.',
            ],
            table: {
              headers: ['Targets', 'Difficulty Increase'],
              rows: [['One', '—'], ['Two', '+1 Band'], ['Up to four', '+2 Bands'], ['Up to eight', '+3 Bands']],
            },
          },
          {
            title: 'Scale',
            table: {
              headers: ['Scale', 'Example', 'Difficulty Increase'],
              rows: [
                ['Minor', 'Handheld object', '−1 Band'],
                ['Standard', 'Person-sized or ordinary effect', '—'],
                ['Large', 'Motorcycle or large animal', '+1 Band'],
                ['Huge', 'Car or horse-sized mass', '+2 Bands'],
                ['Massive', 'Truck or small building component', '+3 Bands'],
                ['Colossal', 'Building-scale', '+4 Bands or more'],
              ],
            },
          },
        ],
      },
      {
        id: 'healing-with-resonance',
        category: 'Resonance',
        title: 'Healing with Resonance',
        introduction: [
          {
            segments: [
              { text: 'A character with an appropriate Discipline may use Resonance to restore lost Health. Roll one relevant ' },
              { text: 'Resonance Descriptor', strong: true },
              { text: ' as a complete pool, or the Discipline-linked Attribute when no Descriptor applies, against a Difficulty determined by the amount of Health the character attempts to restore.' },
            ],
          },
        ],
        tables: [
          {
            title: 'Healing Intensity',
            headers: ['Healing', 'Health Restored', 'Difficulty'],
            rows: [
              ['Minor Healing', '4 Health', 'Easy — TN 8'],
              ['Standard Healing', '7 Health', 'Standard — TN 11'],
              ['Potent Healing', '10 Health', 'Challenging — TN 14'],
              ['Severe Healing', '12 Health', 'Hard — TN 17'],
              ['Major Healing', '14 Health', 'Very Hard — TN 20'],
              ['Extraordinary Healing', '17 Health', 'Extreme — TN 23'],
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'A character may receive restorative Resonance no more than twice between full daily rests. A Taken Out character must first be stabilized; restoring Health to that stabilized character increases the Difficulty by one Band.' },
            ],
          },
        ],
      },
      {
        id: 'balance',
        category: 'Resonance',
        title: 'Balance',
        introduction: [
          {
            segments: [
              { text: 'Resonance exists on a spectrum between ' },
              { text: 'Dark', strong: true },
              { text: ' and ' },
              { text: 'Light', strong: true },
              { text: '. Dark Resonance offers power through aggression, passion, selfishness, and desperation. Light Resonance offers power through discipline, protection, compassion, and self-control.' },
            ],
          },
          {
            segments: [
              { text: 'When a Resonance action genuinely aligns with the character’s Balance, apply the corresponding bonus. Acting directly against that Balance applies the equivalent penalty. Neutral actions receive no Balance modifier.' },
            ],
          },
        ],
        balanceScale: [
          { value: '−3', label: 'Desperation', alignment: 'dark' },
          { value: '−2', label: 'Instability', alignment: 'dark' },
          { value: '−1', label: 'Adrift', alignment: 'dark' },
          { value: '0', label: 'Neutrality', alignment: 'neutral' },
          { value: '+1', label: 'Attuned', alignment: 'light' },
          { value: '+2', label: 'Composure', alignment: 'light' },
          { value: '+3', label: 'Harmony', alignment: 'light' },
        ],
        tables: [
          {
            title: 'Balance Modifiers',
            headers: ['Balance', 'Aligned Bonus', 'Opposed Penalty'],
            rows: [
              ['−3 Dark', '+1D Dark', '−1D Light'],
              ['−2 Dark', '+2 Pips Dark', '−2 Pips Light'],
              ['−1 Dark', '+1 Pip Dark', '−1 Pip Light'],
              ['0 Neutral', '—', '—'],
              ['+1 Light', '+1 Pip Light', '−1 Pip Dark'],
              ['+2 Light', '+2 Pips Light', '−2 Pips Dark'],
              ['+3 Light', '+1D Light', '−1D Dark'],
            ],
          },
        ],
        detailSections: [
          {
            title: 'Dark-Aligned Resonance',
            items: ['Hatred', 'Fear', 'Cruelty', 'Domination', 'Selfish ambition', 'Unnecessary suffering', 'Using others as expendable tools', 'Drawing deliberately on destructive emotions'],
          },
          {
            title: 'Light-Aligned Resonance',
            items: ['Protection', 'Healing', 'Mercy', 'Self-sacrifice', 'Restoration', 'Compassion', 'Self-control', 'Preserving others at personal cost'],
          },
          {
            title: '−3 Desperation — Embrace the Darkness',
            paragraphs: [
              'Once per scene, after failing a Resonance roll, the character may reroll the entire pool and must accept the second result.',
              'Doing so inflicts Resonance Burn equal to 25% of maximum Health, rounded up. Armour cannot absorb Resonance Burn.',
            ],
          },
          {
            title: '+3 Harmony — Preserve the Self',
            paragraphs: [
              'Once per session, when Damage would reduce the character to Taken Out, the character remains at 1 Health instead.',
            ],
          },
          {
            title: 'Changing Balance',
            paragraphs: [
              'The Storyteller may shift a character’s Balance one step after a significant act strongly aligned with Light or Dark Resonance.',
            ],
          },
        ],
      },
      {
        id: 'storyteller-consequences-and-outcomes',
        category: 'Storytelling',
        title: 'Consequences & Outcome Menus',
        introduction: [
          {
            segments: [
              { text: 'After determining the ' },
              { text: 'Degree of Outcome', strong: true },
              { text: ', describe what happens by beginning with the character’s stated intent and choosing a result that follows from the established fiction. The menus below provide prompts, not mandatory results or random tables.' },
            ],
          },
          {
            segments: [
              { text: 'A consequence should be proportional to the degree rolled, should move the situation forward, and should never erase a success. Likewise, a benefit on a failed roll may create progress or a new opportunity, but it should not quietly grant the action’s full intended result.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Choose, do not stack by default: ', strong: true },
              { text: 'One fitting consequence or benefit is normally enough. Use two linked minor results, or one especially serious result, only for “No, and…” or when the established danger clearly demands it.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Telegraph serious danger: ', strong: true },
              { text: 'Damage, lost equipment, separation, capture, or similarly severe consequences should arise from risks the players could understand before the roll whenever possible.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Storyteller Consequence Menu',
            paragraphs: [
              'Choose the category that most naturally follows from the action. The examples can be made lighter or more severe to fit the Degree of Outcome and the danger already established in the scene.',
            ],
            table: {
              headers: ['Consequence', 'Suggestions'],
              rows: [
                ['Time', 'The action takes longer; a deadline advances; an enemy gains time to act; the opportunity will not remain open.'],
                ['Resources', 'Expend supplies, ammunition, money, a favour, or a limited use; require another resource before progress can continue.'],
                ['Position', 'End in an exposed, isolated, unstable, or otherwise disadvantageous location; surrender useful ground; become separated.'],
                ['Exposure', 'Reveal a location, identity, intention, capability, or evidence; attract attention; trigger an alarm or suspicion.'],
                ['Escalation', 'Introduce reinforcements, a spreading hazard, a new obstacle, increased security, or an opponent who changes tactics.'],
                ['Reduced Effect', 'Reduce the action’s scope, quality, precision, or duration while preserving whatever the rolled outcome says was achieved.'],
                ['Equipment', 'Jam, drain, disable, or lose access to relevant equipment; on a “No, and…” result, temporarily degrade it when the fiction supports it.'],
                ['Relationships', 'Strain trust, create an obligation, offend an interested party, damage reputation, or reveal divided loyalties.'],
                ['Collateral Trouble', 'Endanger an ally, bystander, clue, objective, or part of the environment without arbitrarily taking control of a player character.'],
                ['Hard Choice', 'Offer two consequences and let the player choose; preserve one objective only by sacrificing another; succeed only by accepting a stated cost.'],
                ['Harm or Condition', 'Apply Damage from an established source or an appropriate Condition when bodily danger was already a credible part of the action.'],
                ['Lost Opportunity', 'Close one route, allow a target to escape, consume the element of surprise, or make a later approach more difficult.'],
              ],
            },
          },
          {
            title: 'Failure Outcome Menu',
            table: {
              headers: ['Outcome', 'Core Result', 'Choose a Fitting Resolution'],
              rows: [
                ['No, and…', 'The intended action fails and the situation becomes worse.', 'Apply one serious consequence or two linked minor consequences; reveal a new danger; escalate an existing threat; lose an opportunity while also paying a fitting cost.'],
                ['No', 'The intended action fails.', 'Leave the situation materially unchanged beyond the Action and time spent; show why the approach failed; allow another approach when the fiction permits it. Do not add a complication merely because a roll failed.'],
                ['No, but…', 'The intended action fails, but something useful is gained.', 'Reveal valuable information; make partial progress; reduce the size of the obstacle; preserve a resource or ally that was at risk; open a different route that will require a clear cost.'],
              ],
            },
          },
          {
            title: 'Success Outcome Menu',
            table: {
              headers: ['Outcome', 'Core Result', 'Choose a Fitting Resolution'],
              rows: [
                ['Yes, but…', 'The intended action succeeds with a compromise or cost.', 'Spend time or resources; attract attention; accept reduced effect, quality, duration, or scope; end in a worse position; present a hard choice. Preserve the action’s essential success.'],
                ['Yes', 'The intended action succeeds as declared.', 'Deliver the expected result cleanly. Do not add an unrelated cost or extra benefit. Move the scene forward from the new situation.'],
                ['Yes, and…', 'The intended action succeeds and creates an additional benefit.', 'Increase effect, quality, scope, or duration; finish faster; preserve or recover a resource; gain useful information; improve position; create Advantage for a logical follow-up; help an ally or secure an extra objective.'],
              ],
            },
          },
        ],
      },
      {
        id: 'running-session-zero',
        category: 'Storytelling',
        title: 'Running Session Zero',
        introduction: [
          {
            segments: [
              { text: 'Session Zero', strong: true },
              { text: ' is a conversation held before regular play begins. Use it to establish the campaign’s premise, create compatible characters, approve player-facing options, discuss boundaries, and make sure everyone understands the kind of game the group is agreeing to play.' },
            ],
          },
          {
            segments: [
              { text: 'It may be a complete session or part of the first gathering. The goal is not to predict every issue, but to give the group a clear shared starting point and an easy way to revisit decisions later.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'A living agreement: ', strong: true },
              { text: 'Session Zero is not the only time these subjects may be discussed. Revisit expectations, character options, Lines, and Veils whenever a new player joins, the campaign changes direction, or someone asks for a check-in.' },
            ],
          },
        ],
        steps: [
          {
            title: 'Present the Campaign Frame',
            description: 'Explain the premise, setting, intended themes, expected tone, starting situation, and the kinds of challenges likely to receive attention.',
          },
          {
            title: 'Agree on Table Expectations',
            description: 'Discuss schedule, session length, attendance, communication, rules questions, spotlight sharing, player-versus-player conflict, and how absent characters are handled.',
          },
          {
            title: 'Establish Boundaries',
            description: 'Go over Lines and Veils, choose a simple way to pause or redirect uncomfortable play, and make clear that boundaries may change without requiring personal justification.',
          },
          {
            title: 'Review Characters Together',
            description: 'Confirm that each character fits the premise, has a reason to participate, can cooperate with the group, and brings opportunities for other characters to matter.',
          },
          {
            title: 'Approve Descriptors',
            description: 'Review every Edge and Flaw for its linked Attribute, complete pool rating, scope, fictional meaning, and likely applications before play begins.',
          },
          {
            title: 'Approve Prepared Effects',
            description: 'For each Resonance-attuned character, review the starting Prepared Effects and record their exact parameters, modifiers, final Difficulty, and method of resistance.',
          },
          {
            title: 'Connect the Party',
            description: 'Establish why the characters stay together, what immediate objective they share, and at least one useful relationship, obligation, or source of trust within the group.',
          },
          {
            title: 'Confirm the Starting Point',
            description: 'Summarize the agreements, resolve open questions, and tell the players where the first scene begins and what their characters already know.',
          },
        ],
        detailSections: [
          {
            title: 'Campaign Agreement Checklist',
            table: {
              headers: ['Subject', 'Questions to Settle'],
              rows: [
                ['Premise & Tone', 'What are the characters expected to do? Is the campaign heroic, grim, comedic, political, exploratory, horrific, or something else?'],
                ['Character Fit', 'What kinds of characters belong in this campaign? What concepts would undermine the premise or prevent party cooperation?'],
                ['Rules & Lethality', 'Which optional rules are in use? How common are character death, permanent injury, capture, resource scarcity, or replacement characters?'],
                ['Player Conflict', 'Is disagreement between characters welcome? Is player-versus-player rolling allowed, and must every affected player agree before it occurs?'],
                ['Spotlight & Authority', 'How will the group share attention? How should players raise rules questions, correct misunderstandings, or contribute setting details?'],
                ['Logistics', 'When, where, and how long will the group play? How much notice is expected for an absence, and what happens when someone cannot attend?'],
                ['Communication', 'Where are schedules, campaign notes, and between-session questions kept? How can players provide private feedback to the Storyteller?'],
              ],
            },
          },
          {
            title: 'Descriptor Approval Checklist',
            paragraphs: [
              'Review Descriptors collaboratively. When a concept is too broad or unclear, refine or rename it with the player so its intended identity remains intact.',
            ],
            table: {
              headers: ['Check', 'Approval Guidance'],
              rows: [
                ['Linked Attribute', 'Identify the Attribute the Descriptor improves or degrades and make sure the connection is easy to explain in the fiction.'],
                ['Complete Rating', 'Confirm that the complete dice pool is written correctly and is above its Attribute for an Edge or below it for a Flaw as required.'],
                ['Clear Scope', 'The Descriptor should cover a recognizable field, approach, training, relationship, or limitation—not nearly every use of an Attribute.'],
                ['Useful Frequency', 'An Edge should be relevant often enough to be worth choosing. A Flaw should create meaningful complications without dominating every scene.'],
                ['Distinct Purpose', 'If two Descriptors overlap, clarify the situations that distinguish them or combine them into one stronger concept.'],
                ['Shared Interpretation', 'Ask the player for two situations where it should apply and one similar situation where it should not. Record any important ruling.'],
                ['Campaign & Boundaries', 'Make sure the Descriptor suits the campaign and does not require content the group placed behind a Line or Veil.'],
              ],
            },
          },
          {
            title: 'Prepared Resonance Effect Checklist',
            paragraphs: [
              'Calculate each starting Prepared Effect before the first session so it can be used without stopping play. Approval covers the recorded version; a meaningfully different use must be recalculated and may count as an Unprepared Effect.',
            ],
            table: {
              headers: ['Record', 'Questions to Answer'],
              rows: [
                ['Name, Discipline & Intent', 'What does the effect normally accomplish, and why does it belong to the chosen Discipline?'],
                ['Severity or Damage', 'What Effect Severity or Damage level does it use? Does it remove agency, impose a Condition, heal, summon, reveal, or transform?'],
                ['Parameters', 'What are its range, area, duration, scale, precision, and number of targets?'],
                ['Opposition', 'Is it an Attack? Can a target use Active Defense or Resist the effect? What happens when the target is unwilling?'],
                ['Difficulty', 'List every Difficulty Band, convert the total to TN, and include any recurring or special costs.'],
                ['Presentation', 'What does using the effect look, sound, or feel like? Is its origin obvious, and what limits should remain clear during play?'],
              ],
            },
          },
          {
            title: 'Lines, Veils & Ongoing Safety',
            table: {
              headers: ['Tool', 'How to Use It'],
              rows: [
                ['Line', 'Content behind a Line does not appear in the game. It is not introduced as a threat, joke, backstory detail, or off-screen event.'],
                ['Veil', 'Content behind a Veil may exist, but it is not described in detail. Fade to black, cut away, or summarize only what the group needs to know.'],
                ['Pause or Redirect', 'Agree on a word, gesture, or message anyone can use to stop, rewind, skip, or change a scene without having to justify the request.'],
                ['Private Boundaries', 'Provide a private way to share boundaries. Record only what is necessary to respect them and do not require anyone to disclose personal experiences.'],
                ['Check-Ins', 'Check in after especially intense scenes and periodically during a long campaign. Silence at Session Zero is not permanent consent.'],
                ['Leaving the Table', 'Anyone may step away when needed. Decide whether play pauses or continues, and make returning easy and free of pressure.'],
              ],
            },
          },
        ],
      },
      {
        id: 'awarding-experience-and-meta-dice',
        category: 'Storytelling',
        title: 'Awarding Experience & Meta Dice',
        introduction: [
          {
            segments: [
              { text: 'Award ' },
              { text: 'Experience Points', strong: true },
              { text: ' primarily at the end of sessions for participation, progress, discovery, and meaningful character choices. Keep awards consistent enough that players understand the expected pace of advancement.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Current playtest pace: ', strong: true },
              { text: 'A standard session awards approximately 5 Experience Points to each player character. This rate is provisional, and the Storyteller may adjust it for the length and significance of the session.' },
            ],
          },
          {
            segments: [
              { text: 'Award ' },
              { text: 'Meta Dice', strong: true },
              { text: ' during play for impressive, impactful, creative, or story-serving moments. Each player begins with two and can hold a maximum of five, so award Meta Dice freely enough that players are encouraged to spend them rather than save them indefinitely.' },
            ],
          },
        ],
      },
      {
        id: 'rewarding-flaws',
        category: 'Storytelling',
        title: 'Rewarding Flaws',
        introduction: [
          {
            segments: [
              { text: 'The Storyteller decides when a Flaw applies to a roll. Players may advocate for their own Flaws to come into play, especially when doing so creates an interesting complication or strengthens the story.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'When a player voluntarily brings a relevant Flaw into a meaningful scene and accepts its consequences, consider awarding that player an additional Meta Die or XP.' },
            ],
          },
        ],
      },
      {
        id: 'stealth-takedown-guidance',
        category: 'Storytelling',
        title: 'Adjudicating Stealth Takedowns',
        introduction: [
          {
            segments: [
              { text: 'The optional Stealth Takedown rule works best for guards, minor opponents, and other NPCs whose immediate defeat supports the intended pace and tone. Decide during encounter preparation which NPCs can be killed or incapacitated this way.' },
            ],
          },
          {
            segments: [
              { text: 'If an NPC should not be vulnerable to an instant Takedown, avoid presenting that NPC as unaware and helpless within reach of the Party. Establish a fictional protection before the attempt becomes available. For example, a dark wizard who must survive the scene might awaken when a Resonance alarm detects intruders rather than remaining asleep while the Party approaches the bed.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Do not wait until after a player has earned a valid Takedown opportunity to declare the target immune. Communicate exceptional protections through the fiction before the player commits to the attempt.' },
            ],
          },
        ],
      },
      {
        id: 'starting-money',
        category: 'Storytelling',
        title: 'Starting Money',
        introduction: [
          {
            segments: [
              { text: 'The Storyteller chooses starting money to match the campaign. A suggested baseline is ' },
              { text: '$5,000 per character', strong: true },
              { text: ', which players use to purchase ordinary equipment without additional Characteristics at the average price of each equipment category.' },
            ],
          },
          {
            segments: [
              { text: 'Characters who begin attuned to Resonance should normally receive less starting money because their Discipline and Prepared Effects provide additional versatility. A suggested Resonance-attuned baseline is ' },
              { text: '$3,000', strong: true },
              { text: '.' },
            ],
          },
        ],
      },
      {
        id: 'currency-conversion',
        category: 'Storytelling',
        title: 'Converting Currency',
        introduction: [
          {
            segments: [
              { text: 'Dollar values are a universal reference scale and may be renamed or converted to suit the setting. Preserve the relative purchasing power of equipment when choosing a conversion.' },
            ],
          },
        ],
        conceptsTitle: 'Example Conversions',
        concepts: [
          { name: 'Fantasy Currency', description: '$1 may equal 1 copper, $10 may equal 1 bronze, $100 may equal 1 silver, and $1,000 may equal 1 gold.' },
          { name: 'Science-Fiction Currency', description: 'Credits, Allocates, or another setting currency may replace dollars at a 1:1 value.' },
        ],
      },
      {
        id: 'equipment-degradation',
        category: 'Storytelling',
        title: 'Equipment Degradation',
        introduction: [
          {
            segments: [
              { text: 'Do not track routine wear or durability. Degrade equipment only when the fiction clearly warrants it or as an appropriate consequence of a “No, and…” result.' },
            ],
          },
          {
            segments: [
              { text: 'Represent degradation with a temporary negative Characteristic such as ' },
              { text: 'Damaged', strong: true },
              { text: ', ' },
              { text: 'Unreliable', strong: true },
              { text: ', or ' },
              { text: 'Blunted', strong: true },
              { text: '. The Characteristic remains until appropriate repairs remove it.' },
            ],
          },
        ],
      },
      {
        id: 'creating-npcs',
        category: 'Storytelling',
        title: 'Creating NPCs',
        introduction: [
          {
            segments: [
              { text: 'Before creating a new NPC, check the ' },
              { text: 'Bestiary', link: '/bestiary' },
              { text: '. It contains premade NPCs useful for many common purposes. Reusing a suitable profile and changing its name, appearance, equipment, or description is usually faster than building another NPC from the beginning.' },
            ],
          },
          {
            segments: [
              { text: 'If none of those profiles fit, use this guidance to create one. Most non-player characters need only the details that could matter during their scene. Begin with the NPC’s purpose and behaviour, then assign a few relevant pools rather than completing an entire character sheet.' },
            ],
          },
        ],
        steps: [
          {
            title: 'Define Their Purpose',
            description: 'Write one sentence explaining what the NPC wants and how they normally pursue it.',
          },
          {
            title: 'Choose Tier & Role',
            description: 'Threat Tier determines the NPC’s overall power and encounter value. Role describes how the NPC applies that power.',
          },
          {
            title: 'Assign Relevant Pools',
            description: 'Give the NPC one best pool, one or two secondary pools, and any obvious weakness. These may be complete Descriptors or Attributes.',
          },
          {
            title: 'Assign Combat Values',
            description: 'When physical conflict is likely, record Health, Armour, Move, weapons, Damage, and any relevant defensive pool.',
          },
          {
            title: 'Add Defining Abilities',
            description: 'Give the NPC only the special rules necessary to make it distinctive and fulfil its intended role.',
          },
          {
            title: 'Decide Their Behaviour',
            description: 'Record how the NPC begins a confrontation, when it changes tactics, and whether it retreats, surrenders, bargains, or fights to the end.',
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Only assign a statistic when it becomes relevant. ', strong: true },
              { text: 'An incidental merchant does not need Health or combat pools until the fiction makes them necessary.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Use standard Difficulties for incidental opposition and full Opposed Checks for important rivals. Reuse simple profiles for groups of similar NPCs, then add one memorable trait or specialty when an individual needs distinction.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'NPC Profile Checklist',
            table: {
              headers: ['Element', 'Record'],
              rows: [
                ['Identity', 'Name, appearance, affiliation, and one memorable detail'],
                ['Motivation', 'What the NPC wants from the current situation'],
                ['Threat', 'Tier, Role, and Threat value'],
                ['Capabilities', 'Best pool, secondary pools, and an important weakness'],
                ['Combat', 'Health, Armour, Move, Attacks, and Damage when relevant'],
                ['Abilities', 'One to three rules that distinguish the NPC'],
                ['Behaviour', 'Preferred tactics and response to changing circumstances'],
                ['Morale', 'Conditions under which the NPC retreats, surrenders, or bargains'],
                ['Alternatives', 'Ways the characters might deceive, persuade, avoid, or otherwise overcome the NPC'],
              ],
            },
          },
          {
            title: 'NPC Attribute & Descriptor Benchmarks',
            table: {
              headers: ['Rating', 'Benchmark'],
              rows: [
                ['1D', 'Below human average for an Attribute'],
                ['2D', 'Human average for an Attribute and many Descriptors'],
                ['3D', 'Average level of training for a human'],
                ['4D', 'Professional level of training for a human'],
                ['5D', 'Above-average expertise'],
                ['6D', 'Best in a city or geographic area; approximately 1 in 100,000'],
                ['7D', 'Among the best in a region; approximately 1 in 10,000,000'],
                ['8D', 'Among the best in a country; approximately 1 in 100,000,000'],
                ['9D', 'One of the best on a continent; approximately 1 in a billion'],
                ['10D', 'One of the best in a hemisphere'],
                ['11D', 'One of the best to ever live'],
                ['12D+', 'Among the most legendary'],
              ],
            },
          },
        ],
      },
      {
        id: 'npc-threat-tiers-and-roles',
        category: 'Storytelling',
        title: 'NPC Threat Tiers & Roles',
        introduction: [
          {
            segments: [
              { text: 'Threat Tier', strong: true },
              { text: ' estimates an NPC’s overall impact and provides its Threat value for encounter building. ' },
              { text: 'Role', strong: true },
              { text: ' describes how that NPC applies its power. Tier and Role are separate, so two NPCs with the same Threat value can create very different challenges.' },
            ],
          },
          {
            segments: [
              { text: 'These profiles are preparation shortcuts rather than mandatory limits. Important recurring NPCs may use complete character rules, while unusual creatures may exchange one suggested strength for another.' },
            ],
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Do not maximize every defense. ', strong: true },
              { text: 'An NPC with exceptional accuracy, Damage, Armour, and Health will be substantially more dangerous than its listed Tier. Major opponents should gain interesting abilities and weaknesses instead of relying entirely on inflated numbers.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Armour 4 or higher should be visibly formidable and have a discoverable counter, such as Armour-Piercing equipment, an exposed component, an environmental hazard, or another approach established by the fiction.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'NPC Threat Tiers',
            paragraphs: [
              'The suggested profiles are initial playtest values. Best pools represent the NPC’s defining specialty, not every roll they make.',
            ],
            table: {
              headers: ['Tier', 'Threat', 'Suggested Profile'],
              rows: [
                ['Minion', '1', 'Best pool 3D; Health 8–12; Damage 3–5; Armour 0–1; one simple ability'],
                ['Regular', '2', 'Best pool 4D; Health 20–30; Damage 5–7; Armour 0–2; one defining ability'],
                ['Elite', '4', 'Best pool 5D; Health 30–45; Damage 7–9; Armour 1–3; two abilities or a useful Reaction'],
                ['Major', '8', 'Best pool 5D–6D; Health 45–60 or distinct phases; Damage 8–12; Armour 2–4; several abilities and an exploitable weakness'],
                ['Apex', '16', 'A custom, campaign-defining opponent with 6D–7D specialties, changing phases, objectives, counters, or environmental effects'],
              ],
            },
          },
          {
            title: 'NPC Roles',
            paragraphs: [
              'Roles do not normally change Threat value because their advantages should be offset by limitations elsewhere in the profile.',
            ],
            table: {
              headers: ['Role', 'Design Direction'],
              rows: [
                ['Bruiser', 'Durable close-range pressure with limited mobility or ranged capability'],
                ['Striker', 'High Damage or precision with reduced durability'],
                ['Skirmisher', 'Strong movement and Active Defense with limited staying power'],
                ['Controller', 'Conditions, hazards, forced movement, or area denial with modest direct Damage'],
                ['Support', 'Protection, healing, coordination, or reinforcement abilities; vulnerable when isolated'],
                ['Specialist', 'Exceptional technical, social, investigative, or Resonance capability with weaker combat statistics'],
              ],
            },
          },
        ],
      },
      {
        id: 'building-encounters',
        category: 'Storytelling',
        title: 'Building Encounters',
        introduction: [
          {
            segments: [
              { text: 'An ' },
              { text: 'encounter', strong: true },
              { text: ' is a situation in which opposition or danger stands between the characters and an objective. Not every encounter must become combat, and not every combat must end with one side destroyed.' },
            ],
          },
          {
            segments: [
              { text: 'Threat budgets help estimate pressure during preparation. They are guidelines rather than guarantees: objectives, terrain, preparation, action economy, equipment, Resonance, and player decisions can substantially change the actual danger.' },
            ],
          },
        ],
        steps: [
          {
            title: 'Define the Objective',
            description: 'Establish what the characters and opposition want to accomplish. Include any reason the encounter cannot be solved by simply defeating every opponent.',
          },
          {
            title: 'Choose the Pressure',
            description: 'Decide whether the encounter should create Low, Standard, Hard, or Extreme pressure.',
          },
          {
            title: 'Calculate the Budget',
            description: 'Multiply the number of player characters by the Threat per character for the chosen pressure.',
          },
          {
            title: 'Choose Opposition',
            description: 'Spend the budget using NPC Threat values, mixing Tiers and Roles to create the intended kind of challenge.',
          },
          {
            title: 'Add the Environment',
            description: 'Establish Cover, hazards, distances, movement routes, useful objects, and features either side can exploit.',
          },
          {
            title: 'Account for Circumstances',
            description: 'Adjust the expected pressure for surprise, preparation, reinforcements, special objectives, attrition, and action economy.',
          },
          {
            title: 'Provide Alternatives',
            description: 'Consider how stealth, negotiation, investigation, retreat, or interaction with the environment might change or resolve the encounter.',
          },
          {
            title: 'Communicate the Danger',
            description: 'Give the players enough fictional information to recognize overwhelming opposition, unusual defenses, and viable alternatives.',
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Threat budgets are preparation tools, not restrictions. ', strong: true },
              { text: 'The world may contain opposition the characters cannot defeat directly, but the danger and possible alternatives should be communicated through the fiction.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Encounter Budgets',
            table: {
              headers: ['Pressure', 'Threat per Character', 'Expected Experience'],
              rows: [
                ['Low', '1', 'Characters are strongly favoured; limited injury or expenditure is expected'],
                ['Standard', '2', 'Meaningful opposition that should consume some Health, equipment, or Meta Dice'],
                ['Hard', '3', 'Strong tactics matter and one or more characters may become Taken Out'],
                ['Extreme', '4', 'Defeat, capture, retreat, or death is credible and should be clearly telegraphed'],
              ],
            },
          },
          {
            title: 'Example Budgets for Four Characters',
            table: {
              headers: ['Pressure', 'Budget', 'Example Opposition'],
              rows: [
                ['Low', '4', 'Four Minions, two Regulars, or one Elite'],
                ['Standard', '8', 'Four Regulars, two Elites, one Major, or one Elite and two Regulars'],
                ['Hard', '12', 'One Major and one Elite, three Elites, or six Regulars'],
                ['Extreme', '16', 'Two Majors, one Apex, or another suitably varied combination'],
              ],
            },
          },
          {
            title: 'Encounter Adjustments',
            table: {
              headers: ['Circumstance', 'Guidance'],
              rows: [
                ['Superior Enemy Numbers', 'Substantially more meaningful enemy Actions can make the encounter one pressure level harder.'],
                ['Lone Conventional Enemy', 'Without special actions, defenses, or environmental support, one opponent may perform as though it were one Tier lower.'],
                ['Ambush or Fortification', 'Surprise, strong Cover, inaccessible positions, or prepared hazards may make the encounter one pressure level harder until overcome.'],
                ['Strong Character Preparation', 'Useful intelligence, surprise, specialized equipment, or an exploited weakness may reduce the effective pressure.'],
                ['Complicated Objective', 'Protecting civilians, stopping a ritual, completing a repair, or racing a deadline increases pressure without adding NPCs.'],
                ['Reinforcements', 'Include opponents likely to arrive before the encounter is decided. Later waves create less immediate danger but greater attrition.'],
                ['Continued Attrition', 'Evaluate consecutive encounters together when the characters lack enough time or resources to recover between them.'],
                ['Escape or Surrender', 'Dangerous opposition may be less punishing when failure can lead to retreat, capture, negotiation, or another continuing consequence.'],
              ],
            },
          },
        ],
      },
      {
        id: 'creating-a-character',
        category: 'Character',
        title: 'Creating a Character',
        introduction: [
          {
            segments: [
              { text: 'Create a character with the Storyteller’s setting and party premise in mind. The character creator guides players through the following steps and records the completed character on a character sheet.' },
            ],
          },
        ],
        steps: [
          {
            title: 'Basic Information',
            description: 'Choose a name, tagline, and optional portrait.',
          },
          {
            title: 'Heritage',
            description: 'Choose the character’s Heritage, including its starting Attribute ratings, Attribute minimums and maximums, Move, Heritage Descriptors, languages, and other defining abilities.',
          },
          {
            title: 'Allocation Dice',
            description: 'The character’s Heritage provides their Allocation Dice. Divide these Dice into individual Pips as desired. Each Allocation Pip either increases an Attribute within the limits set by Heritage or increases an Edge’s complete pool one Pip above its linked Attribute. A Flaw records a complete pool one Pip below its linked Attribute and grants one additional Allocation Pip. Every starting character must take at least one Flaw, but there is no fixed number of Edges or maximum Descriptor rating.',
          },
          {
            title: 'Resonance Attunement',
            description: 'If the character begins attuned to Resonance, choose one Discipline and begin at Balance 0 with four Prepared Effect slots. Resonance-attuned characters normally receive less starting money.',
          },
          {
            title: 'Starting Equipment',
            description: 'Use the campaign’s starting money to purchase weapons, armour, and other ordinary equipment without additional Characteristics at the average price listed for each equipment category.',
          },
          {
            title: 'Additional Information',
            description: 'Determine starting Health, then add appearance, personality, background, and other personal details.',
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'The creator requires every necessary section to be complete before saving the character. The Storyteller may adjust starting Dice, available traits, equipment, or other limits to suit the setting.' },
            ],
          },
        ],
      },
      {
        id: 'heritage',
        category: 'Character',
        title: 'Heritage',
        introduction: [
          {
            segments: [
              { text: 'Heritage', strong: true },
              { text: ' identifies the kind of person or creature a character is. Human is the standard option, but each setting may offer others. A Heritage provides Allocation Dice, establishes starting Attribute ratings and their character-creation minimums and maximums, and may establish a movement rate, grant Heritage-exclusive abilities, or provide Heritage-related Descriptors.' },
            ],
          },
          {
            segments: [
              { text: 'Heritage should support the setting rather than determine personality. Players still decide their character’s history, beliefs, appearance, and goals. Any nonstandard Heritage must be approved by the Storyteller before its modifiers are applied.' },
            ],
          },
          {
            segments: [
              { text: 'Depending on the setting, Heritage may represent a cultural background, fantasy species, alien ancestry, university education, or another defining origin. See the ' },
              { text: 'Heritages page', link: '/heritages' },
              { text: ' for a non-exhaustive list of options.' },
            ],
          },
        ],
      },
      {
        id: 'attributes-and-descriptors',
        category: 'Character',
        title: 'Attributes & Descriptors',
        introduction: [
          {
            segments: [
              { text: 'D6V defines characters through ' },
              { text: 'Attributes', strong: true },
              { text: ' and ' },
              { text: 'Descriptors', strong: true },
              { text: '. ' },
              { text: 'Attributes', strong: true },
              { text: ' measure a character’s broad, innate capabilities while ' },
              { text: 'Descriptors', strong: true },
              { text: ' represent a character’s background, training, practiced expertise, or defining circumstances. Every Descriptor is recorded as a complete dice pool derived from its linked Attribute.' },
            ],
          },
          {
            segments: [
              { text: 'Every Descriptor is associated with an Attribute. An Edge records a complete pool higher than the linked Attribute, while a Flaw records a complete pool one Pip lower. When a Descriptor clearly applies, roll its complete pool instead of the Attribute. When there is no relevant ' },
              { text: 'Descriptor', strong: true },
              { text: ', the base ' },
              { text: 'Attribute', strong: true },
              { text: ' is rolled. Whenever an Attribute increases by one Pip, every Descriptor linked to it also increases by one Pip at no additional XP cost.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Attribute', strong: true },
              { text: ' and complete ' },
              { text: 'Descriptor', strong: true },
              { text: ' ratings use the notation xD±y: x is the number of six-sided dice rolled, and y is the number of pips added to or subtracted from the result. For example, ' },
              { text: '2D+2', strong: true },
              { text: ' means two dice plus two pips, while ' },
              { text: '4D−2', strong: true },
              { text: ' means four dice minus two pips.' },
            ],
          },
        ],
        attributes: [
          { name: 'Strength', description: 'Measures physical power, endurance, and durability.' },
          { name: 'Dexterity', description: 'Measures agility, coordination, reflexes, and hand-eye control.' },
          { name: 'Social', description: 'Measures presence, empathy, judgment, and the ability to understand or influence others.' },
          { name: 'Intelligence', description: 'Measures memory, reasoning, education, and accumulated knowledge.' },
          { name: 'Mechanics', description: 'Measures technical intuition, spatial reasoning, and aptitude for operating, diagnosing, and repairing machines or technological systems.' },
          { name: 'Resonance', description: 'Measures a character’s connection to forces beyond the ordinary world.' },
        ],
        attributeGuidance: 'The Storyteller determines which Attribute best matches an action. A character’s Heritage establishes each Attribute’s starting rating and its minimum and maximum during character creation. Individual settings may emphasize, reinterpret, or place further limits on particular Attributes.',
        descriptorGuidance: [
          {
            segments: [
              { text: 'Descriptors', strong: true },
              { text: ' generally fall into one of two categories: ' },
              { text: 'Edges', strong: true },
              { text: ' or ' },
              { text: 'Flaws.', strong: true },
              { text: ' There is no fixed limit on the number or complete pool rating of ' },
              { text: 'Edges', strong: true },
              { text: ' a character may possess. Every starting character must have at least one ' },
              { text: 'Flaw', strong: true },
              { text: ' with a relative rating of −1 Pip below its linked Attribute.' },
            ],
          },
          {
            segments: [
              { text: 'Edges', strong: true },
              { text: ' represent favorable qualities, experience, or circumstances and record a complete pool above an associated ' },
              { text: 'Attribute', strong: true },
              { text: '. ' },
              { text: 'Flaws', strong: true },
              { text: ' represent limitations, vulnerabilities, or complications and record a complete pool one Pip below an associated ' },
              { text: 'Attribute', strong: true },
              { text: '. No individual Flaw can be more severe than this relative −1 Pip. A ' },
              { text: 'Descriptor', strong: true },
              { text: ' affects an action only when it meaningfully applies; the ' },
              { text: 'Storyteller', strong: true },
              { text: ' makes the final decision about its relevance. Players may explain or argue why a Descriptor should or should not apply.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Only one ' },
              { text: 'Descriptor', strong: true },
              { text: ' applies to any single given roll.' },
            ],
          },
          {
            segments: [
              { text: 'Descriptors', strong: true },
              { text: ' are intentionally open-ended rather than drawn from a comprehensive list. See the ' },
              { text: 'Descriptors page', link: '/descriptors' },
              { text: ' for additional examples.' },
            ],
          },
        ],
        edges: ['Former Police Officer', 'Blacksmith', 'Field Medic', 'Computer Nerd', 'Aristocratic Education'],
        flaws: ['Painful Scars', 'Alcoholic', 'Overtly Arrogant', 'Severely Asthmatic'],
      },
      {
        id: 'derived-statistics',
        category: 'Character',
        title: 'Derived Statistics',
        introduction: [
          {
            segments: [
              { text: 'Derived Statistics', strong: true },
              { text: ' are calculated after Attributes, traits, and Descriptors have been assigned. They summarize important values used during play and must be recalculated whenever a source value changes.' },
            ],
          },
        ],
        conceptsTitle: 'Derived Values',
        concepts: [
          {
            name: 'Health',
            description: 'Roll the character’s Strength rating without a Descriptor, Wild Die, or Meta Die, then add 20. The character creator permits one reroll; changing Strength restores that reroll. The accepted result becomes both current and maximum Health.',
          },
          {
            name: 'Defense Bonus',
            description: 'Gain +1 for every two full Dexterity dice above 2D, rounded down. The character sheet calculates this value. Add it whenever a rule calls for Active or Full Defense.',
          },
          {
            name: 'Move',
            description: 'A standard Human has a Move of 10 metres. Heritage may provide a different base Move, and traits or advancement may modify it.',
          },
          {
            name: 'Meta Dice',
            description: 'Meta Dice belong to the player rather than the character. Each player begins with 2 available Meta Dice and can normally hold a maximum of 5.',
          },
          {
            name: 'Resonance Attunement',
            description: 'An attuned starting character knows one Discipline, begins at Balance 0, and has 4 Prepared Effect slots.',
          },
          {
            name: 'Experience',
            description: 'A new character begins with 0 unspent and 0 total Experience Points unless the Storyteller is creating experienced characters.',
          },
        ],
      },
      {
        id: 'experience',
        category: 'Character',
        title: 'Experience',
        introduction: [
          {
            segments: [
              { text: 'The ' },
              { text: 'Storyteller', strong: true },
              { text: ' awards Experience Points (XP) at the end of each session. A standard session currently awards approximately ' },
              { text: '5 XP', strong: true },
              { text: '. This is a provisional pace for playtesting and may be adjusted for the session’s length and significance.' },
            ],
          },
          {
            segments: [
              { text: 'When a character’s ' },
              { text: 'Flaw', strong: true },
              { text: ' has an especially significant impact on the session, the Storyteller is encouraged to award that character additional XP.' },
            ],
          },
          {
            segments: [
              { text: 'Characters spend XP directly to improve their capabilities; D6V does not use conventional character levels. XP advances the character, while money purchases equipment. These two economies remain separate.' },
            ],
          },
        ],
        advancementSections: [
          {
            title: 'Descriptor Advancement',
            paragraphs: [
              'Descriptors are expressed as complete dice pools and advance one Pip at a time. The cost of an increase is twice the number before D in the new complete Descriptor rating. A new Edge begins one Pip above its linked Attribute and uses the same formula. Flaws remain one Pip below their linked Attribute and cannot be advanced separately.',
            ],
            formula: 'Descriptor +1 Pip = 2 × number before D in the new complete Descriptor rating',
            note: 'Example: Strength is 2D+2 and Wrestler is 3D+1, representing a +2 Pip improvement. Increasing Wrestler to 3D+2, a full +1D above Strength, costs 2 × 3 = 6 XP. Increasing 3D+2 to 4D would cost 2 × 4 = 8 XP.',
          },
          {
            title: 'Attribute Advancement',
            paragraphs: [
              'Attributes apply to broad portions of a character’s capabilities and are therefore considerably more expensive to improve. Whenever an Attribute increases by one Pip, every Descriptor linked to that Attribute also increases by one Pip without an additional cost.',
            ],
            formula: 'Attribute +1 Pip = 4 × target die level',
            note: 'Increasing an Attribute from 2D to 3D costs approximately 28 XP: 8 XP for each of the first two Pips, then 12 XP for the final Pip that reaches 3D.',
          },
          {
            title: 'Resonance Advancement',
            paragraphs: [
              'A Resonance-attuned character may broaden their prepared options or unlock another Discipline through advancement.',
            ],
            formula: 'Prepared Effect slot = 5 XP · Additional Discipline = 25 XP',
            note: 'A new Discipline must be approved by the Storyteller and should fit the setting and the character’s development.',
          },
        ],
        detailSections: [
          {
            title: 'Increasing Maximum Health',
            paragraphs: [
              'A character may increase maximum Health one point at a time. The XP cost equals one-tenth of the new maximum Health, rounded up. Increasing maximum Health does not restore current Health.',
            ],
            table: {
              headers: ['Increase', 'XP Cost'],
              rows: [
                ['29 → 30 Health', '3 XP'],
                ['30 → 31 Health', '4 XP'],
                ['39 → 40 Health', '4 XP'],
                ['40 → 41 Health', '5 XP'],
              ],
            },
          },
          {
            title: 'Improving Move',
            paragraphs: [
              'A character may spend XP to increase their Move one metre at a time. Each increase becomes progressively more expensive.',
            ],
            table: {
              headers: ['Increase', 'XP'],
              rows: [
                ['10 → 11 m', '5 XP'],
                ['11 → 12 m', '6 XP'],
                ['12 → 13 m', '7 XP'],
                ['13 → 14 m', '8 XP'],
                ['14 → 15 m', '9 XP'],
              ],
            },
          },
          {
            title: 'Natural Move Limit',
            paragraphs: [
              'Move cannot be increased beyond 15 metres through natural training. Exceeding 15 metres requires an appropriate fictional justification approved by the Storyteller, such as:',
            ],
            items: ['Supernatural Heritage', 'Cybernetics', 'Magical enhancement', 'Nonhuman physiology', 'Superpowers'],
          },
        ],
      },
      {
        id: 'example-untrained-check',
        category: 'Examples',
        title: 'Example: Untrained Check',
        introduction: [
          {
            segments: [
              { text: 'While the ' },
              { text: 'Starship Hercules', strong: true },
              { text: ' charts an unclaimed system for the Human Empire, its communications relay jams. Captain Jimbo Curt attempts a field repair, but he has no relevant Descriptor.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Choose the Pool',
            paragraphs: [
              'The repair uses Mechanics. Captain Curt has Mechanics 2D+1 and no applicable Descriptor, so he rolls the Attribute itself. The Storyteller sets Standard Difficulty (TN 11).',
            ],
          },
          {
            title: 'Roll and Outcome',
            paragraphs: [
              'Curt rolls an ordinary die showing 3 and a Wild Die showing 4, then adds his +1 Pip: 3 + 4 + 1 = 8.',
              'The result is 3 below TN 11, producing No. The relay remains jammed and Curt must find another solution.',
            ],
          },
        ],
      },
      {
        id: 'example-edge-assisted-check',
        category: 'Examples',
        title: 'Example: Edge-Assisted Check',
        introduction: [
          {
            segments: [
              { text: 'A gravitic surge destabilizes the ' },
              { text: 'Hercules', strong: true },
              { text: ' jump drive during an Imperial survey. Ensign Porter races to bring the drive back under control.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Choose the Pool',
            paragraphs: [
              'Porter has Mechanics 4D, but his Starship Engineer Edge is a complete 5D+1 pool and directly applies. He rolls the Descriptor instead of adding it to Mechanics. The failing drive is Challenging (TN 14).',
            ],
          },
          {
            title: 'Roll and Outcome',
            paragraphs: [
              'Porter rolls four ordinary dice showing 2, 3, 4, and 4, plus a Wild Die showing 5, then adds +1: 2 + 3 + 4 + 4 + 5 + 1 = 19.',
              'The result is 5 above TN 14, producing Yes. Porter stabilizes the jump drive before it tears the Hercules out of alignment.',
            ],
          },
        ],
      },
      {
        id: 'example-flaw-check',
        category: 'Examples',
        title: 'Example: Flaw Check',
        introduction: [
          {
            segments: [
              { text: 'Ensign Porter must crawl into a narrow plasma conduit aboard the ' },
              { text: 'Hercules', strong: true },
              { text: ' to stop a cascade threatening the Human Empire’s expedition.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Choose the Pool',
            paragraphs: [
              'Porter normally has Mechanics 4D, but his Cramped-Space Panic Flaw applies inside the conduit. The Flaw is a complete 3D+2 pool, so it replaces Mechanics for this check. The repair is Standard (TN 11).',
            ],
          },
          {
            title: 'Roll and Outcome',
            paragraphs: [
              'Porter rolls two ordinary dice showing 1 and 3, plus a Wild Die showing 4, then adds +2: 1 + 3 + 4 + 2 = 10.',
              'The result is 1 below TN 11, producing No, but… Porter cannot complete the repair, but he isolates the conduit before the cascade spreads to the rest of the ship.',
            ],
          },
        ],
      },
      {
        id: 'example-opposed-check',
        category: 'Examples',
        title: 'Example: Opposed Check',
        introduction: [
          {
            segments: [
              { text: 'Captain Jimbo Curt negotiates for alien star charts that could advance the ' },
              { text: 'Hercules', strong: true },
              { text: ' mission on behalf of the Human Empire. A wary Veyran envoy intends to keep the charts secret.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Both Sides Roll',
            paragraphs: [
              'Curt uses his complete Imperial Captain Descriptor of 4D+1. He rolls ordinary dice showing 2, 4, and 4, plus a Wild Die showing 4, then adds +1: 15.',
              'The envoy uses Suspicious Diplomat 4D. The envoy rolls ordinary dice showing 3, 3, and 4, plus a Wild Die showing 5: 15.',
            ],
          },
          {
            title: 'Resolve the Tie',
            paragraphs: [
              'Neither side compares its result with a fixed Difficulty. Their opposed totals are equal, so the defender or existing status quo wins. The envoy politely refuses to surrender the star charts.',
            ],
          },
        ],
      },
      {
        id: 'example-group-stealth',
        category: 'Examples',
        title: 'Example: Group Stealth',
        introduction: [
          {
            segments: [
              { text: 'The crew of the ' },
              { text: 'Hercules', strong: true },
              { text: ' crosses a derelict alien vessel while a Kharon security drone searches the passage. Each crew member rolls separately to remain hidden.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'The Observer',
            paragraphs: [
              'The drone rolls its Sensor Sweep 3D+2 once for this search: ordinary dice of 3 and 4, a Wild Die of 3, and +2 Pips total 12. That search total is compared with each crew member’s individual result.',
            ],
          },
          {
            title: 'The Crew',
            table: {
              headers: ['Crew Member', 'Pool and Roll', 'Result'],
              rows: [
                ['Captain Curt', 'Dexterity 3D: 4 + 5 + Wild 4 = 13', 'Hidden; 13 beats 12'],
                ['Dr Sport', 'Dexterity 2D+2: 3 + Wild 4 + 2 = 9', 'Detected; 9 loses to 12'],
                ['Ensign Ashley', 'Security Infiltration 4D+1: 3 + 4 + 4 + Wild 4 + 1 = 16', 'Hidden; 16 beats 12'],
                ['Ensign Porter', 'Maintenance Crawler 3D: 3 + 4 + Wild 5 = 12', 'Detected; the observer wins the tie'],
              ],
            },
            paragraphs: [
              'The drone spots Dr Sport and Ensign Porter. Even though Curt and Ashley remain personally hidden, the detected crew members compromise the group’s attempt to pass unseen.',
            ],
          },
        ],
      },
      {
        id: 'example-grappling',
        category: 'Examples',
        title: 'Example: Grappling',
        introduction: [
          {
            segments: [
              { text: 'A Kharon raider boards the ' },
              { text: 'Hercules', strong: true },
              { text: ' with a shock baton. Ensign Ashley attempts to seize the armed intruder before it reaches the Imperial navigation archive.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Start the Grapple',
            paragraphs: [
              'Because the raider is armed, Ashley makes an unarmed Attack against Standard Difficulty (TN 11). She uses Close-Quarters Security 4D+2 and rolls ordinary dice of 2, 4, and 5, a Wild Die of 3, and +2 Pips for a total of 16.',
              'The result is 5 above the TN, producing Yes. The raider becomes Grappled, but the Attack deals no Damage.',
            ],
          },
          {
            title: 'Escape and Maintenance',
            paragraphs: [
              'On its turn, the raider tries to slip free with Slippery Raider 3D+1 and totals 10. Ashley opposes with Close-Quarters Security 4D+2 and totals 15. The raider fails to escape.',
              'On Ashley’s next turn, she spends one Action to maintain the Grapple and another Action to drag the raider 2 metres. Because she is taking two Actions, any Action rolls she makes that turn suffer −1D.',
            ],
          },
        ],
      },
      {
        id: 'example-multiple-actions',
        category: 'Examples',
        title: 'Example: Multiple Actions',
        introduction: [
          {
            segments: [
              { text: 'During a boarding emergency aboard the ' },
              { text: 'Hercules', strong: true },
              { text: ', Ensign Porter declares three Actions before acting: reroute the shields, seal a bulkhead, and Run toward engineering.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Apply the Penalty',
            paragraphs: [
              'Three declared Actions impose −2D on every Action roll that turn. Running requires no roll in this situation, but it still counts as an Action and raises Porter’s total movement allowance from his Move of 10 metres to 20 metres.',
            ],
          },
          {
            title: 'Resolve Each Action',
            paragraphs: [
              'Starship Engineer 5D+1 becomes 3D+1. Porter rolls 3, 4, Wild 5, and +1 for 13 against Standard TN 11: Yes, but… The shields return, but the rushed rerouting drains a sensor bank.',
              'Damage Control 4D+2 becomes 2D+2. Porter rolls 2, Wild 5, and +2 for 9 against Easy TN 8: Yes, but… The bulkhead seals, but its manual controls burn out.',
              'Porter then Runs toward engineering. The two successful checks retain their complications; taking several Actions does not merge them into one roll.',
            ],
          },
        ],
      },
      {
        id: 'example-active-defense',
        category: 'Examples',
        title: 'Example: Active Defense',
        introduction: [
          {
            segments: [
              { text: 'A Veyran mercenary fires a plasma rifle at Ensign Ashley across the ' },
              { text: 'Hercules', strong: true },
              { text: ' hangar. At Long range, the Attack would normally face Challenging Difficulty (TN 14).' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Make the Reaction',
            paragraphs: [
              'Ashley takes Active Defense as a Reaction. It is her only Action or Reaction this Round, so there is no multiple-action penalty. Her Defense Bonus is 0, and she rolls Evasive Security 4D+2: ordinary dice of 2, 4, and 5, a Wild Die of 3, and +2 Pips total 16.',
            ],
          },
          {
            title: 'Replace the Difficulty',
            paragraphs: [
              'Ashley’s Active Defense result replaces the normal TN 14. The mercenary’s Attack totals 15 and misses because it does not meet the new Difficulty of 16.',
              'Active Defense replaces the normal Difficulty even when the defense roll is lower. If Ashley had rolled 12, the mercenary would have needed only 12 to hit, making Active Defense a calculated risk.',
            ],
          },
        ],
      },
      {
        id: 'example-damage-stabilization',
        category: 'Examples',
        title: 'Example: Damage and Stabilization',
        introduction: [
          {
            segments: [
              { text: 'While defending the ' },
              { text: 'Hercules', strong: true },
              { text: ', Ensign Porter is struck by a plasma carbine. He has 6 of 30 Health remaining and wears Armour with Absorption 2.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Apply Damage',
            paragraphs: [
              'The plasma carbine deals Damage 8. Armour reduces it by 2, so Porter loses 6 Health: 8 − 2 = 6. He falls to 0 Health and is Taken Out.',
            ],
          },
          {
            title: 'Stabilize the Patient',
            paragraphs: [
              'Dr Sport uses a medical item and rolls his complete Ship’s Doctor Descriptor of 5D+1 against Standard TN 11. His ordinary dice show 2, 3, 4, and 5, his Wild Die shows 4, and the +1 Pip produces 19.',
              'The stabilization succeeds. Porter stops making death checks, but stabilization restores no Health; he remains at 0 Health. The medical item used for the attempt is expended.',
            ],
          },
          {
            title: 'Restore Health',
            paragraphs: [
              'Dr Sport then uses a second medical item with Treatment 6. His 5D+1 roll totals 14 against TN 11, producing Yes and restoring the full 6 Health.',
              'Porter now has 6 of 30 Health. That is 20%, rounded down, so he is in the Critical Health Band.',
            ],
          },
        ],
      },
      {
        id: 'example-modified-resonance',
        category: 'Examples',
        title: 'Example: Modified Resonance Effect',
        introduction: [
          {
            segments: [
              { text: 'A shuttle from the ' },
              { text: 'Hercules', strong: true },
              { text: ' is caught in an alien debris storm during an Imperial survey. Captain Jimbo Curt invokes his prepared Gravitic Barrier to protect it.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Build the Difficulty',
            table: {
              headers: ['Element', 'Difficulty'],
              rows: [
                ['Base Resonance Difficulty', 'TN 11'],
                ['Standard Effect Severity', 'No change'],
                ['40-metre Range', '+1 Band'],
                ['Large Scale: shuttle-sized', '+1 Band'],
                ['Duration: up to 10 minutes', '+1 Band'],
                ['Final Difficulty', 'TN 20'],
              ],
            },
            paragraphs: [
              'The three positive Difficulty Bands add +9 to TN 11. Gravitic Barrier is prepared, so it receives no unprepared-effect increase.',
            ],
          },
          {
            title: 'Roll and Outcome',
            paragraphs: [
              'Curt rolls Gravitic Commander 5D+2. His ordinary dice show 3, 4, 4, and 5, his Wild Die shows 2, and the +2 Pips bring the total to 20.',
              'Meeting TN 20 produces Yes, but… The barrier protects the shuttle, but its power draw dims the Hercules sensor array at a dangerous moment.',
              'Had Gravitic Barrier been unprepared, it would have gained another +2 Bands, raising the final Difficulty to TN 26.',
            ],
          },
        ],
      },
      {
        id: 'example-drowning',
        category: 'Examples',
        title: 'Example: Drowning',
        introduction: [
          {
            segments: [
              { text: 'An alien specimen ruptures a water tank in the ' },
              { text: 'Hercules', strong: true },
              { text: ' xenobiology lab, trapping Dr Sport beneath a jammed emergency hatch.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Hold Breath',
            paragraphs: [
              'Dr Sport has Strength 2D, so under combat pressure he can function without air for 2 + 2 = 4 Rounds. He begins making Drowning checks on Round 5.',
            ],
          },
          {
            title: 'Escalating Checks',
            paragraphs: [
              'On Round 5, Sport rolls Zero-G Survival 2D+2 against Standard TN 11. His ordinary die shows 3. His Wild Die rolls 6 and explodes for another 4. Adding +2 gives 3 + 6 + 4 + 2 = 15. He succeeds, so the next check rises one Band to Challenging TN 14.',
              'On Round 6, he rolls an ordinary 4, a Wild 3, and +2 for 9. He fails the TN 14 check and takes 5 Damage that ignores Armour. The checks would continue each Round until he could breathe, but he forces open the emergency air hatch before the next one.',
            ],
          },
        ],
      },
      {
        id: 'example-stealth-kill',
        category: 'Examples',
        title: 'Example: Stealth Kill',
        introduction: [
          {
            segments: [
              { text: 'A minor Kharon sentry guards a navigation core needed by the ' },
              { text: 'Hercules', strong: true },
              { text: ' expedition. Before Ensign Ashley approaches, the Storyteller establishes that the isolated sentry is a valid target for a Stealth Takedown.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Make the Attack',
            paragraphs: [
              'The sentry is unaware and within reach, so Ashley declares a lethal Stealth Takedown with a vibroknife. The knife uses fixed Easy Difficulty (TN 8) and Damage 4. Ashley’s Security Infiltration 4D+1 gains Standard Advantage, becoming 5D+1.',
              'She rolls ordinary dice of 2, 3, 4, and 5, a Wild Die of 3, and +1 Pip for a total of 18. The result is 10 above TN 8, producing Yes, and…',
            ],
          },
          {
            title: 'Check the Threshold',
            paragraphs: [
              'The sentry has maximum Health 20 and Armour Absorption 1. The vibroknife deals 4 − 1 = 3 Damage after Armour. Ten percent of 20 Health is 2, and 3 is at least 2, so Ashley’s declared kill succeeds immediately.',
              'If the post-Armour Damage had been less than 2, the sentry would have lost Health normally and the instant takedown would have failed.',
            ],
          },
        ],
      },
      {
        id: 'example-starfighters-versus-larger-ship',
        category: 'Examples',
        title: 'Example: Starfighters Against a Larger Ship',
        introduction: [
          {
            segments: [
              { text: 'Two Kharon starfighters attack the ' },
              { text: 'Starship Hercules', strong: true },
              { text: ' during its mission for the Human Empire. Each starfighter is Scale 1. The Hercules is a Scale 3 exploration ship with 50 Structure and Armour Absorption 2.' },
            ],
          },
        ],
        detailSections: [
          {
            title: 'Make the Attacks',
            paragraphs: [
              'Captain Jimbo Curt holds the Hercules on course through a narrow debris gap and does not use Active Defense. Both Attacks are made at Medium range against Standard Difficulty (TN 11). Because the Scale 3 ship presents such a large target to the Scale 1 starfighters, the Storyteller grants each attacker Standard Advantage.',
              'Each pilot has the complete Kharon Wing Officer Descriptor at 4D. Standard Advantage raises each Attack pool to 5D. The first rolls ordinary dice of 2, 3, 4, and 4 plus a Wild Die of 3 for 16. The second rolls ordinary dice of 2, 2, 3, and 4 plus a Wild Die of 4 for 15. Both Attacks hit with Yes results.',
            ],
          },
          {
            title: 'Ordinary Starfighter Cannons',
            paragraphs: [
              'The first starfighter fires Damage 12 cannons with Weapon Scale 1. Against the Scale 3 Hercules, the Scale difference reduces Damage by 10: 12 + 5 × (1 − 3) = 2.',
              'The Hercules then subtracts Armour 2, reducing the hit to 0 Damage. The Attack hits and scorches the hull, but it causes no Structure loss.',
            ],
          },
          {
            title: 'Anti-Ship Torpedo',
            paragraphs: [
              'The second Scale 1 starfighter carries a specialized Damage 12 torpedo with Weapon Scale 3. The weapon matches the Hercules in Scale, so its Damage is unchanged: 12 + 5 × (3 − 3) = 12.',
              'After Armour 2, the torpedo deals 10 Damage and reduces the Hercules from 50 to 40 Structure. It retains 80% of its maximum Structure and therefore remains in the highest Health Band with no penalty.',
            ],
          },
          {
            title: 'What the Example Shows',
            paragraphs: [
              'A vehicle’s Scale does not prevent it from carrying a weapon of another Scale. Ordinary fighter weapons may be ineffective against a much larger hull, while a specialized anti-ship weapon can threaten it normally. Relative size may also justify situational Advantage or Disadvantage on the Attack, but the Storyteller applies that modifier according to the circumstances rather than automatically.',
            ],
          },
        ],
      },
    ],
  },
  { id: 'fantasy', label: '', categories: [], rules: [] },
  { id: 'space-opera', label: '', categories: [], rules: [] },
  { id: 'modern', label: '', categories: [], rules: [] },
]

const activeSystemId = ref(systems[0].id)
const activeCategory = ref(systems[0].categories[0])
const searchQuery = ref('')

const activeSystem = computed(() => systems.find((system) => system.id === activeSystemId.value))
const numberedRules = computed(() => {
  const categoryCounts = new Map()

  return activeSystem.value.rules.map((rule) => {
    const categoryNumber = (categoryCounts.get(rule.category) || 0) + 1
    categoryCounts.set(rule.category, categoryNumber)
    return { ...rule, categoryNumber }
  })
})
const filteredRules = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return numberedRules.value.filter((rule) => {
    const matchesCategory = activeCategory.value === 'all' || rule.category === activeCategory.value
    const matchesSearch = !query || JSON.stringify(rule).toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })
})

function selectSystem(id) {
  activeSystemId.value = id
  activeCategory.value = systems.find((system) => system.id === id).categories[0] || 'all'
  searchQuery.value = ''
}

function selectCategory(category) {
  activeCategory.value = category
}
</script>

<template>
  <section class="scroll-mt-24" aria-label="Rules systems">
    <div class="flex items-end overflow-hidden px-2" role="tablist" aria-label="Rules systems">
      <button
        v-for="system in systems"
        :id="`${system.id}-tab`"
        :key="system.id"
        :aria-label="system.label || 'Unnamed rules system'"
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
      class="relative min-h-32 border border-amber-300/50 bg-[#07140c]/25 p-5 shadow-[0_0_32px_rgba(251,191,36,0.12),inset_0_0_24px_rgba(251,191,36,0.04)] sm:p-7"
      :aria-labelledby="`${activeSystemId}-tab`"
      role="tabpanel"
    >
      <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"></div>

      <template v-if="activeSystem.categories.length">
        <div class="mb-5 flex items-start gap-3 border border-amber-300/35 bg-amber-300/[0.07] px-4 py-3 text-sm leading-6 text-amber-50" role="note">
          <svg aria-hidden="true" class="mt-0.5 size-5 shrink-0 text-amber-300" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 3 2.5 20h19L12 3Z" />
            <path d="M12 9v5" />
            <path d="M12 17.5h.01" />
          </svg>
          <p><strong class="font-semibold">Playtest rules:</strong> This system is still undergoing playtesting and is subject to change with or without notice.</p>
        </div>

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
            />
          </label>

          <label>
            <span class="sr-only">Filter by category</span>
            <select
              v-model="activeCategory"
              class="w-full cursor-pointer rounded-full border border-amber-400/25 bg-[#07100b] px-5 py-2.5 text-sm text-amber-100 outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15 sm:w-52"
            >
              <option value="all">All categories</option>
              <option v-for="category in activeSystem.categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </label>
        </div>

        <div class="mt-5 overflow-x-auto bg-black/20 p-2 [scrollbar-color:rgba(252,211,77,0.35)_transparent] [scrollbar-width:thin]">
          <div class="flex min-w-max gap-2" role="group" :aria-label="`${activeSystem.label} rule categories`">
            <button
              v-for="category in activeSystem.categories"
              :key="category"
              class="cursor-pointer border px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              :class="activeCategory === category
                ? 'border-amber-200 bg-amber-200/10 text-amber-50 shadow-[0_0_22px_rgba(251,191,36,0.14),inset_0_0_16px_rgba(251,191,36,0.05)]'
                : 'border-amber-400/25 bg-black/20 text-zinc-300 hover:border-amber-300/60 hover:text-amber-100'"
              :aria-pressed="activeCategory === category"
              type="button"
              @click="selectCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div v-if="filteredRules.length" class="mt-8 space-y-5">
          <article
            v-for="rule in filteredRules"
            :key="rule.id"
            class="relative overflow-hidden border border-amber-100/15 bg-[linear-gradient(145deg,rgba(3,12,8,0.94),rgba(0,0,0,0.72))] px-5 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.035)] sm:px-7 sm:py-6"
          >
            <div aria-hidden="true" class="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-amber-200/70 via-amber-400/25 to-transparent"></div>

            <header class="flex flex-wrap items-center gap-3 border-b border-white/[0.08] pb-4">
              <h3 class="text-base font-extrabold uppercase tracking-[0.09em] text-amber-200 sm:text-lg">
                {{ rule.title }}
              </h3>
              <span class="ml-auto border border-amber-300/20 bg-amber-300/[0.055] px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-amber-300/80">
                {{ rule.category.toLowerCase() }}.{{ rule.categoryNumber }}
              </span>
            </header>

            <div class="mt-6 space-y-6 text-sm leading-7 text-zinc-300 sm:text-[0.95rem]">
              <div class="max-w-5xl space-y-5">
                <p
                  v-for="(block, blockIndex) in rule.introduction"
                  :key="blockIndex"
                  :class="block.callout
                    ? 'rounded-lg border border-white/10 bg-zinc-500/10 px-4 py-3 text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]'
                    : 'text-zinc-200'"
                >
                  <template v-for="(part, partIndex) in block.segments" :key="partIndex">
                    <RouterLink
                      v-if="part.link"
                      class="font-semibold text-amber-300 underline decoration-amber-400/35 underline-offset-4 transition hover:text-amber-100"
                      :to="part.link"
                    >
                      {{ part.text }}
                    </RouterLink>
                    <strong v-else-if="part.strong" class="font-semibold text-zinc-50">{{ part.text }}</strong>
                    <span v-else>{{ part.text }}</span>
                  </template>
                </p>
              </div>

              <section v-if="rule.balanceScale" :aria-labelledby="`${rule.id}-scale`">
                <h4 :id="`${rule.id}-scale`" class="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200/90">Balance Track</h4>
                <div class="mt-3 overflow-x-auto border border-white/[0.09] bg-white/[0.018] px-5 py-5 [scrollbar-color:rgba(252,211,77,0.35)_transparent] [scrollbar-width:thin]">
                  <div class="min-w-[44rem]">
                    <div class="relative">
                      <div aria-hidden="true" class="absolute top-4 right-[7%] left-[7%] h-px bg-gradient-to-r from-red-400/65 via-zinc-400/35 to-sky-300/65"></div>
                      <ol class="relative grid grid-cols-7 gap-2">
                        <li v-for="point in rule.balanceScale" :key="point.value" class="flex flex-col items-center text-center">
                          <span
                            class="relative z-[1] grid size-8 place-items-center border bg-[#07100b] text-xs font-extrabold"
                            :class="point.alignment === 'dark'
                              ? 'border-red-400/50 text-red-200 shadow-[0_0_14px_rgba(248,113,113,0.12)]'
                              : point.alignment === 'light'
                                ? 'border-sky-300/50 text-sky-100 shadow-[0_0_14px_rgba(125,211,252,0.12)]'
                                : 'border-zinc-400/45 text-zinc-100'"
                          >
                            {{ point.value }}
                          </span>
                          <span class="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-zinc-400">{{ point.label }}</span>
                        </li>
                      </ol>
                    </div>
                    <div class="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[0.65rem] font-bold uppercase tracking-[0.18em]">
                      <span class="text-red-200/75">Dark Resonance</span>
                      <span class="text-zinc-500">Neutral</span>
                      <span class="text-sky-100/75">Light Resonance</span>
                    </div>
                  </div>
                </div>
              </section>

              <template v-if="rule.concepts">
                <section :aria-labelledby="`${rule.id}-concepts`">
                  <h4 :id="`${rule.id}-concepts`" class="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200/90">{{ rule.conceptsTitle || 'How the rating works' }}</h4>
                  <dl class="mt-3 grid gap-2.5 md:grid-cols-2">
                    <div v-for="concept in rule.concepts" :key="concept.name" class="border-l border-amber-300/35 bg-white/[0.025] px-4 py-3 leading-6">
                      <dt class="text-xs font-bold uppercase tracking-[0.08em] text-zinc-50">{{ concept.name }}</dt>
                      <dd class="mt-0.5 text-zinc-400">{{ concept.description }}</dd>
                    </div>
                  </dl>
                </section>
              </template>

              <div v-if="rule.relationship" class="max-w-5xl space-y-5">
                <p
                  v-for="(block, blockIndex) in rule.relationship"
                  :key="blockIndex"
                  :class="block.callout
                    ? 'rounded-lg border border-white/10 bg-zinc-500/10 px-4 py-3 text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]'
                    : 'text-zinc-200'"
                >
                  <template v-for="(part, partIndex) in block.segments" :key="partIndex">
                    <RouterLink
                      v-if="part.link"
                      class="font-semibold text-amber-300 underline decoration-amber-400/35 underline-offset-4 transition hover:text-amber-100"
                      :to="part.link"
                    >
                      {{ part.text }}
                    </RouterLink>
                    <strong v-else-if="part.strong" class="font-semibold text-zinc-50">{{ part.text }}</strong>
                    <span v-else>{{ part.text }}</span>
                  </template>
                </p>
              </div>

              <div v-if="rule.tables" class="grid items-start gap-4" :class="rule.tables.length > 1 ? 'lg:grid-cols-2' : ''">
                <section
                  v-for="table in rule.tables"
                  :key="table.title"
                  class="overflow-hidden border border-white/[0.09] bg-white/[0.018]"
                  :aria-labelledby="`${rule.id}-${table.title.toLowerCase().replaceAll(' ', '-')}`"
                >
                  <h4 :id="`${rule.id}-${table.title.toLowerCase().replaceAll(' ', '-')}`" class="border-b border-white/[0.08] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200/90">
                    {{ table.title }}
                  </h4>
                  <div class="overflow-x-auto">
                    <table class="w-full border-collapse text-left text-sm">
                      <thead class="bg-white/[0.025] text-[0.68rem] uppercase tracking-[0.12em] text-zinc-400">
                        <tr>
                          <th v-for="header in table.headers" :key="header" class="px-4 py-2.5 font-bold" scope="col">{{ header }}</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-white/[0.06]">
                        <tr v-for="row in table.rows" :key="row.join('-')" class="transition hover:bg-white/[0.025]">
                          <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-4 py-2.5" :class="cellIndex === row.length - 1 ? 'font-semibold text-zinc-100' : 'text-zinc-300'">
                            {{ cell }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              <section v-if="rule.tags" :aria-labelledby="`${rule.id}-examples`">
                <h4 :id="`${rule.id}-examples`" class="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200/90">{{ rule.tagsTitle || 'Example Characteristics' }}</h4>
                <ul class="mt-3 flex flex-wrap gap-2">
                  <li v-for="tag in rule.tags" :key="tag" class="border border-white/[0.09] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-300">{{ tag }}</li>
                </ul>
              </section>

              <ol v-if="rule.steps" class="grid gap-3 md:grid-cols-2">
                <li v-for="(step, stepIndex) in rule.steps" :key="step.title" class="border border-white/[0.09] bg-white/[0.018] p-4">
                  <div class="flex items-center gap-3">
                    <span class="grid size-7 shrink-0 place-items-center border border-amber-300/25 bg-amber-300/[0.05] text-xs font-bold text-amber-200">{{ stepIndex + 1 }}</span>
                    <h4 class="text-xs font-extrabold uppercase tracking-[0.13em] text-zinc-50">{{ step.title }}</h4>
                  </div>
                  <p class="mt-3 leading-6 text-zinc-400">{{ step.description }}</p>
                </li>
              </ol>

              <div v-if="rule.advancementSections" class="grid gap-4 lg:grid-cols-2">
                <section v-for="section in rule.advancementSections" :key="section.title" class="border border-white/[0.09] bg-white/[0.018] p-5">
                  <h4 class="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200/90">{{ section.title }}</h4>
                  <p v-for="paragraph in section.paragraphs" :key="paragraph" class="mt-3 leading-6 text-zinc-300">{{ paragraph }}</p>
                  <p class="mt-4 rounded-lg border border-white/10 bg-zinc-500/10 px-4 py-3 font-semibold text-zinc-50">{{ section.formula }}</p>
                  <p class="mt-3 text-sm leading-6 text-zinc-400">{{ section.note }}</p>
                </section>
              </div>

              <div v-if="rule.detailSections" class="space-y-5">
                <section
                  v-for="(section, sectionIndex) in rule.detailSections"
                  :key="section.title"
                  class="border-t border-white/[0.08] pt-5"
                  :aria-labelledby="`${rule.id}-detail-${sectionIndex}`"
                >
                  <h4 :id="`${rule.id}-detail-${sectionIndex}`" class="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200/90">{{ section.title }}</h4>

                  <div v-if="section.quotes" class="mt-3 space-y-3">
                    <blockquote v-for="quote in section.quotes" :key="`${quote.speaker}-${quote.text}`" class="border-l border-amber-300/30 bg-white/[0.025] px-4 py-3">
                      <p class="text-[0.68rem] font-bold uppercase tracking-[0.13em] text-amber-200/85">{{ quote.speaker }}</p>
                      <p class="mt-1 text-zinc-300 italic">{{ quote.text }}</p>
                    </blockquote>
                  </div>

                  <div v-if="section.paragraphs" class="mt-3 max-w-5xl space-y-4">
                    <p v-for="paragraph in section.paragraphs" :key="paragraph" class="text-zinc-300">{{ paragraph }}</p>
                  </div>

                  <div v-if="section.table" class="mt-3 overflow-hidden border border-white/[0.09] bg-white/[0.018]">
                    <div class="overflow-x-auto">
                      <table class="w-full border-collapse text-left text-sm">
                        <thead class="bg-white/[0.025] text-[0.68rem] uppercase tracking-[0.12em] text-zinc-400">
                          <tr>
                            <th v-for="header in section.table.headers" :key="header" class="px-4 py-2.5 font-bold" scope="col">{{ header }}</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-white/[0.06]">
                          <tr v-for="row in section.table.rows" :key="row.join('-')" class="transition hover:bg-white/[0.025]">
                            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-4 py-2.5" :class="cellIndex === row.length - 1 ? 'font-semibold text-zinc-100' : 'text-zinc-300'">{{ cell }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <ul v-if="section.items" class="mt-3 flex flex-wrap gap-2">
                    <li v-for="item in section.items" :key="item" class="border border-white/[0.09] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-300">{{ item }}</li>
                  </ul>

                  <dl v-if="section.rules" class="mt-3 grid gap-2.5 md:grid-cols-2">
                    <div v-for="item in section.rules" :key="item.name" class="border-l border-amber-300/35 bg-white/[0.025] px-4 py-3 leading-6">
                      <dt class="text-xs font-bold uppercase tracking-[0.08em] text-zinc-50">{{ item.name }}</dt>
                      <dd class="mt-0.5 text-zinc-400">{{ item.description }}</dd>
                    </div>
                  </dl>
                </section>
              </div>

              <template v-if="rule.attributes">
                <section aria-labelledby="primary-attributes">
                  <h4 id="primary-attributes" class="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200/90">The six primary Attributes</h4>
                  <ul class="mt-3 grid gap-2.5 md:grid-cols-2">
                    <li v-for="attribute in rule.attributes" :key="attribute.name" class="border-l border-amber-300/35 bg-white/[0.025] px-4 py-3 leading-6">
                      <strong class="block text-xs font-bold uppercase tracking-[0.08em] text-zinc-50">{{ attribute.name }}</strong>
                      <span class="mt-0.5 block text-zinc-400">{{ attribute.description }}</span>
                    </li>
                  </ul>
                </section>

                <p class="max-w-5xl border-l border-amber-300/25 py-1 pl-4 text-zinc-400">{{ rule.attributeGuidance }}</p>

                <section class="border-t border-white/[0.08] pt-5" aria-labelledby="descriptor-guidance">
                  <h4 id="descriptor-guidance" class="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-200/90">Edges & Flaws</h4>
                  <div class="mt-4 max-w-5xl space-y-5">
                    <p
                      v-for="(block, blockIndex) in rule.descriptorGuidance"
                      :key="blockIndex"
                      :class="block.callout
                        ? 'rounded-lg border border-white/10 bg-zinc-500/10 px-4 py-3 text-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]'
                        : 'text-zinc-200'"
                    >
                      <template v-for="(part, partIndex) in block.segments" :key="partIndex">
                        <RouterLink
                          v-if="part.link"
                          class="font-semibold text-amber-300 underline decoration-amber-400/35 underline-offset-4 transition hover:text-amber-100"
                          :to="part.link"
                        >
                          {{ part.text }}
                        </RouterLink>
                        <strong v-else-if="part.strong" class="font-semibold text-zinc-50">{{ part.text }}</strong>
                        <span v-else>{{ part.text }}</span>
                      </template>
                    </p>
                  </div>
                </section>

                <div class="grid gap-3 sm:grid-cols-2">
                  <section class="border border-white/[0.08] bg-white/[0.018] p-4" aria-labelledby="edge-examples">
                    <h4 id="edge-examples" class="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-amber-200/85">Examples of Edges</h4>
                    <ul class="mt-3 flex flex-wrap gap-2">
                      <li v-for="edge in rule.edges" :key="edge" class="border border-white/[0.08] bg-black/20 px-2.5 py-1 text-xs leading-5 text-zinc-300">{{ edge }}</li>
                    </ul>
                  </section>

                  <section class="border border-white/[0.08] bg-white/[0.018] p-4" aria-labelledby="flaw-examples">
                    <h4 id="flaw-examples" class="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-amber-200/85">Examples of Flaws</h4>
                    <ul class="mt-3 flex flex-wrap gap-2">
                      <li v-for="flaw in rule.flaws" :key="flaw" class="border border-white/[0.08] bg-black/20 px-2.5 py-1 text-xs leading-5 text-zinc-300">{{ flaw }}</li>
                    </ul>
                  </section>
                </div>
              </template>
            </div>
          </article>
        </div>

        <p v-else-if="searchQuery" class="mt-8 border border-dashed border-amber-300/25 px-6 py-8 text-center text-sm text-zinc-400">
          No rules match “{{ searchQuery }}” in this category.
        </p>
      </template>
    </div>
  </section>
</template>
