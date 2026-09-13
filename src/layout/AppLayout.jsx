import Navbar from "./Navbar";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="mx-auto w-full max-w-[1600px]">{children}</div>
    </div>
  );
}

export default AppLayout;
