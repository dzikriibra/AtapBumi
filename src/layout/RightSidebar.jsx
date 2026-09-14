import { Lightbulb, MapPin, Users } from "lucide-react";

function RightSidebar() {
  return (
    <aside className="space-y-5">
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-amber-500" />

          <h2 className="text-sm font-semibold text-white">Komunitas</h2>
        </div>

        <p className="mt-4 text-sm leading-6 text-zinc-400">Tempat berbagi pengalaman dan informasi untuk membantu sesama pendaki.</p>

        <div className="my-4 border-t border-white/10" />

        <p className="text-xs leading-5 text-zinc-500">Leaderboard akan tersedia setelah sistem kontribusi komunitas dikembangkan.</p>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={18} className="text-amber-500" />

          <h2 className="text-sm font-semibold text-white">Informasi Basecamp</h2>
        </div>

        <p className="mt-4 text-sm leading-6 text-zinc-400">Pastikan mengetahui informasi jalur, basecamp, dan ketentuan pendakian sebelum berangkat.</p>

        <div className="my-4 border-t border-white/10" />

        <p className="mt-3 text-xs leading-5 text-zinc-500">Selalu cek informasi resmi dari pengelola gunung sebelum melakukan pendakian.</p>
      </section>

      <section
        className="
          rounded-xl border border-amber-500/20
          bg-amber-500/[0.05]
          p-5
        "
      >
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={18} className="text-amber-500" />

          <h2 className="text-sm font-semibold text-white">Daily Tips</h2>
        </div>

        <p className="mt-4 text-sm leading-6 text-zinc-300">Jangan hanya mengandalkan perkiraan cuaca. Selalu siapkan perlengkapan tambahan untuk menghadapi kondisi gunung yang dapat berubah.</p>
      </section>
    </aside>
  );
}

export default RightSidebar;
