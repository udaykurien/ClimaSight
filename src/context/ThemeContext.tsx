import { createContext, useContext, useState } from "react"

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

export function ThemeProvider({children}: {children:React.ReactNode}) {
  const[theme, setTheme] = useState("light")
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
