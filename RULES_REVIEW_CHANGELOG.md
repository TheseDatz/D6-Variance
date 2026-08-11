# TTRPG Rules Review Change Log

Date: 2026-07-23

This records the rule, catalog, and interface changes made in response to the design review, followed by recommendations that were requested but not yet adopted as rules.

## Decisions Retained

- Named difficulty bands remain ranges so the Storyteller can choose a number within the band.
- Species remain responsible for attribute minimums and maximums; the character creator does not impose a second concentration cap.
- A 0D roll continues to use the one-Wild-Die floor, making its roll total identical to 1D.
- Active Defense can replace a weapon difficulty with a lower number. This is intentional and remains part of the West End Games-inspired procedure.
- Initiative continues to be rolled every round.
- Adversary and Wanted retain their existing activation language.
- Species do not receive assumed languages, a default Scale, or a mechanical definition of “Small creature.”
- Starting equipment remains a Storyteller-controlled campaign decision rather than a universal balance rule.
- Survival remains a Luck skill.
- No new genre pack was added. Fantasy remains deliberately small.

## Implemented Changes

### Character Creation and Trait Costs

- Corrected the rules and creator copy: Advantages reduce the attribute allocation; Disadvantages increase it.
- Updated attribute-allocation parsing to accept:
  - full dice such as `-1D` and `+1D`;
  - pips such as `-1 pip`, `-2 pips`, `+1 pip`, and `+2 pips`;
  - compound notation such as `-(1D+1)` and `+(1D+1)`;
  - either an ASCII hyphen or Unicode minus sign.
- Trait adjustments are now converted to pips before the creator calculates the final allocation limit.
- Updated the additional-details label and help text from a generic trait modifier to “Attribute Allocation Modifier.”

### Defense, Combat, and Healing

- Renamed Passive Defense to **Defense Bonus** throughout the rules, character sheet, equipment, and vehicle material.
- Preserved its existing behavior: it is added to Active Defense and Full Defense when a rule calls for it.
- A character now makes one Active Defense roll per round. Its result replaces the relevant attack TN for every applicable attack against that character for the rest of the round.
- A reserved wait action may be spent to reroll Active Defense. The new result replaces the previous result even if it is lower.
- Reloading is listed as Free or another cost determined by the weapon.
- Maintaining a choke also maintains the grapple; the two together cost one action.
- Stabilizing an Incapacitated character wakes them. They continue to suffer the Incapacitated `-2D` penalty while they remain in that Health range.
- Stabilizing a Mortally Wounded character moves them to 10% maximum Health and wakes them in the Incapacitated state.
- First Aid now explicitly states that an injury receives one First Aid roll whether the roll succeeds, fails, or restores no Health. Assistants may help, but they do not make additional attempts.
- Two Meta Dice still double permitted rolls, but cannot double healing. One Meta Die may still add `+1D` to a healing roll.
- Replaced the advanced projectile damage category with **Ballistic**:
  - Physical includes blades, clubs, arrows, thrown weapons, crushing, and ordinary impacts.
  - Ballistic includes bullets, firearm projectiles, shrapnel, explosive fragments, and comparable high-velocity penetrators.

### Entanglement

- Replaced equipment dice-code escape difficulties with numeric TNs:
  - Bullwhip 10
  - Bola 11
  - Rope Dart 11
  - Kusari-Gama 13
  - Harpoon 15
  - Spiked Chain 15
  - Hunting Trap 15
  - Manacles 18
- The core Entangled rule now tells the Storyteller to use the item’s listed numeric Escape TN or assign a numeric TN for an improvised restraint.

### Trait Catalog

- Reduced Attribute (Major) now grants `+1D` of attribute allocation.
- Ill-Fated (Minor) now automatically creates one complication per session when its character’s Wild Die rolls 1, even if the check succeeds.
- Natural Talent now grants `+2` at Minor, `+3` at Medium, and `+1D` at Major.
- Inspiring Teacher bonuses now last until the end of the session.
- Compound penalties now use the unambiguous `-(1D+1)` format.
- Debt, Duty, Obligations, Recurring Cost, Dependent, and Secret now activate at Storyteller discretion, with their former session frequency retained only as a suggested guideline.
- Social consequences that depended on an undefined attitude ladder now say that an NPC becomes “less cooperative” or “greatly less cooperative.”
- Adversary and Wanted were deliberately left unchanged.

### Species Creation

- Added a Storyteller rule for creating species:
  - Begin with the Human species allocation of `12D`, Move 10, minimum 1D, and maximum 4D.
  - The ordinary creator adds the universal `6D`, producing the Human total of `18D`.
  - Subtract automatic Advantage costs and add inseparable Disadvantage grants.
  - Minor is 1 pip, Medium 2 pips, Major 1D, and Critical 1D+1.
- Added the current species arithmetic:

| Species | Calculation | Listed allocation |
| --- | --- | --- |
| Human | 12D, no priced Advantage | 12D |
| Dwarf | 12D − Hardy (Medium), 2 pips | 11D+1 |
| Elf | 12D − Acute Sense (Minor), 1 pip | 11D+2 |
| Halfling | 12D − Fortunate (Medium), 2 pips | 11D+1 |

- The rule explicitly leaves species features, attribute limits, Move, anatomy, and setting utility to Storyteller judgment.
- Removed languages from the list of default properties a species establishes.

### Equipment

- Morning Star damage was reduced from Strength Damage `+3D` to `+2D+2`.
- Crossbows gained armour penetration while bows were left unchanged:
  - Light and repeating crossbows: AP 2 and AP 1 respectively.
  - Heavy and crank crossbows: AP 1D.
  - Hand crossbow: AP 1.
- Rewrote Whetstone as a Crafting maintenance tool. It no longer references an equipment-wear penalty that does not exist.
- Added numeric Escape TNs to entangling weapons and restraints.
- Added optional ammunition rules:
  - When ammunition is not tracked, ordinary ammunition is replenished between scenes.
  - When it is tracked, one unit is expended for each attack.
  - The Storyteller may allow half of ordinary arrows and bolts to be recovered after a scene.
- Added:
  - Quiver
  - Arrows (20)
  - Crossbow Bolts (20)
  - Blowgun Darts (20)
  - Sling Shot (20)
  - Powder Horn
  - Black Powder (20 charges)
  - Lead Shot (20)
  - Cartridges (20)
  - Detachable Magazine
- The ammunition quantities and relative values were benchmarked against the [D&D Free Rules equipment list](https://www.fantasygrounds.com/library/5e/dd-free-rules/ch-6-equipment) and [Open Adventure Basic Rules](https://www.aelira.com/openadventure/files/open_adventure/rulebook/basic_1.0.pdf), then mapped to D6V’s existing copper values rather than treated as direct currency conversions.

### Storyteller Equipment Guidance

- Added optional starting allowances:
  - Low-resource campaign: 2,500 copper
  - Standard campaign: 5,000 copper (50 gold)
  - Well-funded campaign: 10,000 copper
- Added default availability guidance:
  - Common: ordinarily available; Very Easy only when supply is strained.
  - Uncommon: Easy.
  - Rare: Difficult.

### Paranormal Access

- Added a rule allowing a character to begin with Paranormal 0D with Storyteller approval.
- The Storyteller decides whether the unallocated dice are reassigned, reserved for a later awakening, or simply reflect species or setting limits.

### Skill Catalog and Weapon Attributes

- Added the following Core skills to both the Skills catalog and the character creator:
  - Luck: Improvisation, Scrounging, and Serendipity.
  - Social: Etiquette, Insight, Networking, and Teaching.
  - Strength: Labor, Might, and Wrestling.
- Reassigned Axes and Blunt Weapons from Dexterity to Strength.
- Added Heavy Polearms as a separate Strength skill.
- Kept the lighter Polearms skill under Dexterity.
- Assigned Halberds, Lances, and Pikes to Heavy Polearms. Spears and Tridents remain under Polearms; Javelins and Harpoons continue to use Throwing at range and Polearms in melee.
- Updated the character creator’s quick-add suggestions and the core Character Skills reference to match.

### Environmental Hazard Reference

- Replaced the “coming soon” placeholder with a complete table covering:
  - mild and severe cold or heat;
  - open flames and burning rooms;
  - poison and disease;
  - suffocation;
  - corrosive exposure;
  - severe electrical shock.
- Each entry provides a check, interval, and failure effect.
- Added guidance for defining individual poisons and diseases, applying protection and preparation, and resolving environmental damage with the normal resistance procedure.

### Rules Examples

- Added an **Examples** system tab.
- Added a complete combat round demonstrating:
  - initiative and declarations;
  - multiple-action penalties;
  - Active Defense replacing a lower weapon difficulty;
  - one defense result applying to the entire round;
  - using a wait action to defend;
  - damage and resistance rolls;
  - armour;
  - Health loss and crossing into the Stunned threshold.

### Vehicles View

- Added a Vehicles navigation entry and `/vehicles` route.
- Added an Owned Vehicles section above the reference catalog.
- Defined two card concepts:
  - **Owned cards:** stateful records containing owner, current and maximum Health, condition, current crew, cargo, damage, and campaign notes.
  - **Reference cards:** reusable profiles containing Scale, Move, Maneuverability, Toughness, maximum Health, armour, crew, capacity, control skill, weapons, and traits.
- Added searchable/filterable reference profiles for:
  - Draft Cart
  - Rowboat
  - Sailing Sloop
  - War Wagon
- The Owned Vehicles section currently provides the intended stateful layout and an empty state. Connecting ownership and persistence can be handled with the future character/species data integration.

## Design Recommendations Not Yet Adopted

### 0D Versus 1D

Keeping the current roll is workable if 0D is an access or training state rather than a probability step. The concern remains that a `-1D` penalty applied to a 1D character has no statistical effect: both 0D and 1D roll one Wild Die.

Recommended clarification:

> At 0D, roll one Wild Die for ordinary actions. A 0D rating is mechanically the system’s minimum roll, but represents no natural aptitude or training. The Storyteller may prohibit 0D attempts that require specialized access or knowledge.

This preserves the “everyone has a chance” floor while making the distinction useful in the fiction.

### Species Outliers

The priced-trait arithmetic has no outliers: every current species matches the new formula exactly. The remaining comparisons are subjective:

- Dwarf pays for Hardy and receives narrow Stonewise, but also has Move 8. This appears reasonable.
- Elf pays for Acute Sense and receives largely narrative Ageless, with stronger Dexterity and Paranormal ceilings. This appears reasonable for a fantasy baseline.
- Halfling pays for Fortunate and receives the mixed-benefit Small Stature feature, but also has Move 8 and a 3D Strength ceiling. This is the option most likely to feel conservative in play. Do not change it pre-emptively; if halfling characters consistently underperform, test either `11D+2` allocation or a narrow additional benefit, not both.

### Items With Health

Give damageable equipment **Toughness as well as Health**, then use the normal damage-minus-resistance procedure. Suggested benchmarks:

| Construction | Toughness | Health | Examples |
| --- | --- | --- | --- |
| Fragile | 1D | 5 | Glass, thin wood, delicate mechanism |
| Light | 2D | 8 | Rope, ordinary chest, simple tool |
| Sturdy | 3D | 15 | Manacles, hunting trap, reinforced door |
| Reinforced | 4D | 25 | Heavy chain, barred gate, small fortification component |

At half Health, an item is impaired and suffers `-1D` on its function or loses one appropriate feature. At 0 Health it is broken. An unattended, exposed item normally uses a fixed attack difficulty; a held or worn item uses the bearer’s defense. This is preferable to Health alone because Health-only objects take the attacker’s full damage every time and produce very abrupt results.

### Fantasy Paranormal Traditions

Start with three traditions that share the core procedure while changing access and consequences:

| Tradition | Typical skill | Source and identity | Suggested limit |
| --- | --- | --- | --- |
| Arcane | Channeling | Learned formulae, diagrams, words, and prepared implements | Requires a free hand, focus, or written source for complex powers |
| Divine | Channeling or Resolve | Oath, prayer, patron, sacred symbol, or communal rite | A broken obligation can suspend specific powers until atonement |
| Primal | Channeling or Survival | Spirits, seasons, beasts, land, and natural cycles | Strongest in an appropriate environment; altered or unavailable when fiction demands |

Occult can remain the knowledge and ritual skill across traditions rather than becoming a fourth casting skill.

Suggested learning budget:

- Minor power: 2 XP — narrow utility, sensory effect, or modest single-target trick.
- Standard power: 5 XP — approximately 3D–4D damage, `+1D` protection, short movement, or a meaningful scene tool.
- Major power: 8 XP — strong healing, 5D–6D damage, an area, a summon, or a scene-changing effect.
- Exceptional power: 12+ XP — broad, long-duration, multi-target, or campaign-altering effects.

Use enhancements and limitations:

- `+1 XP`: one small range, duration, or flexibility increase.
- `+2 XP`: additional target, small area, strong condition, or reliable secondary effect.
- `+4 XP`: large area, scene duration, major movement, or powerful summon.
- `-1 XP`: obvious gesture/focus, common material, limited target, or narrow environment.
- `-2 XP`: one-scene preparation, costly material, Health cost, strict oath, or once-per-session use.
- A power should never cost less than 1 XP.

Good first powers for the Fantasy pack:

| Power | Difficulty | Cost | Effect outline |
| --- | --- | --- | --- |
| Witchlight | Very Easy | 2 XP | Create or move a small light for a scene; may reveal obvious paranormal residue nearby. |
| Mage Hand | Easy | 2 XP | Manipulate an unattended light object at short range; cannot attack or perform fine skilled work. |
| Fire Bolt | Moderate | 5 XP | Ranged attack dealing 4D Fire damage at short range. |
| Ward | Moderate | 5 XP | One target gains `+1D` resistance against one declared damage category for three rounds. |
| Mend Flesh | Difficult | 8 XP | Restore 2D Health; a target benefits once per day, and Meta Dice cannot double it. |
| Binding Circle | Difficult | 8 XP | After one minute of preparation, a marked area impedes one named supernatural category for a scene. |
| Speak with the Departed | Difficult | 5 XP | Ask a recently dead spirit a small number of questions; it knows only what it knew in life and may be unwilling. |

Playtest healing and action-denial powers first; they are more likely than direct damage to bypass encounter pressure.

## Verification

- `npm.cmd run build` completed successfully with 112 modules transformed.
- The only build warning is the existing production chunk-size warning (approximately 637 kB).
- In-app browser checks confirmed:
  - the Vehicles route, navigation entry, reference cards, and search filter;
  - the Examples tab and complete combat round;
  - the Arrows ammunition entry and equipment search;
  - Natural Talent, Ill-Fated, and Reduced Attribute tier changes;
  - no browser console errors.
- A final source search found no remaining “Passive Defense,” ambiguous `−1D+1`, or old projectile-damage-category references in `src`.
