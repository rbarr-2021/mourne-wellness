import supabase from "./client"

export async function signInWithPassword(credentials) {
  return supabase.auth.signInWithPassword(credentials)
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getSession() {
  return supabase.auth.getSession()
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}
