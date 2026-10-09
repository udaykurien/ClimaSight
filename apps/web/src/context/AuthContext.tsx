import { createContext, useContext, useState, useEffect } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

type AuthContextType = {
  session: Session | null
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session:session, logout:logout }}>
      {children}
    </AuthContext.Provider>
  )
}
