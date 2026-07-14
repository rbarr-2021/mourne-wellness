const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY

export function getSupabaseConfig() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are missing.")
  }

  return {
    url: supabaseUrl,
    key: supabaseKey,
  }
}

export function getAuthErrorMessage(error) {
  if (!error) return "Something went wrong. Please try again."

  if (error.message?.toLowerCase().includes("invalid login credentials")) {
    return "The email or password you entered was not recognised."
  }

  if (error.message?.toLowerCase().includes("email not confirmed")) {
    return "This administrator account is not yet confirmed."
  }

  return error.message
}
