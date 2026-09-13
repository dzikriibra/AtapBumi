import { Lightbulb, MapPin, Users } from "lucide-react";

function RightSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 xl:block">
      <div className="sticky top-24 space-y-6">
        <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users size={18} className="text-amber-500" />

            <h2 className="text-sm font-semibold text-white">Komunitas</h2>
          </div>

          <p className="text-sm leading-6 text-zinc-400">Tempat berbagi pengalaman dan informasi untuk membantu sesama pendaki.</p>

          <div className="mt-4 border-t border-zinc-800 pt-4">
            <p className="text-xs leading-5 text-zinc-500">Leaderboard akan tersedia setelah sistem kontribusi komunitas dikembangkan.</p>
          </div>
        </section>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-amber-500" />

            <h2 className="text-sm font-semibold text-white">Informasi Basecamp</h2>
          </div>

          <p className="text-sm leading-6 text-zinc-400">Pastikan mengetahui informasi jalur, basecamp, dan ketentuan pendakian sebelum berangkat.</p>

          <p className="mt-3 text-xs leading-5 text-zinc-500">Selalu cek informasi resmi dari pengelola gunung sebelum melakukan pendakian.</p>
        </section>

        <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-500" />

            <h2 className="text-sm font-semibold text-white">Daily Tip</h2>
          </div>

          <p className="text-sm leading-6 text-zinc-300">Jangan hanya mengandalkan perkiraan cuaca. Selalu siapkan perlengkapan tambahan untuk menghadapi perubahan kondisi di gunung.</p>
        </section>
      </div>
    </aside>
  );
}

export default RightSidebar;
