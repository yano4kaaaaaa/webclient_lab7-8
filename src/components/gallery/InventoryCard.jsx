import { getPhotoUrl } from '../../services/inventoryApi'

export default function InventoryCard({ item, isFav, onToggleFav, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden cursor-pointer
                 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1
                 transition-all duration-300"
    >
      <div className="overflow-hidden h-48 bg-gray-100">
        <img
          src={getPhotoUrl(item)}
          alt={item.inventory_name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => (e.target.style.display = 'none')}
        />
      </div>
      <div className="p-4 flex justify-between items-center">
        <span className="font-semibold text-gray-900 truncate pr-2 text-sm">
          {item.inventory_name}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(item.id) }}
          className="text-xl flex-shrink-0 hover:scale-125 transition-transform"
          title={isFav ? 'Видалити з улюблених' : 'Додати до улюблених'}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}