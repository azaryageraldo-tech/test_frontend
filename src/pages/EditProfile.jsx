import { useState } from "react"
import Navbar from "../components/Navbar"
import { useUser } from "../contexts/UserContext"
import { updateFullName } from "../utils/auth"

const EditProfile = () => {
  const { user, refreshUser } = useUser()
  const [name, setName] = useState(user?.fullName || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    updateFullName(name)
    refreshUser()
    alert("Nama berhasil diperbarui.")
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded dark:bg-gray-800 dark:text-gray-100">
        <h2 className="text-xl font-bold mb-4">Edit Profil</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Nama Lengkap</label>
          <input
            className="w-full p-2 border rounded mb-4"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </form>
      </div>
    </>
  )
}

export default EditProfile
