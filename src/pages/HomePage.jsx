import { Link } from "react-router-dom";

import ThreadLoader from "../components/threads/ThreadLoader";
import ForumLayout from "../layout/ForumLayout";

function HomePage() {
  return (
    <ForumLayout>
      <header className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <div>
            <p className="text-sm font-medium text-amber-500">Forum Pendaki</p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Ruang Diskusi Pendaki</h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">Berbagi cerita, pengalaman, informasi jalur, gear, tips, dan pengetahuan seputar pendakian.</p>
          </div>

          <Link to="/threads/create" className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-center text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 lg:w-auto lg:shrink-0">
            Buat Thread
          </Link>
        </div>
      </header>

      <ThreadLoader />
    </ForumLayout>
  );
}

export default HomePage;
