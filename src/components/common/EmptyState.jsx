import { Inbox } from "lucide-react";

function EmptyState({ title = "Belum ada data", description = "Belum ada data yang dapat ditampilkan." }) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
        <Inbox size={22} className="text-zinc-500" />
      </div>

      <h2 className="text-base font-semibold text-white">{title}</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">{description}</p>
    </div>
  );
}

export default EmptyState;
