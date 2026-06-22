import { ThemeContext } from "@/context/ThemeContext"

export default function Footer() {
  return(
    <div className="bg-[var(--accent)]/10">
      <footer className="grid grid-cols-2 gap-8 mt-10 max-w-7xl mx-auto px-6 py-6 items-center">
        <div className="font-bold text-[var(--accent)] text-left">
          <p>
            ClimaSight
          </p>
        </div>

        <div className="text-[var(--text-muted)] text-right">
          <p>
            © 2026 ClimaSight. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
