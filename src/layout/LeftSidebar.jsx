const categories = ["Semua Topik", "Informasi Jalur", "Pengalaman Pendakian", "Gear & Perlengkapan", "Tips Pendakian", "Keselamatan", "Basecamp & Simaksi", "Cerita Pendakian", "Lainnya"];

function LeftSidebar() {
  return (
    <nav>
      <div className="space-y-1">
        {categories.map((category, index) => {
          const isActive = index === 0;

          return (
            <button
              key={category}
              type="button"
              className={`
                w-full rounded-lg px-3 py-2.5
                text-left text-sm font-medium
                transition
                ${isActive ? "bg-white/10 text-amber-500" : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"}
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default LeftSidebar;
