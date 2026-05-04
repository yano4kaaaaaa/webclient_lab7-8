import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getInventoryById, updateInventory, updateInventoryPhoto } from '../services/inventoryApi'
import { useInventory } from '../store/InventoryContext'
import InventoryForm from '../components/inventory/InventoryForm'

export default function AdminInventoryEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchItems } = useInventory()
  const [item, setItem] = useState(null)

  useEffect(() => {
    getInventoryById(id).then((r) => setItem(r.data))
  }, [id])

  const handleSubmit = async ({ name, desc, photo }) => {
    await updateInventory(id, { inventory_name: name, description: desc })
    if (photo) {
      const fd = new FormData()
      fd.append('photo', photo)
      await updateInventoryPhoto(id, fd)
    }
    await fetchItems()
    navigate('/admin')
  }

  if (!item) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Редагування: {item.inventory_name}
      </h1>
      <InventoryForm mode="edit" initialData={item} onSubmit={handleSubmit} />
    </div>
  )
}