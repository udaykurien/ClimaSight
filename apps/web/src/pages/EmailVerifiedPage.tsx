import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"

export default function EmailVerifiedPage() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<"loading" | "error">("loading")

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        setStatus("error")
        return
      }

      navigate("/test")
    }

    checkSession()
  }, [navigate])

  if (status === "error") {
    return <p>Something went wrong confirming your email. Please try signing up again.</p>
  }

  return <p>Confirming your email...</p>
}
