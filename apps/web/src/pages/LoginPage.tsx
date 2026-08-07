import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTheme } from "@/context/ThemeContext"
import { login } from "@/services/auth"
import { supabase } from "@/lib/supabase"
import type { LoginRequest } from "@climasight/types"
import { useNavigate } from "react-router-dom"

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const { theme } = useTheme()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const payload: LoginRequest = {
      email: formData.email,
      password: formData.password,
    }

    const response = await login(payload)

    if (response.success) {
      const { accessToken, refreshToken } = response.data!
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })

      if (sessionError) {
        setErrors({ ...errors, general: "Something went wrong logging you in. Please try again." })
        return
      }

      navigate("/test")
    } else {
      setErrors({ ...errors, general: response.error ?? "Something went wrong. Please try again." })
    }
  }

  return (
    <div className={`${theme === "light" ? "climasight-light dot-grid-light" : "climasight-dark dot-grid-dark"} bg-[var(--bg)] min-h-screen`}>

      <Navbar />

      <main className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text)]">Log in</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Welcome back.</p>
          </div>

          {errors.general && (
            <p className="text-red-500 text-sm mb-4">{errors.general}</p>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[var(--text)]">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-lg px-4 py-2 text-sm outline-none focus:border-[var(--accent)]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[var(--text)]">Password</label>
              <input
                type="password"
                placeholder="········"
                className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-lg px-4 py-2 text-sm outline-none focus:border-[var(--accent)]"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <Button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--bg)]" type="submit">
              Log In
            </Button>
            <p className="text-center text-sm text-[var(--text-muted)]">
              Don't have an account?{" "}
              <a href="/signup" className="text-[var(--accent)] hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </main>

      <Footer />

    </div>
  )
}
