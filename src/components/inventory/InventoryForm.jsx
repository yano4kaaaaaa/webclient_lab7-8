import { useState } from 'react'

export default function InventoryForm({
  initialData = {},
  onSubmit,
  mode = 'create',
}) {
  const [name, setName] = useState(initialData.inventory_name || '')
  const [desc, setDesc] = useState(initialData.description || '')
  const [photo, setPhoto] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = "Назва є обов'язковою"
    if (mode === 'create' && !photo) e.photo = "Фото є обов'язковим"
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setLoading(true)
    await onSubmit({ name, desc, photo })
    setLoading(false)
  }

  const inputClass =
    'w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      {/* Назва */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Назва <span className="text-red-400">*</span>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введіть назву..."
          className={inputClass}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Опис */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Опис
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          placeholder="Опис позиції..."
          className={inputClass + ' resize-none'}
        />
      </div>

      {/* Фото */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Фото{' '}
          {mode === 'create' ? (
            <span className="text-red-400">*</span>
          ) : (
            <span className="text-slate-500 text-xs font-normal">
              (залишіть порожнім — не зміниться)
            </span>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="text-slate-400 text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-slate-700 file:text-slate-100 hover:file:bg-slate-600 file:cursor-pointer file:transition-colors"
        />
        {errors.photo && (
          <p className="text-red-400 text-xs mt-1">{errors.photo}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
      >
        {loading
          ? 'Збереження...'
          : mode === 'create'
          ? 'Створити'
          : 'Зберегти зміни'}
      </button>
    </form>
  )
}