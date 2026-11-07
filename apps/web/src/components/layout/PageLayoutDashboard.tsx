import NavbarDashboard from '@/components/layout/NavbarDashboard'
import { useTheme } from "@/context/ThemeContext"

export default function PageLayoutDashboard(props: {
  children: React.ReactNode
  onAddWidget: (type: string) => void
  onSaveLayout: () => Promise<void>
}) {
  const children = props.children
  const onAddWidget = props.onAddWidget
  const onSaveLayout = props.onSaveLayout

  const { theme } = useTheme()
  return (
    <div className={`${theme === "light" ? "climasight-light dot-grid-light" : "climasight-dark dot-grid-dark"} bg-[var(--bg)] min-h-screen`}>
      <NavbarDashboard onAddWidget={onAddWidget} onSaveLayout={onSaveLayout} />
        <main className="pt-12">
          {children}
        </main>
    </div>
  )
}
