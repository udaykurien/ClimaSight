import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext"
import { useAuth } from "@/context/AuthContext"
import { Link } from "react-router-dom"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { session, loading, logout } = useAuth()

  return (
    <header className="fixed top-4 left-4 right-4 z-50 bg-[var(--surface)]/20 backdrop-blur-md border border-[var(--border)] rounded-2xl">
      <div className="w-full h-12 flex justify-between items-center px-6">

        <div>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[var(--accent)] font-bold text-xl">ClimaSight</span>
          </Link>
        </div>

        <nav className="text-[var(--text)] text-base hidden md:flex items-center gap-8">
          <Link to="/#about" className="hover:text-[var(--accent)] transition-colors">
            About
          </Link>
          <Link to="/#features" className="hover:text-[var(--accent)] transition-colors">
            Features
          </Link>
          <Link to="/#screenshots" className="hover:text-[var(--accent)] transition-colors">
            Screenshots
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button onClick={()=>setTheme(theme === "light" ? "dark": "light")} variant="ghost" className="text-[var(--bg)] hover:bg-[var(--surface)]">
            {theme === "light" ? (
              <MoonIcon className="text-[var(--accent)]"/>
               ) : (
              <SunIcon className="text-[var(--accent)]"/>
               )}
          </Button>
          {!loading ? ( session == null ? (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface)]">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="text-[var(--bg)] bg-[var(--accent)] hover:bg-[var(--accent-hover)]">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Button onClick={logout} className="text-[var(--bg)] bg-[var(--accent)] hover:bg-[var(--accent-hover)]">
              Logout
            </Button>
            )
          ) : (
              <span>Loading</span>
          )
          }
        </div>
      </div>
    </header>
  )
}
