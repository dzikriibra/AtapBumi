import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../features/auth/authSlice";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerStatus, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(register(formData));

    if (register.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  const isLoading = registerStatus === "loading";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
          Nama
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nama kamu"
          required
          disabled={isLoading}
          className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

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
          className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimal 6 karakter"
          minLength={6}
          required
          disabled={isLoading}
          className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-zinc-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Mendaftarkan..." : "Daftar Sekarang"}
      </button>

      <p className="pt-2 text-center text-sm text-zinc-500">
        Sudah punya akun?{" "}
        <Link to="/login" className="font-semibold text-amber-500 transition hover:text-amber-400">
          Masuk
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
