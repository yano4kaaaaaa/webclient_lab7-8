import { useParams, useNavigate } from 'react-router-dom'
import InventoryDetails from '../components/inventory/InventoryDetails'

export default function AdminInventoryDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition text-sm"
      >
        ← Назад до списку
      </button>
      <InventoryDetails id={id} />
    </div>
  )
}