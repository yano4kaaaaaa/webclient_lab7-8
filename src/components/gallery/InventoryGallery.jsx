import { useState } from 'react'
import { useInventory } from '../../store/InventoryContext'
import { useFavorites } from '../../hooks/useFavorites'
import InventoryCard from './InventoryCard'
import InventoryQuickView from './InventoryQuickView'

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-footer">
        <div className="skeleton-text" />
        <div className="skeleton-circle" />
      </div>
    </div>
  )
}

export default function InventoryGallery({ filterIds = null }) {
  const { items, loading, error } = useInventory()
  const { isFav, toggle } = useFavorites()
  const [selectedId, setSelectedId] = useState(null)

  const displayed = filterIds ? items.filter((i) => filterIds.includes(i.id)) : items

  if (loading) return (
    <div className="gallery-grid">
      {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )

  if (error) return (
    <div className="state-center state-error">
      <div className="state-icon">⚠️</div>
      <span className="state-text">{error}</span>
    </div>
  )

  if (!displayed.length) return (
    <div className="state-center">
      <div className="state-icon">📭</div>
      <span className="state-text">
        {filterIds ? 'Немає улюблених позицій' : 'Інвентар порожній'}
      </span>
    </div>
  )

  return (
    <>
      <div className="gallery-grid">
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
        <InventoryQuickView id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </>
  )
}