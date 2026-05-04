import { getPhotoUrl } from '../../services/inventoryApi'

export default function InventoryCard({ item, isFav, onToggleFav, onClick }) {
  return (
    <div className="inv-card" onClick={onClick}>
      <div className="inv-card-img-wrap">
        <img
          className="inv-card-img"
          src={getPhotoUrl(item.id)}
          alt={item.inventory_name}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="inv-card-placeholder" style={{ display: 'none' }}>📦</div>
      </div>
      <div className="inv-card-footer">
        <span className="inv-card-name">{item.inventory_name}</span>
        <button
          className="fav-btn"
          title={isFav ? 'Видалити з улюблених' : 'Додати до улюблених'}
          onClick={(e) => { e.stopPropagation(); onToggleFav(item.id) }}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}