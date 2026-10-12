import { createContext, useContext, useEffect, useState } from "react"

type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used inside ThemeProvider")
  return context
}

function readStoredTheme() {
  const storedTheme = localStorage.getItem("theme")
  if (storedTheme == "dark") {
    return "dark"
  }
  return "light"
}

export function ThemeProvider({children}: {children:React.ReactNode}) {
  const [theme, setTheme] = useState(readStoredTheme)

  useEffect(function () {
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
