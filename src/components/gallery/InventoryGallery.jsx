import { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { useFavorites } from '../../hooks/useFavorites'
import InventoryCard from './InventoryCard'
import InventoryQuickView from './InventoryQuickView'

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-5 w-5 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}

export default function InventoryGallery({ filterIds = null }) {
  const { items, loading, error } = useInventory()
  const { isFav, toggle } = useFavorites()
  const [selectedId, setSelectedId] = useState(null)

  const displayed = filterIds
    ? items.filter((i) => filterIds.includes(i.id))
    : items

  if (loading) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 text-red-500">
      <span className="text-4xl mb-3">⚠️</span>
      <span>{error}</span>
    </div>
  )

  if (!displayed.length) return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <span className="text-5xl mb-4">📭</span>
      <span className="text-lg">
        {filterIds ? 'Немає улюблених позицій' : 'Інвентар порожній'}
      </span>
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayed.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            isFav={isFav(item.id)}
            onToggleFav={toggle}
            onClick={() => setSelectedId(item.id)}
          />
        ))}
      </div>

      {selectedId && (
        <InventoryQuickView
          id={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  )
}