import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { restoreSession } from "../../features/auth/authSlice";

function SessionLoader({ children }) {
  const dispatch = useDispatch();

  const { token, sessionStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && sessionStatus === "idle") {
      dispatch(restoreSession());
    }
  }, [dispatch, token, sessionStatus]);

  if (token && sessionStatus === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <LoaderCircle size={32} strokeWidth={2} className="animate-spin text-amber-500" aria-label="Memulihkan sesi" />
      </div>
    );
  }

  return children;
}

export default SessionLoader;
