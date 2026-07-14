import supabase from "./client"

export async function getBusinessSettings() {
  return supabase.from("business_settings").select("*").single()
}

export async function updateBusinessSettings(payload) {
  return supabase.from("business_settings").update(payload).eq("id", 1).select().single()
}

export async function listTreatments({ activeOnly = false } = {}) {
  let query = supabase.from("treatments").select("*").order("created_at", { ascending: true })

  if (activeOnly) {
    query = query.eq("active", true)
  }

  return query
}

export async function upsertTreatment(payload) {
  return supabase.from("treatments").upsert(payload).select().single()
}

export async function listAvailabilityExceptions({ from, to } = {}) {
  let query = supabase.from("availability_exceptions").select("*").order("start_datetime", { ascending: true })

  if (from) {
    query = query.gte("start_datetime", from)
  }

  if (to) {
    query = query.lte("end_datetime", to)
  }

  return query
}

export async function upsertAvailabilityException(payload) {
  return supabase.from("availability_exceptions").upsert(payload).select().single()
}

export async function deleteAvailabilityException(id) {
  return supabase.from("availability_exceptions").delete().eq("id", id)
}
