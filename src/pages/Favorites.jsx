import { useFavorites } from '../hooks/useFavorites'
import InventoryGallery from '../components/gallery/InventoryGallery'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">❤️ Улюблені</h1>
        <span className="bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-0.5 rounded-full">
          {favorites.length}
        </span>
      </div>
      <InventoryGallery filterIds={favorites} />
    </div>
  )
}