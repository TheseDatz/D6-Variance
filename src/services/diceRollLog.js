import { isSupabaseConfigured, supabase } from './supabaseClient'

export const isDiceRollLoggingConfigured = isSupabaseConfigured

function usernameFromEmail(email) {
  return (
    email
      ?.replace(/@dead-empire\.local$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '_')
      .slice(0, 32) || 'unknown'
  )
}

export async function getLatestDiceRolls(limit = 25) {
  if (!supabase) return { data: [], error: null }

  return supabase
    .from('dice_rolls')
    .select('id, created_at, roller_username, roll_label, source_code, dice_count, modifier, subtotal, total, wild_total, wild_status_code')
    .order('created_at', { ascending: false })
    .limit(limit)
}

export async function logDiceRoll(roll) {
  if (!supabase) return { data: null, error: null }

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  const user = sessionData.session?.user
  if (sessionError || !user) return { data: null, error: sessionError }

  const { data, error } = await supabase
    .from('dice_rolls')
    .insert({
      roller_id: user.id,
      roller_username: usernameFromEmail(user.email),
      roll_label: roll.rollLabel || null,
      source_code: roll.sourceCode,
      dice_count: roll.diceCount,
      modifier: roll.modifier,
      subtotal: roll.subtotal,
      total: roll.total,
      wild_total: roll.wildTotal,
      wild_status_code: roll.wildStatusCode,
    })
    .select('id, created_at, roller_username, roll_label, source_code, dice_count, modifier, subtotal, total, wild_total, wild_status_code')
    .single()

  return { data, error }
}

export function subscribeToDiceRolls(onInsert) {
  if (!supabase) return null

  const channel = supabase
    .channel('d6v-dice-roll-log')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'dice_rolls' }, (payload) => onInsert(payload.new))
    .subscribe()

  return () => supabase.removeChannel(channel)
}
