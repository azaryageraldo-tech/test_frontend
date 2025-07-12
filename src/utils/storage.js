const STORAGE_KEY = "data_items"

export const getAllItems = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveItems = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const addItem = (item) => {
  const items = getAllItems()
  items.push(item)
  saveItems(items)
}

export const updateItem = (id, updated) => {
  const items = getAllItems().map((item) =>
    item.id === id ? { ...item, ...updated } : item
  )
  saveItems(items)
}

export const deleteItem = (id) => {
  const items = getAllItems().filter((item) => item.id !== id)
  saveItems(items)
}

export const getItemById = (id) => {
  return getAllItems().find((item) => item.id === id)
}
