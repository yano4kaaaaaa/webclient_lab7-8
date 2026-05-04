import { useParams, useNavigate } from 'react-router-dom'
import InventoryDetails from '../components/inventory/InventoryDetails'

export default function AdminInventoryDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={() => navigate('/admin')}
        className="text-slate-400 hover:text-slate-100 text-sm mb-6 flex items-center gap-1 transition-colors"
      >
        ← Назад до списку
      </button>
      <h1 className="text-2xl font-bold text-slate-100 mb-6">Деталі позиції</h1>
      <InventoryDetails id={id} />
    </div>
  )
}