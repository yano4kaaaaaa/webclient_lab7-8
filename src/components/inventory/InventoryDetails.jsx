import { useEffect, useState } from 'react'
import { getInventoryById, getPhotoUrl } from '../../services/inventoryApi'

export default function InventoryDetails({ id }) {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInventoryById(id)
      .then((r) => setItem(r.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  )

  if (!item) return (
    <div className="text-center py-20 text-red-500">
      <span className="text-4xl block mb-3">⚠️</span>
      Позицію не знайдено
    </div>
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-w-lg">
      <img
      src={getPhotoUrl(item)}
        alt={item.inventory_name}
        className="w-full h-72 object-cover bg-gray-100"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{item.inventory_name}</h2>
        <p className="text-gray-500 leading-relaxed">{item.description || 'Опис відсутній'}</p>
      </div>
    </div>
  )
}