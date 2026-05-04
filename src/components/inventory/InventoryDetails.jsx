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

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-2 border-slate-700 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400">Позицію не знайдено</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <img
        src={getPhotoUrl(id)}
        alt={item.inventory_name}
        className="w-full h-72 object-cover bg-slate-800"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-100 mb-3">
          {item.inventory_name}
        </h2>
        <p className="text-slate-400 leading-relaxed text-sm">
          {item.description || 'Опис відсутній'}
        </p>
      </div>
    </div>
  )
}