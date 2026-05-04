import { useNavigate } from 'react-router-dom'
import { createInventory } from '../services/inventoryApi'
import { useInventory } from '../store/InventoryContext'
import InventoryForm from '../components/inventory/InventoryForm'

export default function AdminInventoryCreate() {
  const navigate = useNavigate()
  const { fetchItems } = useInventory()

  const handleSubmit = async ({ name, desc, photo }) => {
    const fd = new FormData()
    fd.append('inventory_name', name)
    fd.append('description', desc)
    fd.append('inventory_image', photo)
    await createInventory(fd)
    await fetchItems()
    navigate('/admin')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Нова позиція</h1>
      <InventoryForm mode="create" onSubmit={handleSubmit} />
    </div>
  )
}