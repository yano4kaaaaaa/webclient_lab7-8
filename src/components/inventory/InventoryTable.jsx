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

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-3" />
      <span>Завантаження...</span>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 text-red-500">
      <span className="text-4xl mb-3">⚠️</span>
      <span>{error}</span>
    </div>
  )

  if (!items.length) return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <span className="text-4xl mb-3">📭</span>
      <span>Інвентар порожній. Додайте першу позицію!</span>
    </div>
  )

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Фото</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Назва</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Опис</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Дії</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <img
                    src={getPhotoUrl(item)}
                    alt={item.inventory_name}
                    className="w-14 h-14 rounded-lg object-cover bg-gray-100"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{item.inventory_name}</td>
                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{item.description}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/admin/${item.id}`)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition font-medium"
                    >
                      👁 Переглянути
                    </button>
                    <button
                      onClick={() => navigate(`/admin/edit/${item.id}`)}
                      className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg transition font-medium"
                    >
                      ✏️ Редагувати
                    </button>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg transition font-medium"
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