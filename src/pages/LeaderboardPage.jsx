import { Trophy } from "lucide-react";

function LeaderboardPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <section className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-amber-500">
          <Trophy size={30} strokeWidth={1.8} />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">Leaderboard Belum Tersedia</h1>

        <p className="mt-3 text-sm leading-6 text-zinc-400">Papan peringkat pendaki akan menampilkan anggota komunitas dengan kontribusi terbaik di AtapBumi.</p>
      </section>
    </main>
  );
}

export default LeaderboardPage;
