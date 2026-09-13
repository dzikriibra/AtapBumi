function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/mountain.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-zinc-950/60" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}

export default AuthLayout;
