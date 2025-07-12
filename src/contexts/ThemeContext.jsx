import { createContext, useContext, useState } from "react"
import { applyTheme, getSavedTheme } from "../utils/theme"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getSavedTheme())

  const changeTheme = (mode) => {
    setTheme(mode)
    localStorage.setItem("theme", mode)
    applyTheme(mode)
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)