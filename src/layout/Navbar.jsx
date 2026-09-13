import { LogIn, LogOut, Menu, Mountain, Search, Trophy, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex shrink-0 items-center gap-2.5">
          <Mountain size={30} strokeWidth={2.5} className="text-amber-500" />

          <div className="leading-none">
            <p className="text-lg font-bold tracking-tight text-white">AtapBumi</p>

            <p className="mt-1 hidden text-[9px] font-medium tracking-[0.12em] text-zinc-500 sm:block">PUSAT INFORMASI PENDAKI</p>
          </div>
        </Link>

        {/* Desktop / Tablet Search */}
        <div className="relative hidden min-w-0 flex-1 md:block">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />

          <input
            type="search"
            placeholder="Cari info jalur, gunung, atau gear..."
            className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-700"
          />
        </div>

        {/* Mobile Search */}
        <Link to="/search" aria-label="Cari" className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-900 hover:text-white md:hidden">
          <Search size={19} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden shrink-0 items-center gap-1 md:flex">
          <Link to="/" className="rounded-lg px-3 py-2 text-sm font-medium text-amber-500 transition hover:bg-zinc-900">
            Forum
          </Link>

          <Link to="/leaderboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
            <Trophy size={16} />
            <span className="hidden lg:inline">Leaderboard</span>
          </Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {token ? (
            <>
              {/* User info */}
              <div className="hidden items-center gap-2 px-2 lg:flex">
                {user?.avatar && <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />}

                <div className="max-w-32">
                  <p className="truncate text-sm font-medium text-white">{user?.name || "Pendaki"}</p>

                  <p className="truncate text-xs text-zinc-500">Pendaki</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                aria-label="Keluar"
                title="Keluar"
              >
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-zinc-700 hover:bg-zinc-900">
                <LogIn size={16} />
                Masuk
              </Link>

              <Link to="/register" className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400">
                <UserPlus size={16} />
                Daftar
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white md:hidden"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 md:hidden">
          <div className="space-y-1 px-4 py-3 sm:px-6">
            <Link to="/" onClick={closeMenu} className="flex items-center rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-amber-500">
              Forum
            </Link>

            <Link to="/leaderboard" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
              <Trophy size={17} />
              Leaderboard
            </Link>

            <div className="my-2 border-t border-zinc-800" />

            {token ? (
              <>
                <div className="hidden items-center gap-2 px-2 lg:flex">
                  {user?.avatar && <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />}

                  <div className="max-w-32">
                    <p className="truncate text-sm font-medium text-white">{user?.name || "User"}</p>
                  </div>
                </div>

                <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                  <LogOut size={17} />
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                  <LogIn size={17} />
                  Masuk
                </Link>

                <Link to="/register" onClick={closeMenu} className="flex items-center gap-3 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-zinc-950">
                  <UserPlus size={17} />
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
