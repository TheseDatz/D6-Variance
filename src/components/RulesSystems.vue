<script setup>
import { computed, ref } from 'vue'

const metaDiceRule = {
  title: 'Meta Dice',
  introduction: [
    {
      segments: [
        { text: 'D6V uses a metacurrency called ' },
        { text: 'Meta Dice', strong: true },
        { text: '. A player may spend Meta Dice when a roll is especially important, allowing their character to push beyond their normal limits.' },
      ],
    },
  ],
  conceptsTitle: 'Spending Meta Dice',
  concepts: [
    {
      name: 'Spend 1 Meta Die',
      description: 'Add +1D to the roll. Only one Meta Die option can be used on a roll.',
    },
    {
      name: 'Spend 2 Meta Dice',
      description: 'Double the final result of the roll. Only one Meta Die option can be used on a roll.',
    },
  ],
  relationship: [
    {
      callout: true,
      segments: [
        { text: 'Spend Meta Dice after all Dice, Pips, Advantage, Disadvantage, and other modifiers have been applied.' },
      ],
    },
    {
      segments: [
        { text: 'Every player character begins with two Meta Dice and may hold a maximum of five. The Storyteller decides when to award them. An especially impressive or impactful action, or one that is particularly true to the spirit of the story, is a good reason for an award. NPCs and Companions may receive Meta Dice at the Storyteller’s discretion.' },
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
      'Resonance',
      'Storytelling',
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
            description: 'Represent a character’s background, training, practiced expertise, or defining circumstances.',
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
              { speaker: 'Storyteller', text: '“That fits. Roll your Descriptor against a Difficulty of 15.”' },
            ],
          },
          {
            title: 'Resolving the Check',
            paragraphs: [
              'Mara has Pirate Captain 4D+1. Her player rolls three ordinary Dice and one visually distinct Wild Die. The results are 2, 3, 4, and a 6 on the Wild Die. Because the Wild Die produced the 6, it explodes; she rolls it again and gets another 4. After adding the Dice and her +1 Pip, the final result is 20. If an ordinary die had rolled the 6 instead, it would not have been rerolled.',
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
              { text: 'When increasing or decreasing a rating, three Pips convert to one full die. Increasing ' },
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
              { text: 'The player rolls the relevant ' },
              { text: 'Attribute', strong: true },
              { text: ' plus one relevant ' },
              { text: 'Descriptor', strong: true },
              { text: ', totals the result, and compares it with the Difficulty. Meeting or exceeding the target succeeds; rolling below it fails.' },
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
              { text: 'One die in every appropriate dice pool is designated as the ' },
              { text: 'Wild Die', strong: true },
              { text: ' before the roll. It is rolled with the rest of the pool but can produce exceptional results or serious complications.' },
            ],
          },
        ],
        steps: [
          {
            title: 'Exploding 6',
            description: 'When the Wild Die rolls a 6, add the 6 to the result and roll the Wild Die again. Each additional 6 is also added and causes another roll, so the die can continue exploding until it produces a different number.',
          },
          {
            title: 'Complication on 1',
            description: 'When the Wild Die rolls a 1, remove the Wild Die and the highest other die from the result. The remaining dice and Pips determine the final total.',
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
          {
            name: 'Favorable Circumstances: +1D',
            description: 'Add one die when useful positioning, preparation, assistance, tools, or environmental conditions give the character a meaningful advantage.',
          },
          {
            name: 'Unfavorable Circumstances: −1D',
            description: 'Remove one die when poor positioning, inadequate tools, time pressure, impaired visibility, or other conditions meaningfully hinder the character.',
          },
        ],
        conceptsTitle: 'How circumstances modify a roll',
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'Situational modifiers change the dice pool for the affected roll only. The Storyteller determines whether the circumstances are significant enough to justify a modifier.' },
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
              { text: ' when one character’s action is directly resisted by another character. Each participant rolls the Attribute or Descriptor that best represents their approach.' },
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
              { text: 'If the totals are equal, the situation remains unresolved, the acting character fails to overcome the resistance, or the Storyteller calls for another check when continued uncertainty would be interesting. When the distinction matters, the Storyteller should explain how a tie will be resolved before the roll.' },
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
            description: 'When a character actively hides from another character, resolve Dexterity against Intelligence as an Opposed Check.',
          },
          {
            name: 'Groups and Observers',
            description: 'Each member of a group attempting to remain hidden rolls separately. Each observer also searches separately when their individual awareness matters.',
          },
          {
            name: 'Searching for Objects',
            description: 'Searching for a concealed object, clue, compartment, or other thing that is not actively hiding normally uses Intelligence and a relevant Investigation Descriptor against a Difficulty chosen by the Storyteller.',
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
              { text: 'Use ' },
              { text: 'Social', strong: true },
              { text: ' and a relevant Descriptor when a character attempts to persuade, deceive, intimidate, inspire, or understand another person and the outcome is uncertain. Resolve active resistance as an Opposed Check; use a fixed Difficulty when the opposition is incidental.' },
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
              'Companions roll their own Initiative and take their own turns unless a specific ability states otherwise. They do not share Actions, Meta Dice, Health, or other resources with the controlling character. When directing a Companion, a player should use only information the Companion could reasonably possess.',
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
              { text: 'Characteristics are intentionally open-ended. See the ' },
              { text: 'Equipment page', link: '/equipment' },
              { text: ' for a broader, non-exhaustive list.' },
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
        tags: ['Armour-Piercing', 'Accurate', 'Automatic', 'Concealable', 'Reliable', 'Rugged', 'Silent', 'Scoped', 'Lightweight', 'Unwieldy', 'Fragile', 'Incendiary'],
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
          { title: 'Determine Initiative', description: 'Everyone involved rolls Initiative using Dexterity at the beginning of the new Round.' },
          { title: 'Resolve Turns', description: 'Participants take their turns from the highest Initiative result to the lowest.' },
          { title: 'Resolve Consequences', description: 'Apply Damage, movement, conditions, and other effects as they occur.' },
          { title: 'Begin the Next Round', description: 'If the conflict continues, roll Initiative again and repeat the sequence.' },
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
              { text: ' value for free and perform one Action. Running up to twice the character’s Move value counts as an Action.' },
            ],
          },
          {
            segments: [
              { text: 'A character may perform more than one Action during a Round. Each Action beyond the first subtracts ' },
              { text: '−1D', strong: true },
              { text: ' from every Action roll made during that Round. Before making the first roll, the player declares how many Actions the character intends to use.' },
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
              'An improvised weapon uses an appropriate Attribute or Descriptor as chosen by the Storyteller and normally deals the improvised Attack Damage. Particularly dangerous, heavy, fragile, or unsuitable objects may modify the Attack or Damage.',
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
        id: 'making-an-attack',
        category: 'Combat',
        title: 'Making an Attack',
        introduction: [
          {
            segments: [
              { text: 'To Attack, roll the Attribute and Descriptor associated with the weapon or technique. Unless a rule states otherwise, melee Attacks use ' },
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
              { text: 'If the target actively defends, the defender rolls a relevant defensive Descriptor or Dexterity and adds their Defense Bonus. That result replaces the weapon’s normal Difficulty, even when the new value is lower, and applies to every relevant Attack against that defender for the remainder of the Round.' },
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
      },
      {
        id: 'active-defense',
        category: 'Combat',
        title: 'Active Defense',
        introduction: [
          {
            segments: [
              { text: 'When first targeted by an Attack during a Round, a character may use a Reaction to actively defend. Roll a relevant defensive Descriptor or the character’s ' },
              { text: 'Dexterity', strong: true },
              { text: ', then add the character’s Defense Bonus.' },
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
            description: 'A character may forgo their entire turn to concentrate on defense. Roll the most relevant defensive Descriptor or Dexterity, add the Defense Bonus, then add +10. This result applies until the beginning of the character’s next turn.',
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
              { text: '.' },
            ],
          },
          {
            segments: [
              { text: 'A character’s current condition is determined by the percentage of their maximum Health that remains. This allows characters with different maximum Health values to use the same Health Bands.' },
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
            title: 'Tentative Consequences',
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
              { text: 'After three Rounds, the character makes a Strength check during every subsequent Round. Each successful check increases the Difficulty by one step for the next Round. The character dies when one of these checks fails.' },
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
              { text: ' character requires an Intelligence check using any relevant medical Descriptors. A normal attempt expends a medical item and has ' },
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
              { text: 'On a success, the character is stabilized. On a failure, increase the Difficulty of that character’s next death check by one step.' },
            ],
          },
        ],
        tagsTitle: 'Example Medical Descriptors',
        tags: ['First Aid', 'Combat Medic', 'Surgeon', 'Veterinarian', 'Emergency Physician'],
        detailSections: [
          {
            title: 'Treatment Without an Item',
            paragraphs: [
              'A character with a medically relevant Descriptor may make a Standard check to restore 3 Health to a patient without using an item. A patient can benefit from this treatment only once per day.',
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
        id: 'degrees-of-success-in-combat',
        category: 'Combat',
        title: 'Degrees of Success in Combat',
        introduction: [
          {
            segments: [
              { text: 'Combat uses the standard degrees of outcome to determine more than whether an Attack hits. The outcome may introduce an added setback, compromise, or benefit. The following effects are tentative.' },
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
            items: ['Bonus Damage', 'Reduced Armour', 'Knockdown', 'Suppression', 'Disarm', 'Improved position', 'Especially effective use of a relevant weapon Characteristic'],
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
          { name: 'Restricted Actions', description: 'The Grappled character has Disadvantage on Dexterity checks and on Attacks against anyone other than the grappler.' },
          { name: 'Maintaining the Grapple', description: 'The grappler must spend one Action during each of their turns to maintain the Grapple.' },
          { name: 'Close Weapons', description: 'Either character may use only weapons that can reasonably be operated at extremely close range.' },
          { name: 'Release', description: 'The grappler may release the target freely at any time.' },
        ],
        detailSections: [
          {
            title: 'Escaping',
            paragraphs: [
              'Escaping requires an Action. The restrained character makes an opposed Strength check to overpower the grappler or an opposed Dexterity check against the grappler’s Strength to slip free. On a success, the Grapple ends.',
            ],
          },
          {
            title: 'Tackle',
            paragraphs: [
              'A Tackle combines running, Grappling, and knocking the target down. The attacker must move toward the target and make an unarmed Attack with Disadvantage. Running and Tackling count as two Actions, so the normal multiple-action penalty also applies.',
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
              { text: ' before beginning a Choke. Starting or maintaining the Choke requires one Action and an opposed Strength check. That same Action also maintains the underlying Grapple; the attacker does not spend a second Action.' },
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
          { name: 'Attacking', description: 'A Prone character cannot make Attacks.' },
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
            description: 'Make a relevant Attack with Advantage. If the Attack hits, subtract Armour Absorption from Damage to determine the resulting Health loss.',
          },
          {
            title: 'Resolve the Takedown',
            description: 'If the Attack would remove at least 5% of the target’s maximum Health, the target is killed immediately or becomes unconscious for 10D minutes, according to the attacker’s declared intent.',
          },
        ],
        relationship: [
          {
            callout: true,
            segments: [
              { text: 'If the Attack would remove less than 5% of the target’s maximum Health, apply the Health loss normally and the Takedown fails. An unconscious target immediately awakens if they take Damage.' },
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
              { name: 'Major Characters', description: 'Major characters receive whatever final protection the Storyteller considers appropriate.' },
            ],
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
            title: 'Attributes',
            description: 'A standard character has 18D in total. Each of the six Attributes begins at 2D, accounting for 12D, and the player distributes the remaining 6D. Apply any Heritage or Descriptor modifiers, then distribute the available Dice and Pips.',
          },
          {
            title: 'Character Traits',
            description: 'Choose the character’s Heritage, including any Heritage Descriptors, languages, and other defining abilities allowed by the Storyteller.',
          },
          {
            title: 'Descriptors',
            description: 'Choose three Edges and one Flaw.',
          },
          {
            title: 'Starting Equipment',
            description: 'Record weapons, armour, and other equipment approved for the campaign.',
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
              { text: ' identifies the kind of person or creature a character is. Human is the standard option, but each setting may offer others. A Heritage may establish a movement rate, grant Heritage-exclusive abilities, or provide Heritage-related Descriptors.' },
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
              { text: ' represent a character’s background, training, practiced expertise, or defining circumstances.' },
            ],
          },
          {
            segments: [
              { text: 'Every Descriptor is associated with an Attribute. When a Descriptor clearly applies to an action, the character adds the Descriptor’s dice rating to the broader Attribute. When there is no relevant ' },
              { text: 'Descriptor', strong: true },
              { text: ', the base ' },
              { text: 'Attribute', strong: true },
              { text: ' is rolled instead.' },
            ],
          },
          {
            callout: true,
            segments: [
              { text: 'Attribute', strong: true },
              { text: ' and ' },
              { text: 'Descriptor', strong: true },
              { text: ' ratings use the notation xD±y: x is the number of six-sided dice rolled, and y is the number of pips added to or subtracted from the result. For example, ' },
              { text: '2D+3', strong: true },
              { text: ' means two dice plus three pips, while ' },
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
        attributeGuidance: 'The Storyteller determines which Attribute best matches an action. Individual settings may emphasize, reinterpret, or place limits on particular Attributes.',
        descriptorGuidance: [
          {
            segments: [
              { text: 'Descriptors', strong: true },
              { text: ' generally fall into one of two categories: ' },
              { text: 'Edges', strong: true },
              { text: ' or ' },
              { text: 'Flaws.', strong: true },
              { text: ' There is no fixed limit on the number of ' },
              { text: 'Descriptors', strong: true },
              { text: ' a character may possess, but a standard starting character usually begins with three ' },
              { text: 'Edges', strong: true },
              { text: ' and one ' },
              { text: 'Flaw', strong: true },
              { text: '.' },
            ],
          },
          {
            segments: [
              { text: 'Edges', strong: true },
              { text: ' represent favorable qualities, experience, or circumstances that improve an associated ' },
              { text: 'Attribute', strong: true },
              { text: ' when directly relevant. ' },
              { text: 'Flaws', strong: true },
              { text: ' represent limitations, vulnerabilities, or complications that hinder an associated ' },
              { text: 'Attribute', strong: true },
              { text: ' or create an additional cost. A ' },
              { text: 'Descriptor', strong: true },
              { text: ' affects an action only when it meaningfully applies; the ' },
              { text: 'Storyteller', strong: true },
              { text: ' determines its relevance.' },
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
            description: 'Roll the character’s Strength rating and add 20. The character creator permits one reroll; changing Strength restores that reroll. The accepted result becomes both current and maximum Health.',
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
            description: 'A new character begins with 2 available Meta Dice and can normally hold a maximum of 5.',
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
              { text: ' awards Experience Points (XP) at the end of each session. A typical award is ' },
              { text: '3–5 XP', strong: true },
              { text: ', with roughly ' },
              { text: '4 XP', strong: true },
              { text: ' representing an ordinary session.' },
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
              'Descriptors advance one Pip at a time. Their cost rises with the die level being reached, making early competence accessible while higher expertise becomes progressively more expensive.',
            ],
            formula: 'Descriptor +1 Pip = 2 × target die level',
            note: 'A new Descriptor beginning at +1D costs approximately 5 XP.',
          },
          {
            title: 'Attribute Advancement',
            paragraphs: [
              'Attributes apply to broad portions of a character’s capabilities and are therefore considerably more expensive to improve.',
            ],
            formula: 'Attribute +1 Pip = 4 × target die level',
            note: 'Increasing an Attribute from 2D to 3D costs approximately 28 XP: 8 XP for each of the first two Pips, then 12 XP for the final Pip that reaches 3D.',
          },
        ],
        detailSections: [
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
            title: 'Beyond 15 Metres',
            paragraphs: [
              'Increasing Move beyond 15 metres requires an appropriate fictional justification approved by the Storyteller, such as:',
            ],
            items: ['Supernatural Heritage', 'Cybernetics', 'Magical enhancement', 'Nonhuman physiology', 'Superpowers'],
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
