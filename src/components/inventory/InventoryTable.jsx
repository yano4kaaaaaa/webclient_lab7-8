import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteInventory, getPhotoUrl } from '../../services/inventoryApi'
import { useInventory } from '../../store/InventoryContext'
import ConfirmModal from './ConfirmModal'

export default function InventoryTable() {
  const { items, loading, error, fetchItems } = useInventory()
  const [deleteId, setDeleteId] = useState(null)
  const navigate = useNavigate()

  const handleDelete = async () => {
    await deleteInventory(deleteId)
    setDeleteId(null)
    fetchItems()
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-2 border-slate-700 border-t-emerald-400 rounded-full animate-spin" />
        <span className="text-slate-400 text-sm">Завантаження...</span>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-4xl">⚠️</span>
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  // Empty state
  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-5xl">📭</span>
        <p className="text-slate-400 text-sm">Інвентар порожній. Додайте першу позицію!</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Фото
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Назва
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Опис
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Дії
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <img
                    src={getPhotoUrl(item.id)}
                    alt={item.inventory_name}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-700"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-slate-100">
                  {item.inventory_name}
                </td>
                <td className="px-4 py-3 text-slate-400 max-w-xs truncate">
                  {item.description || '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() => navigate(`/admin/${item.id}`)}
                      className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      👁 Переглянути
                    </button>
                    <button
                      onClick={() => navigate(`/admin/edit/${item.id}`)}
                      className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                       Редагувати
                    </button>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="text-xs bg-red-700 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      🗑 Видалити
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <ConfirmModal
          message="Ви впевнені, що хочете видалити цю позицію?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  )
}