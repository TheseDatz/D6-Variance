<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const levelDescriptors = ['Minor', 'Medium', 'Major', 'Critical']

function traitLevels(name, descriptions, adjustments, pack = 'Core', startLevel = 1) {
  return descriptions.map((description, index) => ({
    name: `${name} (${levelDescriptors[startLevel + index - 1]})`,
    pack,
    level: startLevel + index,
    description,
    adjustment: adjustments[index],
  }))
}

const advantages = [
  ...traitLevels('Authority', [
    'You hold limited authority in one local organization. Gain +2 on Social checks to issue routine orders or request ordinary access from its members.',
    'You hold recognized authority across a sizable organization. Gain +1D on Social checks to issue lawful orders or secure restricted access from its members.',
    'You command a major institution or jurisdiction. Gain +1D+1 on relevant Social checks and may requisition a team of up to 10 ordinary personnel once per session.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Connections', [
    'Choose one local community or profession. Once per session, a contact provides a useful lead or a routine introduction after a successful Easy Social check.',
    'Choose one organization or broad profession. Once per session, a contact provides restricted information or modest assistance after a successful Moderate Social check.',
    'Your contacts span a region or influential institution. Twice per session, a contact can provide restricted information, an introduction, or a temporary resource after a successful Moderate Social check.',
    'Your network has exceptional reach. Twice per session, locate an influential contact who can provide rare information or major assistance after a successful Difficult Social check.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice', '-(1D+1) Attribute Dice']),
  ...traitLevels('Cultural Familiarity', [
    'Choose one culture or community. Gain +2 on checks to recognize its everyday customs, etiquette, and common practices.',
    'Choose one culture or community. Gain +1D on checks involving its customs, etiquette, institutions, or social expectations.',
    'Choose one culture or community. Gain +1D+1 on relevant checks and automatically recognize ordinary customs, etiquette, and social ranks without rolling.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Signature Equipment', [
    'Begin with one uncommon but noncombat item, tool kit, or comparable resource worth roughly twice the campaign’s normal starting allowance.',
    'Begin with one rare item, superior tool kit granting +1D on one narrow type of check, or a modest vehicle or facility.',
    'Begin with one exceptional item granting +1D on an appropriate broad use, or a valuable vehicle, facility, or collection with significant narrative utility.',
    'Begin with a unique or campaign-defining item, vehicle, facility, or collection. Any roll bonus is capped at +2D and its exact capabilities require Storyteller approval.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice', '-(1D+1) Attribute Dice']),
  ...traitLevels('Renown', [
    'You are favorably known within one local community. Gain +2 on Social checks when that reputation is relevant.',
    'You are favorably known across a city, profession, or similar population. Gain +1D on relevant Social checks.',
    'You are favorably known across a region or major institution. Gain +1D+1 on relevant Social checks, though strangers may recognize you without being asked.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Sponsor', [
    'A person or small organization offers advice, introductions, and ordinary logistical help. Request this support once per session with an Easy Social check.',
    'An influential sponsor can provide restricted access, temporary equipment, or a small team. Request support once per session with a Moderate Social check.',
    'A powerful sponsor can provide major resources, protection, or institutional intervention. Request support once per session with a Difficult Social check; failure may still bring aid with a serious obligation.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Resources', [
    'You have comfortable, dependable means. Routine personal expenses and common equipment normally require no availability check.',
    'You are wealthy. Once per session, obtain a costly but commercially available item or service after an Easy Social or Intelligence check.',
    'You control major financial or material resources. Once per session, obtain a very costly available item, temporary facility, or professional team after a Moderate check.',
    'You command extraordinary resources. Once per session, finance a major operation or obtain an exceptionally costly available resource after a Difficult check and Storyteller approval.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice', '-(1D+1) Attribute Dice']),
  ...traitLevels('Acute Sense', [
    'Choose sight, hearing, smell, taste, or touch. Gain +1D on checks where detecting fine details through that sense is the primary challenge.',
    'Choose one sense. Gain +1D+1 on checks centered on it, and halve distance-based penalties involving that sense, rounded toward zero.',
    'Choose one sense. Gain +2D on checks centered on it, and you can perceive details at up to twice the ordinary distance when conditions permit.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Ambidextrous', [
    'You use either hand without penalty and may perform ordinary tasks equally well with either hand. This does not grant an additional action.',
  ], ['-1 pip Attribute Dice']),
  ...traitLevels('Rapid Recovery', [
    'Gain +2 on Strength checks for natural recovery and restore +2 additional Health whenever natural recovery restores Health.',
    'Gain +1D on Strength checks for natural recovery and restore +1D additional Health whenever natural recovery restores Health.',
    'Gain +1D+1 on Strength checks for natural recovery, restore +2D additional Health, and halve ordinary recovery time.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Enduring', [
    'Gain +2 on Strength checks to resist fatigue, missed sleep, hunger, thirst, or sustained exertion.',
    'Gain +1D on Strength checks to resist fatigue, missed sleep, hunger, thirst, or sustained exertion, and double the safe duration before the first such check is required.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice']),
  ...traitLevels('Quick Reflexes', [
    'Gain +2 on Initiative checks.',
    'Gain +1D on Initiative checks and +1 to Defense Bonus during the first round of combat.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice']),
  ...traitLevels('Hardy', [
    'Gain +2 on Strength checks to resist disease, poison, stunning, and incapacitation.',
    'Gain +1D on Strength checks to resist disease, poison, stunning, and incapacitation.',
    'Gain +1D+1 on those resistance checks and reduce Health lost to poison or disease by 2 after resistance is resolved, to a minimum of 0.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Strong-Willed', [
    'Gain +2 on checks to resist intimidation, coercion, fear, or mental influence.',
    'Gain +1D on checks to resist intimidation, coercion, fear, or mental influence.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice']),
  ...traitLevels('Fortunate', [
    'Once per session, reroll one ordinary die in a check and keep the new result.',
    'Once per session, reroll an entire check and keep the better final result.',
    'Twice per session, reroll an entire check and keep the better final result. Only one use may affect a single check.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Master of Disguise', [
    'Gain +2 on checks to create, adopt, or maintain a disguise when you have at least 10 minutes and suitable materials.',
    'Gain +1D on disguise checks; creating a routine disguise takes 5 minutes rather than 10.',
    'Gain +1D+1 on disguise checks and may imitate a specific person’s appearance and mannerisms after observing them for at least 10 minutes.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Fast Learner', [
    'After observing a successful example or receiving brief instruction, ignore up to −2 of the penalty for attempting that task untrained.',
    'After observing a successful example or receiving brief instruction, ignore up to −1D of the penalty for attempting that task untrained.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice']),
  ...traitLevels('Perfect Direction', [
    'Gain +1D on checks to determine direction, retrace a route, or avoid becoming lost. Without interference, you always know approximate cardinal direction.',
  ], ['-1 pip Attribute Dice']),
  ...traitLevels('Natural Talent', [
    'Choose one skill. Gain +2 on checks using it.',
    'Choose one skill. Gain +3 on checks using it.',
    'Choose one skill. Gain +1D on checks using it.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Gifted Aptitude', [
    'Choose one narrow field containing no more than three skills. Reduce the XP cost of improving a related specialization by 1, to a minimum of 1 XP.',
    'Choose one narrow field containing no more than three skills. Reduce the XP cost of improving its skills or specializations by 1, to a minimum of 1 XP.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice']),
  ...traitLevels('Ventriloquist', [
    'Gain +1D on checks to project, relocate, or disguise your voice. Identifying its true source requires an opposed perception check.',
  ], ['-1 pip Attribute Dice']),
  ...traitLevels('Perfect Recall', [
    'Gain +2 on Intelligence checks to recall information you personally encountered before.',
    'Gain +1D on recall checks. Once per session, ask the Storyteller to repeat one relevant detail your character witnessed but you have forgotten.',
    'Gain +1D+1 on recall checks. Ordinary details personally witnessed within the last year are recalled automatically.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Danger Sense', [
    'Gain +2 on checks to detect an immediate ambush, trap, or environmental danger.',
    'Gain +1D on those checks. When an unseen danger is seconds away, the Storyteller secretly rolls your Luck against Moderate difficulty. Success provides a warning but does not identify the danger.',
    'Gain +1D+1 on those checks. You cannot be completely surprised by a detectable immediate danger and may use reactions during the first round.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Prepared', [
    'Once per session, reveal that you brought one plausible common item. It cannot be a weapon, armour, consumable, or item worth more than ordinary starting equipment.',
    'Once per session, reveal a plausible common item or minor preparation made earlier. It may provide +2 on one check.',
    'Once per session, reveal a substantial but plausible preparation such as an escape route, hidden supply, prior message, reservation, or specialized tool. It may provide +1D on one check. It cannot create unique equipment or negate a resolved consequence.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Steady Hands', [
    'Gain +2 on Dexterity checks requiring delicate manipulation, including surgery, fine repair, lock work, or precision tools. This does not improve attacks or gross movement.',
    'Gain +1D on delicate-manipulation checks. Environmental distraction cannot impose more than −1D unless you are physically prevented from working.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice']),
  ...traitLevels('Powerful Jumper', [
    'Gain +2 on jumping checks and increase your maximum jumping distance by 25%.',
    'Gain +1D on jumping checks and increase your maximum jumping distance by 50%.',
    'Gain +1D+1 on jumping checks, double your maximum jumping distance, and subtract 3 metres when determining falling damage.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
  ...traitLevels('Inspiring Teacher', [
    'After at least one hour of instruction, one student gains +1 on related checks until the end of the session.',
    'After at least one hour of instruction, up to three students each gain +2 on related checks until the end of the session.',
    'After at least one hour of instruction, up to five students each gain +1D on related checks until the end of the session. A character may benefit from only one teacher on a check.',
  ], ['-1 pip Attribute Dice', '-2 pips Attribute Dice', '-1D Attribute Dice']),
]

const disadvantages = [
  ...traitLevels('Critical Weakness', [
    'Choose an uncommon trigger. While exposed, suffer −2 on all checks until the end of your next turn.',
    'Choose an uncommon trigger. While exposed, suffer −1D on all checks and lose 1D Health at the end of each round; resistance does not reduce this loss.',
    'Choose a reasonably encounterable trigger. While exposed, suffer −(1D+1) on all checks and lose 2D Health at the end of each round; resistance does not reduce this loss.',
    'Choose a reasonably encounterable trigger. While exposed, suffer −2D on all checks and lose 3D Health at the end of each round; resistance does not reduce this loss.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice', '+1D+1 Attribute Dice']),
  ...traitLevels('Conditional Advantage', [
    'Choose one advantage. A recurring condition suppresses one numeric benefit from it by 2, or makes it unavailable for about one scene in four.',
    'Choose one advantage. A recurring condition suppresses one numeric benefit by 1D, or makes it unavailable for about half of relevant scenes.',
    'Choose one Major or Critical advantage. A common recurring condition disables it completely. This disadvantage cannot grant more allocation than the affected advantage costs.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Elderly', [
    'Suffer −2 on Strength checks involving sustained exertion and Dexterity checks involving speed or balance.',
    'Suffer −1D on Strength checks involving sustained exertion and Dexterity checks involving speed or balance; reduce Move by 2, to a minimum of 1.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice']),
  ...traitLevels('Inexperienced', [
    'Suffer −2 on checks involving ordinary adult institutions, professional etiquette, or life experience unfamiliar to you.',
    'Suffer −1D on those checks. Strangers who notice your inexperience may also be less cooperative when exploiting, dismissing, or patronizing you would be plausible.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice']),
  ...traitLevels('Ill-Fated', [
    'Once per session when your Wild Die rolls 1, the roll automatically produces a complication even if the check succeeds.',
    'Twice per session when your Wild Die rolls 1, the Storyteller may impose a complication and apply −2 to your final total.',
    'Twice per session after any failed check, the Storyteller may introduce a serious related setback beyond the failure itself.',
    'Three times per session after a failed check, the Storyteller may introduce a severe related setback; one may occur at the worst plausible moment rather than immediately.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice', '+1D+1 Attribute Dice']),
  ...traitLevels('Culture Shock', [
    'Suffer −2 on checks involving the dominant culture’s etiquette, bureaucracy, or unwritten expectations.',
    'Suffer −1D on those checks, and a social mistake may create a complication when the Wild Die rolls 1 or 2.',
    'Suffer −(1D+1) on those checks. Routine dealings with unfamiliar local institutions require at least an Easy check when others would not roll.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Debt', [
    'At the Storyteller’s discretion, a creditor demands a modest payment or service. Once every three sessions is a useful guideline. Refusal causes a concrete social or financial complication.',
    'At the Storyteller’s discretion, a capable creditor demands a costly payment or dangerous service. Once every two sessions is a useful guideline. The creditor can impose −1D on one relevant Resources or Social check through interference.',
    'At the Storyteller’s discretion, a powerful creditor demands major payments or dangerous service. Once per session is a useful guideline. The creditor may seize resources, expose you, or dispatch agents after refusal.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Duty', [
    'At the Storyteller’s discretion, your commitment demands inconvenient action or restraint. Once every three sessions is a useful guideline. Ignoring it costs 1 Meta Die, if available.',
    'At the Storyteller’s discretion, your commitment demands meaningful risk or sacrifice. Once every two sessions is a useful guideline. Ignoring it costs all current Meta Dice, to a maximum of 2.',
    'At the Storyteller’s discretion, your commitment overrides safety or profit. Once per session is a useful guideline. Deliberately betraying it prevents you from gaining Meta Dice until you make meaningful amends.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Obligations', [
    'At the Storyteller’s discretion, an employer, superior, or institution claims several hours of your time or assigns a routine task. Once every three sessions is a useful guideline.',
    'At the Storyteller’s discretion, your obligations create a significant assignment, restriction, or schedule conflict. Once every two sessions is a useful guideline.',
    'At the Storyteller’s discretion, your obligations issue dangerous orders or consume substantial time. Once per session is a useful guideline; refusal risks dismissal, punishment, or loss of access.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Adversary', [
    'A capable individual or small group interferes about once every three sessions and has relevant ratings around 3D.',
    'An influential individual or organization interferes about once every two sessions and has key ratings around 4D plus modest resources.',
    'A powerful organization or exceptional rival interferes about once per session and has key ratings around 5D plus significant resources.',
    'A campaign-defining enemy has extensive reach, key ratings around 6D, and major resources. They can threaten the character or party in most places.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice', '+1D+1 Attribute Dice']),
  ...traitLevels('Impairment', [
    'Define one specific physical, sensory, mental, or social limitation. Suffer −2 when it directly interferes with a check.',
    'Define one specific limitation. Suffer −1D when it directly interferes with a check.',
    'Define one broad or severe limitation. Suffer −(1D+1) when it interferes, and one common type of action may require assistance or special equipment.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Notorious', [
    'You are distrusted within one local community. Suffer −2 on relevant Social checks when recognized.',
    'You are distrusted across a city, profession, or similar population. Suffer −1D on relevant Social checks when recognized.',
    'You are widely feared or condemned across a region or major institution. Suffer −(1D+1) on relevant Social checks, and recognition may provoke immediate refusal or scrutiny.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Slow Learner', [
    'Choose a category containing no more than three skills. Improving one of those skills costs +1 XP per pip.',
    'Choose one attribute’s non-Paranormal skills. Improving one costs +2 XP per pip.',
    'Choose one attribute’s skills. Improving one costs +3 XP per pip, and related specializations cost +2 XP per pip.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Destitute', [
    'Begin with half the normal discretionary equipment and funds. Costly routine purchases require an Easy Social or Intelligence check to arrange financing or assistance.',
    'Begin with only essential clothing and one ordinary personal item. Securing food, lodging, transport, or common equipment without help requires a Moderate check or an equivalent obligation.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice']),
  ...traitLevels('Targeted', [
    'In an agreed campaign context, openly prejudiced members of a recurring group are less cooperative toward you, and you suffer −2 on Social checks with them.',
    'The hostility is widespread or institutionally enforced. Affected people are greatly less cooperative toward you, and you suffer −1D on relevant Social checks.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice']),
  ...traitLevels('Recurring Cost', [
    'Choose one advantage. At the Storyteller’s discretion, maintaining it requires a modest payment, service, or one-hour procedure. Once every three sessions is a useful guideline; it is suspended until paid.',
    'Choose one advantage. At the Storyteller’s discretion, maintaining it requires a costly payment, dangerous service, or eight-hour procedure. Once per session is a useful guideline; it is suspended until paid.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice']),
  ...traitLevels('Compulsion', [
    'Choose a defined belief, habit, fear, or urge. Resisting it when meaningfully tempted requires an Easy Social check.',
    'Resisting the compulsion requires a Moderate Social check; failure imposes −1D on checks made while acting directly against it for the rest of the scene.',
    'Resisting requires a Difficult Social check; failure forces an immediate relevant action or causes −(1D+1) on all checks for the rest of the scene.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Reduced Attribute', [
    'Choose one attribute and reduce its rating by 1 pip after allocation, also reducing every linked skill by 1 pip.',
    'Choose one attribute and reduce its rating by 2 pips after allocation, also reducing every linked skill by 2 pips.',
    'Choose one attribute and reduce its rating by 1D after allocation, also reducing every linked skill by 1D.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Temporary Benefit', [
    'Choose an advantage of at least Medium level and one uncommon event that permanently removes it. This grants half the advantage’s allocation cost, rounded down.',
    'Choose an advantage of at least Major level and one reasonably possible event that permanently removes it. This grants half the advantage’s allocation cost, rounded down.',
    'Choose a Critical advantage and a likely campaign event that permanently removes it. This grants half the advantage’s allocation cost, rounded down.',
  ], ['Variable Attribute Dice', 'Variable Attribute Dice', 'Variable Attribute Dice']),
  ...traitLevels('Dependent', [
    'At the Storyteller’s discretion, someone with ordinary capabilities relies on you and needs meaningful help. Once every three sessions is a useful guideline.',
    'At the Storyteller’s discretion, a vulnerable dependent needs protection or costly help. Once every two sessions is a useful guideline; abandoning them prevents you from gaining 1 Meta Die that session.',
    'At the Storyteller’s discretion, a frequently endangered dependent who is central to your life needs help. Once per session is a useful guideline; abandoning them prevents all Meta Die awards until meaningful amends are made.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Secret', [
    'Exposure would cause embarrassment, a modest loss, or local distrust. At the Storyteller’s discretion, the secret faces a meaningful risk of discovery; once every three sessions is a useful guideline.',
    'Exposure would cost an important relationship, position, or resource. At the Storyteller’s discretion, the secret faces discovery; once every two sessions is a useful guideline.',
    'Exposure would produce imprisonment, ruin, lethal pursuit, or comparable consequences. At the Storyteller’s discretion, the secret faces discovery; once per session is a useful guideline.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Phobia', [
    'Choose a specific fear. While exposed, suffer −2 on checks and approaching it voluntarily requires an Easy Social check.',
    'While exposed, suffer −1D on checks and approaching it voluntarily requires a Moderate Social check.',
    'While exposed, suffer −(1D+1) on checks. Approaching requires a Difficult Social check; failure makes you flee, freeze, or seek immediate safety for one round.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Dependency', [
    'You require a defined substance, treatment, activity, or condition at least once per week. Missing it causes −2 on all checks until satisfied.',
    'You require it at least once per day. Missing it causes −1D on all checks and prevents natural Health recovery.',
    'You require it at least once every six hours. Missing it causes −(1D+1) on all checks and 1D Health loss every six hours; resistance does not reduce this loss.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Code of Conduct', [
    'Define a meaningful code with at least three restrictions. Deliberately violating it costs 1 Meta Die, if available, and prevents Meta Die awards for the scene.',
    'Define a demanding code with at least five restrictions. Deliberately violating it removes all current Meta Dice, to a maximum of 2, and prevents Meta Die awards until meaningful amends are made.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice']),
  ...traitLevels('Blackouts', [
    'Once per session, when the Wild Die rolls 1 during a high-pressure scene, make a Moderate Strength check. On failure, lose your next action and remember nothing from that round.',
    'Once per session, when the Wild Die rolls 1 during a high-pressure scene, make a Moderate Strength check. On failure, become unconscious or nonresponsive for 1D rounds and remember nothing from that period.',
    'Once per session, when the Wild Die rolls 1 during a high-pressure scene, make a Moderate Strength check. On failure, become unconscious or nonresponsive for 2D minutes. The Storyteller may determine what occurred during the missing time within the group’s safety boundaries.',
  ], ['+2 pips Attribute Dice', '+1D Attribute Dice', '+1D+1 Attribute Dice'], 'Core', 2),
  ...traitLevels('Nightmares', [
    'You require nine hours of rest. With less, suffer −2 on the first three checks you make after waking.',
    'You require ten hours of rest. With less, suffer −1D on checks until you complete sufficient rest.',
    'After every rest, make a Moderate Social check. On failure, the rest restores no Health and you suffer −1D on checks until completing a successful rest.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Poor Memory', [
    'Suffer −2 on Intelligence checks to recall names, instructions, routes, or previously encountered information.',
    'Suffer −1D on recall checks. Recalling an important detail under pressure always requires at least an Easy Intelligence check.',
    'Suffer −(1D+1) on recall checks. Recalling important information requires at least a Moderate Intelligence check, even outside immediate pressure.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice']),
  ...traitLevels('Wanted', [
    'One local jurisdiction seeks to question or arrest you. A recognizable encounter with its authorities occurs approximately once every three sessions.',
    'A regional authority actively seeks you. Identification prompts detention, and officials or hunters interfere approximately once every two sessions.',
    'A powerful organization seeks your capture or death and interferes approximately once per session.',
    'Multiple powerful organizations or a nearly ubiquitous authority seek you. Safe public activity requires an effective disguise, false identity, or concealment.',
  ], ['+1 pip Attribute Dice', '+2 pips Attribute Dice', '+1D Attribute Dice', '+1D+1 Attribute Dice']),
]

const speciesFeatures = [
  ...traitLevels('Adaptable', [
    'You have no mandatory species traits. When creating your character, spend your starting allocation dice freely within your species attribute limits.',
  ], []),
  ...traitLevels('Stonewise', [
    'Gain +1D on checks to notice unusual stonework, structural weaknesses, underground construction, or hazards involving worked stone.',
  ], [], 'Fantasy'),
  ...traitLevels('Ageless', [
    'After reaching adulthood, you do not suffer ordinary physical decline from age and are immune to effects that cause mundane premature aging.',
  ], [], 'Fantasy'),
  ...traitLevels('Small Stature', [
    'You can pass through spaces sized for a Small creature and gain +2 on checks to hide behind cover. Equipment made for larger creatures may require alteration, and you cannot comfortably use oversized equipment.',
  ], [], 'Fantasy'),
  ...traitLevels('Natural Weapon', [
    'Choose claws, fangs, horns, a tail, beak, talons, pincers, tusks, or another form. Your unarmed attacks may deal Strength Damage +1. The weapon uses Brawling, cannot be disarmed, and does not grant another attack.',
    'Choose the weapon’s physical form. Your unarmed attacks may deal Strength Damage +1D. The weapon uses Brawling, cannot be disarmed, and does not grant another attack.',
    'Choose the weapon’s physical form. Your unarmed attacks may deal Strength Damage +1D+2. The weapon uses Brawling, cannot be disarmed, and does not grant another attack.',
    'Choose the weapon’s physical form. Your unarmed attacks may deal Strength Damage +2D. The weapon uses Brawling, cannot be disarmed, and does not grant another attack.',
  ], []),
  ...traitLevels('Natural Armour', [
    'Gain +1 resistance against physical and ballistic damage.',
    'Gain +2 resistance against physical and ballistic damage.',
    'Gain +1D resistance against physical and ballistic damage.',
    'Gain +1D+1 resistance against physical and ballistic damage and +2 against other ordinary damage.',
  ], []),
  ...traitLevels('Amphibious', [
    'You breathe both air and water, use full Move while swimming, gain +1D on Swimming checks, and ignore ordinary underwater breathing and pressure penalties.',
  ], [], 'Core', 3),
  ...traitLevels('Aquatic Adaptation', [
    'Gain +2 on Swimming checks and hold your breath twice as long as normal.',
    'Gain +1D on Swimming checks and increase your swimming Move by 3.',
    'Gain +1D on Swimming checks, use full Move underwater, and ignore ordinary underwater action penalties. A species should not have both this feature and Amphibious.',
  ], []),
  ...traitLevels('Flight', [
    'Fly at Move 10. Flight uses normal movement and Dexterity for difficult maneuvers.',
    'Fly at Move 14. Once per round, combine flight movement with one other action without adding an additional multiple-action penalty.',
  ], [], 'Core', 3),
  ...traitLevels('Gliding', [
    'Glide up to 15 metres horizontally for every 5 metres descended. Reduce falling damage by 2D when you can deploy your gliding anatomy.',
    'Glide at Move 10, descend 2 metres per round, and reduce falling damage by 3D. Gliding cannot generate altitude without a suitable external force.',
  ], [], 'Core', 2),
  ...traitLevels('Low-Light Vision', [
    'See twice as far in dim light and reduce low-light penalties by 2.',
    'Reduce low-light penalties by 1D and retain normal color and detail.',
  ], []),
  ...traitLevels('Heat Vision', [
    'Detect heat differences within 20 metres in darkness. The sense provides no color and limited fine detail.',
    'Detect heat differences within 60 metres and gain +1D on checks to locate warm creatures or active machinery by heat. Uniform temperatures, insulation, and solid barriers can defeat this sense.',
  ], [], 'Core', 2),
  ...traitLevels('Darkvision', [
    'See in total darkness to 20 metres in monochrome without visual darkness penalties. This does not see through smoke, fog, walls, camouflage, or invisibility.',
    'See in total darkness to 60 metres with ordinary detail but no color. This does not see through smoke, fog, walls, camouflage, or invisibility.',
  ], [], 'Core', 3),
  ...traitLevels('Microscopic Vision', [
    'Gain +2 when visually inspecting something within 30 centimetres.',
    'Gain +1D when visually inspecting something within 30 centimetres and perceive details approximately ten times smaller than ordinary unaided vision.',
  ], []),
  ...traitLevels('Spatial Awareness', [
    'As an action, make a Moderate Intelligence check to perceive solid objects and movement within 10 metres without sight until the beginning of your next turn.',
    'The sense functions passively within 20 metres. You may defend while blinded but suffer −1D on attacks requiring precise visual identification.',
    'Accurately perceive movement and solid obstacles within 60 metres. Darkness and smoke do not interfere, though the chosen mechanism may be blocked. Choose echolocation, vibration sensing, air-current sensitivity, or another mechanism.',
  ], [], 'Core', 2),
  ...traitLevels('Prehensile Tail', [
    'Your tail can hold objects and perform simple manipulation at 2D. It cannot attack or operate precision tools.',
    'Your tail operates at Dexterity −1D, to a minimum of 1D, and can assist a suitable physical task for +2.',
    'Your tail operates at full Dexterity and may wield an appropriately sized one-handed item. It does not grant another action.',
  ], [], 'Core', 2),
  ...traitLevels('Extra Limb', [
    'Carry or brace one additional item and gain +2 when the limb materially assists a physical task.',
    'Gain +1D on grappling, climbing, holding, or bracing when the extra limb applies.',
    'The limb can independently operate an appropriate tool or weapon. Every use still follows normal multiple-action penalties.',
  ], [], 'Core', 2),
  ...traitLevels('Regeneration', [
    'Once per day after resting for one hour, make a Moderate Strength check. Restore 2D Health on success.',
    'After resting for one hour, restore 3D Health automatically once per day. A lost nonvital body part regenerates by 10% after each successful daily Moderate Strength check. This cannot reverse death or regenerate an indispensable organ.',
  ], [], 'Core', 3),
  ...traitLevels('Redundant Organ', [
    'Choose one normally singular vital organ. The first injury that would specifically destroy or disable it instead leaves the redundant organ functioning.',
    'Also gain +1D on Strength checks against critical injuries involving that organ. Losing one copy causes −1D on sustained physical checks until treated.',
  ], [], 'Core', 2),
  ...traitLevels('Silent Communication', [
    'Communicate silently within 10 metres with another character possessing this feature, provided you share an appropriate language.',
    'Communicate silently within 100 metres with another character possessing this feature and a shared language. Communication is normally imperceptible without equipment or an appropriate special sense.',
    'Communicate silently within 1 kilometre with another character possessing this feature and a shared language. Significant barriers or interference require an Easy Intelligence check.',
  ], []),
  ...traitLevels('Berserker Rage', [
    'Once per session, enter a rage as a free action for up to three rounds. Gain +1D melee damage and suffer −1D on Intelligence and Social checks.',
    'Gain +2D melee damage and suffer −2D on all non-Strength checks. Ending the rage while an enemy remains requires a Moderate Social check.',
    'Gain +2D Strength for melee damage and damage resistance only and ignore fear penalties. Suffer −2D on every other check and must attack or directly pursue a perceived threat each round.',
  ], [], 'Core', 2),
  ...traitLevels('Environmental Dependence', [
    'In one common adverse environment, suffer −2 on a defined group of checks.',
    'In one common adverse environment, suffer −1D on three defined categories of checks.',
    'In one common adverse environment, suffer −(1D+1) on those checks and reduce Move by 2.',
    'In one common adverse environment, suffer −2D on those checks, reduce Move by 4, and lose 1D Health per hour. The environment must occur meaningfully in the campaign.',
  ], []),
  ...traitLevels('Atmospheric Dependence', [
    'You require a breathing device in the campaign’s normal atmosphere. Without it, suffer −1D on all checks.',
    'Without your required breathing device, suffer −(1D+1) on all checks and lose 1D Health at the end of every minute. Resistance does not reduce this loss.',
    'Without your required breathing device, suffer −2D on all checks and lose 2D Health at the end of every round. Resistance does not reduce this loss.',
  ], [], 'Core', 2),
  ...traitLevels('Delicate Build', [
    'Suffer −1 on Strength resistance rolls against physical, ballistic, falling, and impact damage.',
    'Suffer −2 on those resistance rolls.',
    'Suffer −1D on those resistance rolls. This does not affect melee damage, lifting, other Strength checks, or starting Health.',
  ], []),
  ...traitLevels('Reduced Mobility', [
    'Reduce Move by 1.',
    'Reduce Move by 2 and suffer −2 on jumping checks.',
    'Reduce Move by 4 and suffer −1D on running and jumping checks.',
    'Reduce Move by 6, to a minimum of 1. Rough terrain and ordinary climbing obstacles require an Easy Dexterity check.',
  ], []),
]

const groups = [
  {
    id: 'advantages',
    label: 'Advantages',
    description: 'Benefits that give a character new opportunities or an exceptional edge.',
    traits: advantages,
  },
  {
    id: 'disadvantages',
    label: 'Disadvantages',
    description: 'Meaningful complications that create trouble while freeing dice for attributes.',
    traits: disadvantages,
  },
  {
    id: 'species',
    label: 'Species Features',
    description: 'Innate features granted by a character’s species or physical nature.',
    traits: speciesFeatures,
  },
]

const route = useRoute()
const requestedGroup = typeof route.query.group === 'string' ? route.query.group : ''
const activeGroupId = ref(groups.some((group) => group.id === requestedGroup) ? requestedGroup : groups[0].id)
const searchQuery = ref(typeof route.query.search === 'string' ? route.query.search : '')
const selectedPack = ref(typeof route.query.pack === 'string' ? route.query.pack : 'all')

const activeGroup = computed(() => groups.find((group) => group.id === activeGroupId.value))
const packs = computed(() => [...new Set(groups.flatMap((group) => group.traits.map((trait) => trait.pack)))])
const filteredTraits = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return activeGroup.value.traits.filter((trait) => {
    const matchesPack = selectedPack.value === 'all' || trait.pack === selectedPack.value
    const matchesSearch = !query || `${trait.name} ${trait.pack} ${trait.description}`.toLowerCase().includes(query)
    return matchesPack && matchesSearch
  })
})

function selectGroup(id) {
  activeGroupId.value = id
  searchQuery.value = ''
}
</script>

<template>
  <section aria-labelledby="trait-catalog" class="scroll-mt-24">
    <h2 id="trait-catalog" class="sr-only">Trait catalog</h2>

    <div class="flex items-end overflow-hidden px-2" role="tablist" aria-label="Trait types">
      <button
        v-for="group in groups"
        :id="`${group.id}-tab`"
        :key="group.id"
        class="relative min-w-36 cursor-pointer whitespace-nowrap rounded-t-xl border border-b-0 px-5 py-3 text-sm font-semibold tracking-wide transition focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        :class="activeGroupId === group.id
          ? 'z-[1] -mb-px border-amber-300/60 bg-[#07140c] text-amber-100 shadow-[0_-8px_24px_rgba(251,191,36,0.10)] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-[#07140c]'
          : 'border-white/10 bg-black/35 text-zinc-400 hover:border-amber-300/35 hover:text-amber-100'"
        :aria-controls="`${group.id}-panel`"
        :aria-selected="activeGroupId === group.id"
        :tabindex="activeGroupId === group.id ? 0 : -1"
        role="tab"
        type="button"
        @click="selectGroup(group.id)"
      >
        {{ group.label }}
      </button>
    </div>

    <div
      :id="`${activeGroup.id}-panel`"
      class="relative border border-amber-300/50 bg-[#07140c]/25 p-5 shadow-[0_0_32px_rgba(251,191,36,0.12),inset_0_0_24px_rgba(251,191,36,0.04)] sm:p-7"
      :aria-labelledby="`${activeGroup.id}-tab`"
      role="tabpanel"
    >
      <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"></div>

      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 class="text-xl font-semibold tracking-wide text-amber-100">{{ activeGroup.label }}</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-zinc-300">{{ activeGroup.description }}</p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
          <label class="relative flex-1">
            <span class="sr-only">Search {{ activeGroup.label }}</span>
            <svg aria-hidden="true" class="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-amber-200/60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              v-model="searchQuery"
              class="w-full rounded-full border border-amber-400/25 bg-black/30 py-2.5 pr-4 pl-11 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-500/15"
              :placeholder="`Search ${activeGroup.label.toLowerCase()}`"
              type="search"
            />
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
        <article v-for="trait in filteredTraits" :key="trait.name" class="border border-white/15 bg-black/20 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div class="flex items-start justify-between gap-4">
            <h4 class="flex flex-wrap items-center gap-x-2 text-sm font-bold uppercase tracking-[0.12em] text-zinc-50">
              <span>{{ trait.name }}</span>
              <span aria-hidden="true" class="text-amber-300/45">•</span>
              <span class="text-xs" style="color: #d8b84a">{{ trait.pack }}</span>
            </h4>
            <span class="shrink-0 text-xs font-bold tracking-[0.12em] text-amber-300/75">Lvl. {{ trait.level }}</span>
          </div>
          <p class="mt-2 text-sm leading-7 text-zinc-300">{{ trait.description }}</p>
          <p v-if="trait.adjustment" class="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em]" style="width: 50%; background-color: #d8b84a; border-radius: 0.5rem; color: #000000; text-align: center">
            {{ trait.adjustment }}
          </p>
        </article>
      </div>

      <p v-if="!filteredTraits.length" class="py-12 text-center text-sm text-zinc-400">
        No traits match “{{ searchQuery }}”.
      </p>
    </div>
  </section>
</template>
