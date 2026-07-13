import { supabase } from './supabaseClient'

const SHEET_COLUMNS = 'slug, category, sort_order, is_player_visible, sheet, updated_at'

function rowToCharacter(row) {
  return {
    ...row.sheet,
    id: row.sheet?.id || row.slug,
    _slug: row.slug,
    _category: row.category,
    _isPlayerVisible: Boolean(row.is_player_visible),
  }
}

export async function loadPlayerCharacters() {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const { data, error } = await supabase
    .from('character_sheets')
    .select(SHEET_COLUMNS)
    .eq('category', 'player')
    .order('sort_order', { ascending: true })
    .order('slug', { ascending: true })

  if (error) {
    throw error
  }

  return data.map(rowToCharacter)
}
