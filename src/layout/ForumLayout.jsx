import { useEffect, useState } from "react";
import { X, Menu, Info } from "lucide-react";

import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

function ForumLayout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(null);

  const closeDrawer = () => {
    setOpenDrawer(null);
  };

  const toggleDrawer = (drawer) => {
    setOpenDrawer((current) => (current === drawer ? null : drawer));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = openDrawer ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [openDrawer]);

  return (
    <div className="min-h-[calc(100vh-66px)]">
      {/* Mobile sidebar controls */}
      <div className="border-b border-white/10 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => toggleDrawer("left")}
            className="
              inline-flex items-center gap-2 rounded-lg
              border border-white/10 bg-white/3
              px-3 py-2 text-sm font-medium text-zinc-300
              transition
              hover:border-white/20 hover:bg-white/6
              hover:text-white
            "
          >
            <Menu size={16} />
            Kategori
          </button>

          <button
            type="button"
            onClick={() => toggleDrawer("right")}
            className="
              inline-flex items-center gap-2 rounded-lg
              border border-white/10 bg-white/3
              px-3 py-2 text-sm font-medium text-zinc-300
              transition
              hover:border-white/20 hover:bg-white/6
              hover:text-white
            "
          >
            <Info size={16} />
            Info
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        aria-hidden={openDrawer === null}
        onClick={closeDrawer}
        className={`
          fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]
          transition-opacity duration-300
          lg:hidden
          ${openDrawer ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
        `}
      />

      {/* Left Drawer */}
      <aside
        aria-hidden={openDrawer !== "left"}
        className={`
          fixed inset-y-0 left-0 z-50
          w-[min(86vw,340px)]
          overflow-y-auto
          border-r border-white/10
          bg-zinc-950
          px-5 py-6
          shadow-2xl
          transition-all duration-300 ease-out
          lg:hidden
          ${openDrawer === "left" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        `}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">AtapBumi</p>
            <h2 className="mt-1 text-lg font-semibold text-white">Kategori</h2>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Tutup kategori"
            className="
              rounded-lg border border-white/10
              p-2 text-zinc-400
              transition
              hover:bg-white/5 hover:text-white
            "
          >
            <X size={18} />
          </button>
        </div>

        <LeftSidebar />
      </aside>

      {/* Right Drawer */}
      <aside
        aria-hidden={openDrawer !== "right"}
        className={`
          fixed inset-y-0 right-0 z-50
          w-[min(86vw,360px)]
          overflow-y-auto
          border-l border-white/10
          bg-zinc-950
          px-5 py-6
          shadow-2xl
          transition-all duration-300 ease-out
          lg:hidden
          ${openDrawer === "right" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">AtapBumi</p>
            <h2 className="mt-1 text-lg font-semibold text-white">Informasi</h2>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Tutup informasi"
            className="
              rounded-lg border border-white/10
              p-2 text-zinc-400
              transition
              hover:bg-white/5 hover:text-white
            "
          >
            <X size={18} />
          </button>
        </div>

        <RightSidebar />
      </aside>

      {/* Desktop Layout */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex gap-6">
          <aside className="hidden w-56 shrink-0 lg:block">
            <LeftSidebar />
          </aside>

          <main className="min-w-0 flex-1">{children}</main>

          <aside className="hidden w-64 shrink-0 lg:block">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ForumLayout;
