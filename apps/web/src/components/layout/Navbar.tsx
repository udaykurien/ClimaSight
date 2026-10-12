import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext"
import { useAuth } from "@/context/AuthContext"
import { Link } from "react-router-dom"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { session, logout } = useAuth()
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
                 // Moon icon
              <svg viewBox="0 0 96 96" fill="currentColor" width="16" height="16" className="text-[var(--accent)]">
                <path d="M48 12C28.12 12 12 28.12 12 48C12 67.88 28.12 84 48 84C67.88 84 84 67.88 84 48C84 46.16 83.84 44.32 83.6 42.56C79.68 48.04 73.28 51.6 66 51.6C54.08 51.6 44.4 41.92 44.4 30C44.4 22.76 47.96 16.32 53.44 12.4C51.68 12.16 49.84 12 48 12Z"></path>
              </svg>
               ) : (
                 // Sun icon
                <svg viewBox="0 0 96 96" fill="currentColor" width="16" height="16" className="text-[var(--accent)]">
                  <path d="M48 28C36.96 28 28 36.96 28 48C28 59.04 36.96 68 48 68C59.04 68 68 59.04 68 48C68 36.96 59.04 28 48 28ZM8 52H16C18.2 52 20 50.2 20 48C20 45.8 18.2 44 16 44H8C5.8 44 4 45.8 4 48C4 50.2 5.8 52 8 52ZM80 52H88C90.2 52 92 50.2 92 48C92 45.8 90.2 44 88 44H80C77.8 44 76 45.8 76 48C76 50.2 77.8 52 80 52ZM44 8V16C44 18.2 45.8 20 48 20C50.2 20 52 18.2 52 16V8C52 5.8 50.2 4 48 4C45.8 4 44 5.8 44 8ZM44 80V88C44 90.2 45.8 92 48 92C50.2 92 52 90.2 52 88V80C52 77.8 50.2 76 48 76C45.8 76 44 77.8 44 80ZM23.96 18.32C22.4 16.76 19.84 16.76 18.32 18.32C16.76 19.88 16.76 22.44 18.32 23.96L22.56 28.2C24.12 29.76 26.68 29.76 28.2 28.2C29.72 26.64 29.76 24.08 28.2 22.56L23.96 18.32ZM73.44 67.8C71.88 66.24 69.32 66.24 67.8 67.8C66.24 69.36 66.24 71.92 67.8 73.44L72.04 77.68C73.6 79.24 76.16 79.24 77.68 77.68C79.24 76.12 79.24 73.56 77.68 72.04L73.44 67.8ZM77.68 23.96C79.24 22.4 79.24 19.84 77.68 18.32C76.12 16.76 73.56 16.76 72.04 18.32L67.8 22.56C66.24 24.12 66.24 26.68 67.8 28.2C69.36 29.72 71.92 29.76 73.44 28.2L77.68 23.96ZM28.2 73.44C29.76 71.88 29.76 69.32 28.2 67.8C26.64 66.24 24.08 66.24 22.56 67.8L18.32 72.04C16.76 73.6 16.76 76.16 18.32 77.68C19.88 79.2 22.44 79.24 23.96 77.68L28.2 73.44Z"></path>
                </svg>
               )}
          </Button>
          {session == null ? (
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
          }
        </div>
      </div>
    </header>
  )
}
