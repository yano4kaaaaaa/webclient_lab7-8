import { useEffect, useState } from 'react'
import { getInventoryById, getPhotoUrl } from '../../services/inventoryApi'

export default function InventoryQuickView({ id, onClose }) {
  const [item, setItem] = useState(null)

  useEffect(() => {
    getInventoryById(id).then((r) => setItem(r.data))
  }, [id])

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!item ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <img
             src={getPhotoUrl(item)}
              alt={item.inventory_name}
              className="w-full h-64 object-cover bg-gray-100"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-900">{item.inventory_name}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-700 text-2xl leading-none transition"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-500 leading-relaxed text-sm">
                {item.description || 'Опис відсутній'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}