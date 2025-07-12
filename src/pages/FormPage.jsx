import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import Navbar from "../components/Navbar"
import { addItem, getItemById, updateItem } from "../utils/storage"

const FormPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const id = query.get("id")

  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Aktif",
  })

  useEffect(() => {
    if (isEdit) {
      const data = getItemById(id)
      if (data) {
        setFormData(data)
      } else {
        alert("Data tidak ditemukan.")
        navigate("/")
      }
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Nama dan Email wajib diisi.")
      return
    }

    if (isEdit) {
      updateItem(id, formData)
    } else {
      const newItem = {
        id: uuidv4(),
        ...formData,
      }
      addItem(newItem)
    }

    navigate("/")
  }

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-xl mx-auto bg-white rounded shadow dark:bg-gray-800 dark:text-gray-100">
        <h1 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Data" : "Tambah Data"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="Aktif">Aktif</option>
              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => navigate("/")}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormPage
