import { useEffect, useState } from 'react'
import { getInventoryById, getPhotoUrl } from '../../services/inventoryApi'

export default function InventoryQuickView({ id, onClose }) {
  const [item, setItem] = useState(null)

  useEffect(() => {
    getInventoryById(id).then((r) => setItem(r.data))
  }, [id])

  return (
    <div className="qv-overlay" onClick={onClose}>
      <div className="qv-box" onClick={(e) => e.stopPropagation()}>
        {!item ? (
          <div className="state-center" style={{ padding: '60px 0' }}>
            <div className="spinner" />
          </div>
        ) : (
          <>
            <img className="qv-img" src={getPhotoUrl(id)} alt={item.inventory_name} />
            <div className="qv-body">
              <div className="qv-header">
                <div className="qv-name">{item.inventory_name}</div>
                <button className="qv-close" onClick={onClose}>×</button>
              </div>
              <div className="qv-desc">{item.description || 'Опис відсутній'}</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}