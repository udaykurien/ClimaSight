import NavbarDashboard from '@/components/layout/NavbarDashboard'
import { useTheme } from "@/context/ThemeContext"

export default function PageLayoutDashboard({ children }: {children: React.ReactNode}) {
  const { theme } = useTheme()
  return (
    <div className={`${theme === "light" ? "climasight-light dot-grid-light" : "climasight-dark dot-grid-dark"} bg-[var(--bg)] min-h-screen`}>
      <NavbarDashboard />
        <main className="pt-12">
          {children}
        </main>
    </div>
  )
}
