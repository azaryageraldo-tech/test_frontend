import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserContext"
import { logout } from "../utils/auth"
import { applyTheme, getSavedTheme } from "../utils/theme"

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [theme, setTheme] = useState(getSavedTheme())
  const dropdownRef = useRef(null)

  const navigate = useNavigate()
  const { user } = useUser()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleEditProfile = () => {
    navigate("/edit-profile")
  }

  const handleThemeChange = (value) => {
    localStorage.setItem("theme", value)
    setTheme(value)
    applyTheme(value)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    const watchOS = window.matchMedia("(prefers-color-scheme: dark)")
    const updateOS = () => {
      if (getSavedTheme() === "system") {
        applyTheme("system")
      }
    }

    watchOS.addEventListener("change", updateOS)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      watchOS.removeEventListener("change", updateOS)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white dark:bg-gray-800 dark:text-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="font-bold text-xl">Dashboard</h1>

      <div className="relative flex gap-4 items-center" ref={dropdownRef}>
        {/* Toggle Theme */}
        <select
          className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-white"
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        {/* User Dropdown */}
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {user?.fullName}
          <span className="text-xs">▼</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-700 border rounded shadow z-10 text-sm">
            <button
              onClick={handleEditProfile}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
