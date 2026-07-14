import supabase from "./client"
import { buildBusinessSettingsPayload, normalizeBusinessSettingsRecord } from "../businessSettings"
import { normalizeTreatmentRecord, sortTreatments } from "../treatments"

export async function getBusinessSettings() {
  const response = await supabase.from("business_settings").select("*").single()

  if (response.data) {
    return {
      ...response,
      data: normalizeBusinessSettingsRecord(response.data),
    }
  }

  return response
}

export async function updateBusinessSettings(payload) {
  const response = await supabase
    .from("business_settings")
    .update(buildBusinessSettingsPayload(payload))
    .eq("id", 1)
    .select("*")
    .single()

  if (response.data) {
    return {
      ...response,
      data: normalizeBusinessSettingsRecord(response.data),
    }
  }

  return response
}

function normalizeTreatmentsResponse(response) {
  if (!response.data) {
    return response
  }

  const normalizedData = Array.isArray(response.data)
    ? sortTreatments(response.data.map(normalizeTreatmentRecord))
    : normalizeTreatmentRecord(response.data)

  return {
    ...response,
    data: normalizedData,
  }
}

export async function listAdminTreatments() {
  const response = await supabase
    .from("treatments")
    .select("*, treatment_options(*)")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true })

  return normalizeTreatmentsResponse(response)
}

export async function listPublicTreatments() {
  const response = await supabase
    .from("treatments")
    .select("*, treatment_options(*)")
    .eq("status", "ACTIVE")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true })

  return normalizeTreatmentsResponse(response)
}

export async function saveTreatmentWithOptions({ treatment, options }) {
  const treatmentResponse = await supabase.from("treatments").upsert(treatment).select("*").single()

  if (treatmentResponse.error || !treatmentResponse.data) {
    return treatmentResponse
  }

  const treatmentId = treatmentResponse.data.id
  const existingOptionsResponse = await supabase.from("treatment_options").select("id").eq("treatment_id", treatmentId)

  if (existingOptionsResponse.error) {
    return { data: null, error: existingOptionsResponse.error }
  }

  const savedOptionsPayload = options.map((option) => ({
    ...option,
    treatment_id: treatmentId,
  }))

  if (savedOptionsPayload.length > 0) {
    const upsertOptionsResponse = await supabase.from("treatment_options").upsert(savedOptionsPayload).select("*")

    if (upsertOptionsResponse.error) {
      return { data: null, error: upsertOptionsResponse.error }
    }
  }

  const retainedIds = new Set(savedOptionsPayload.map((option) => option.id).filter(Boolean))
  const optionIdsToDelete = (existingOptionsResponse.data ?? [])
    .map((option) => option.id)
    .filter((id) => !retainedIds.has(id))

  if (optionIdsToDelete.length > 0) {
    const deleteResponse = await supabase.from("treatment_options").delete().in("id", optionIdsToDelete)

    if (deleteResponse.error) {
      return { data: null, error: deleteResponse.error }
    }
  }

  const refreshedResponse = await supabase
    .from("treatments")
    .select("*, treatment_options(*)")
    .eq("id", treatmentId)
    .single()

  return normalizeTreatmentsResponse(refreshedResponse)
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
