export const getSavedTheme = () => {
  return localStorage.getItem("theme") || "system"
}

export const applyTheme = (mode) => {
  const root = window.document.documentElement
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  const theme = mode === "system" ? (systemDark ? "dark" : "light") : mode

  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}
