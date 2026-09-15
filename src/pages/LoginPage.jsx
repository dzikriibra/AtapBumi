import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../layout/auth/AuthLayout";

function LoginPage() {
  return (
    <AuthLayout>
      <section className="rounded-2xl border border-white/10 bg-slate-800/80 p-7 shadow-2xl backdrop-blur-sm sm:p-8">
        <div className="mb-6 text-center">
          <div className="mb-4 flex flex-col items-center">
            <img src="/atapbumi-logo.png" alt="AtapBumi" className="h-16 w-16 rounded-2xl object-cover" />

            <div className="mt-2">
              <p className="text-xl font-bold tracking-tight text-white">AtapBumi</p>

              <p className="mt-1 text-[10px] font-medium tracking-[0.18em] text-zinc-500">PUSAT INFORMASI PENDAKI</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">Selamat Datang Kembali</h1>

          <p className="mt-2 text-sm text-zinc-400">Masuk ke akun AtapBumi-mu</p>
        </div>

        <LoginForm />
      </section>
    </AuthLayout>
  );
}

export default LoginPage;
