const AUTH_KEY = "auth_user"

// Kredensial statis (bisa kamu ubah sesuai keinginan)
const CREDENTIALS = {
  username: "admin",
  password: "admin123",
}

export const login = (username, password) => {
  if (
    username === CREDENTIALS.username &&
    password === CREDENTIALS.password
  ) {
    const user = { username, fullName: "Administrator" }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    return true
  }
  return false
}

export const logout = () => {
  localStorage.removeItem(AUTH_KEY)
}

export const getUser = () => {
  const data = localStorage.getItem(AUTH_KEY)
  return data ? JSON.parse(data) : null
}

export const isAuthenticated = () => {
  return !!getUser()
}

export const updateFullName = (fullName) => {
  const user = getUser()
  if (!user) return
  user.fullName = fullName
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}
