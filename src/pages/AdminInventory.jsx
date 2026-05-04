import { Link } from 'react-router-dom'
import InventoryTable from '../components/inventory/InventoryTable'

export default function AdminInventory() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-100">⚙️ Інвентар складу</h1>
        <Link
          to="/admin/create"
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
        >
          + Додати позицію
        </Link>
      </div>
      <InventoryTable />
    </div>
  )
}