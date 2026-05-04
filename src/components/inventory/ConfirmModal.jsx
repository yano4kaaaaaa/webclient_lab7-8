export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <p className="text-gray-800 text-base mb-6 text-center">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Видалити
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  )
}