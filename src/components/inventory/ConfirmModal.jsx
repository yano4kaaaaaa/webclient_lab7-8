export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <p className="text-slate-100 text-base text-center mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            Видалити
          </button>
          <button
            onClick={onCancel}
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  )
}