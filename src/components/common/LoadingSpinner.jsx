import { LoaderCircle } from "lucide-react";

function LoadingSpinner({ label = "Memuat...", fullScreen = false }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? "min-h-screen bg-zinc-950" : "min-h-[calc(100vh-4rem)]"}`}>
      <LoaderCircle size={32} strokeWidth={2} className="animate-spin text-amber-500" aria-label={label} />
    </div>
  );
}

export default LoadingSpinner;
