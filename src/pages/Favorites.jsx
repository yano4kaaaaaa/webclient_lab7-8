import { useFavorites } from '../hooks/useFavorites'
import InventoryGallery from '../components/gallery/InventoryGallery'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: 24 }}>
        ❤️ Улюблені
        <span className="fav-count">{favorites.length}</span>
      </h1>
      <InventoryGallery filterIds={favorites} />
    </div>
  )
}