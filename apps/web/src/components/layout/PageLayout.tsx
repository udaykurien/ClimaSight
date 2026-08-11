import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useTheme } from "@/context/ThemeContext"

export default function PageLayout({ children }: {children: React.ReactNode}) {
  const { theme } = useTheme()
  return (
    <div className={`${theme === "light" ? "climasight-light dot-grid-light" : "climasight-dark dot-grid-dark"} bg-[var(--bg)] min-h-screen`}>
      <Navbar />
        { children }
      <Footer />
    </div>
  )
}
