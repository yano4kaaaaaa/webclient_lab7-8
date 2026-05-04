import { Routes, Route, NavLink } from 'react-router-dom'
import AdminInventory from './pages/AdminInventory'
import AdminInventoryCreate from './pages/AdminInventoryCreate'
import AdminInventoryEdit from './pages/AdminInventoryEdit'
import AdminInventoryDetails from './pages/AdminInventoryDetails'
import Gallery from './pages/Gallery'
import Favorites from './pages/Favorites'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center gap-6 sticky top-0 z-40">
        <span className="font-bold text-emerald-400 text-lg mr-2">📦 Склад</span>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-400 font-semibold text-sm'
              : 'text-slate-400 hover:text-slate-100 text-sm transition-colors'
          }
        >
          🗃 Галерея
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-400 font-semibold text-sm'
              : 'text-slate-400 hover:text-slate-100 text-sm transition-colors'
          }
        >
          Улюблені
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-400 font-semibold text-sm'
              : 'text-slate-400 hover:text-slate-100 text-sm transition-colors'
          }
        >
          Адмін
        </NavLink>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/"              element={<Gallery />} />
          <Route path="/favorites"     element={<Favorites />} />
          <Route path="/admin"         element={<AdminInventory />} />
          <Route path="/admin/create"  element={<AdminInventoryCreate />} />
          <Route path="/admin/edit/:id"    element={<AdminInventoryEdit />} />
          <Route path="/admin/:id"     element={<AdminInventoryDetails />} />
        </Routes>
      </main>
    </div>
  )
}