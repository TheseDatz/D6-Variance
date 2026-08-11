<script setup>
import { computed } from 'vue'

const props = defineProps({
  attributes: { type: Object, required: true },
  skills: { type: Array, required: true },
})

const attributeNames = ['Strength', 'Dexterity', 'Social', 'Intelligence', 'Luck', 'Paranormal']
const suggestions = {
  strength: ['Athletics', 'Axes', 'Blunt Weapons', 'Brawling', 'Climbing', 'Endurance', 'Heavy Polearms', 'Labor', 'Might', 'Wrestling'],
  dexterity: ['Acrobatics', 'Archery', 'Dodge', 'Driving', 'Flexible Weapons', 'Gunnery', 'Handguns', 'Heavy Weapons', 'Initiative', 'Machine Guns', 'Piloting', 'Polearms', 'Rifles', 'Riding', 'Sailing', 'Short Blades', 'Shotguns', 'Sleight of Hand', 'Stealth', 'Submachine Guns', 'Swords', 'Thievery', 'Throwing'],
  social: ['Animal Handling', 'Command', 'Deception', 'Etiquette', 'Insight', 'Intimidation', 'Networking', 'Performance', 'Persuasion', 'Resolve', 'Teaching'],
  intelligence: ['Bureaucracy', 'Commerce', 'Communications', 'Computers', 'Crafting', 'Demolitions', 'Electronic Security', 'Engineering', 'First-Aid', 'Forgery', 'Investigation', 'Medicine', 'Navigation', 'Perception', 'Scholarship', 'Sensors', 'Streetwise', 'Tactics'],
  luck: ['Gambling', 'Improvisation', 'Scrounging', 'Serendipity', 'Survival'],
  paranormal: ['Occult', 'Channeling'],
}

const assignedPips = computed(() => props.skills.reduce(
  (total, skill) => total + (Number(skill.upgradeDice) || 0) * 3 + (Number(skill.upgradePips) || 0),
  0,
))
const remainingPips = computed(() => 21 - assignedPips.value)

function formatPips(pips) {
  const absolute = Math.abs(pips)
  if (absolute < 3) return `${pips < 0 ? '-' : ''}${absolute} pip${absolute === 1 ? '' : 's'}`
  const dice = Math.floor(absolute / 3)
  const remainder = absolute % 3
  return `${pips < 0 ? '-' : ''}${dice}D${remainder ? `+${remainder}` : ''}`
}

function skillsFor(attribute) {
  return props.skills.filter((skill) => skill.attribute === attribute)
}

function totalFor(skill) {
  const attribute = props.attributes[skill.attribute] || { dice: 0, pips: 0 }
  return formatPips(
    (Number(attribute.dice) || 0) * 3
    + (Number(attribute.pips) || 0)
    + (Number(skill.upgradeDice) || 0) * 3
    + (Number(skill.upgradePips) || 0),
  )
}

function addSkill(attribute, name = '') {
  props.skills.push({ name, attribute, upgradeDice: 1, upgradePips: 0 })
}

function addSuggestion(attribute, name) {
  if (props.skills.some((skill) => skill.attribute === attribute && skill.name.toLowerCase() === name.toLowerCase())) return
  addSkill(attribute, name)
}

function removeSkill(skill) {
  const index = props.skills.indexOf(skill)
  if (index < 0) return
  const name = skill.name?.trim()
  if (window.confirm(`Remove ${name ? `“${name}”` : 'this custom skill'}?`)) props.skills.splice(index, 1)
}
</script>

<template>
  <div>
    <div class="skill-budget" :class="{ 'skill-budget--complete': remainingPips === 0, 'skill-budget--over': remainingPips < 0 }">
      <strong>Assigned {{ formatPips(assignedPips) }} / 7D</strong>
      <span v-if="remainingPips >= 0">{{ formatPips(remainingPips) }} remaining</span>
      <span v-else>{{ formatPips(remainingPips) }} over limit</span>
    </div>

    <div class="attribute-skill-lists mt-5">
      <section v-for="attributeName in attributeNames" :key="attributeName" class="attribute-skill-panel">
        <header>
          <div>
            <h3>{{ attributeName }}</h3>
            <p>Base {{ formatPips((Number(attributes[attributeName.toLowerCase()]?.dice) || 0) * 3 + (Number(attributes[attributeName.toLowerCase()]?.pips) || 0)) }}</p>
          </div>
          <button class="custom-skill-button" type="button" @click="addSkill(attributeName.toLowerCase())">+ Custom</button>
        </header>

        <div class="suggestion-list">
          <button
            v-for="suggestion in suggestions[attributeName.toLowerCase()]"
            :key="suggestion"
            :disabled="skills.some((skill) => skill.attribute === attributeName.toLowerCase() && skill.name.toLowerCase() === suggestion.toLowerCase())"
            type="button"
            @click="addSuggestion(attributeName.toLowerCase(), suggestion)"
          >+ {{ suggestion }}</button>
        </div>

        <div v-if="skillsFor(attributeName.toLowerCase()).length" class="skill-rows">
          <div v-for="skill in skillsFor(attributeName.toLowerCase())" :key="skill" class="skill-row">
            <button :aria-label="`Remove ${skill.name || 'skill'}`" class="remove-skill" type="button" @click="removeSkill(skill)">&minus;</button>
            <label class="skill-name-field"><span>Name</span><input v-model="skill.name" type="text" /></label>
            <label><span>Dice</span><input v-model.number="skill.upgradeDice" min="0" step="1" type="number" /></label>
            <label><span>Pips</span><input v-model.number="skill.upgradePips" max="2" min="0" step="1" type="number" /></label>
            <div class="skill-total"><span>Total</span><output>{{ totalFor(skill) }}</output></div>
          </div>
        </div>
        <p v-else class="empty-list">No {{ attributeName.toLowerCase() }} skills selected.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.skill-budget { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:.4rem 1rem; border:1px solid rgb(252 211 77/.35); padding:.8rem .9rem; background:rgb(252 211 77/.04); color:rgb(253 230 138); font-size:.8rem; }
.skill-budget span { color:rgb(212 212 216); font-size:.7rem; text-transform:uppercase; }
.skill-budget--complete { border-color:rgb(74 222 128/.5); color:rgb(134 239 172); }
.skill-budget--over { border-color:rgb(248 113 113/.55); color:rgb(252 165 165); }
.attribute-skill-lists { display:grid; gap:.85rem; }
.attribute-skill-panel { border:1px solid rgb(252 211 77/.24); padding:1rem; background:rgb(255 255 255/.012); }
.attribute-skill-panel > header { display:flex; align-items:center; justify-content:space-between; gap:1rem; padding-bottom:.7rem; border-bottom:1px solid rgb(252 211 77/.16); }
.attribute-skill-panel h3 { color:rgb(253 230 138/.85); font-size:.72rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; }
.attribute-skill-panel header p { margin-top:.2rem; color:rgb(161 161 170); font-size:.62rem; }
.custom-skill-button { border:1px solid rgb(252 211 77/.4); padding:.35rem .55rem; background:rgb(252 211 77/.05); color:rgb(254 243 199); font-size:.55rem; font-weight:700; text-transform:uppercase; cursor:pointer; }
.suggestion-list { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:.7rem; }
.suggestion-list button { border:1px solid rgb(161 161 170/.25); padding:.3rem .5rem; background:rgb(0 0 0/.24); color:rgb(228 228 231); font-size:.62rem; cursor:pointer; }
.suggestion-list button:disabled { cursor:not-allowed; opacity:.35; }
.skill-rows { display:grid; gap:.5rem; margin-top:.75rem; }
.skill-row { display:grid; grid-template-columns:1.4rem minmax(7rem,1fr) 4.5rem 4.5rem 4rem; align-items:end; gap:.45rem; }
.skill-row label > span,.skill-total > span { display:block; margin-bottom:.3rem; color:rgb(161 161 170); font-size:.5rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; }
.skill-row input,.skill-total output { display:block; width:100%; height:2.25rem; border:1px solid rgb(161 161 170/.25); padding:.4rem .5rem; background:rgb(0 0 0/.28); color:rgb(244 244 245); font-size:.7rem; outline:none; }
.skill-total output { display:grid; place-items:center; color:rgb(186 230 253); }
.remove-skill { align-self:end; width:1.35rem; height:1.35rem; margin-bottom:.45rem; border:1px solid rgb(248 113 113/.45); border-radius:999px; background:rgb(127 29 29/.12); color:rgb(252 165 165); cursor:pointer; }
.empty-list { padding:.9rem 0 .2rem; color:rgb(113 113 122); font-size:.68rem; text-align:center; }
@media (min-width:850px) { .attribute-skill-lists { grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media (max-width:520px) { .skill-row { grid-template-columns:1.4rem repeat(2,minmax(0,1fr)); } .skill-name-field { grid-column:2/-1; } }
</style>
