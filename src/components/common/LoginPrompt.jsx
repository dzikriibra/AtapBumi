import { Link } from "react-router-dom";
import { LogIn, TriangleAlert, X } from "lucide-react";

function LoginPrompt({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="login-prompt-title" className="w-full max-w-sm overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <TriangleAlert size={20} strokeWidth={2} />
            </div>

            <div>
              <h2 id="login-prompt-title" className="text-sm font-semibold text-white">
                Kamu belum masuk
              </h2>

              <p className="mt-0.5 text-xs text-zinc-500">Login diperlukan untuk vote</p>
            </div>
          </div>

          <button type="button" onClick={onClose} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-white" aria-label="Tutup">
            <X size={17} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          <p className="text-sm leading-6 text-zinc-400">
            Masuk terlebih dahulu untuk memberikan <span className="text-zinc-300">like atau unlike</span> pada thread dan ikut berkontribusi dalam komunitas.
          </p>

          {/* Actions */}
          <div className="mt-5 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
              Nanti
            </button>

            <Link to="/login" onClick={onClose} className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400">
              <LogIn size={16} />
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPrompt;
