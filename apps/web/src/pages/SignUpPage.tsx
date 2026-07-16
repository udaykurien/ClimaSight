import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTheme } from "@/context/ThemeContext"
import { signUp } from "@/services/auth"
import type { SignUpRequest } from "@climasight/types"

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpPage() {
  const { theme } = useTheme()

  const[formData, setFormData] = useState<FormData>({
    fullName:'',
    email:'',
    password:'',
    confirmPassword:'',
  });

  const[errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!formData.fullName) newErrors.fullName = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const payload: SignUpRequest = {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
    }

    const response = await signUp(payload)
    console.log(response)
    console.log("Form submitted:", formData)
  }

  return(
    <div className={`${theme === "light" ? "climasight-light dot-grid-light" : "climasight-dark dot-grid-dark"} bg-[var(--bg)] min-h-screen`}>

      <Navbar />

      <main className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text)]">Create your account</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Start making smarter energy decisions.</p>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[var(--text)]">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-lg px-4 py-2 text-sm outline-none focus:border-[var(--accent)]"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
            </div>
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
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[var(--text)]">Confirm Password</label>
              <input
                type="password"
                placeholder="········"
                className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-lg px-4 py-2 text-sm outline-none focus:border-[var(--accent)]"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
            <Button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--bg)]" type="submit">
              Create Account
            </Button>
            <p className="text-center text-sm text-[var(--text-muted)]">
              Already have an account?{" "}
              <a href="/login" className="text-[var(--accent)] hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </main>

      <Footer />

    </div>
  )

}
