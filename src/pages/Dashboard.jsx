import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Pagination from "../components/Pagination"
import { deleteItem, getAllItems } from "../utils/storage"

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const query = new URLSearchParams(location.search)
  const initialPage = parseInt(query.get("page")) || 1
  const initialKeyword = query.get("keyword") || ""

  const [keyword, setKeyword] = useState(initialKeyword)
  const [filtered, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(initialPage)

  const itemsPerPage = 5

  useEffect(() => {
    const all = getAllItems()
    const result = all.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    )
    setFiltered(result)
  }, [keyword])

  useEffect(() => {
    const params = new URLSearchParams()
    if (keyword) params.set("keyword", keyword)
    if (currentPage > 1) params.set("page", currentPage)
    navigate(`?${params.toString()}`, { replace: true })
  }, [keyword, currentPage])

  const handleDelete = (id) => {
    if (confirm("Yakin hapus item ini?")) {
      deleteItem(id)
      const updated = getAllItems().filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      )
      setFiltered(updated)
    }
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const currentItems = filtered.slice(start, start + itemsPerPage)

  return (
    <>
      <Navbar />
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <div className="p-4 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
            <input
              type="text"
              placeholder="Cari nama..."
              value={keyword}
              onChange={(e) => {
                setCurrentPage(1)
                setKeyword(e.target.value)
              }}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 rounded w-full sm:w-1/2"
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600 px-4 py-2 rounded w-full sm:w-auto"
              onClick={() => navigate("/form")}
            >
              + Tambah Data
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border text-sm sm:text-base border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-2 border dark:border-gray-600">#</th>
                  <th className="p-2 border dark:border-gray-600">Nama</th>
                  <th className="p-2 border dark:border-gray-600">Email</th>
                  <th className="p-2 border dark:border-gray-600">Status</th>
                  <th className="p-2 border dark:border-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="p-2 border dark:border-gray-600">{start + idx + 1}</td>
                    <td className="p-2 border dark:border-gray-600">{item.name}</td>
                    <td className="p-2 border dark:border-gray-600">{item.email}</td>
                    <td className="p-2 border dark:border-gray-600">{item.status}</td>
                    <td className="p-2 border dark:border-gray-600 whitespace-nowrap">
                      <button
                        className="mr-2 text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={() => navigate(`/form?id=${item.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 dark:text-red-400 hover:underline"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-500 dark:text-gray-400">
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard
