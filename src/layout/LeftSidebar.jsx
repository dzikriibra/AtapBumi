const categories = ["Semua Topik", "Informasi Jalur", "Pengalaman Pendakian", "Gear & Perlengkapan", "Tips Pendakian", "Keselamatan", "Basecamp & Simaksi", "Cerita Pendakian", "Lainnya"];

function LeftSidebar() {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-24">
        <section>
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">Kategori</p>

          <nav className="space-y-1">
            {categories.map((category, index) => (
              <button key={category} type="button" className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${index === 0 ? "bg-zinc-800 font-semibold text-amber-500" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}>
                {category}
              </button>
            ))}
          </nav>
        </section>
      </div>
    </aside>
  );
}

export default LeftSidebar;
