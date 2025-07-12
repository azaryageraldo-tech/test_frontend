import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserContext"
import { login } from "../utils/auth"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { refreshUser } = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(username, password)
    if (success) {
      refreshUser() // Tambahkan ini!
      navigate("/")
    } else {
      setError("Username atau password salah.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-white px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
