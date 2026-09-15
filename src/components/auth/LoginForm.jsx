import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../features/auth/authSlice";
import useForm from "../../hooks/useForm";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginStatus, error } = useSelector((state) => state.auth);

  const { formData, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(login(formData));

    if (login.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  const isLoading = loginStatus === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
          Alamat Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="kamu@email.com"
          required
          disabled={isLoading}
          className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
            Password
          </label>

          <button type="button" className="text-amber-500 transition hover:text-amber-400">
            <span className="text-xs font-medium">Lupa password?</span>
          </button>
        </div>

        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          disabled={isLoading}
          className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-amber-500 px-4 py-2 font-semibold text-zinc-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Memasuki AtapBumi..." : "Masuk Sekarang"}
      </button>

      <p className="pt-2 text-center text-sm text-zinc-500">
        Belum punya akun?{" "}
        <Link to="/register" className="font-semibold text-amber-500 transition hover:text-amber-400">
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
