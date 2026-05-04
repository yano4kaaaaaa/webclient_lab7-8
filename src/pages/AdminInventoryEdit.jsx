import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getInventoryById,
  updateInventory,
  updateInventoryPhoto,
} from '../services/inventoryApi'
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
    // 1. Оновлення тексту — JSON
    await updateInventory(id, {
      inventory_name: name,
      description: desc,
    })
    // 2. Оновлення фото — лише якщо вибрано нове
    if (photo) {
      const fd = new FormData()
      fd.append('photo', photo)
      await updateInventoryPhoto(id, fd)
    }
    await fetchItems()
    navigate('/admin')
  }

  if (!item) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-2 border-slate-700 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate('/admin')}
        className="text-slate-400 hover:text-slate-100 text-sm mb-6 flex items-center gap-1 transition-colors"
      >
        ← Назад
      </button>
      <h1 className="text-2xl font-bold text-slate-100 mb-6">
        Редагування:{' '}
        <span className="text-emerald-400">{item.inventory_name}</span>
      </h1>
      <InventoryForm mode="edit" initialData={item} onSubmit={handleSubmit} />
    </div>
  )
}