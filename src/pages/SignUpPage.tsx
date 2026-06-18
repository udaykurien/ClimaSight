import Navbar from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTheme } from "@/context/ThemeContext"

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpPage() {
  const { theme } = useTheme()

  const[formData, setFormData] = useState<FormData>({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
  });

  const[errors, setErrors] = useState<FormErrors>({});

  return(
    <div className={`${theme === "light" ? "climasight-light dot-grid-light" : "climasight-dark dot-grid-dark"} bg-[var(--bg)] min-h-screen`}>

      <Navbar />

      <main className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text)]">Create your account</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Start making smarter energy decisions.</p>
          </div>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[var(--text)]">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] rounded-lg px-4 py-2 text-sm outline-none focus:border-[var(--accent)]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
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
            <Button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--bg)]">
              Create Account
            </Button>
          </form>
        </div>
      </main>

    </div>
  )

}
