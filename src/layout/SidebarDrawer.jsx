import { X } from "lucide-react";

function SidebarDrawer({ open, onClose, title, children }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Tutup menu" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <aside className="absolute inset-y-0 left-0 w-[min(85vw,320px)] overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-5 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">{title}</h2>

          <button type="button" aria-label={`Tutup ${title}`} className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {children}
      </aside>
    </div>
  );
}

export default SidebarDrawer;
