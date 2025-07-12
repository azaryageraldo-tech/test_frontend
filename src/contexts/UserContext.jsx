// src/contexts/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react"
import { getUser } from "../utils/auth"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser())

  const refreshUser = () => {
    setUser(getUser())
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
