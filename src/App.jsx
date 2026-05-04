import { Routes, Route, NavLink } from 'react-router-dom'
import AdminInventory from './pages/AdminInventory'
import AdminInventoryCreate from './pages/AdminInventoryCreate'
import AdminInventoryEdit from './pages/AdminInventoryEdit'
import AdminInventoryDetails from './pages/AdminInventoryDetails'
import Gallery from './pages/Gallery'
import Favorites from './pages/Favorites'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 px-6 py-3 flex items-center gap-6 shadow-md">
        <span className="text-emerald-400 font-bold text-lg mr-4">📦 Склад</span>
        <NavLink to="/"
          className={({ isActive }) =>
            isActive ? 'text-emerald-400 font-semibold' : 'text-gray-400 hover:text-white transition'
          }>
          🗃️ Галерея
        </NavLink>
        <NavLink to="/favorites"
          className={({ isActive }) =>
            isActive ? 'text-emerald-400 font-semibold' : 'text-gray-400 hover:text-white transition'
          }>
          ❤️ Улюблені
        </NavLink>
        <NavLink to="/admin"
          className={({ isActive }) =>
            isActive ? 'text-emerald-400 font-semibold' : 'text-gray-400 hover:text-white transition'
          }>
          ⚙️ Адмін
        </NavLink>
      </nav>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/admin" element={<AdminInventory />} />
          <Route path="/admin/create" element={<AdminInventoryCreate />} />
          <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
          <Route path="/admin/:id" element={<AdminInventoryDetails />} />
        </Routes>
      </main>
    </div>
  )
}