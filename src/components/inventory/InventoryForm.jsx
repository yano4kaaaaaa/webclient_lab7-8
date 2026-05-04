import { useState } from 'react'

export default function InventoryForm({ initialData = {}, onSubmit, mode = 'create' }) {
  const [name, setName] = useState(initialData.inventory_name || '')
  const [desc, setDesc] = useState(initialData.description || '')
  const [photo, setPhoto] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = "Назва обов'язкова"
    if (mode === 'create' && !photo) e.photo = "Фото обов'язкове"
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await onSubmit({ name, desc, photo })
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Назва *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введіть назву..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 bg-gray-50 focus:outline-none focus:border-emerald-500 focus:bg-white transition text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Опис</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Опис позиції..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 bg-gray-50 focus:outline-none focus:border-emerald-500 focus:bg-white transition text-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Фото {mode === 'create' ? '*' : '(не змінюється, якщо не вибрати)'}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition"
          />
          {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-semibold transition text-sm"
        >
          {loading ? 'Збереження...' : mode === 'create' ? 'Створити' : 'Зберегти зміни'}
        </button>
      </form>
    </div>
  )
}