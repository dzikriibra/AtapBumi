import ThreadLoader from "../components/threads/ThreadLoader";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">AtapBumi</h1>

          <p className="mt-2 text-sm text-zinc-400">Ruang berbagi cerita, pengalaman, dan pengetahuan tentang dunia pendakian.</p>
        </header>

        <ThreadLoader />

        <Link to="/threads/create" className="inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">
          Buat Thread
        </Link>
      </div>
    </main>
  );
}

export default HomePage;
