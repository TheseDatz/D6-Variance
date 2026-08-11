<script setup>
import { computed, ref } from 'vue'

function catalogItem(name, category, governingSkill, description, weight, value, rarity, damage = '', effect = '') {
  return { name, pack: 'Core', category, governingSkill, description, weight, value, rarity, damage, effect }
}

function weaponDifficulty(item) {
  if (!item.category.includes('Weapon')) return ''

  const details = []
  const meleeDifficulty = item.effect?.match(/(?:^|[.;]\s)(Very Easy|Easy|Moderate|Difficult|Very Difficult)(?: difficulty| in melee(?: with ([^;]+))?)?/)
  const range = item.effect?.match(/Range ([^;.]+)/)

  if (meleeDifficulty) {
    details.push(meleeDifficulty[2] ? `${meleeDifficulty[1]} (${meleeDifficulty[2]})` : meleeDifficulty[1])
  }
  if (range) details.push(`Range ${range[1]}`)
  return details.join(' • ')
}

function displayedEffect(item) {
  if (!item.category.includes('Weapon')) return item.effect

  return item.effect
    ?.replace(/^(Very Easy|Easy|Moderate|Difficult|Very Difficult)(?: difficulty| in melee(?: with [^;]+)?)?(?:;\s*|\.$)/, '')
    .replace(/^Range [^;.]+[.;]\s*/, '')
}

function displayedCost(value) {
  const match = value.match(/^~(\d+(?:\.\d+)?)(k)? copper coins?$/)
  if (!match) return value

  const amount = Number(match[1]) * (match[2] ? 1000 : 1)
  return `~${amount.toLocaleString('en-US')}`
}

// Weapon damage and range are anchored to D6 Fantasy Rulebook v1.0, Chapter 15.
// D6V maps the rulebook's base melee difficulty to Easy, its +5 unwieldy
// modifier to Moderate, and especially awkward weapons to Difficult.
const openD6Equipment = [
  catalogItem('Compass', 'Tool', 'Navigation', 'A directional instrument used to maintain a course when landmarks are unavailable.', '0.2 kg', '~10k copper coins', 'Uncommon', '', 'Gain +1D on Navigation checks where magnetic direction is reliable.'),
  catalogItem('Fishing Kit', 'Tool', 'Survival', 'Hooks, line, weights, and basic tackle for catching fish.', '0.5 kg', '~100 copper coins', 'Common', '', 'Gain +1D on Survival checks made to obtain food by fishing.'),
  catalogItem('Grappling Hook', 'Tool', 'Climbing', 'A multi-pronged metal hook designed to catch securely when used with rope.', '1.8 kg', '~200 copper coins', 'Common', 'Strength Damage +1', 'Gain +1D on Climbing checks when securely placed. Difficult placement requires Throwing.'),
  catalogItem('Hammer', 'Tool', 'Crafting', 'A general-purpose tool for driving nails, pegs, and spikes.', '0.7 kg', '~100 copper coins', 'Common', 'Strength Damage +1D', 'Provides suitable tools for simple Crafting. Used as an improvised Blunt Weapon with Easy difficulty.'),
  catalogItem('Healer’s Pack', 'Tool', 'First-Aid', 'Clean cloth, bandages, herbs, splints, needles, and basic medical supplies.', '1.5 kg', '~500 copper coins', 'Common', '', 'Gain +1 on First-Aid checks. Contains five uses; expend one after each attempted check.'),
  catalogItem('Lantern', 'Gear', 'None', 'A protected oil-burning light source.', '0.5 kg', '~50 copper coins', 'Common', '1D fire', 'Removes up to −2D of darkness penalties within 5 metres and gives dim light for 5 more. One flask burns for six hours.'),
  catalogItem('Lamp Oil', 'Consumable', 'None', 'A flask of combustible oil sufficient to fuel a lantern for six hours.', '0.5 kg', '~10 copper coins', 'Common', '2D fire', 'Spread oil burns across a small area for 1D rounds after ignition.'),
  catalogItem('Lockpicking Tools', 'Tool', 'Thievery', 'Picks, tension tools, probes, and fine wire for manipulating mechanical locks.', '0.5 kg', '~2.5k copper coins', 'Uncommon', '', 'Gain +1D on Thievery checks involving mechanical locks.'),
  catalogItem('Makeup Kit', 'Tool', 'Deception', 'Pigments, powders, adhesives, and applicators for changing someone’s appearance.', '1.4 kg', '~2.5k copper coins', 'Common', '', 'Gain +1D on Deception checks to create or maintain a physical disguise. Five uses.'),
  catalogItem('Marbles', 'Gear', 'None', 'A pouch of small hard spheres that can be scattered across the ground.', '0.9 kg', '~100 copper coins', 'Common', '', 'Covers a 2-metre area. Moving through it requires Moderate Acrobatics per movement action; failure causes Prone.'),
  catalogItem('Mining Pick', 'Tool', 'Crafting', 'A heavy pointed tool designed to break stone and compacted earth.', '2.5 kg', '~200 copper coins', 'Common', 'Strength Damage +2', 'Gain +1D on checks to excavate or break stone. Improvised Polearm with Moderate difficulty.'),
  catalogItem('Rope, Hemp', 'Gear', 'Climbing', 'Fifteen metres of strong, coarse rope.', '2.5 kg', '~100 copper coins', 'Common', '', 'Supports 100 kg safely and has 8 Health.'),
  catalogItem('Rope, Silk', 'Gear', 'Climbing', 'Fifteen metres of thin, lightweight rope.', '1.5 kg', '~1k copper coins', 'Uncommon', '', 'Supports 140 kg safely and has 6 Health.'),
  catalogItem('Shovel', 'Tool', 'Athletics', 'A sturdy tool for moving soil, sand, snow, and loose material.', '2.3 kg', '~200 copper coins', 'Common', 'Strength Damage +2', 'Gain +1D on excavation checks. Improvised Blunt Weapon with Moderate difficulty.'),
  catalogItem('Climbing Spikes', 'Tool', 'Climbing', 'A set of iron spikes for creating temporary handholds and securing ropes.', '2.3 kg', '~100 copper coins', 'Common', 'Strength Damage +1', 'Gain +1D on Climbing when enough spikes are installed. Installation requires a hammer or Strength 3D.'),
  catalogItem('Two-Person Tent', 'Gear', 'Survival', 'A portable shelter for two Medium-sized occupants.', '9 kg', '~500 copper coins', 'Common', '', 'Gain +2 on Survival checks to rest or resist exposure when properly erected.'),
  catalogItem('Tinderbox', 'Tool', 'Survival', 'Flint, steel, and dry tinder for starting fires.', '0.45 kg', '~50 copper coins', 'Common', '', 'Starts a fire automatically in ordinary dry conditions; difficult conditions require Survival.'),
  catalogItem('Torch', 'Gear', 'None', 'A wrapped wooden torch that burns for approximately one hour.', '0.45 kg', '~1 copper coin', 'Common', '3D fire', 'Removes up to −2D darkness penalties within 5 metres and gives dim light for 5 more.'),
  catalogItem('Trail Rations', 'Consumable', 'None', 'Preserved food sufficient to sustain one person for one day.', '0.9 kg', '~50 copper coins', 'Common', '', 'One use; satisfies an ordinary day’s food requirement.'),
  catalogItem('Waterskin', 'Gear', 'None', 'A portable container holding approximately two litres.', '2.3 kg full', '~20 copper coins', 'Common', '', 'Carries one day of drinking water for one person under ordinary conditions.'),
  catalogItem('Whetstone', 'Tool', 'Crafting', 'A small stone used to maintain edged metal tools and weapons.', '0.3 kg', '~10 copper coins', 'Common', '', 'Provides proper tools for Crafting checks to maintain or repair an edged metal weapon. Ten minutes removes ordinary dulling and minor notches; serious damage still requires suitable facilities and a Crafting check.'),
  catalogItem('Quiver', 'Gear', 'None', 'A fitted container that keeps arrows or bolts accessible and protects their shafts and fletching.', '0.5 kg', '~100 copper coins', 'Common', '', 'Holds up to 20 arrows or bolts. Drawing ammunition from a worn quiver is free.'),
  catalogItem('Arrows (20)', 'Ammunition', 'Archery', 'Twenty reusable wooden shafts fitted with fletching and ordinary metal heads.', '1 kg', '~100 copper coins', 'Common', '', 'Ammunition for bows. Arrows deal physical damage. Used only when the campaign tracks ammunition.'),
  catalogItem('Crossbow Bolts (20)', 'Ammunition', 'Archery', 'Twenty short rigid projectiles made for mechanical bows.', '1.4 kg', '~150 copper coins', 'Common', '', 'Ammunition for crossbows. Bolts deal physical damage. Used only when the campaign tracks ammunition.'),
  catalogItem('Blowgun Darts (20)', 'Ammunition', 'Archery', 'Twenty light darts sized for a blowgun and suitable for applying poison.', '0.2 kg', '~50 copper coins', 'Common', '', 'Ammunition for blowguns. Poison, when used, is purchased and resolved separately.'),
  catalogItem('Sling Shot (20)', 'Ammunition', 'Archery', 'Twenty shaped clay or lead sling projectiles carried in a small pouch.', '1.5 kg', '~20 copper coins', 'Common', '', 'Ammunition for slings. Suitable stones may be gathered for free when the environment provides them.'),
  catalogItem('Powder Horn', 'Gear', 'None', 'A sealed horn or flask designed to keep black powder dry and dispense measured charges.', '0.7 kg full', '~500 copper coins', 'Uncommon', '', 'Holds up to 20 black-powder charges. Wet or contaminated powder cannot be fired.'),
  catalogItem('Black Powder (20 Charges)', 'Ammunition', 'None', 'Twenty measured charges of explosive propellant for early firearms.', '0.5 kg', '~2.5k copper coins', 'Rare', '4D fire', 'Used with separate shot when ammunition is tracked. If the entire supply ignites, it explodes in a 2-metre Blast; the Storyteller may reduce damage for a partly used supply.'),
  catalogItem('Lead Shot (20)', 'Ammunition', 'None', 'Twenty cast lead balls or measured loads of pellets for early firearms.', '0.7 kg', '~200 copper coins', 'Uncommon', '', 'Combine one load with one black-powder charge to reload an appropriate firearm when ammunition is tracked.'),
  catalogItem('Cartridges (20)', 'Ammunition', 'None', 'Twenty self-contained modern firearm cartridges of one specified calibre.', '0.8 kg', '~3k copper coins', 'Rare', '', 'Ballistic ammunition for a compatible firearm. Used only when the campaign tracks ammunition.'),
  catalogItem('Detachable Magazine', 'Gear', 'None', 'A removable spring-fed container for cartridges of one specified weapon and calibre.', '0.3 kg', '~1k copper coins', 'Uncommon', '', 'Capacity is determined by the weapon, normally 10 to 30 cartridges. Filling an empty magazine takes one action per 10 cartridges; inserting it follows the weapon’s reload entry.'),

  catalogItem('Blowgun', 'Ranged Weapon', 'Archery', 'A light tube that propels small darts by breath.', '0.5 kg', '~1k copper coins', 'Common', '1D', 'Range 10/40/100; one action to reload; poison damage is separate.'),
  catalogItem('Longbow', 'Ranged Weapon', 'Archery', 'A tall, powerful bow built for range and penetrating force.', '0.7 kg', '~5k copper coins', 'Uncommon', 'Strength Damage +2D+2', 'Range 10/100/250; two-handed; free reload with accessible arrows.'),
  catalogItem('Shortbow', 'Ranged Weapon', 'Archery', 'A compact bow suited to hunting and mobile skirmishing.', '0.7 kg', '~2.5k copper coins', 'Common', 'Strength Damage +1D+2', 'Range 10/60/150; two-handed; free reload with accessible arrows.'),
  catalogItem('Light Crossbow', 'Ranged Weapon', 'Archery', 'A compact mechanical bow with reliable self-contained power.', '2.3 kg', '~2.5k copper coins', 'Common', '4D', 'Range 10/100/200; requires one action to reload; reduces armour Resistance by 2 against this attack.'),
  catalogItem('Heavy Crossbow', 'Ranged Weapon', 'Archery', 'A powerful two-handed crossbow built for range and armour penetration.', '6 kg', '~5k copper coins', 'Uncommon', '4D+1', 'Range 10/100/300; requires one full round to reload; reduces armour Resistance by 1D against this attack.'),
  catalogItem('Hand Crossbow', 'Ranged Weapon', 'Archery', 'A small crossbow intended for close-range use and concealment.', '1.4 kg', '~7.5k copper coins', 'Uncommon', '4D', 'Range 10/25/50; one action to reload; +1D to conceal; reduces armour Resistance by 1 against this attack.'),
  catalogItem('Sling', 'Ranged Weapon', 'Archery', 'A simple looped cord used to hurl stones or shot.', '0.1 kg', '~10 copper coins', 'Common', 'Strength Damage +1D', 'Range 5/10/15; free reload with accessible ammunition.'),

  catalogItem('Heavy Boomerang', 'Thrown Weapon', 'Throwing', 'A curved throwing weapon weighted for a damaging strike.', '0.7 kg', '~100 copper coins', 'Uncommon', 'Strength Damage +1D+1', 'Range 5/15/30; returns near the thrower after a miss when space permits.'),
  catalogItem('Dart', 'Thrown Weapon', 'Throwing', 'A small balanced projectile designed for accurate throwing.', '0.1 kg', '~5 copper coins', 'Common', 'Strength Damage +1', 'Range Strength/Strength+1/Strength+2; +1D to conceal.'),
  catalogItem('Javelin', 'Thrown Weapon', 'Throwing', 'A light spear balanced for throwing.', '0.9 kg', '~50 copper coins', 'Common', 'Strength Damage +2D', 'Moderate in melee with Polearms; Range 5/25/40.'),
  catalogItem('Throwing Dagger', 'Thrown Weapon', 'Throwing', 'A compact blade balanced for rotation in flight.', '0.3 kg', '~200 copper coins', 'Common', 'Strength Damage +1D', 'Easy in melee with Short Blades; Range 5/10/15.'),
  catalogItem('Throwing Star', 'Thrown Weapon', 'Throwing', 'A small multi-pointed metal projectile.', '0.1 kg', '~100 copper coins', 'Uncommon', 'Strength Damage +1D', 'Range 5/10/15; +1D to conceal.'),

  catalogItem('Hatchet', 'Melee Weapon', 'Axes', 'A compact one-handed chopping weapon and utility tool.', '0.9 kg', '~500 copper coins', 'Common', 'Strength Damage +1D+1', 'Easy difficulty; Range 5/10/15; uses Throwing when thrown.'),
  catalogItem('Battle Axe', 'Melee Weapon', 'Axes', 'A heavy two-handed axe built to deliver devastating chops.', '1.8 kg', '~1k copper coins', 'Uncommon', 'Strength Damage +3D', 'Moderate difficulty; two-handed; Strength Requirement 3D.'),
  catalogItem('Great Axe', 'Melee Weapon', 'Axes', 'An exceptionally large axe requiring commitment and physical power.', '3.2 kg', '~3k copper coins', 'Rare', 'Strength Damage +3D+1', 'Difficult difficulty; two-handed; Strength Requirement 3D+1.'),
  catalogItem('Club', 'Melee Weapon', 'Blunt Weapons', 'A simple rigid impact weapon.', '1 kg', '~10 copper coins', 'Common', 'Strength Damage +1D+1', 'Moderate difficulty; readily improvised.'),
  catalogItem('Spiked Club', 'Melee Weapon', 'Blunt Weapons', 'A reinforced club fitted with spikes or studs.', '1.5 kg', '~200 copper coins', 'Common', 'Strength Damage +1D+2', 'Moderate difficulty; may deal piercing or crushing damage.'),
  catalogItem('Mace', 'Melee Weapon', 'Blunt Weapons', 'A one-handed crushing weapon with a weighted head.', '1.8 kg', '~500 copper coins', 'Common', 'Strength Damage +1D+1', 'Moderate difficulty; reduces armour Resistance by 2 against this attack.'),
  catalogItem('Morning Star', 'Melee Weapon', 'Blunt Weapons', 'A heavy spiked impact weapon designed to defeat armour.', '1.8 kg', '~5k copper coins', 'Rare', 'Strength Damage +2D+2', 'Moderate difficulty; one-handed; Strength Requirement 3D.'),
  catalogItem('Quarterstaff', 'Melee Weapon', 'Blunt Weapons', 'A long hardwood staff used for striking, sweeping, and parrying.', '1.8 kg', '~20 copper coins', 'Common', 'Strength Damage +1D+2', 'Moderate difficulty; two-handed; Reach 2 metres.'),
  catalogItem('Sap', 'Melee Weapon', 'Blunt Weapons', 'A compact weighted striking implement designed for concealment.', '0.4 kg', '~100 copper coins', 'Common', 'Strength Damage +1D', 'Easy difficulty; +1D to conceal; may deal nonlethal damage without penalty.'),
  catalogItem('War Hammer', 'Melee Weapon', 'Blunt Weapons', 'A heavy military hammer concentrating force into a compact head.', '2.3 kg', '~5k copper coins', 'Rare', 'Strength Damage +3D', 'Moderate difficulty; one-handed; Strength Requirement 3D.'),
  catalogItem('Ball and Chain', 'Melee Weapon', 'Flexible Weapons', 'A heavy striking weight connected to a handle by chain.', '3 kg', '~1k copper coins', 'Uncommon', 'Strength Damage +2D', 'Difficult difficulty; two-handed; Strength Requirement 3D. Trip attacks made with it suffer −3 instead of the normal −6.'),
  catalogItem('Bullwhip', 'Melee Weapon', 'Flexible Weapons', 'A long plaited whip suited to striking and controlling objects at reach.', '1.4 kg', '~200 copper coins', 'Common', 'Strength Damage +1D', 'Moderate difficulty; Reach 2 metres; may trip, disarm, or entangle using normal modifiers; Escape TN 10 when it entangles.'),
  catalogItem('Flail', 'Melee Weapon', 'Flexible Weapons', 'A striking head joined to its handle by chain or flexible linkage.', '1.5 kg', '~1k copper coins', 'Uncommon', 'Strength Damage +2D', 'Moderate difficulty; attempts to block or parry it suffer −2.'),
  catalogItem('Nunchaku', 'Melee Weapon', 'Flexible Weapons', 'Two short rigid sections connected by cord or chain.', '0.6 kg', '~200 copper coins', 'Uncommon', 'Strength Damage +1D+2', 'Difficult difficulty; on a complication the wielder resists 1D+2 damage.'),
  catalogItem('Halberd', 'Melee Weapon', 'Heavy Polearms', 'A long-shafted weapon combining axe blade, point, and hook.', '2.7 kg', '~2k copper coins', 'Uncommon', 'Strength Damage +3D', 'Difficult difficulty; Reach 2 metres; two-handed.'),
  catalogItem('Spear', 'Melee Weapon', 'Polearms', 'A versatile shafted thrusting weapon with a pointed head.', '1.4 kg', '~100 copper coins', 'Common', 'Strength Damage +2D', 'Moderate difficulty; Range 5/15/25; Reach 2 metres; uses Throwing when thrown.'),
  catalogItem('Trident', 'Melee Weapon', 'Polearms', 'A three-pronged pole weapon suited to thrusting and trapping.', '1.8 kg', '~500 copper coins', 'Uncommon', 'Strength Damage +2D+2', 'Moderate difficulty; Range 5/10/15; Reach 2 metres; uses Throwing when thrown.'),
  catalogItem('Lance', 'Melee Weapon', 'Heavy Polearms', 'A long braced weapon designed for mounted charges.', '2.7 kg', '~1k copper coins', 'Uncommon', 'Strength Damage +2D', 'Moderate difficulty; mounted attacks add +1D damage after a direct 10-metre approach.'),
  catalogItem('Pike', 'Melee Weapon', 'Heavy Polearms', 'An exceptionally long thrusting weapon used to control approaches.', '4.5 kg', '~500 copper coins', 'Uncommon', 'Strength Damage +2D+2', 'Difficult difficulty; Reach 3 metres; two-handed; unusable at extremely close range.'),
  catalogItem('Stiletto', 'Melee Weapon', 'Short Blades', 'A narrow thrusting dagger intended to find gaps in protection.', '0.3 kg', '~200 copper coins', 'Uncommon', 'Strength Damage +1D', 'Moderate difficulty; reduces armour Resistance by 2 against this attack.'),
  catalogItem('Short Sword', 'Melee Weapon', 'Short Blades', 'A compact sword suited to close formations and confined spaces.', '0.9 kg', '~1k copper coins', 'Common', 'Strength Damage +1D+2', 'Easy difficulty; one-handed.'),
  catalogItem('Sai', 'Melee Weapon', 'Short Blades', 'A short pointed weapon with prominent side guards.', '0.7 kg', '~500 copper coins', 'Uncommon', 'Strength Damage +1D+1', 'Moderate difficulty; +2 on disarm attempts.'),
  catalogItem('Rapier', 'Melee Weapon', 'Swords', 'A slender sword optimized for precise thrusts and defensive control.', '1 kg', '~2.5k copper coins', 'Uncommon', 'Strength Damage +2D', 'Moderate difficulty; +2 on an attack made after successfully actively defending with it.'),
  catalogItem('Greatsword', 'Melee Weapon', 'Swords', 'A massive two-handed sword built for reach and powerful cuts.', '2.7 kg', '~5k copper coins', 'Rare', 'Strength Damage +3D+1', 'Difficult difficulty; two-handed; Strength Requirement 3D.'),
  catalogItem('Katana', 'Melee Weapon', 'Swords', 'A curved single-edged sword made with demanding specialist craftsmanship.', '1.2 kg', '~10k copper coins', 'Rare', 'Strength Damage +3D', 'Moderate difficulty; Versatile; two hands add +1 damage.'),
  catalogItem('Tonfa', 'Melee Weapon', 'Blunt Weapons', 'A side-handled baton suited to defense and controlled strikes.', '0.7 kg', '~200 copper coins', 'Uncommon', 'Strength Damage +1D+2', 'Easy difficulty; may deal nonlethal damage without penalty.'),

  catalogItem('Arquebus', 'Ranged Weapon', 'Rifles', 'A heavy matchlock firearm with a wooden stock and iron barrel.', '4.5 kg', '~25k copper coins', 'Rare', '3D+2', 'Deals Ballistic damage. Range 10/20/40; two-handed; three rounds to reload; requires one action to brace before firing unless supported by a rest.'),
  catalogItem('Wheellock Musket', 'Ranged Weapon', 'Rifles', 'A mechanically ignited muzzle-loading long gun.', '5 kg', '~60k copper coins', 'Rare', '4D', 'Deals Ballistic damage. Range 10/25/60; two-handed; three rounds to reload; requires one action to brace before firing unless supported by a rest.'),
  catalogItem('Wheellock Pistol', 'Ranged Weapon', 'Handguns', 'A compact mechanically ignited muzzle-loading firearm.', '1.5 kg', '~40k copper coins', 'Rare', '3D+1', 'Deals Ballistic damage. Range 5/10/25; two rounds to reload.'),
  catalogItem('Black-Powder Bomb', 'Thrown Weapon', 'Throwing', 'A pottery shell packed with black powder and fitted with a fuse.', '1.5 kg', '~15k copper coins', 'Rare', '6D', 'Range Strength−2/Strength−1/Strength; Blast 3 metres; detonates at the end of the thrower’s next turn unless the fuse is altered with Demolitions.'),

  catalogItem('Hide or Fur Armour', 'Armour', 'None', 'Layered hide or fur offering modest protection from physical injury.', '5.5 kg', '~1k copper coins', 'Common', '', 'Resistance +2 against physical damage; no Dexterity penalty.'),
  catalogItem('Heavy Fabric Armour', 'Armour', 'None', 'Dense layered cloth intended to soften cuts and impacts.', '3.6 kg', '~500 copper coins', 'Common', '', 'Resistance +2 against physical damage; no Dexterity penalty.'),
  catalogItem('Quilted Armour', 'Armour', 'None', 'Closely stitched layers of padded textile.', '4 kg', '~500 copper coins', 'Common', '', 'Resistance +2 against physical damage; no Dexterity penalty.'),
  catalogItem('Bone Armour', 'Armour', 'None', 'Overlapping pieces of shaped bone secured over a flexible backing.', '7 kg', '~2.5k copper coins', 'Uncommon', '', 'Resistance +1D against physical damage; −1 Dexterity.'),
  catalogItem('Hard Leather Armour', 'Armour', 'None', 'Boiled or hardened leather plates fitted over flexible layers.', '6 kg', '~4.5k copper coins', 'Common', '', 'Resistance +1D+1 against physical damage; −2 Dexterity.'),
  catalogItem('Ring Mail', 'Armour', 'None', 'Metal rings sewn or fastened across a durable backing.', '12 kg', '~3k copper coins', 'Uncommon', '', 'Resistance +1D+2 against physical damage; −2 Dexterity.'),
  catalogItem('Chain Mail', 'Armour', 'None', 'Interlocking metal rings providing flexible protection.', '12 kg', '~7.5k copper coins', 'Uncommon', '', 'Resistance +2D against physical damage; −1D Dexterity.'),
  catalogItem('Bronze Armour', 'Armour', 'None', 'Overlapping or fitted bronze plates worn over padding.', '18 kg', '~5k copper coins', 'Uncommon', '', 'Resistance +2D against physical damage; −1D Dexterity.'),
  catalogItem('Plate Armour', 'Armour', 'None', 'Articulated metal plates enclosing most of the wearer’s body.', '25 kg', '~150k copper coins', 'Rare', '', 'Resistance +3D against physical damage; −2D Dexterity.'),
  catalogItem('Buckler', 'Shield', 'None', 'A compact hand shield suited to mobile defense.', '1.5 kg', '~500 copper coins', 'Common', '', '+1 Defense Bonus against perceived attacks; occupies one hand.'),
  catalogItem('Small Shield', 'Shield', 'None', 'A light shield covering the forearm and torso without greatly restricting movement.', '2.5 kg', '~1k copper coins', 'Common', '', '+2 Defense Bonus against perceived attacks; occupies one hand.'),
  catalogItem('Medium Shield', 'Shield', 'None', 'A substantial shield providing broad protection.', '4.5 kg', '~2.5k copper coins', 'Uncommon', '', '+1D Defense Bonus against perceived attacks; −1 Dexterity; occupies one hand.'),
  catalogItem('Large Shield', 'Shield', 'None', 'A tall heavy shield capable of covering most of its wielder.', '7 kg', '~5k copper coins', 'Uncommon', '', '+1D+1 Defense Bonus against perceived attacks; −1D Dexterity; may provide cover when braced.'),
]

const supplementalEquipment = [
  catalogItem('Atlatl', 'Tool', 'Throwing', 'A shaped throwing lever that increases the speed and reach of a javelin.', '0.2 kg', '~100 copper coins', 'Common', '', 'Doubles a javelin’s listed ranges when the javelin is thrown with it.'),
  catalogItem('Bola', 'Thrown Weapon', 'Throwing', 'Weighted cords designed to wrap around a target and pull it off balance.', '0.8 kg', '~100 copper coins', 'Common', 'No damage', 'Range 5/10/15. On a successful attack, the target becomes Entangled and Prone instead of taking damage. Escape TN 11. The bola has 8 Health.'),
  catalogItem('Harpoon', 'Thrown Weapon', 'Throwing', 'A heavy barbed spear fitted with a tether for securing struck targets.', '2 kg', '~500 copper coins', 'Uncommon', 'Strength Damage +2D', 'Moderate in melee with Polearms; Range 5/10/15. If the attack causes damage, the harpoon lodges and the target becomes Entangled with Escape TN 15. Removing the lodged harpoon requires an action and causes 2D damage. The tether has 10 Health.'),
  catalogItem('Chakram', 'Thrown Weapon', 'Throwing', 'A balanced circular blade intended to return after a practiced throw.', '0.5 kg', '~1k copper coins', 'Uncommon', 'Strength Damage +1D+1', 'Range 5/15/25. After the attack, a Moderate Throwing check returns it to the thrower’s hand; otherwise it lands near the target.'),
  catalogItem('Wrist Dagger', 'Melee Weapon', 'Short Blades', 'A compact blade secured along the forearm for concealment and retention.', '0.4 kg', '~500 copper coins', 'Uncommon', 'Strength Damage +1D', 'Easy difficulty; +1D to conceal and +1D to resist disarming.'),
  catalogItem('Katar', 'Melee Weapon', 'Short Blades', 'A rigid punching blade gripped across the fist.', '0.7 kg', '~1.5k copper coins', 'Uncommon', 'Strength Damage +1D+2', 'Moderate difficulty; +1D to resist disarming.'),
  catalogItem('Khopesh', 'Melee Weapon', 'Swords', 'A forward-curving sword whose hooked blade controls limbs and weapons.', '1.2 kg', '~2.5k copper coins', 'Uncommon', 'Strength Damage +2D', 'Moderate difficulty; Trip attacks made with it suffer −3 instead of the normal −6.'),
  catalogItem('Maul', 'Melee Weapon', 'Blunt Weapons', 'A massive two-handed hammer built to deliver crushing blows.', '4.5 kg', '~1k copper coins', 'Uncommon', 'Strength Damage +3D', 'Difficult difficulty; two-handed; Strength Requirement 3D.'),
  catalogItem('War Pick', 'Melee Weapon', 'Blunt Weapons', 'A military pick that concentrates force into a narrow point.', '1.1 kg', '~500 copper coins', 'Uncommon', 'Strength Damage +2D', 'Moderate difficulty; reduces armour Resistance by 1D against this attack.'),
  catalogItem('Sword Cane', 'Melee Weapon', 'Swords', 'A slender sword concealed inside an ordinary walking cane.', '1 kg', '~3k copper coins', 'Rare', 'Strength Damage +1D+2', 'Moderate difficulty; +2D to conceal its nature while sheathed.'),
  catalogItem('Spiked Chain', 'Melee Weapon', 'Flexible Weapons', 'A long weighted chain fitted with damaging spikes.', '3 kg', '~2.5k copper coins', 'Uncommon', 'Strength Damage +2D', 'Difficult difficulty; Reach 2 metres. It may make a normal attack or an entangling attack with Escape TN 15. The chain has 15 Health.'),
  catalogItem('Kusari-Gama', 'Melee Weapon', 'Flexible Weapons', 'A hand sickle connected to a weighted chain for striking and restraint.', '1.5 kg', '~3k copper coins', 'Rare', 'Strength Damage +1D+2', 'Difficult difficulty; Reach 2 metres. It may make a normal attack or an entangling attack with Escape TN 13. The chain has 12 Health.'),
  catalogItem('Rope Dart', 'Melee Weapon', 'Flexible Weapons', 'A metal dart attached to a long rope and controlled through sweeping motions.', '0.7 kg', '~1k copper coins', 'Uncommon', 'Strength Damage +1D+1', 'Difficult difficulty; Reach 3 metres. It may make a normal attack or an entangling attack with Escape TN 11. The rope has 8 Health.'),

  catalogItem('Composite Bow', 'Ranged Weapon', 'Archery', 'A reinforced bow combining materials to produce greater power from a compact frame.', '1 kg', '~7.5k copper coins', 'Uncommon', 'Strength Damage +2D+2', 'Range 10/100/300; two-handed; free reload with accessible arrows. Mounted attacks receive no disadvantage merely for being mounted.'),
  catalogItem('Great Bow', 'Ranged Weapon', 'Archery', 'An exceptionally tall and powerful bow intended for strong, deliberate archers.', '1.5 kg', '~10k copper coins', 'Rare', 'Strength Damage +3D', 'Range 15/150/400; two-handed; Strength Requirement 4D; free reload with accessible arrows.'),
  catalogItem('Repeating Crossbow', 'Ranged Weapon', 'Archery', 'A crossbow fitted with a magazine and mechanism for rapid follow-up shots.', '4 kg', '~25k copper coins', 'Rare', '4D', 'Range 10/50/100; holds six bolts; free reload between shots; one action to replace the magazine; reduces armour Resistance by 1 against this attack.'),
  catalogItem('Crank Crossbow', 'Ranged Weapon', 'Archery', 'A powerful crossbow drawn by a geared crank.', '7 kg', '~10k copper coins', 'Uncommon', '5D', 'Range 10/100/300; two-handed; requires one full round to reload; reduces armour Resistance by 1D against this attack.'),
  catalogItem('Blunderbuss', 'Ranged Weapon', 'Shotguns', 'A short wide-bore gun that scatters shot across nearby targets.', '4 kg', '~35k copper coins', 'Rare', '4D', 'Deals Ballistic damage. Range 5/10/20. Attacks every target in a 2-metre-wide cone with one attack roll; three rounds to reload.'),
  catalogItem('Pepperbox', 'Ranged Weapon', 'Handguns', 'A compact firearm with several rotating barrels for successive shots.', '1.8 kg', '~50k copper coins', 'Rare', '3D+1', 'Deals Ballistic damage. Range 5/10/20; six shots; two rounds to reload each barrel.'),
  catalogItem('Hand Mortar', 'Ranged Weapon', 'Heavy Weapons', 'A short portable launcher built to lob explosive projectiles.', '5 kg', '~75k copper coins', 'Rare', '5D', 'Deals Ballistic damage. Range 10/25/50; Blast 3 metres; two-handed; four rounds to reload.'),

  catalogItem('Breastplate', 'Armour', 'None', 'A fitted metal plate protecting the chest and abdomen while leaving the limbs mobile.', '9 kg', '~40k copper coins', 'Uncommon', '', 'Resistance +2D against physical damage to the torso; −2 Dexterity.'),
  catalogItem('Scale Armour', 'Armour', 'None', 'Overlapping metal scales sewn onto a flexible backing.', '20 kg', '~5k copper coins', 'Uncommon', '', 'Resistance +2D against physical damage; −1D Dexterity.'),
  catalogItem('Half Plate', 'Armour', 'None', 'Fitted metal plates protecting the body’s most vulnerable areas.', '18 kg', '~75k copper coins', 'Rare', '', 'Resistance +2D+1 against physical damage; −1D Dexterity.'),
  catalogItem('Splint Armour', 'Armour', 'None', 'Narrow metal strips fixed over a heavy protective backing.', '27 kg', '~20k copper coins', 'Rare', '', 'Resistance +2D+2 against physical damage; −(1D+1) Dexterity.'),
  catalogItem('Tower Shield', 'Shield', 'None', 'A body-length shield built to form a movable defensive wall.', '10 kg', '~10k copper coins', 'Rare', '', '+2D Defense Bonus against perceived attacks; −1D Dexterity; occupies one hand. An action braces it to provide cover from one direction until the wielder moves or stops carrying it.'),

  catalogItem('Acid Vial', 'Consumable', 'Throwing', 'A sealed glass vial containing a strongly corrosive liquid.', '0.5 kg', '~2.5k copper coins', 'Uncommon', '3D acid', 'Range 3/6/10; one use.'),
  catalogItem('Caltrops', 'Gear', 'Thievery', 'A pouch of small spikes shaped so one point always faces upward.', '0.9 kg', '~100 copper coins', 'Common', '2D', 'Covers a 2-metre area. Moving through it requires Moderate Acrobatics per movement action; failure causes damage.'),
  catalogItem('Hunting Trap', 'Tool', 'Thievery', 'A concealed spring trap that clamps shut when stepped on.', '11 kg', '~500 copper coins', 'Common', '3D', 'Setting it requires an action and a Thievery check. When triggered, it attacks using that check’s result; a hit causes damage and Entangled with Escape TN 15. The trap has 15 Health.'),
  catalogItem('Block and Tackle', 'Tool', 'Athletics', 'A system of ropes and pulleys that multiplies hauling force.', '2.3 kg', '~100 copper coins', 'Common', '', 'Gain +2D on Athletics checks to lift or haul along its properly installed direction.'),
  catalogItem('Crowbar', 'Tool', 'Athletics', 'A rigid metal bar shaped to provide leverage when forcing objects apart.', '2.3 kg', '~200 copper coins', 'Common', 'Strength Damage +1', 'Gain +1D on Athletics checks when leverage assists the attempt. Improvised Blunt Weapon with Easy difficulty.'),
  catalogItem('Portable Ram', 'Tool', 'Athletics', 'A reinforced beam with handles for breaking doors and similar barriers.', '16 kg', '~400 copper coins', 'Uncommon', 'Strength Damage +3D', 'Two users gain +2D on Athletics checks to break a door or similar barrier.'),
  catalogItem('Manacles', 'Gear', 'Thievery', 'A pair of locking metal restraints joined by a short chain.', '2.7 kg', '~200 copper coins', 'Common', '', 'A restrained character is Entangled with Escape TN 18. The manacles have 15 Health and may be opened with a Difficult Thievery check.'),
  catalogItem('Chain', 'Gear', 'Athletics', 'Fifteen metres of linked iron chain for securing or hauling heavy loads.', '20 kg', '~1.5k copper coins', 'Common', '', 'Supports 500 kg safely and has 20 Health.'),
  catalogItem('Magnifying Glass', 'Tool', 'Investigation', 'A polished lens for enlarging fine details at close range.', '0.1 kg', '~10k copper coins', 'Uncommon', '', 'Gain +1D on Investigation checks to examine minute physical evidence in adequate light.'),
  catalogItem('Spyglass', 'Tool', 'Perception', 'A collapsible optical tube for viewing distant subjects.', '0.5 kg', '~100k copper coins', 'Rare', '', 'Gain +2D on Perception checks to see distant details.'),
  catalogItem('Astrolabe', 'Tool', 'Navigation', 'A calibrated instrument for finding position from visible celestial bodies.', '1.5 kg', '~25k copper coins', 'Rare', '', 'Gain +1D on Navigation checks when the sky is visible.'),
  catalogItem('Sextant', 'Tool', 'Navigation', 'A precision instrument for measuring angles between the horizon and celestial bodies.', '1.4 kg', '~50k copper coins', 'Rare', '', 'Gain +2D on Navigation checks when the horizon and sky are visible.'),
  catalogItem('Signal Whistle', 'Gear', 'None', 'A small whistle designed to carry a sharp signal over long distances.', '0.05 kg', '~5 copper coins', 'Common', '', 'Audible to 500 metres in ordinary conditions.'),
  catalogItem('Bullseye Lantern', 'Gear', 'None', 'A shuttered lantern that focuses its light into a narrow beam.', '0.9 kg', '~1k copper coins', 'Uncommon', '1D fire', 'Removes up to −2D of darkness penalties in a 30-metre cone and gives dim light for 10 more metres. One flask burns for six hours.'),
  catalogItem('Hooded Lantern', 'Gear', 'None', 'An oil lantern with shutters that regulate and conceal its light.', '0.9 kg', '~500 copper coins', 'Common', '1D fire', 'Removes up to −2D of darkness penalties within 10 metres. Closing the hood reduces its light to 2 metres. One flask burns for six hours.'),
  catalogItem('Bedroll', 'Gear', 'Survival', 'A padded portable sleeping roll that insulates its user from rough ground.', '3.2 kg', '~100 copper coins', 'Common', '', 'Gain +2 on natural-healing rolls when resting outdoors.'),
  catalogItem('Climber’s Kit', 'Tool', 'Climbing', 'A harness, anchors, clips, and short lengths of rope for secured climbing.', '5.4 kg', '~2.5k copper coins', 'Uncommon', '', 'Gain +1D on Climbing checks when properly secured.'),

  catalogItem('Artisan’s Tool Kit', 'Tool', 'Crafting', 'A trade-specific collection of hand tools chosen for one craft.', '3 kg', '~2k copper coins', 'Common', '', 'Provides proper tools for Crafting checks involving one chosen trade.'),
  catalogItem('Alchemist’s Supplies', 'Tool', 'Crafting', 'Glassware, burners, measures, and implements for preparing chemical substances.', '3.6 kg', '~5k copper coins', 'Uncommon', '', 'Provides proper tools for Crafting checks involving chemical substances.'),
  catalogItem('Cartographer’s Tools', 'Tool', 'Navigation', 'Measuring, drawing, and recording instruments for producing accurate maps.', '2.7 kg', '~1.5k copper coins', 'Common', '', 'Provides proper tools for Navigation checks made to create maps.'),
  catalogItem('Forgery Kit', 'Tool', 'Forgery', 'Special inks, papers, seals, cutting tools, and other materials for reproducing documents.', '2.3 kg', '~1.5k copper coins', 'Uncommon', '', 'Provides proper tools for Forgery checks involving physical documents or seals.'),
  catalogItem('Herbalist’s Kit', 'Tool', 'Survival', 'Pouches, shears, a mortar, and preservation materials for gathering and preparing plants.', '1.4 kg', '~500 copper coins', 'Common', '', 'Provides proper tools for Survival or First-Aid checks involving medicinal plants.'),
  catalogItem('Poisoner’s Kit', 'Tool', 'Crafting', 'Protected containers and precise implements for identifying and preparing poisons.', '0.9 kg', '~5k copper coins', 'Rare', '', 'Provides proper tools for Crafting checks involving poisons.'),
  catalogItem('Musical Instrument', 'Tool', 'Performance', 'A portable instrument selected for a particular musical tradition.', '2 kg', '~2k copper coins', 'Common', '', 'Provides proper tools for Performance checks involving that instrument.'),

  catalogItem('Raw Ore', 'Trade Good', 'Commerce', 'Unrefined mineral-bearing stone sold to smelters by weight and expected yield.', '10 kg', '~50 copper coins', 'Common', '', 'A standard sack containing 10 kg of mixed or specified ore.'),
  catalogItem('Iron Ingot', 'Trade Good', 'Commerce', 'A standardized bar of smelted iron ready for forging or further refinement.', '5 kg', '~100 copper coins', 'Common', '', 'Provides enough metal for several small iron objects or one substantial tool or weapon.'),
  catalogItem('Steel Ingot', 'Trade Good', 'Commerce', 'A standardized bar of refined steel valued for strong tools, weapons, and armour.', '5 kg', '~250 copper coins', 'Uncommon', '', 'Provides enough metal for several small steel objects or one substantial tool or weapon.'),
  catalogItem('Copper Ingot', 'Trade Good', 'Commerce', 'A standardized bar of workable copper used for utensils, fittings, decoration, and alloys.', '5 kg', '~500 copper coins', 'Common', '', 'Provides 5 kg of copper for trade or Crafting.'),
  catalogItem('Silver Ingot', 'Trade Good', 'Commerce', 'A stamped bar of refined silver used as wealth, decoration, or specialist material.', '1 kg', '~1k copper coins', 'Rare', '', 'Provides 1 kg of silver for trade or Crafting.'),
  catalogItem('Gold Ingot', 'Trade Good', 'Commerce', 'A stamped bar of refined gold whose value is concentrated into a portable form.', '1 kg', '~10k copper coins', 'Rare', '', 'Provides 1 kg of gold for trade or Crafting.'),
  catalogItem('Coal', 'Trade Good', 'Commerce', 'A sack of dense mineral fuel suitable for sustained high-temperature fires.', '10 kg', '~100 copper coins', 'Common', '', 'Fuels a forge for four hours or an ordinary fire for twenty hours.'),
  catalogItem('Charcoal', 'Trade Good', 'Commerce', 'A sack of lightweight processed fuel that burns hot and clean.', '5 kg', '~200 copper coins', 'Common', '', 'Fuels a forge for four hours or an ordinary fire for twelve hours.'),
  catalogItem('Lumber', 'Trade Good', 'Commerce', 'A bundle of seasoned boards suitable for building, repair, and woodworking.', '20 kg', '~300 copper coins', 'Common', '', 'Provides 20 kg of prepared wood for construction or Crafting.'),
  catalogItem('Leather', 'Trade Good', 'Commerce', 'A bundle of cured hides prepared for clothing, armour, containers, and fittings.', '5 kg', '~500 copper coins', 'Common', '', 'Provides 5 kg of prepared leather for Crafting.'),
  catalogItem('Canvas', 'Trade Good', 'Commerce', 'A tightly woven bolt of durable cloth used for sails, tents, bags, and covers.', '5 kg', '~200 copper coins', 'Common', '', 'Provides 10 square metres of canvas for Crafting.'),
  catalogItem('Fine Cloth', 'Trade Good', 'Commerce', 'A protected bolt of finely woven fabric intended for quality clothing and furnishings.', '2 kg', '~10k copper coins', 'Uncommon', '', 'Provides 10 square metres of fine cloth for Crafting.'),
  catalogItem('Grain', 'Trade Good', 'Commerce', 'A sealed sack of dry grain used as food, animal feed, or brewing stock.', '25 kg', '~50 copper coins', 'Common', '', 'Feeds one person for fifty days or one large mount for five days.'),
  catalogItem('Salt', 'Trade Good', 'Commerce', 'A sack of mineral salt used for seasoning, preservation, medicine, and trade.', '10 kg', '~1k copper coins', 'Common', '', 'Provides 10 kg of salt for preservation, trade, or Crafting.'),
]

const equipment = [
  {
    name: 'Dagger',
    pack: 'Core',
    category: 'Melee Weapon',
    description: 'A short, easily concealed blade suited to close fighting, utility work, and desperate last stands.',
    weight: '0.45 kg',
    value: '~200 copper coins',
    rarity: 'Common',
    governingSkill: 'Short Blades',
    damage: 'Strength Damage +1D',
    effect: 'Easy difficulty; Concealable: +1D to checks made to hide the dagger on your person.',
  },
  {
    name: 'Longsword',
    pack: 'Fantasy',
    category: 'Melee Weapon',
    description: 'A versatile double-edged sword balanced for decisive cuts, thrusts, and defensive binds.',
    weight: '1.4 kg',
    value: '~1.5k copper coins',
    rarity: 'Uncommon',
    governingSkill: 'Swords',
    damage: 'Strength Damage +2D+2',
    effect: 'Moderate difficulty; Versatile: may be wielded in two hands for +1 damage.',
  },
  {
    name: 'Padded Leather Armour',
    pack: 'Fantasy',
    category: 'Armour',
    governingSkill: 'None',
    description: 'Layers of padded leather that turn glancing blows without severely limiting movement.',
    weight: '6 kg',
    value: '~2.5k copper coins',
    rarity: 'Common',
    effect: 'Resistance +1D against physical damage; −1 Dexterity.',
  },
  {
    name: 'Healing Draught',
    pack: 'Fantasy',
    category: 'Consumable',
    governingSkill: 'None',
    description: 'A crimson tonic that closes minor wounds and restores a measure of exhausted vitality.',
    weight: '0.25 kg',
    value: '~5k copper coins',
    rarity: 'Rare',
    effect: 'Consume an action to recover 1D lost Health. One use.',
  },
  ...openD6Equipment,
  ...supplementalEquipment,
]

const searchQuery = ref('')
const selectedPack = ref('all')
const selectedCategory = ref('all')
const selectedSkill = ref('all')
const packs = computed(() => [...new Set(equipment.map((item) => item.pack))])
const categories = computed(() => [...new Set(equipment.map((item) => item.category))])
const governingSkills = computed(() => [...new Set(equipment.map((item) => item.governingSkill || 'None'))].sort())
const filteredEquipment = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return equipment.filter((item) => {
    const matchesPack = selectedPack.value === 'all' || item.pack === selectedPack.value
    const matchesCategory = selectedCategory.value === 'all' || item.category === selectedCategory.value
    const matchesSkill = selectedSkill.value === 'all' || (item.governingSkill || 'None') === selectedSkill.value
    const searchableText = Object.values(item).filter(Boolean).join(' ').toLowerCase()
    return matchesPack && matchesCategory && matchesSkill && (!query || searchableText.includes(query))
  })
})
</script>

<template>
  <section aria-labelledby="equipment-catalog" class="scroll-mt-24">
    <h2 id="equipment-catalog" class="sr-only">Equipment catalog</h2>

    <div class="flex items-end overflow-hidden px-2" role="tablist" aria-label="Equipment catalog">
      <button id="equipment-tab" class="relative z-[1] -mb-px min-w-36 rounded-t-xl border border-b-0 border-amber-300/60 bg-[#07140c] px-5 py-3 text-sm font-semibold tracking-wide text-amber-100 shadow-[0_-8px_24px_rgba(251,191,36,0.10)] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-[#07140c]" aria-controls="equipment-panel" aria-selected="true" role="tab" type="button">
        Equipment
      </button>
    </div>

    <div id="equipment-panel" class="relative border border-amber-300/50 bg-[#07140c]/25 p-5 shadow-[0_0_32px_rgba(251,191,36,0.12),inset_0_0_24px_rgba(251,191,36,0.04)] sm:p-7" aria-labelledby="equipment-tab" role="tabpanel">
      <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"></div>

      <div class="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h3 class="text-xl font-semibold tracking-wide text-amber-100">Equipment</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-zinc-300">Weapons, armour, tools, and supplies available across different settings.</p>
        </div>

        <div class="grid w-full gap-3 sm:grid-cols-2 xl:max-w-4xl xl:grid-cols-[minmax(14rem,1fr)_10rem_11rem_12rem]">
          <label class="relative sm:col-span-2 xl:col-span-1">
            <span class="sr-only">Search equipment</span>
            <svg aria-hidden="true" class="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-amber-200/60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
            <input v-model="searchQuery" class="w-full rounded-full border border-amber-400/25 bg-black/30 py-2.5 pr-4 pl-11 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15" placeholder="Search equipment" type="search" />
          </label>

          <label>
            <span class="sr-only">Filter by pack</span>
            <select v-model="selectedPack" class="w-full cursor-pointer rounded-full border border-amber-400/25 bg-[#07100b] px-5 py-2.5 text-sm text-amber-100 outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15">
              <option value="all">All packs</option>
              <option v-for="pack in packs" :key="pack" :value="pack">{{ pack }}</option>
            </select>
          </label>

          <label>
            <span class="sr-only">Filter by category</span>
            <select v-model="selectedCategory" class="w-full cursor-pointer rounded-full border border-amber-400/25 bg-[#07100b] px-5 py-2.5 text-sm text-amber-100 outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15">
              <option value="all">All categories</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </label>

          <label>
            <span class="sr-only">Filter by governing skill</span>
            <select v-model="selectedSkill" class="w-full cursor-pointer rounded-full border border-amber-400/25 bg-[#07100b] px-5 py-2.5 text-sm text-amber-100 outline-none focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15">
              <option value="all">All skills</option>
              <option v-for="skill in governingSkills" :key="skill" :value="skill">{{ skill }}</option>
            </select>
          </label>
        </div>
      </div>

      <div aria-hidden="true" class="my-7 h-px w-full bg-gradient-to-r from-transparent via-amber-300/45 to-transparent"></div>

      <div class="grid gap-4 lg:grid-cols-2">
        <article v-for="item in filteredEquipment" :key="`${item.pack}-${item.name}`" class="flex flex-col border border-white/15 bg-black/20 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h4 class="text-sm font-bold uppercase tracking-[0.12em] text-zinc-50">{{ item.name }}</h4>
              <p class="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-sky-200/70">{{ item.category }}</p>
            </div>
            <span class="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-amber-300/70">{{ item.pack }} pack</span>
          </div>
          <p class="mt-3 text-sm leading-7 text-zinc-300">{{ item.description }}</p>

          <dl class="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 text-sm" :class="item.damage ? 'sm:grid-cols-4' : 'sm:grid-cols-3'">
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-500">Approx. Cost</dt><dd class="mt-1 font-semibold text-amber-100">{{ displayedCost(item.value) }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-500">Rarity</dt><dd class="mt-1 font-semibold text-amber-100">{{ item.rarity }}</dd></div>
            <div class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-500">Governing Skill</dt><dd class="mt-1 font-semibold text-amber-100">{{ item.governingSkill || 'None' }}</dd></div>
            <div v-if="item.damage" class="bg-[#07100b] p-3"><dt class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-zinc-500">Damage</dt><dd class="mt-1 font-semibold text-amber-100">{{ item.damage }}</dd></div>
          </dl>

          <div v-if="weaponDifficulty(item)" class="mt-3 border border-sky-300/15 bg-sky-950/20 p-3">
            <p class="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-sky-200/55">Difficulty</p>
            <p class="mt-1 text-sm font-semibold text-sky-100">{{ weaponDifficulty(item) }}</p>
          </div>

          <div v-if="displayedEffect(item)" class="mt-5 border-t border-white/10 pt-4">
            <h5 class="text-xs font-bold uppercase tracking-[0.12em] text-sky-200/80">Effect</h5>
            <p class="mt-2 text-xs leading-5 text-zinc-400">{{ displayedEffect(item) }}</p>
          </div>

          <p class="mt-auto pt-5 text-xs text-zinc-500">Weight: {{ item.weight }}</p>
        </article>
      </div>

      <p v-if="!filteredEquipment.length" class="py-12 text-center text-sm text-zinc-400">No equipment matches the selected filters<span v-if="searchQuery"> and “{{ searchQuery }}”</span>.</p>
    </div>
  </section>
</template>
    governingSkill: 'Handguns',
    governingSkill: 'None',
    governingSkill: 'Survival',
    governingSkill: 'First-Aid',
    governingSkill: 'None',
    governingSkill: 'Sensors',
