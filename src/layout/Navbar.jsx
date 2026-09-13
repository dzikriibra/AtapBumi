import { LogIn, LogOut, Mountain, Search, Trophy, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <Mountain size={30} strokeWidth={2.5} className="text-amber-500" />

          <div className="leading-none">
            <p className="text-lg font-bold tracking-tight text-white">AtapBumi</p>

            <p className="mt-1 text-[9px] font-medium tracking-[0.12em] text-zinc-500">PUSAT INFORMASI PENDAKI</p>
          </div>
        </Link>

        <div className="relative hidden min-w-0 flex-1 md:block">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />

          <input
            type="search"
            placeholder="Cari info jalur, gunung, atau gear..."
            className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-700"
          />
        </div>

        <nav className="ml-auto flex shrink-0 items-center gap-2">
          <Link to="/" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-amber-500 transition hover:bg-zinc-900 sm:block">
            Forum
          </Link>

          <Link to="/leaderboard" className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white sm:flex">
            <Trophy size={16} />
            Leaderboard
          </Link>

          {token ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 lg:flex">
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
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-zinc-700 hover:bg-zinc-900 sm:flex">
                <LogIn size={16} />
                Masuk
              </Link>

              <Link to="/register" className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400">
                <UserPlus size={16} />
                Daftar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
