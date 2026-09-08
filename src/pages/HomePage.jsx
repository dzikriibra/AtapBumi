import ThreadLoader from "../components/threads/ThreadLoader";

function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">AtapBumi</h1>

          <p className="mt-2 text-sm text-zinc-400">Ruang berbagi cerita, pengalaman, dan pengetahuan tentang dunia pendakian.</p>
        </header>

        <ThreadLoader />
      </div>
    </main>
  );
}

export default HomePage;
