import { Link } from 'react-router-dom'
import InventoryTable from '../components/inventory/InventoryTable'

export default function AdminInventory() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">⚙️ Інвентар складу</h1>
        <Link
          to="/admin/create"
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-semibold transition text-sm"
        >
          + Додати позицію
        </Link>
      </div>
      <InventoryTable />
    </div>
  )
}