import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import { Link } from "react-router-dom"

export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <header className="fixed top-4 left-4 right-4 z-50 bg-[var(--surface)]/20 backdrop-blur-md border border-[var(--border)] rounded-2xl">
      <div className="w-full h-12 flex justify-between items-center px-6">

        <div>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[var(--accent)] font-bold text-xl">ClimaSight</span>
          </Link>
        </div>

        <nav className="text-[var(--text)] text-base hidden md:flex items-center gap-8">
          <a href="/#about" className="hover:text-[var(--accent)] transition-colors">About</a>
          <a href="/#features" className="hover:text-[var(--accent)] transition-colors">Features</a>
          <a href="/#screenshots" className="hover:text-[var(--accent)] transition-colors">Screenshots</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button onClick={()=>setTheme(theme === "light" ? "dark": "light")} variant="ghost" className="text-[var(--bg)] hover:bg-[var(--surface)]">
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
          <Button variant="ghost" className="text-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface)]">
            Login
          </Button>
          <Link to="/signup">
            <Button className="text-[var(--bg)] bg-[var(--accent)] hover:bg-[var(--accent-hover)]">
              Sign Up
            </Button>
          </Link>
        </div>

      </div>
    </header>
  )
}
