import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext"
import { useAuth } from "@/context/AuthContext"
import { Link } from "react-router-dom"
import { MoonIcon } from "@/components/icons/MoonIcon"
import { SunIcon } from "@/components/icons/SunIcon"
import { widgetRegistry } from "@/features/dashboard/widgetRegistry"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"

export default function NavbarDashboard(props: { onAddWidget: (type: string) => void }) {
  const { theme, setTheme } = useTheme()
  const { session, loading, logout } = useAuth()
  const onAddWidget = props.onAddWidget

  const widgetTypes = Object.keys(widgetRegistry)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--surface)]/20 backdrop-blur-md">
      <div className="w-full h-12 flex justify-between items-center px-6">

        <div>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[var(--accent)] font-bold text-xl">ClimaSight</span>
          </Link>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" className="text-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface)]"> Add Widgets</Button>
            </HoverCardTrigger>
            <HoverCardContent className="bg-[var(--surface)]/60 backdrop-blur-md text-[var(--text)]">
              {widgetTypes.map(function (item) {
                return <div key = {item}>
                  <Button
                    onClick={function () {
                      onAddWidget(item)
                    } }
                    className="text-[var(--bg)] bg-[var(--accent)] hover:bg-[var(--accent-hover)]">
                    {item}
                  </Button>
                </div>
              })}
            </HoverCardContent>
          </HoverCard>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={()=>setTheme(theme === "light" ? "dark": "light")} variant="ghost" className="text-[var(--bg)] hover:bg-[var(--surface)]">
            {theme === "light" ? (
              <MoonIcon className="text-[var(--accent)]" />
               ) : (
                 <SunIcon className="text-[var(--accent)]" />
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
              <>
                Loading
              </>
          )
          }
        </div>
      </div>
    </header>
  )
}
