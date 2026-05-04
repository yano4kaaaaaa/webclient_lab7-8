import { createContext, useContext, useState, useEffect } from 'react'
import { getInventory } from '../services/inventoryApi'

const InventoryContext = createContext()

export function InventoryProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await getInventory()
      setItems(res.data)
    } catch {
      setError('Помилка завантаження даних')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  return (
    <InventoryContext.Provider value={{ items, loading, error, fetchItems }}>
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventory = () => useContext(InventoryContext)