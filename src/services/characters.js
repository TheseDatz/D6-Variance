import { supabase } from './supabaseClient'

const TABLE_NAME = 'd6v-characters'

export async function loadCharacters() {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('id, owner_id, character_data')
    .order('id', { ascending: true })

  if (error) {
    throw error
  }

  return data.map((row) => ({
    id: row.id,
    _ownerId: row.owner_id,
    ...row.character_data,
  }))
}

export async function loadCharacter(id) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('id, owner_id, character_data')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
    ? {
        id: data.id,
        _ownerId: data.owner_id,
        ...data.character_data,
      }
    : null
}

export async function saveCharacter(character) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const { id, _ownerId, ...characterData } = character
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      character_data: characterData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, owner_id, character_data')
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error('No character was updated. Apply the authenticated character update policy in Supabase and try again.')
  }

  return {
    id: data.id,
    _ownerId: data.owner_id,
    ...data.character_data,
  }
}

export async function deleteCharacter(id) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error('No character was deleted. Only the character owner or an administrator can delete it.')
  }
}

export async function createCharacter(characterData, ownerId) {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({ character_data: characterData, owner_id: ownerId })
    .select('id, owner_id, character_data')
    .single()

  if (error) throw error

  return {
    id: data.id,
    _ownerId: data.owner_id,
    ...data.character_data,
  }
}
