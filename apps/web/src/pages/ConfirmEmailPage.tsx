import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { useTheme } from "@/context/ThemeContext"

export default function ConfirmationPage() {
  const { theme } = useTheme()

  return (
    // <div className={`${theme === "light" ? "climasight-light dot-grid-light" : "climasight-dark dot-grid-dark"} bg-[var(--bg)] min-h-screen`}>

    //   <Navbar />

    //   <div className="flex items-center justify-center min-h-screen px-4">
    //     <div className="w-full max-w-md text-center">
    //       <h1 className="text-2xl font-bold text-[var(--text)]">Check your inbox</h1>
    //       <p className="mt-2 text-sm text-[var(--text-muted)]">
    //         We've sent a confirmation link to your email. Click it to activate your account.
    //       </p>
    //     </div>
    //   </div>

    //   <Footer />
    // </div>
    <div className={`${theme === "light" ? "climasight-light dot-grid-light" : "climasight-dark dot-grid-dark"} bg-[var(--bg)] min-h-screen flex flex-col`}>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-[var(--text)]">Check your inbox</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            We've sent a confirmation link to your email. Click it to activate your account.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
